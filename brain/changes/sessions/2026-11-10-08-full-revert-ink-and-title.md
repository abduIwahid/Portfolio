# Session 2026-11-10-08 — Full revert: ink toggle + principles title

## Goal / request
Two orders from Wadi within a minute of the Option 1 title going
live: (1) "or toggle wala sab purany pe hi le jao, ye acha nahi lag
rha" — take EVERYTHING about the theme toggle back to the old
behaviour; the ink-bleed does not look good. (2) On the principles
title, after seeing it live he had already said the Anton treatment
looked too big/squeezed; with the toggle revert he confirmed the
whole evening's experiment goes — heading back to the original
Archivo too. The size/spacing fix prepared in session
2026-11-10-07 was therefore never shipped (superseded by this
revert before its push).

## What was done
- `components/theme-toggle.tsx`: rewritten to the pre-ink instant
  flip (data-theme + localStorage + icon swap). Both ink renderers
  (WebGL v1, DOM clip-path v2) and all their helpers removed.
- `app/globals.css`: `.ink-bleed-overlay` block and the whole
  `.principles-title` block removed.
- `app/page.tsx`: Working Principles `<h2>` back to the plain
  original markup ("Useful beats impressive-looking.", Archivo).

## Decisions / standing notes
- The ink-bleed theme transition is REJECTED by the owner (like the
  footer wordmark before it): do not re-propose it. Same for the
  Anton section-title treatment.
- Separately, Wadi asked why the portfolio feels laggy on his phone
  (animations stall mid-scroll). Cause identified from the code (not
  yet fixed — awaiting his go): up to eight always-on rAF systems
  (two pointer-glow layers, custom cursor, magnetic buttons,
  back-to-top loop, principles stack, intro loader, header progress)
  run at once on an iPhone 8 Plus (A11); several keep looping while
  nothing moves, and scrolling repaints large soft shadows. Proposed
  fix: idle-stop the loops, pause off-screen ones, and disable the
  pointer-only effects entirely on touch devices.
