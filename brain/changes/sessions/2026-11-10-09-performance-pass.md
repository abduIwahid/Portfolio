# Session 2026-11-10-09 — Performance pass (lag fix)

## Goal / request
Wadi: the portfolio feels laggy on his iPhone 8 Plus — "kahi pe atak
jata hai, smooth animation nahi ati". Diagnosis delivered from the
code; he approved the fix ("han kro").

## Audit findings
Always-on or eager rAF work: PointerGlow (permanent loop, never
settles — it eases opacity toward a constant 0.5 rest state),
HeroGlow (permanent loop on home + about), CustomCursor (permanent
spring loop, desktop fine-pointer only), BackToTop (permanent rAF
polling window.scrollY just for a >600px check). Already healthy and
left untouched: Lenis loop (required while it runs; touch not
smoothed by design), ScrollProgress + header (scroll-event driven),
PrinciplesStack + TextMarquee (IntersectionObserver-gated),
IntroLoader (self-terminating), MagneticButtons (event-driven,
fine-pointer only), GitHub chart animation (one-shot),
DotsField (404 only, IO-gated).

## What was done
- pointer-glow.tsx (both layers): loop now sleeps after ~20 settled
  frames (position + opacity converged) and wakes on the next
  pointer event; also pauses while the tab is hidden. Behaviour
  identical — the glow is static exactly when it used to redraw the
  same frame forever.
- custom-cursor.tsx: loop stops only when every spring has settled
  AND the gate is fully closed (pointer outside the window); any
  pointermove/pointerdown restarts it. Visible-arrow feel unchanged
  (desktop only anyway).
- back-to-top.tsx: permanent rAF poll replaced by a passive scroll
  listener + mount/resize sync. Same visibility rule (>600px);
  Lenis's animated scroll-to-top fires real scroll events, so the
  known stale-state failure mode the rAF version guarded against
  does not apply.
- globals.css: on (pointer: coarse) the two glow layers are
  display:none — the finger covers them while scrolling; their
  1200px/900px radial gradients no longer repaint per scroll frame
  on phones. Desktop unchanged.

## Status
Done — build gates + live verification in changelog. The final
smoothness judgement is Wadi's phone check.
