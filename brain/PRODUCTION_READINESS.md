# Production Readiness Checklist

Status values: `NOT STARTED`, `SOURCE IMPLEMENTED`, `PASS`, `FAIL`, `N/A`, `BLOCKED`. Source-level checks are not equivalent to a production PASS. Dependency-backed verification is blocked until npm registry access is available.

| Priority | Area | Requirement | Status |
|---|---|---|---|
| MUST | UX | Mobile layout and mobile navigation | SOURCE IMPLEMENTED — browser QA pending |
| MUST | UX | Loading, empty, error, success states | SOURCE IMPLEMENTED — runtime QA pending |
| MUST | UX | Form validation and clear errors | SOURCE IMPLEMENTED |
| MUST | UX | Custom 404 and meaningful external links | SOURCE IMPLEMENTED |
| MUST | UX | Visible hover/focus states; keyboard navigation | SOURCE IMPLEMENTED — accessibility audit pending |
| MUST | UI | Light/dark toggle; sticky header only if useful | SOURCE IMPLEMENTED — browser QA pending |
| MUST | Backend | Server-side input validation | SOURCE IMPLEMENTED — typecheck/build pending |
| MUST | Backend | API keys never exposed to frontend | SOURCE REVIEWED — dependency/build audit pending |
| MUST | Backend | Contact abuse controls and payload bounds | SOURCE IMPLEMENTED — in-memory limit is best-effort only |
| MUST | Security | `.gitignore`, no secrets committed, dependency audit | SOURCE IMPLEMENTED — dependency audit blocked until install |
| MUST | Accessibility | WCAG AA contrast, alt text, skip link | SOURCE IMPLEMENTED — automated/manual contrast audit pending |
| MUST | SEO | Title/description, canonical, OG tags, favicon, sitemap, robots | SOURCE IMPLEMENTED — deployed URL verification pending |
| MUST | Deployment | Preview/production environment separation | BLOCKED — no Vercel project/credentials |
| MUST | Deployment | Production build and smoke test | BLOCKED — npm registry unavailable; no deployment |
| MUST | Content | No fake metrics, fake reviews, or unsupported claims | SOURCE REVIEWED — claim ledger created; owner should final-review |
| MUST | Legal | Privacy notice appropriate to actual data collection; jurisdiction review | SOURCE IMPLEMENTED — owner/legal review pending |
| SHOULD | Auth/account | Signup/login/password reset/email verification/delete account | N/A — no visitor accounts planned |
| SHOULD | UX | Confirmation modals where destructive actions exist | N/A — no destructive user actions planned |
| SHOULD | UX | Copy buttons, FAQ, back-to-top, scroll progress | NOT STARTED; add only if useful |
| SHOULD | Search | Site search across projects/articles | NOT STARTED |
| SHOULD | CV | Print stylesheet and updated/verified date | SOURCE IMPLEMENTED — print/browser QA pending |
| SHOULD | Observability | Vercel Analytics, privacy-reviewed | NOT STARTED |
| SHOULD | Observability | Error tracking | SKIP unless a demonstrated need exists |
| SHOULD | CI | Automated lint/typecheck/test/build check | PARTIAL — source tests pass; lint/typecheck/build not run |
| SHOULD | Ops | Health-check endpoint | SKIP unless deployment needs it |
| SHOULD | Ops | DB backups | N/A — no database |
| SHOULD | Privacy | Data deletion request process | NOT STARTED; no persistent contact storage planned |
| SHOULD | Email | Unsubscribe link | N/A for one-to-one contact notifications; required if marketing email is ever added |
| SHOULD | Legal | Terms page | TBD after owner decides if needed |
| SHOULD | Legal | Cookie consent banner | Only if enabled services require it; verify jurisdiction/provider behavior |
| SKIP-FOR-HACKATHON | Accounts | Visitor accounts/onboarding | SKIP — unnecessary |
| SKIP-FOR-HACKATHON | Payments | Refund policy/hidden fees | N/A — no payments |
| SKIP-FOR-HACKATHON | Kids | Age consent for children's data | N/A — do not collect children's data |
| SKIP-FOR-HACKATHON | UI | Decorative 3D effects or heavy scroll animations | SKIP — performance and usability priority |
| SKIP-FOR-HACKATHON | Infrastructure | Database, queues, background jobs | SKIP — no current requirement |
| SKIP-FOR-HACKATHON | Integrations | Multiple analytics/error tools | SKIP — keep service count low |

**Legal note:** generated privacy/terms text is not legal advice. Verify applicable jurisdiction, data flows, provider terms, and actual tracking behavior before publishing.
