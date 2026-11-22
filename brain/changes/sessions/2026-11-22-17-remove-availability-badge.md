# Session 17 — "Available for Opportunities" badge removed

Date: 2026-11-22

## What Wadi asked
"available for opportunities ka tag hta do — home or about dono
jagho se."

## Changes
- The badge span removed from both hero portrait units
  (app/page.tsx, app/about/page.tsx). No other page carried it.
- The badge rules added in session 15 (.hero-portrait .hero-badge
  and its mobile override) removed from the appended hero section;
  the section comment updated. The legacy .pfp-badge base styles
  remain in the file but are now unused.
- Nothing else moved: portrait, headline, copy, actions unchanged.

## Verification (local build, screenshots)
- Home desktop and About mobile re-shot: no badge anywhere, hero
  layout otherwise identical to session 15's verified state.
- npm run build passes.
