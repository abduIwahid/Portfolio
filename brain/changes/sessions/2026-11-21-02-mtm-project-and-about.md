# 2026-11-21-02 — MTM Hackathon '26 project + About participation entry

## What changed
- `app/page.tsx`: `HOME_PROJECT_SLUGS` gains `axions-planner` directly after `medisight-ai` (the home grid is a curated slug list, not the `featured` flag).
- `content/projects.ts`: new full project entry **AXIONS Planner** (slug `axions-planner`, Applied AI, featured) inserted directly after WhyRisk — summary, problem, role, status, stack, 4 highlights, 3 approach steps, 4 evidence items, 2 limitations, repo + live demo links. All figures from the verified build record (sample pack Rs 547,400 of Rs 650,000, 6/6 checks, ≈5 s run, 23/23 offline tests, gpt-oss-20b via Groq). The judging-pack venue miss (5/6) is stated plainly in limitations, in the site's honest-evidence style.
- `content/profile.ts`: new first entry in `activities` — "Team Lead & Presenter, Team AXIONS · MTM Hackathon '26 · GDG On Campus CUI Wah · November 2026" with the owner's Drive certificate link as `proof` (renders as "Participation certificate" on /about, same as the May 2026 MTM entry).

## Why
Owner asked to add the hackathon project to the portfolio's project section and to update the About section with the MTM Hackathon '26 participation, in the same format as the existing entries. Copy was previewed as an in-chat image and approved ("han kr do, jesy same format mai pehly han na wesy hi hissab se kr do").

## Related work (same round, other repos)
- The participation certificate was filed in the owner's Certificates repo as `mtm-hackathon-26/` (image + README in that repo's format; root index updated, total now 4), and the Drive proof link was wired into both READMEs there before this ship.
- The /cv page is deliberately NOT updated in this round: the owner is updating CV.pdf himself first (details supplied in chat), and the portfolio CV section follows after he hands the PDF over.

## Verification
- Production build (includes the zod content-schema parse) — production build passes (zod content-schema parse included); local page + width checks pass; live check after deploy.
- Local checks: home featured grid (5 cards incl. AXIONS), /projects listing + `/projects/axions-planner` detail page, /about timeline first entry with proof link; width matrix spot checks.
- Live check after deploy.

## Addendum — V1/V2 versioning (owner's instruction, same round)
With two MTM participations on record, the owner asked for them to be saved as Version 01 (V1) and Version 02 (V2): May 2026 = **V1**, November 2026 = **V2**. Applied in this ship: AXIONS kind/status carry "(V2)"/"Hackathon V2"; the Smart Doctor Connect evidence now reads "MTM V1 … (V1), May 2026"; both About activity entries carry (V1)/(V2). The Certificates repo folders were renamed to `mtm-hackathon-v1` / `mtm-hackathon-v2` in the same round.
