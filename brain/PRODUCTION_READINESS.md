# Production Readiness Checklist

Status values: **PASS**, **FAIL**, **TBD**, **N/A**. Current statuses describe only what can be established from the supplied repository snapshot, not production.

| Priority | Item | Status | Notes |
|---|---|---|---|
| MUST | Homepage and existing pages load | TBD | Verify production and local behavior |
| MUST | CV route works without loops | PARTIAL | `/cv` redirect exists in `vercel.json`; production unverified |
| MUST | Correct profile destinations | TBD | Source contains profile links; test each destination |
| MUST | Mobile layout and menu | TBD | Must test real viewport sizes |
| MUST | No secrets committed | TBD | Inspect complete repository and history before claiming |
| MUST | Input validation for any form | N/A/TBD | No backend/form behavior assumed; audit current contact UI |
| MUST | No unsupported claims/fake testimonials | TBD | Verify every visible claim |
| MUST | Licensed assets/fonts | TBD | Review existing third-party assets and licenses |
| MUST | Keyboard navigation/focus/alt text | TBD | Accessibility audit required |
| MUST | SEO title/description and canonical URL | TBD | Inspect actual HTML and deployed headers |
| MUST | Favicon and valid page metadata | TBD | Verify assets and markup |
| MUST | Direct routes and refresh work | TBD | Depends on routes implemented |
| MUST | Production smoke test | TBD | Must be performed after deploy |
| SHOULD | Custom 404 page | TBD | Add if supported cleanly by current architecture |
| SHOULD | Sitemap and robots.txt | TBD | Include only real canonical pages |
| SHOULD | CI check | SKIP-FOR-HACKATHON | No build pipeline; add only if maintenance justifies |
| SHOULD | Error tracking | SKIP-FOR-HACKATHON | Static site; avoid extra service for now |
| SHOULD | Analytics and UTM tracking | SKIP-FOR-HACKATHON | Requires privacy decision and service |
| SHOULD | Dark mode toggle | TBD | Current page appears dark; avoid redundant toggle |
| SHOULD | Search, scroll progress, back-to-top | SKIP-FOR-HACKATHON | Lower priority than core routes/content |
| SHOULD | Print stylesheet | TBD | Useful but secondary |
| SKIP-FOR-HACKATHON | Auth, password reset, delete account | N/A | Public static portfolio has no accounts |
| SKIP-FOR-HACKATHON | Database backups/RLS | N/A | No database |
| SKIP-FOR-HACKATHON | Payments/refund policy | N/A | No commerce |
| SKIP-FOR-HACKATHON | Cookie consent banner | TBD | Depends on actual tracking/cookies; do not add a fake consent banner |
| SKIP-FOR-HACKATHON | Age consent for children's data | N/A | No such data collection intended |
| MUST | Data minimization and contact consent | TBD | Audit current contact mechanisms |
| MUST | No dark patterns/hidden fees | PASS (scope) | No payment flows in current scope |
| MUST | Dependencies and external SDK audit | TBD | External assets/API calls need review |
| MUST | Environment separation | N/A | No env vars currently required |
| MUST | Health endpoint | SKIP-FOR-HACKATHON | Static site; provider status/deployment check is sufficient |
