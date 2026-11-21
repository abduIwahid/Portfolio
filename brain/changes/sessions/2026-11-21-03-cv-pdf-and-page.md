# 2026-11-21-03 — CV.pdf replaced + /cv page mirrored to the new PDF

## What changed
- `public/CV.pdf`: replaced with the owner's updated CV (uploaded by him 2026-11-21; 2 pages A4). The new PDF carries the AXIONS Planner project (replacing Predictly) and the MTM 2026 (V2) Team Lead activity entry. Binary file — replaced via the GitHub web upload flow, verified live by byte size/hash.
- `app/cv/page.tsx`:
  - `CV_PROJECT_SLUGS` now `['medisight-ai', 'axions-planner', 'customer-churn-prediction', 'study-hub']` — mirroring the new PDF's project set and order (WhyRisk → AXIONS → Churn → Study Hub). NearSend and Predictly leave the /cv page; both remain on /projects.
  - `ACTIVITIES` gains the Team AXIONS (V2) entry first, with the Nov 2026 Drive certificate link as proof; the May 2026 entry is labelled (V1) for consistency with the site-wide V1/V2 convention adopted this day.

## Why
The owner updated CV.pdf himself from the details supplied in chat (AXIONS in, Predictly out, on Muse's analysis that the CV should replace rather than grow) and handed the PDF over with the standing instruction that the portfolio CV section is updated after his PDF. This ship completes that sequence.

## Verification
- New PDF inspected before deploy (2 pages, AXIONS present, Predictly absent, V2 activity present).
- Production build passes; local /cv check (4 projects in order, V2 activity first with proof link).
- Live check after deploy: /cv content + live /CV.pdf byte-identical to the owner's file.
