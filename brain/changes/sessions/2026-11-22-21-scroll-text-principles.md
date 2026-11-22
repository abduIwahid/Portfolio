# Session 21 — Scroll-text on Working principles; stacking removed

Date: 2026-11-22

## What Wadi asked
Wadi supplied the UI Layouts scroll-text demo and a screenshot
of the home Working principles section: "ye scroll text effect
is jagha pe apply kro or ye stacking wala rule hta do."

## Changes
- New components/scroll-text.tsx: the block's mechanism (words
  resolve from blur(10px) + transparent + 20px low, ~90ms stagger,
  one shot on entering the viewport) rebuilt on the site's
  zero-dependency IO + CSS pattern — no motion package. Reduced
  motion renders the text plainly.
- Applied to the section's heading ("Useful beats
  impressive-looking.") and its intro line on the home page.
- Stacking REMOVED: components/principles-stack.tsx deleted, the
  sticky .principle-stack-wrap CSS and the scale/dim driver are
  gone. The three cards keep their exact paper chrome (tick,
  title, copy, min-height) as a static list with the site's
  standard Reveal entrances. (This reverses the 2026-11-02
  stacking order at the owner's explicit instruction.)

## Verification (local build, CDP + recording)
- All 22 animated words reach opacity 1 after scroll-in.
- A 300px scroll moves the first card exactly 300px with
  transform: none — no sticking, no scaling.
- Mid-animation frame inspected: heading sharp, intro words
  resolving left-to-right in sequence.
- npm run build passes.
