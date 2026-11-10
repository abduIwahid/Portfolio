'use client';
import { useEffect, useRef } from 'react';

/**
 * Pointer-follow glow layers.
 *
 * `PointerGlow` is a single fixed layer mounted once in the root layout:
 * a soft orange radial that trails the pointer with rAF-lerped smoothing.
 * It runs on every route, home included. (A home-route gate existed
 * briefly while the home hero carried a cursor-reactive canvas texture
 * instead; the texture was removed the same day and the gate with it,
 * restoring the glow's original home behaviour.)
 * `HeroGlow` is the same mechanism scoped to a hero section, with a
 * stronger tint, following the pointer while it is over the hero. It
 * serves the home and About heroes.
 *
 * Mouse: hover-follow, exactly as before — the global layer rests at low
 * opacity near the top of the viewport and brightens while the pointer
 * has moved recently; the hero layer brightens while the pointer is
 * over the hero and fades out a few seconds after it stops.
 *
 * Touch: visibility follows CONTACT, not the last move. The layers light
 * up at the touch point on pointerdown, follow the drag, and on
 * pointerup/pointercancel they fade out fast (fully hidden within
 * ~200 ms) — no hold state, no slow decay tail. The old 2.6 s "recent
 * move" window and the gentle opacity lerp are what made the glow
 * linger for seconds after a finger lifted; touch never uses them.
 *
 * Both layers are pointer-events: none, transform/opacity only, and
 * fully disabled under prefers-reduced-motion.
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
  /** Last pointer family seen: touch gates visibility on contact. */
  mode: 'mouse' | 'touch';
  /** True while a touch pointer is physically on the screen. */
  contact: boolean;
};

function makeState(x: number, y: number, op: number): GlowState {
  return { x, y, tx: x, ty: y, op, top: op, lastMove: 0, inside: false, mode: 'mouse', contact: false };
}

/**
 * Opacity step for one frame. `fast` is the touch-release fade: a 0.45
 * lerp takes opacity from 1 to under 1% in ~8 frames (~130 ms at
 * 60 fps), comfortably inside the 200 ms budget, then the caller snaps
 * the residue to exactly 0 so the layer is fully hidden.
 */
function stepOpacity(s: GlowState, fast: boolean, normal: number) {
  s.op += (s.top - s.op) * (fast ? 0.45 : normal);
  if (fast && s.top === 0 && s.op < 0.02) s.op = 0;
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
    let idleFrames = 0;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        s.mode = 'touch';
        if (s.contact) {
          s.tx = event.clientX;
          s.ty = event.clientY;
        }
        return;
      }
      s.mode = 'mouse';
      s.tx = event.clientX;
      s.ty = event.clientY;
      s.lastMove = performance.now();
      s.inside = true;
    };
    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') return;
      s.mode = 'touch';
      s.contact = true;
      s.inside = true;
      s.tx = event.clientX;
      s.ty = event.clientY;
      // Appear at the touch point, not wherever the last drag ended.
      s.x = event.clientX;
      s.y = event.clientY;
    };
    const onUp = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') return;
      s.mode = 'touch';
      s.contact = false;
      s.inside = false;
    };
    const wake = () => {
      idleFrames = 0;
      if (!raf && !document.hidden) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      raf = 0;
      const touchOff = s.mode === 'touch' && !s.contact;
      if (s.mode === 'touch') {
        s.top = s.contact ? 1 : 0;
      } else {
        s.top = s.inside && performance.now() - s.lastMove < 2600 ? 1 : 0.5;
      }
      const dx = s.tx - s.x;
      const dy = s.ty - s.y;
      s.x += dx * 0.12;
      s.y += dy * 0.12;
      const prevOp = s.op;
      stepOpacity(s, touchOff, 0.06);
      el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) translate(-50%, -50%)`;
      el.style.opacity = s.op.toFixed(3);
      // Perf (2026-11-10): sleep once position and opacity have
      // settled. The mouse branch eases opacity toward a constant
      // 0.5 rest state, so without this the loop ran forever.
      const settled =
        Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05 && Math.abs(s.op - prevOp) < 0.001;
      idleFrames = settled ? idleFrames + 1 : 0;
      if (idleFrames < 20 && !document.hidden) raf = requestAnimationFrame(tick);
    };
    const onMoveW = (event: PointerEvent) => { onMove(event); wake(); };
    const onDownW = (event: PointerEvent) => { onDown(event); wake(); };
    const onUpW = (event: PointerEvent) => { onUp(event); wake(); };
    const onVisibility = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      } else {
        wake();
      }
    };
    window.addEventListener('pointermove', onMoveW, { passive: true });
    window.addEventListener('pointerdown', onDownW, { passive: true });
    window.addEventListener('pointerup', onUpW, { passive: true });
    window.addEventListener('pointercancel', onUpW, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onMoveW);
      window.removeEventListener('pointerdown', onDownW);
      window.removeEventListener('pointerup', onUpW);
      window.removeEventListener('pointercancel', onUpW);
      document.removeEventListener('visibilitychange', onVisibility);
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
    let idleFrames = 0;
    const toLocal = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const lx = event.clientX - rect.left;
      const ly = event.clientY - rect.top;
      return { lx, ly, inside: lx >= 0 && ly >= 0 && lx <= rect.width && ly <= rect.height };
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        s.mode = 'touch';
        if (s.contact) {
          const { lx, ly, inside } = toLocal(event);
          s.inside = inside;
          if (inside) {
            s.tx = lx;
            s.ty = ly;
          }
        }
        return;
      }
      s.mode = 'mouse';
      const { lx, ly, inside } = toLocal(event);
      s.inside = inside;
      if (inside) {
        s.tx = lx;
        s.ty = ly;
        s.lastMove = performance.now();
      }
    };
    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') return;
      s.mode = 'touch';
      s.contact = true;
      const { lx, ly, inside } = toLocal(event);
      s.inside = inside;
      if (inside) {
        s.tx = lx;
        s.ty = ly;
        s.x = lx;
        s.y = ly;
      }
    };
    const onUp = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') return;
      s.mode = 'touch';
      s.contact = false;
      s.inside = false;
    };
    const wake = () => {
      idleFrames = 0;
      if (!raf && !document.hidden) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      raf = 0;
      const touchOff = s.mode === 'touch' && !s.contact;
      if (s.mode === 'touch') {
        s.top = s.contact && s.inside ? 1 : 0;
      } else {
        s.top = s.inside && performance.now() - s.lastMove < 2600 ? 1 : 0;
      }
      const dx = s.tx - s.x;
      const dy = s.ty - s.y;
      s.x += dx * 0.14;
      s.y += dy * 0.14;
      const prevOp = s.op;
      stepOpacity(s, touchOff, 0.08);
      el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) translate(-50%, -50%)`;
      el.style.opacity = s.op.toFixed(3);
      // Perf (2026-11-10): same idle-sleep as PointerGlow — once the
      // layer has faded out or caught up with the pointer, stop.
      const settled =
        Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05 && Math.abs(s.op - prevOp) < 0.001;
      idleFrames = settled ? idleFrames + 1 : 0;
      if (idleFrames < 20 && !document.hidden) raf = requestAnimationFrame(tick);
    };
    const onMoveW = (event: PointerEvent) => { onMove(event); wake(); };
    const onDownW = (event: PointerEvent) => { onDown(event); wake(); };
    const onUpW = (event: PointerEvent) => { onUp(event); wake(); };
    const onVisibility = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      } else {
        wake();
      }
    };
    window.addEventListener('pointermove', onMoveW, { passive: true });
    window.addEventListener('pointerdown', onDownW, { passive: true });
    window.addEventListener('pointerup', onUpW, { passive: true });
    window.addEventListener('pointercancel', onUpW, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onMoveW);
      window.removeEventListener('pointerdown', onDownW);
      window.removeEventListener('pointerup', onUpW);
      window.removeEventListener('pointercancel', onUpW);
      document.removeEventListener('visibilitychange', onVisibility);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="hero-glow" aria-hidden="true" />;
}
