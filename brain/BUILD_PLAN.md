# Four-Hour Build Plan

**Owner:** Abdul Wahid (solo by default; confirm team size).  
**Current status:** Source implementation created; dependency install and production verification pending.

| Time | Task | Owner | Done when |
|---|---|---|---|
| 0:00–0:20 | Create repo, install chosen stack, create accounts/env placeholders, deploy an EMPTY app to Vercel first | Owner | Empty production deployment is reachable; no secrets committed | **Blocked** — remote repo/deployment unavailable in this environment.
| 0:20–1:00 | Define content schemas, route skeletons, typed local fixture content, content validation | Owner | Build renders routes from local content; invalid fixture fails validation | **Source complete; build unverified**.
| 1:00–1:30 | Build homepage, navigation, theme toggle, design tokens, responsive layout | Owner | Homepage works at mobile/desktop; focus and contrast checked | **Source complete; browser QA pending**.
| 1:30–2:30 | Build project directory + search/filter + case study page; add verified featured content | Owner | Demo-critical path works end-to-end with local data | **Source complete; runtime verification pending**.
| 2:30–3:00 | Add CV page/print, blog index/article template, contact form validation; polish | Owner | MUST routes exist with loading/error/empty states; no fabricated content | **Source complete; contact delivery disabled until configured**.
| **3:00** | **DEPENDENCY FREEZE** | Owner | No new package/service without explicit human approval |
| 3:00–3:15 | Finalize approved content, seed local records if needed, test contact delivery | Owner | Demo content ready by 3:15; contact path is tested or clearly fallback-only |
| 3:15–3:30 | Production-readiness MUSTs, mobile check, 404, metadata, error/empty/loading states | Owner | Critical checklist complete; issues recorded |
| 3:30–3:40 | Record 60–90 second fallback demo | Owner | Video exists locally and demonstrates working path |
| 3:40–4:00 | Final deploy, smoke test, rehearse, write submission summary | Owner | Production URL verified; fallback demo ready |

## Phase reporting
At the end of each phase, report exactly one:
- **On track** — phase criteria met.
- **Behind** — identify blocker and time impact.
- **Cut list applied** — state what was removed and why.

## Scope-cut rule
If a phase runs more than 20% over its budget, remove SHOULD/COULD work before extending the schedule. Preserve a working deployment.

## Cut list (drop in this order)
1. Fancy motion/scroll effects.
2. Dynamic GitHub API enrichment (keep local repository links).
3. Advanced blog search and table of contents.
4. Role-specific generated CV variants (retain one verified CV and print layout).
5. Contact provider integration if domain/sender verification blocks it (retain direct contact links).
6. Interactive demos that need new services.
7. Any optional UI library beyond the chosen minimal stack.

Never cut: core project explorer/case-study path, mobile layout, input validation, accurate content, deployed app, critical smoke test.

Implementation note (2026-10-14): Optional cached GitHub metadata widget and a synthetic confusion-matrix metric playground are present in source. Both require runtime/browser verification after dependencies can be installed.

## Mock-first
- Build pages using local typed content and approved fixtures.
- Add external integrations only after the main user path is stable.
- Do not use fabricated results or screenshots as real project evidence.

## Team split if more than one person
- Person A: shell, tokens, navigation, homepage.
- Person B: content schemas, project explorer, case study.
- Person C: CV/blog/contact integration and tests.
- Integrate through typed interfaces; no simultaneous edits to shared shell files.
