# Session 2026-11-10-06 — Working principles title: Option 1 fonts

## Goal / request
Wadi circled the home "Working principles" cards and asked for the
section's text treatment improved, preview first. After clarification
his ask was the FONT, not the wording: "jo portfolio mai fonts use
hue we han wohi use kro, jo best lagy yahan ke lia, taky alignment
rahy". Three aligned previews were delivered as chat images (Current /
Option 1 Anton + serif line / Option 2 Archivo + serif accent /
Option 3 serif card titles); he picked **Option 1** ("1").

## What was done
- `app/page.tsx`: the Working principles `<h2>` now carries
  `.principles-title` with two spans — `.pt-solid` "Useful beats" and
  `.pt-serif` "impressive-looking." Wording unchanged.
- `app/globals.css`: scoped `.principles-title` block appended —
  line 1 Anton uppercase (the hero's `--font-display`), line 2
  Instrument Serif italic lowercase with the `.hg-serifline` fade
  recipe (gradient-clip + 0.45 opacity + muted fallback). Fluid
  clamp() sizes (serif 1.163× Anton, the hero's measured proportion),
  both lines nowrap: the old Archivo heading hyphen-broke
  "impressive-looking." at phone width; this cannot. Alignment
  preserved — the section-heading is already a centred column and the
  title is a centred flex column; cards untouched.

## Decisions
- Scoped to this single heading: the owner's consistency rule says a
  treatment applies to all sibling surfaces, but his explicit pick
  here was for THIS section; other section headings keep Archivo
  until he asks. Noted as a deliberate, stated-reason exception.
- Anton size capped at 44px (not hero scale) so the block stays a
  section title; serif ratio locked to the hero's 13.02/11.2.

## Status
Done — build gates + live verification recorded in changelog.
