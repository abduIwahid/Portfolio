'use client';

import { useEffect, useRef } from 'react';

/**
 * HeroNoise — signal-trace canvas texture for the HOME hero only.
 *
 * Adapted in house style from the VerticalBarsNoise component the
 * owner picked from the UI Layouts library (saved-reference #222);
 * the noise-field idea is theirs, everything else was rebuilt to
 * this site's rules. It replaces the hero's old radial HeroGlow
 * layer (which still serves the About hero).
 *
 * What it draws: faint horizontal rules across the hero, with small
 * ink dashes drifting along them wherever a sine-noise field peaks
 * — a whisper of a spectrogram, not an animated background. The
 * canvas is transparent; the hero's own paper shows through. Lines
 * use the muted theme token, bars the foreground ink, and roughly
 * one bar in seven the accent — all at low alpha, in both themes
 * (colours are read from the CSS variables and re-read on theme
 * change).
 *
 * House constraints honoured:
 * - Bounded: the canvas fills the hero's box only (absolute inset
 *   0, hero clips overflow), sized from the hero via
 *   ResizeObserver — never window-sized, never fixed.
 * - The global PointerGlow is gated off on the home route (see
 *   components/pointer-glow.tsx) so the two cursor-reactive layers
 *   never fight; this texture is the hero's only one.
 * - Pointer input is mouse/pen only, listened to on the window
 *   (the canvas itself is pointer-events: none). Touch devices get
 *   the ambient drift only — no touch handlers at all.
 * - Performance: DPR capped at 1.5; the rAF loop runs only while
 *   the hero is on-screen (IntersectionObserver) and the tab is
 *   visible; full cleanup on unmount.
 * - Reduced motion: exactly one static frame is drawn; no loop
 *   and no interaction listeners are ever started.
 *
 * Removal is trivial by design: delete this file, its import and
 * element in app/page.tsx, the .hero-noise rules in globals.css,
 * and the home-route gate in PointerGlow — the hero returns to
 * its previous static form (restore <HeroGlow /> there if the
 * radial glow is wanted back).
 */
export function HeroNoise() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const found = canvasRef.current;
    if (!found) return;
    const el: HTMLCanvasElement = found;
    const foundCtx = el.getContext('2d');
    if (!foundCtx) return;
    const ctx: CanvasRenderingContext2D = foundCtx;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;
    let onScreen = true;
    let time = 0;

    let lineRgb = '98, 98, 98';
    let inkRgb = '23, 23, 23';
    let accentRgb = '249, 115, 22';

    const pointer = { x: -9999, y: -9999 };
    const ripples: { x: number; y: number; start: number }[] = [];

    const LINE_SPACING = 30;
    const BAR_STEP = 10;
    const MOUSE_RADIUS = 200;
    const RIPPLE_LIFE = 2000; // ms
    const RIPPLE_MAX_RADIUS = 300;
    const TIME_STEP = 0.0005;

    function tokenToRgb(raw: string, fallback: string): string {
      const value = raw.trim();
      const hex = value.match(/^#([0-9a-f]{6})$/i);
      if (hex) {
        const n = parseInt(hex[1], 16);
        return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
      }
      const rgb = value.match(/(\d+)[ ,]+(\d+)[ ,]+(\d+)/);
      if (rgb) return `${rgb[1]}, ${rgb[2]}, ${rgb[3]}`;
      return fallback;
    }

    function readTokens() {
      const styles = getComputedStyle(document.documentElement);
      lineRgb = tokenToRgb(styles.getPropertyValue('--muted'), lineRgb);
      inkRgb = tokenToRgb(styles.getPropertyValue('--foreground'), inkRgb);
      accentRgb = tokenToRgb(styles.getPropertyValue('--accent'), accentRgb);
    }

    function noise(x: number, y: number, t: number): number {
      const n =
        Math.sin(x * 0.01 + t) * Math.cos(y * 0.01 + t) +
        Math.sin(x * 0.015 - t) * Math.cos(y * 0.005 + t);
      return (n + 1) / 2; // 0..1
    }

    function mouseInfluence(x: number, y: number): number {
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return Math.max(0, 1 - distance / MOUSE_RADIUS);
    }

    function rippleInfluence(x: number, y: number, now: number): number {
      let total = 0;
      for (const ripple of ripples) {
        const age = now - ripple.start;
        if (age >= RIPPLE_LIFE) continue;
        const dx = x - ripple.x;
        const dy = y - ripple.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const radius = (age / RIPPLE_LIFE) * RIPPLE_MAX_RADIUS;
        const band = 50;
        if (Math.abs(distance - radius) < band) {
          const strength = (1 - age / RIPPLE_LIFE) * 1.5;
          total += strength * (1 - Math.abs(distance - radius) / band);
        }
      }
      return Math.min(total, 2);
    }

    function draw(now: number) {
      ctx.clearRect(0, 0, width, height);
      const lines = Math.max(1, Math.floor(height / LINE_SPACING));
      const spacing = height / lines;
      for (let i = 0; i < lines; i += 1) {
        const y = i * spacing + spacing / 2;
        const lineLift = mouseInfluence(width / 2, y);
        const lineAlpha = 0.1 + lineLift * 0.12;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${lineRgb}, ${lineAlpha.toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        for (let x = 0; x < width; x += BAR_STEP) {
          const n = noise(x, y, time);
          const mi = mouseInfluence(x, y);
          const ri = rippleInfluence(x, y, now);
          // High base threshold: only strong noise peaks become bars,
          // so the field stays sparse. The pointer and ripples lower
          // the bar locally, letting the trace gather around them.
          const threshold = Math.max(0.34, 0.68 - mi * 0.18 - ri * 0.12);
          if (n <= threshold) continue;
          const strength = (n - threshold) / (1 - threshold);
          const alpha = Math.min(
            0.32,
            0.06 + strength * 0.12 + mi * 0.08 + ri * 0.08,
          );
          const barWidth = 2 + n * 7 + (mi + ri) * 4;
          const barHeight = 2 + n * 2;
          const drift =
            Math.sin(time + y * 0.0375) * 10 * n +
            ri * Math.sin(time * 2 + x * 0.02) * 8;
          // Deterministic hash: about one bar in seven is accented.
          const accented = (Math.round(x / BAR_STEP) * 7 + i * 13) % 7 === 0;
          ctx.fillStyle = `rgba(${accented ? accentRgb : inkRgb}, ${alpha.toFixed(3)})`;
          ctx.fillRect(x + drift - barWidth / 2, y - barHeight / 2, barWidth, barHeight);
        }
      }
    }

    function frame(now: number) {
      time += TIME_STEP;
      // Prune dead ripples so the array never grows stale.
      for (let i = ripples.length - 1; i >= 0; i -= 1) {
        if (now - ripples[i].start >= RIPPLE_LIFE) ripples.splice(i, 1);
      }
      draw(now);
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduceMotion || !onScreen || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    function build() {
      const rect = el.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      el.width = Math.round(width * dpr);
      el.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
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
    }

    function onLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
    }

    function onDown(e: PointerEvent) {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      const p = toLocal(e);
      ripples.push({ x: p.x, y: p.y, start: performance.now() });
      if (ripples.length > 4) ripples.shift();
    }

    const resizeObserver = new ResizeObserver(() => {
      build();
      if (reduceMotion) draw(performance.now());
    });
    resizeObserver.observe(el);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? true;
        if (onScreen) start();
        else stop();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(el);

    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }
    document.addEventListener('visibilitychange', onVisibility);

    const themeObserver = new MutationObserver(() => {
      readTokens();
      if (reduceMotion) draw(performance.now());
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });

    readTokens();
    build();
    draw(performance.now());

    if (!reduceMotion) {
      if (finePointer) {
        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('pointerdown', onDown, { passive: true });
        document.documentElement.addEventListener('pointerleave', onLeave);
      }
      start();
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-noise" aria-hidden="true" />;
}
