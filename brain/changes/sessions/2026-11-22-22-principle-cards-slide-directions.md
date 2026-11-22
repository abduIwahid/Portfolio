# Session 22 — Principle cards slide in left / right / left

Date: 2026-11-22

## What Wadi asked
Correcting session 21: the animation belongs on the three
principle CARDS, not the heading — "first left se, then second
right se, phir third left se."

## Changes
- Heading + intro reverted to the plain section-heading inside
  the standard Reveal (session 21's ScrollText application
  removed; components/scroll-text.tsx and its CSS deleted).
- New components/slide-reveal.tsx: directional scroll reveal —
  transparent + slight blur + 56px offset, slides in from its
  side and settles, one shot, IO + CSS like Reveal, reduced
  motion plain.
- The three cards now enter: 1st from LEFT, 2nd from RIGHT,
  3rd from LEFT (index parity). Cards remain the static list
  from session 21 (no stacking).

## Verification (local build, CDP + recording)
- Card 3 waits at translateX(-56px) until it enters; cards 1-2
  settle at identity once visible (2 of 3 visible at the
  section's first stop, third on further scroll).
- Frames inspected: card 2 caught mid-slide (blurred, offset,
  fading) while card 1 sits sharp; later frame both settled.
- npm run build passes.
