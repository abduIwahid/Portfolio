# 2026-11-22 — Case-study hero actions centred

Change → `.case-actions` in app/globals.css: `justify-content: space-between` → `center`, so the "All projects" button and the GitHub / Visit icon buttons sit together in the middle of the hero instead of split left/right.
Reason → Wadi's screenshot order on the WhyRisk case page (22 Nov): "inhy center allign kro" — the circled actions row.
Affected Area → Every project case-study hero (shared `.case-actions` row on app/projects/[slug]/page.tsx) — one rule, all projects, consistent by construction.
Impact → Actions read as one centred group on mobile and desktop; no other layout changes.
Evidence → Pushed to main; GitHub raw read-back matches; live CSS bundle checked for the centred rule after deploy.
Status → Shipped.
