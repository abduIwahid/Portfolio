# Current State

Portfolio source implementation created on 2026-10-14. The repository is a fresh implementation and retains the documentation brain.

## Verified
- New Next.js App Router + TypeScript project structure and package manifest exist.
- Responsive home, projects explorer, project case-study routes, writing index/article routes, about, CV, contact, privacy, custom 404, sitemap, and robots source files exist.
- Eight typed project records and two reference-backed technical notes are included; Zod schemas validate project/article content at runtime. The model-evaluation article includes a synthetic, local confusion-matrix metric playground.
- Theme toggle, keyboard skip link, reduced-motion handling, responsive layouts, and print styles are implemented in source.
- Downloadable two-page CV PDF exists at `public/cv/abdul-wahid-cv.pdf`; reproducible generation script exists at `scripts/generate_cv.py` and the PDF was visually inspected after rendering.
- Contact endpoint uses server-side Zod validation and server-only Resend credentials; UI remains disabled unless required environment variables exist.
- Optional `/api/github` endpoint fetches cached public repository metadata with Zod response validation and a graceful fallback; core content does not depend on it.
- Public claim ledger exists at `brain/claim-ledger.md`.
- `npm test` passed 6/6 tests on 2026-10-14.
- TypeScript/TSX syntax transpilation passed for 29 files with zero syntax diagnostics.
- Contrast-ratio spot checks for primary/muted/accent-ink text pairs in light and dark tokens exceeded WCAG AA minimums (normal-text pairs checked: 5.74:1 or better).

## Owner-confirmed
- Primary public contact email: `contact@abdulwahid.me`.
- Secondary public contact email: `abdulwahid.connects@gmail.com`.
- Churn project CV metrics (84% accuracy, 71% F1, Logistic Regression selected) approved for use, with evaluation-context caveats.
- Build implementation is authorized.
- LinkedIn-specific claims must be omitted unless independently supported by CV or public GitHub material; the profile link itself may be shown.

## Inferred / proposed
- Suggested new repository name: `abdul-wahid-portfolio` (not created remotely).
- `abdulwahid.me` is the intended canonical domain based on profile materials; ownership/DNS access is still not confirmed in this workflow.
- Resend is the intended optional email provider.

## Unknown / pending
- Package installation could not complete in this environment because npm registry access timed out.
- Next production build, dependency-backed typecheck/lint, browser testing, accessibility audit, and Lighthouse metrics are not verified.
- Local Git repository initialized on `main`; initial implementation commit: `4aa093e`. No GitHub remote repository has been created or pushed.
- No Vercel project/deployment has been created or smoke-tested.
- Contact provider credentials/sender verification and actual end-to-end email delivery are not configured or verified.
- Domain ownership/DNS access and project license remain unconfirmed.

## Known limitations / follow-up
- Contact rate limiting is in-memory and best-effort; serverless instances do not share counters. Use shared rate limiting or platform protection before relying on it in production.
- Project content is based on public repository descriptions and the owner-provided CV; review each linked repository before using case-study text as formal evidence.
- The Predictly README contains an internal mention of Gemini Vision alongside local Pillow image processing. Portfolio copy deliberately describes local image analysis and does not claim a Gemini integration.
- CV PDF omits the phone number. Review all dates, credentials, and content before formal job applications.
