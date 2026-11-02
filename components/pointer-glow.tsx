'use client';
import { useEffect, useRef } from 'react';

/**
 * Pointer-follow glow layers.
 *
 * `PointerGlow` is a single fixed layer mounted once in the root layout:
 * a soft orange radial that trails the pointer with rAF-lerped smoothing.
 * It uses Pointer Events, so touch drags move it too; at rest it sits
 * centred near the top of the viewport at low opacity.
 *
 * `HeroGlow` is the same mechanism scoped to the homepage hero section,
 * with a stronger tint, following the pointer while it is over the hero.
 *
 * Both are pointer-events: none, transform/opacity only, and fully
 * disabled under prefers-reduced-motion.
 */

type GlowState = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  op: number;
  top: number;
  lastMove: number;
  inside: boolean;
};

function makeState(x: number, y: number, op: number): GlowState {
  return { x, y, tx: x, ty: y, op, top: op, lastMove: 0, inside: false };
}

export function PointerGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '0';
      return;
    }
    const s = makeState(window.innerWidth / 2, window.innerHeight * 0.2, 0.5);
    let raf = 0;
    const onMove = (event: PointerEvent) => {
      s.tx = event.clientX;
      s.ty = event.clientY;
      s.lastMove = performance.now();
      s.inside = true;
    };
    const tick = () => {
      s.top = s.inside && performance.now() - s.lastMove < 2600 ? 1 : 0.5;
      s.x += (s.tx - s.x) * 0.12;
      s.y += (s.ty - s.y) * 0.12;
      s.op += (s.top - s.op) * 0.06;
      el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) translate(-50%, -50%)`;
      el.style.opacity = s.op.toFixed(3);
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="pointer-glow" aria-hidden="true" />;
}

export function HeroGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '0';
      return;
    }
    const rect0 = host.getBoundingClientRect();
    const s = makeState(rect0.width / 2, rect0.height * 0.3, 0);
    let raf = 0;
    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const lx = event.clientX - rect.left;
      const ly = event.clientY - rect.top;
      s.inside = lx >= 0 && ly >= 0 && lx <= rect.width && ly <= rect.height;
      if (s.inside) {
        s.tx = lx;
        s.ty = ly;
        s.lastMove = performance.now();
      }
    };
    const tick = () => {
      s.top = s.inside && performance.now() - s.lastMove < 2600 ? 1 : 0;
      s.x += (s.tx - s.x) * 0.14;
      s.y += (s.ty - s.y) * 0.14;
      s.op += (s.top - s.op) * 0.08;
      el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) translate(-50%, -50%)`;
      el.style.opacity = s.op.toFixed(3);
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="hero-glow" aria-hidden="true" />;
}
