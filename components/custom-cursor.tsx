'use client';
import { useEffect, useRef } from 'react';

/**
 * Custom physics cursor — desktop fine pointers only.
 *
 * Two full-size elements, never an upscaled raster:
 *  - a 10px ink dot that follows the pointer on a spring, and
 *  - a separate 64px white circle (mix-blend-mode: difference) that
 *    springs from scale 0.15 / opacity 0 up to scale 1 over
 *    interactive elements, so text and surfaces under it invert
 *    (near-black on the paper background, light on dark sections).
 *    Because the circle's base size is its full 64px, scaling to 1
 *    stays vector-crisp — the old single 10px element scaled 6x
 *    rendered pixelated under the blend.
 * The dot fades out as the circle springs in. Pressing compresses
 * the active element to 0.85 of its size.
 *
 * Motion is frame-rate independent: the springs integrate with
 * delta time normalised to 60fps units (dt clamped), so the feel
 * is identical on 60Hz and 144Hz displays. Sub-pixel transforms.
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

const PRESS_FACTOR = 0.85;
// Per-60fps-unit spring constants.
const STIFFNESS = 0.16;
const DAMPING = 0.8;
const SCALE_STIFFNESS = 0.2;
const SCALE_DAMPING = 0.74;
const CIRCLE_REST_SCALE = 0.15;
const CIRCLE_HOVER_SCALE = 1;

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const circle = circleRef.current;
    if (!dot || !circle) return;
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
    let circleScale = CIRCLE_REST_SCALE;
    let vCircleScale = 0;
    let dotScale = 1;
    let vDotScale = 0;
    let gate = 0; // master visibility: inside the window, not over text entry
    let hovering = false;
    let pressing = false;
    let overText = false;
    let inside = false;
    let seen = false;
    let raf = 0;
    let lastTime = 0;

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

    const tick = (time: number) => {
      // Delta time in 60fps units, clamped so a stalled frame or a
      // background-tab return can never teleport the springs.
      const dtMs = lastTime ? time - lastTime : 16.7;
      lastTime = time;
      const steps = Math.min(Math.max(dtMs / 16.7, 0), 3);

      // Spring follow: pull, damp, integrate — per axis.
      vx += (tx - x) * STIFFNESS * steps;
      vx *= Math.pow(DAMPING, steps);
      x += vx * steps;
      vy += (ty - y) * STIFFNESS * steps;
      vy *= Math.pow(DAMPING, steps);
      y += vy * steps;

      // Circle expansion spring, with the press multiplier.
      const circleTarget =
        (hovering ? CIRCLE_HOVER_SCALE : CIRCLE_REST_SCALE) *
        (pressing && hovering ? PRESS_FACTOR : 1);
      vCircleScale += (circleTarget - circleScale) * SCALE_STIFFNESS * steps;
      vCircleScale *= Math.pow(SCALE_DAMPING, steps);
      circleScale += vCircleScale * steps;

      // Dot press spring (the dot is the active element at rest).
      const dotTarget = pressing && !hovering ? PRESS_FACTOR : 1;
      vDotScale += (dotTarget - dotScale) * SCALE_STIFFNESS * steps;
      vDotScale *= Math.pow(SCALE_DAMPING, steps);
      dotScale += vDotScale * steps;

      // Master visibility gate, frame-rate independent fade.
      const gateTarget = inside && !overText ? 1 : 0;
      gate += (gateTarget - gate) * (1 - Math.pow(0.75, steps));

      // How far the circle has sprung open (0 at rest, 1 fully open):
      // the dot hands over to the circle as it opens.
      const open = Math.min(
        Math.max(
          (circleScale - CIRCLE_REST_SCALE) /
            (CIRCLE_HOVER_SCALE - CIRCLE_REST_SCALE),
          0,
        ),
        1,
      );

      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${dotScale.toFixed(3)})`;
      dot.style.opacity = (gate * (1 - open)).toFixed(3);
      circle.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${circleScale.toFixed(3)})`;
      circle.style.opacity = (gate * open).toFixed(3);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      lastTime = 0;
      raf = requestAnimationFrame(tick);
    };
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        start();
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    window.addEventListener('blur', onBlur);
    document.addEventListener('visibilitychange', onVisibility);
    start();

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('visibilitychange', onVisibility);
      cancelAnimationFrame(raf);
      root.classList.remove('custom-cursor-on');
    };
  }, []);

  return (
    <>
      <div ref={circleRef} className="custom-cursor-circle" aria-hidden="true" />
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
    </>
  );
}
