# Architecture Decision Records

Dates use current project initialization date: 2026-10-14. Revisit decisions only with a documented reason and owner approval.

## ADR-001 — Product scope
- **Decision:** New personal portfolio for Abdul Wahid — AI/ML Developer.
- **Options:** Generic developer landing page; portfolio; SaaS product.
- **Why:** Prior discovery established recruiter, technical showcase, research writing, and professional networking goals.
- **Status:** Accepted; content facts still require verification.

## ADR-002 — Stack
- **Decision:** Next.js + TypeScript strict + Tailwind CSS, deployed to Vercel.
- **Options:** Next.js full-stack; React/Vite with separate API; ML-specific stack with FastAPI.
- **Why:** Portfolio is primarily content and static pages; a separate API or model server adds setup and failure points without a current requirement.
- **Status:** Accepted by owner authorization on 2026-10-14.

## ADR-003 — No database/auth in v1
- **Decision:** Use reviewed, version-controlled content files; no database, auth, or storage.
- **Options:** Supabase; Neon; Firebase; CMS.
- **Why:** No visitor accounts, comments, uploads, or persistent contact inbox are required. Fewer services reduce risk within four hours.
- **Status:** Proposed.

## ADR-004 — Contact delivery
- **Decision:** Resend behind a server-side contact route, only if domain/sender setup is feasible.
- **Options:** EmailJS; Resend; Formspree; direct links only.
- **Why:** Keeps credentials server-side and works with Vercel routes. If sender verification blocks testing, direct contact links are the honest fallback.
- **Status:** Accepted as optional integration. Owner selected `contact@abdulwahid.me` as primary and `abdulwahid.connects@gmail.com` as secondary; provider credentials and delivery remain unconfigured.

## ADR-005 — Analytics
- **Decision:** Vercel Analytics, configured conservatively, if terms and privacy expectations are satisfied.
- **Options:** None; Vercel Analytics; privacy-focused external provider.
- **Why:** User selected a hybrid Vercel analytics approach; avoid unnecessary tracking and do not add multiple analytics vendors.
- **Status:** Proposed.

## ADR-006 — GitHub integration
- **Decision:** Core project records are local; GitHub metadata is optional enrichment.
- **Options:** Live API for all projects; manual content only; hybrid.
- **Why:** The portfolio must remain complete during API outage/rate limits and must allow reviewed descriptions and case studies.
- **Status:** Accepted.

## ADR-007 — Design identity
- **Decision:** Minimal/premium and technical hybrid, light/dark theme, black/white base with one warm-orange accent, no gradients/glassmorphism.
- **Options:** Generic AI gradients; highly animated 3D site; restrained evidence-first design.
- **Why:** User explicitly rejected generic AI visuals, excessive effects, clutter, and unsupported claims.
- **Status:** Accepted.

## ADR-008 — Content publishing
- **Decision:** Version-controlled project and article content first; consider CMS only if there is a proven need.
- **Options:** Static files; headless CMS; database admin panel.
- **Why:** User selected hybrid content management; reliable deploys and reviewable changes take priority.
- **Status:** Accepted.

## ADR-009 — Testing
- **Decision:** Vitest for small unit tests; Playwright for critical-path browser test if setup fits time.
- **Options:** Manual only; Vitest; Playwright; both.
- **Why:** Core filtering/validation behavior should be automated, but four-hour scope requires a small test suite.
- **Status:** Proposed.

## Open decisions
- [ ] Confirm project/repository name (suggested: `abdul-wahid-portfolio`; remote repository not created).
- [ ] Confirm control of `abdulwahid.me` and DNS.
- [ ] Confirm solo/team status and any contributors.
- [x] Approve initial public profile facts; churn metrics (84% accuracy, 71% F1, Logistic Regression) owner-confirmed with caveats. LinkedIn-only claims omitted.
- [ ] Confirm license.
- [ ] Recheck official service pricing/terms at implementation time.
