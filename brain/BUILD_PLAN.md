# Build Plan — Portfolio Upgrade

This plan adapts the supplied four-hour schedule to a static portfolio improvement sprint. There is no hackathon team or application backend in the current repository. Do not force database/auth tasks onto this project.

## Timeboxed plan
| Time | Task | Owner | Done when |
|---|---|---|---|
| 0:00–0:20 | [ ] Audit repository, current production routes, Vercel domains, baseline screenshots | Owner/Planner | Current-state facts and blockers recorded |
| 0:20–0:40 | [ ] Confirm scope, URL destinations, content evidence, and design tokens | Owner | PRD decisions accepted; unknowns marked TBD |
| 0:40–1:10 | [ ] Test `/cv` and existing external links; preserve existing deployment | Builder | Route results recorded; no changes to app yet if docs-only phase |
| 1:10–2:00 | [ ] Implement approved short redirects and shared navigation/pages | Builder | MUST routes work on desktop/mobile |
| 2:00–2:30 | [ ] Populate only verified project, experience, certificate content | Owner + Builder | No invented claims; links verified |
| 2:30–3:00 | [ ] Responsive, accessibility, error/empty states and SEO polish | Builder + Reviewer | Core manual checklist passes |
| 3:00 | **Dependency/config freeze** | All | No new package/service/config architecture without approval |
| 3:00–3:15 | [ ] Confirm real content and test links before release | Owner | No fake placeholders presented as complete |
| 3:15–3:30 | [ ] Production-readiness MUST checks | Reviewer | No known critical route or mobile issue |
| 3:30–3:40 | [ ] Record 60–90 second fallback demo/screenshots | Owner | Local recording exists if live deployment fails |
| 3:40–4:00 | [ ] Deploy, smoke test, rehearse walkthrough, update docs | Owner + Reviewer | Production verified; rollback path known |

## Phase reporting
At each phase end, report: **on track / behind / cut list applied**, blockers, and next action.

## Cut list (first dropped)
1. Analytics/UTM tracking.
2. Dark mode toggle if current theme already exists.
3. Search, scroll progress, back-to-top, floating contact control.
4. Portfolio PDF generation.
5. Blog search/tags beyond simple categories.
6. Any backend, database, auth, CMS, or email form.
7. Animations that do not improve clarity.

## Team/folder ownership
Current project is treated as solo-maintained unless the owner confirms otherwise.
- Planner: docs and scope.
- Builder: one isolated implementation task at a time.
- Reviewer: route, content, accessibility, security checks.
- Avoid simultaneous edits to `index.html`, `vercel.json`, or shared styles.

## Scope-cut rule
If any phase runs more than 20% over budget, cut SHOULD/COULD items in the order above. Keep the existing production site working; don't sacrifice the CV route or mobile navigation for polish.
