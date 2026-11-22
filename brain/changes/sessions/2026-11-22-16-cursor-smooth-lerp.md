# Session 16 — Cursor physics: springs replaced with SmoothFollower-style lerps

Date: 2026-11-22

## What Wadi asked
Wadi supplied a SmoothFollower cursor component (UI Layouts) and
asked for ITS follow/physics on the existing cursor: "ye smooth
hai zyada — abhi purany waly cursor mai smoothness nahi hai,
thora bouncy sticky sa effect hai." The arrow itself stays.

## Changes (components/custom-cursor.tsx only)
- Position: the underdamped position spring (0.16 / 0.8) is now a
  pure exponential lerp at the reference's dot rate, 0.20 per
  60fps unit, frame-rate independent via 1-(1-k)^steps. A lerp
  cannot overshoot, so the drag-and-snap "sticky bounce" is gone.
- Heading: the underdamped angular spring (120 / 13.6, ~8%
  overshoot by design) is gone. The target still comes from the
  smoothed rendered velocity with the same engage/release
  hysteresis, and the 2026-11-03 owner rule is unchanged (head
  keeps the last travel heading when the mouse stops; only a
  refresh returns it to rest) — but the target is now chased by
  an angle lerp (0.12), so turns settle with no pass-past swing.
- Scale: the scale spring is now a 0.22 lerp toward the same
  state targets (rest 1, hover ~1.476, press dip 0.8).
- Everything else is untouched: the SVG arrow and its theme-token
  colours, fine-pointer + reduced-motion gating, text-entry and
  data-cursor="native" fade-outs, the idle-stop perf loop (its
  settled test now reads lerp distances instead of spring
  velocities), and the magnetic buttons (separate component).

## Verification (CDP, local build, real mouse events)
- Jump 200 -> 800px: rendered x monotonic 197.9 -> 797.9,
  overshoot -0.04px (none), exact landing.
- Heading after rightward travel: settles at +133.5 deg with
  zero direction flips (no oscillation) and holds at rest.
- Hover scale over a nav link: 1.000 -> 1.476, max 1.476 — never
  exceeds the target (the old spring overshot).
- tsc + production build pass.
  (Headless shell reports pointer:none, so the test forced
  (pointer: fine) via a matchMedia shim injected before load;
  the component and its physics under test were unmodified.)
