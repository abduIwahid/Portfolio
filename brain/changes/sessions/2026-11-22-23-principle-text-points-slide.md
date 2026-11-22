# Session 23 — Principles as bare text points, sliding per his code

Date: 2026-11-22

## What Wadi asked
Third pass on the section, in his words: "pury pury cards
nahi, cards htao, just text pe kam kro — yahan 3 points han,
sirf text slide ho left right side se, jesy btaya, or wo uper
bheja wa code ke hissab se."

## Changes
- Cards REMOVED entirely: no paper chrome, no borders. The
  three principles are bare centred text points (accent tick,
  title, body), spaced down the section.
- components/scroll-text.tsx returns, now with the direction
  prop from the supplied demo code: each point's title AND
  body words slide in from its side — point 1 LEFT, point 2
  RIGHT, point 3 LEFT — blur(10px) resolving word by word
  (~80ms stagger), one shot, zero-dependency IO + CSS.
- Session 22's SlideReveal and the card CSS are deleted.
- Caught in verification: a plain space inside an inline-block
  word span collapses, jamming words together; the separator
  is an explicit \u00A0 (the demo's &nbsp;), re-checked in
  frames before shipping.

## Verification (local build, recordings + frames)
- Mid-animation frame: earlier words sharp, later words still
  blurred/offset; final frame: all three points fully settled
  with correct spacing, no card chrome anywhere.
- npm run build passes.
