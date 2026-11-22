# Session 19 — Ledger extended to Education, Credentials, Community

Date: 2026-11-22

## What Wadi asked
After session 18: "ye same tareeka Education, credentials or
community ke lia bhi apply kro."

## Changes (app/about/page.tsx + .exp-* CSS additions)
- Education: full three-column ledger. Identity = institution in
  Anton, degree as the accent tagline, period, metric rail
  (3.46 CGPA / 4.00; 75.2% ICS marks · 827 / 1100). Metadata =
  Program / Institution / Campus / Status. Contributions column
  = his detail line verbatim.
- Credentials: slim two-column ledger (.exp-item-slim) — the
  entries carry no contribution text, so identity (title, issuer
  tagline, period) + a three-across metadata grid (Issuer /
  Issued / Verification link). Replaces the credential cards.
- Community: same slim ledger — organization in Anton, role as
  tagline, period; metadata = Role / Organization / Evidence
  (participation-certificate link only where a proof exists).
- All wording and figures come verbatim from content/profile.ts;
  derived labels (Campus, Status, metric labels) restate his own
  data. The .timeline and .credential-card CSS is now unused by
  the About page (left in place, harmless).

## Verification (local build, screenshots)
- Desktop 1150 screenshots of all three sections + Community at
  390: ledger rhythm consistent with Experience, no overflow
  (metadata grids collapse to one column under 560px as before).
- npm run build passes.
