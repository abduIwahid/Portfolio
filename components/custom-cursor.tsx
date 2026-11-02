'use client';
import { useEffect, useRef } from 'react';

/**
 * Custom physics cursor — desktop fine pointers only.
 *
 * A 10px ink dot follows the pointer on a real spring (velocity is
 * pulled toward the target, damped, then integrated), so it trails
 * with a slight overshoot and settle instead of gliding statically.
 * Over interactive elements it springs open into a 60px filled white
 * circle with mix-blend-mode: difference — text and surfaces under
 * it invert (near-black on the paper background, light on dark
 * sections). Pressing compresses it to 0.85 of its current size.
 *
 * Safety: it initialises only when (pointer: fine) matches and the
 * user has not asked for reduced motion; only then does it add
 * `custom-cursor-on` to <html>, which is what hides the native
 * cursor in globals.css. If this component never mounts, the native
 * cursor is untouched. Text entry keeps the native text cursor and
 * the custom cursor fades out over it. Transform/opacity only,
 * pointer-events: none, no shared state with PointerGlow or the
 * magnetic buttons.
 */

const INTERACTIVE = 'a, button, [role="button"], [data-cursor], summary, label';
const TEXT_ENTRY = 'input, textarea, select, [contenteditable]';

const REST_SCALE = 1; // 10px dot
const HOVER_SCALE = 6; // 60px difference circle
const PRESS_FACTOR = 0.85;
const STIFFNESS = 0.2;
const DAMPING = 0.76;
const SCALE_STIFFNESS = 0.22;
const SCALE_DAMPING = 0.72;

export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = document.documentElement;
    root.classList.add('custom-cursor-on');

    let x = -100;
    let y = -100;
    let tx = -100;
    let ty = -100;
    let vx = 0;
    let vy = 0;
    let scale = REST_SCALE;
    let vScale = 0;
    let opacity = 0;
    let hovering = false;
    let pressing = false;
    let overText = false;
    let inside = false;
    let seen = false;
    let raf = 0;

    const onMove = (event: PointerEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      inside = true;
      if (!seen) {
        // First sighting: start on the pointer, not flying in from a corner.
        seen = true;
        x = tx;
        y = ty;
      }
      const target = event.target as Element | null;
      overText = Boolean(target?.closest?.(TEXT_ENTRY));
      hovering = !overText && Boolean(target?.closest?.(INTERACTIVE));
    };
    const onDown = () => {
      pressing = true;
    };
    const onUp = () => {
      pressing = false;
    };
    const onLeave = () => {
      inside = false;
      pressing = false;
    };
    const onBlur = () => {
      inside = false;
      pressing = false;
    };

    const tick = () => {
      // Spring follow: pull, damp, integrate — per axis.
      vx += (tx - x) * STIFFNESS;
      vx *= DAMPING;
      x += vx;
      vy += (ty - y) * STIFFNESS;
      vy *= DAMPING;
      y += vy;

      // The expansion is springed too, with a press multiplier.
      const base = hovering ? HOVER_SCALE : REST_SCALE;
      const targetScale = pressing ? base * PRESS_FACTOR : base;
      vScale += (targetScale - scale) * SCALE_STIFFNESS;
      vScale *= SCALE_DAMPING;
      scale += vScale;

      const targetOpacity = inside && !overText ? 1 : 0;
      opacity += (targetOpacity - opacity) * 0.25;

      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      el.style.opacity = opacity.toFixed(3);
      el.classList.toggle('cursor-active', hovering);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    window.addEventListener('blur', onBlur);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('blur', onBlur);
      cancelAnimationFrame(raf);
      root.classList.remove('custom-cursor-on');
    };
  }, []);

  return <div ref={ref} className="custom-cursor" aria-hidden="true" />;
}
