'use client';

import { useEffect, useRef } from 'react';

/**
 * DotsField — interactive dot-grid backdrop for the 404 page only.
 *
 * Self-contained on purpose: this component plus its wiring in
 * app/not-found.tsx are the whole feature, so removing it later is
 * a two-file change and nothing else depends on it.
 *
 * Behaviour:
 * - Dots sit at a low base opacity in the ink theme token; the
 *   canvas itself is transparent, so the page's paper shows through.
 * - Mouse: dots swell within ~150px of the pointer. Touch: no hover
 *   state at all — a tap only sends one ripple through the grid
 *   (the owner's standing rule: touch effects live only while the
 *   finger is on the screen; a ripple is a one-shot, not a state).
 * - A press (mouse or touch) sends a single ripple wavefront.
 * - Performance: the rAF loop runs only while the pointer is moving
 *   or a ripple is alive, and only while the canvas is on-screen
 *   (IntersectionObserver) and the tab is visible. DPR is
 *   capped at 1.75. Grid spacing is responsive — it grows until the
 *   dot count stays under ~2,600 at any viewport size.
 * - Reduced motion: the static grid is drawn once; no loop, no
 *   interaction listeners.
 * - The canvas never intercepts clicks (pointer-events: none); all
 *   listening happens on the window.
 */
export function DotsField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const found = canvasRef.current;
    if (!found) return;
    const el: HTMLCanvasElement = found;
    const foundCtx = el.getContext('2d');
    if (!foundCtx) return;
    const ctx: CanvasRenderingContext2D = foundCtx;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let dots: { x: number; y: number }[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;
    let onScreen = true;
    let ink = '23, 23, 23';

    const pointer = { x: -9999, y: -9999, active: false };
    const ripples: { x: number; y: number; start: number }[] = [];

    const HOVER_RADIUS = 150;
    const BASE_ALPHA = 0.3;
    const BASE_RADIUS = 1.6;
    const MAX_DOTS = 2600;
    const RIPPLE_SPEED = 560; // px per second
    const RIPPLE_BAND = 110; // wavefront thickness in px
    const RIPPLE_LIFE = 2600; // ms

    function readInk() {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue('--foreground')
        .trim();
      const hex = raw.match(/^#([0-9a-f]{6})$/i);
      if (hex) {
        const n = parseInt(hex[1], 16);
        ink = `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
        return;
      }
      const rgb = raw.match(/(\d+)[ ,]+(\d+)[ ,]+(\d+)/);
      if (rgb) ink = `${rgb[1]}, ${rgb[2]}, ${rgb[3]}`;
    }

    function build() {
      const rect = el.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      el.width = Math.round(width * dpr);
      el.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Responsive spacing: never finer than 26px, and coarse enough
      // that the total dot count stays bounded on huge screens.
      const spacing = Math.max(26, Math.sqrt((width * height) / MAX_DOTS));
      dots = [];
      const cols = Math.floor(width / spacing);
      const rows = Math.floor(height / spacing);
      const offX = (width - cols * spacing) / 2;
      const offY = (height - rows * spacing) / 2;
      for (let r = 0; r <= rows; r += 1) {
        for (let c = 0; c <= cols; c += 1) {
          dots.push({ x: offX + c * spacing, y: offY + r * spacing });
        }
      }
    }

    function draw(now: number) {
      ctx.clearRect(0, 0, width, height);
      const liveRipples = ripples.filter((r) => now - r.start < RIPPLE_LIFE);
      for (const d of dots) {
        let lift = 0;
        if (pointer.active) {
          const dx = d.x - pointer.x;
          const dy = d.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < HOVER_RADIUS) {
            const t = 1 - dist / HOVER_RADIUS;
            lift = Math.max(lift, t * t * (3 - 2 * t)); // smoothstep
          }
        }
        for (const r of liveRipples) {
          const age = (now - r.start) / 1000;
          const front = age * RIPPLE_SPEED;
          const dist = Math.hypot(d.x - r.x, d.y - r.y);
          const delta = Math.abs(dist - front);
          if (delta < RIPPLE_BAND) {
            const band = 1 - delta / RIPPLE_BAND;
            const fade = 1 - (now - r.start) / RIPPLE_LIFE;
            lift = Math.max(lift, band * band * fade);
          }
        }
        const radius = BASE_RADIUS + lift * 3;
        const alpha = BASE_ALPHA + lift * 0.28;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${ink}, ${alpha.toFixed(3)})`;
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      return liveRipples.length;
    }

    function frame(now: number) {
      const liveCount = draw(now);
      // Keep animating only while a ripple is alive. A stationary
      // pointer's swell is already painted by this frame, and the
      // next pointermove re-kicks the loop — so an idle hover costs
      // no further frames.
      if (liveCount === 0) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(frame);
    }

    function kick() {
      if (running || reduceMotion || !onScreen || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }

    function toLocal(e: PointerEvent) {
      const rect = el.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function onMove(e: PointerEvent) {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      const p = toLocal(e);
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.active = true;
      kick();
    }

    function onLeave() {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
      kick();
    }

    function onDown(e: PointerEvent) {
      const p = toLocal(e);
      ripples.push({ x: p.x, y: p.y, start: performance.now() });
      if (ripples.length > 4) ripples.shift();
      kick();
    }

    let resizeTimer = 0;
    function onResize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        if (reduceMotion) draw(performance.now());
        else kick();
      }, 150);
    }

    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? true;
        if (onScreen) kick();
      },
      { threshold: 0 },
    );
    io.observe(el);

    function onVisibility() {
      if (!document.hidden) kick();
    }
    document.addEventListener('visibilitychange', onVisibility);

    const themeObserver = new MutationObserver(() => {
      readInk();
      if (reduceMotion) draw(performance.now());
      else kick();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });

    readInk();
    build();
    draw(performance.now());

    if (!reduceMotion) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerdown', onDown, { passive: true });
      document.documentElement.addEventListener('pointerleave', onLeave);
      window.addEventListener('resize', onResize);
    }

    return () => {
      cancelAnimationFrame(raf);
      running = false;
      io.disconnect();
      themeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
