'use client';
import { useEffect, useRef } from 'react';

/**
 * Custom physics cursor — desktop fine pointers only.
 *
 * A single element renders an inline SVG triangle arrow (no tail):
 * a solid ink wedge whose tip is the hotspot. The head POINTS ALONG
 * THE MOUSE'S TRAVEL DIRECTION, driven by real spring physics:
 *  - the rendered point trails the real pointer on the site's
 *    established position spring, so turns arc instead of cornering;
 *  - the heading is read from a smoothed version of that springed
 *    (rendered) velocity — smoothing keeps the position spring's
 *    hard-stop bounce from flipping the heading — and chased by an
 *    UNDERDAMPED angular spring, so on a direction
 *    change the head swings slightly PAST the new heading and
 *    settles back — a paper-plane banking feel, not a motor rotate;
 *  - when the pointer slows below the heading threshold, the
 *    rotation target FREEZES at the last travel heading: the head
 *    keeps pointing the way the mouse was last moving, for the
 *    whole page session. The resting up-left pose is only the
 *    initial pose before the first movement — a page refresh is
 *    what returns the arrow to it (owner rule, 2026-11-03).
 * Scale is state-driven through the existing scale spring:
 *   rest    1 = 21px tall,
 *   hover   ~1.48 = ~31px tall over interactive elements,
 *   press   a quick DIP to 0.8 of the current scale while the mouse
 *           button is held, springing back on release.
 * Fill and stroke come from the theme tokens (--foreground fill,
 * --background stroke), so the arrow flips correctly in dark mode
 * and separates from any surface — no blend modes anywhere (the old
 * difference-blend disc, which inverted to blue over photos, is
 * gone entirely). A soft drop shadow on the element rotates with it.
 *
 * Motion is frame-rate independent: springs integrate with delta
 * time normalised to 60fps units (dt clamped); the angular spring
 * integrates in seconds derived from the same clamped dt.
 *
 * Safety: it initialises only when (pointer: fine) matches and the
 * user has not asked for reduced motion; only then does it add
 * `custom-cursor-on` to <html>, which is what hides the native
 * cursor in globals.css. If this component never mounts, the native
 * cursor is untouched. Text entry keeps the native text cursor and
 * the custom cursor fades out over it. Zones marked
 * data-cursor="native" (the home hero portrait) behave the same
 * way: the custom cursor fades out and globals.css restores the
 * plain native arrow. Transform/opacity only, pointer-events: none,
 * no shared state with PointerGlow or the magnetic buttons.
 */

const INTERACTIVE = 'a, button, [role="button"], [data-cursor], summary, label';
const TEXT_ENTRY = 'input, textarea, select, [contenteditable]';
// Native-cursor zones: the custom cursor fades out here exactly
// as it does over text entry, and the native arrow shows instead.
const NATIVE_ZONE = '[data-cursor="native"]';

// Per-60fps-unit spring constants (position + scale, unchanged feel).
const STIFFNESS = 0.16;
const DAMPING = 0.8;
const SCALE_STIFFNESS = 0.2;
const SCALE_DAMPING = 0.74;
// Arrow geometry: the element is 24x21px (globals.css), matching
// the SVG viewBox 112x98. The tip sits at viewBox (10, 6), i.e. at
// (10/112, 6/98) of the box; CSS transform-origin is set to that
// same point in globals.css, so rotation and scale pivot exactly
// on the tip and the translate only has to offset by the tip's
// pixel position inside the box.
const TIP_X = (10 / 112) * 24; // ~2.14px
const TIP_Y = (6 / 98) * 21; // ~1.29px
// Scale states (1 = the 21px resting height).
const REST_SCALE = 1;
const HOVER_SCALE = 31 / 21; // ~1.476 = ~31px tall
const PRESS_DIP = 0.8; // press = 0.8 of the current (rest/hover) scale
// Heading physics. The sprite's rest heading — the direction the
// tip points, measured from the shape's centroid — is up-left,
// atan2 screen terms ≈ -133.6° ≈ -2.33 rad. The rotation target is
// the shortest angle from that rest heading to the travel heading.
// The heading is read from a SMOOTHED velocity (exponential moving
// average, ~100ms time constant), not the raw spring velocity: the
// position spring overshoots on a hard stop, so the raw velocity
// briefly reverses at several hundred px/s, and following it would
// flip the target 180° and spin the head. Momentum does not care
// about a 100ms bounce — neither does the smoothed heading. The
// engage/release thresholds differ (hysteresis) so the follow
// state cannot chatter near the boundary.
const REST_HEADING = -2.33;
const HEADING_ENGAGE_SPEED = 90; // CSS px/s of smoothed motion
const HEADING_RELEASE_SPEED = 55; // below this, the target freezes
const HEADING_SMOOTHING_TAU = 0.1; // seconds
// Underdamped angular spring, integrated in seconds: stiffness
// ~120/s^2 with damping ratio ~0.6 gives a visible but controlled
// overshoot (roughly 8% of the turn) before the head settles.
const ANGULAR_STIFFNESS = 120;
const ANGULAR_DAMPING = 13.6;

const wrapPi = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

export function CustomCursor() {
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const arrow = arrowRef.current;
    if (!arrow) return;
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
    let rot = 0; // heading offset from the resting pose, radians
    let vRot = 0; // angular velocity, rad/s
    // The rotation target the angular spring chases. While moving it
    // tracks the travel heading; when the pointer stops it keeps its
    // last value (see the owner rule in tick). Starts at 0 — the
    // resting pose — which is where every fresh page load begins.
    let lastRotTarget = 0;
    let svx = 0; // smoothed rendered velocity, px/s
    let svy = 0;
    let headingActive = false;
    let gate = 0; // master visibility: inside the window, not over text entry
    let hovering = false;
    let pressing = false;
    let overText = false;
    let overNative = false;
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
      overNative = Boolean(target?.closest?.(NATIVE_ZONE));
      hovering =
        !overText && !overNative && Boolean(target?.closest?.(INTERACTIVE));
    };
    const onDown = (_event?: PointerEvent) => {
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
      const dtSec = steps / 60;

      // Spring follow: pull, damp, integrate — per axis. The
      // rendered point trails the real pointer; this lag is what
      // makes turns arc, and its velocity is the heading source.
      vx += (tx - x) * STIFFNESS * steps;
      vx *= Math.pow(DAMPING, steps);
      x += vx * steps;
      vy += (ty - y) * STIFFNESS * steps;
      vy *= Math.pow(DAMPING, steps);
      y += vy * steps;

      // Heading: follow the SMOOTHED rendered velocity while it is
      // fast enough to have a meaningful direction.
      const smoothAlpha = 1 - Math.exp(-dtSec / HEADING_SMOOTHING_TAU);
      svx += (vx * 60 - svx) * smoothAlpha; // spring units -> px/s
      svy += (vy * 60 - svy) * smoothAlpha;
      const speed = Math.hypot(svx, svy);
      if (headingActive) {
        if (speed < HEADING_RELEASE_SPEED) headingActive = false;
      } else if (speed > HEADING_ENGAGE_SPEED) {
        headingActive = true;
      }
      // OWNER RULE (2026-11-03): when the mouse stops, the head
      // must STAY pointing along the last direction of travel —
      // it never swings back to the resting pose mid-session, no
      // matter how long the pointer sits idle. Only a page refresh
      // returns it to rest (a fresh mount starts lastRotTarget at
      // 0). So: while moving, the target tracks the travel heading;
      // when the heading disengages, the target freezes at its last
      // value and the angular spring finishes settling into that
      // heading, then holds it indefinitely.
      if (headingActive) {
        lastRotTarget = wrapPi(Math.atan2(svy, svx) - REST_HEADING);
      }
      const rotTarget = lastRotTarget;
      // Underdamped angular spring (semi-implicit Euler): the head
      // swings slightly past the target, then settles.
      vRot +=
        (ANGULAR_STIFFNESS * wrapPi(rotTarget - rot) - ANGULAR_DAMPING * vRot) *
        dtSec;
      rot += vRot * dtSec;

      // Scale spring: press dips to 0.8 of the current state,
      // hover grows, rest is the small arrow.
      const scaleTarget =
        (hovering ? HOVER_SCALE : REST_SCALE) * (pressing ? PRESS_DIP : 1);
      vScale += (scaleTarget - scale) * SCALE_STIFFNESS * steps;
      vScale *= Math.pow(SCALE_DAMPING, steps);
      scale += vScale * steps;

      // Master visibility gate, frame-rate independent fade.
      const gateTarget = inside && !overText && !overNative ? 1 : 0;
      gate += (gateTarget - gate) * (1 - Math.pow(0.75, steps));

      // transform-origin (globals.css) sits on the tip, so rotation
      // and scale pivot there; translate places the tip exactly on
      // the rendered pointer point.
      arrow.style.transform = `translate3d(${(x - TIP_X).toFixed(2)}px, ${(y - TIP_Y).toFixed(2)}px, 0) rotate(${((rot * 180) / Math.PI).toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      arrow.style.opacity = gate.toFixed(3);
      // Perf (2026-11-10): once the springs have fully settled AND
      // the gate is fully closed (pointer outside the window or over
      // a native-cursor zone), stop the loop. In any other state it
      // keeps running, so the visible arrow still tracks the pointer
      // 1:1. Any pointer event restarts it via start().
      const settled =
        Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 &&
        Math.abs(vRot) < 0.0001 && Math.abs(vScale) < 0.001;
      if (settled && gate < 0.01 && !inside) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    let running = false;
    const start = () => {
      if (running) return;
      running = true;
      lastTime = 0;
      raf = requestAnimationFrame(tick);
    };
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        running = false;
      } else {
        start();
      }
    };

    const onMoveW = (event: PointerEvent) => { onMove(event); start(); };
    const onDownW = (event: PointerEvent) => { onDown(event); start(); };
    window.addEventListener('pointermove', onMoveW, { passive: true });
    window.addEventListener('pointerdown', onDownW, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    window.addEventListener('blur', onBlur);
    document.addEventListener('visibilitychange', onVisibility);
    start();

    return () => {
      window.removeEventListener('pointermove', onMoveW);
      window.removeEventListener('pointerdown', onDownW);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('visibilitychange', onVisibility);
      cancelAnimationFrame(raf);
      root.classList.remove('custom-cursor-on');
    };
  }, []);

  return (
    <div ref={arrowRef} className="custom-cursor-arrow" aria-hidden="true">
      <svg viewBox="0 0 112 98" focusable="false">
        <path
          d="M 10 6 C 44 14, 74 30, 102 52 C 84 56, 56 70, 38 92 C 24 66, 14 36, 10 6 Z"
          strokeWidth={5}
          strokeLinejoin="round"
          style={{
            fill: 'var(--foreground)',
            stroke: 'var(--background)',
            paintOrder: 'stroke',
          }}
        />
      </svg>
    </div>
  );
}
