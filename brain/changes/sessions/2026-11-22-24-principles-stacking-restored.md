# Session 24 — Working principles: stacking restored

Date: 2026-11-22

## What Wadi asked
After seeing sessions 21-23 live: "ye nahi acha, isy wapis
stacking rule pr hi le jao."

## Changes
- The stacking system is restored exactly as it stood before
  session 21: components/principles-stack.tsx recreated
  verbatim (sticky shells, 14px peek step, scale/dim rAF
  driver), the original stack CSS block restored, and the
  section markup back to <PrinciplesStack />.
- Sessions 21-23's scroll-text / slide-reveal / text-points
  code and CSS are fully removed (components/scroll-text.tsx
  deleted).

## Verification (local build, CDP)
- 3 cards; wrap position sticky; first card pinned at the
  64px header offset with the covered-scale applied (0.9475)
  and the second card peeking 14px below it — the original
  behaviour, numerically.
- npm run build passes.
