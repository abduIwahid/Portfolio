# Current State

Portfolio source implementation created on 2026-10-14. Session 03 completed on 2026-10-14 — UI polish, responsive layout, light theme fix, GitHub PFP added, and initial GitHub push.

## Verified
- New Next.js App Router + TypeScript project structure and package manifest exist.
- Responsive home, projects explorer, project case-study routes, writing index/article routes, about, CV, contact, privacy, custom 404, sitemap, and robots source files exist.
- Eight typed project records and two reference-backed technical notes are included; Zod schemas validate project/article content at runtime.
- Theme toggle, keyboard skip link, reduced-motion handling, responsive layouts, and print styles are implemented in source.
- Downloadable two-page CV PDF exists at `public/cv/abdul-wahid-cv.pdf`; reproducible generation script exists at `scripts/generate_cv.py`.
- Contact endpoint uses server-side Zod validation and server-only Resend credentials; UI remains disabled unless required environment variables exist.
- Optional `/api/github` endpoint fetches cached public repository metadata with Zod response validation and a graceful fallback; core content does not depend on it.
- Public claim ledger exists at `brain/claim-ledger.md`.
- `npm test` passed 6/6 on 2026-10-14.
- TypeScript/TSX syntax transpilation passed for 29 files with zero syntax diagnostics.
- Contrast-ratio spot checks passed for primary/muted/accent-ink text pairs (>=5.74:1, WCAG AA).
- **Hero Technical Skills aside panel removed** (session 03).
- **Full `.gitignore` added; `next-env.d.ts` un-tracked** (session 03).
- **Comprehensive responsive CSS** added: edge-to-edge section backgrounds, 4 breakpoints (1280px+, <=1024px, <=900px, <=700px), full mobile collapse (session 03).
- **Default theme fixed to light** — `data-theme="light"` on `<html>`, OS preference no longer overrides (session 03).
- **GitHub PFP added to hero** — animated SVG ring (spinning dashes, counter-rotation, orbiting dot), hover effects, "Available for roles" badge (session 03).
- **All source changes pushed to GitHub** `https://github.com/abduIwahid/Portfolio.git` on `main`. Latest commit: `7eda0b8`.

## Owner-confirmed
- Primary public contact email: `contact@abdulwahid.me`.
- Secondary public contact email: `abdulwahid.connects@gmail.com`.
- Churn project CV metrics (84% accuracy, 71% F1, Logistic Regression selected) approved for use, with evaluation-context caveats.
- Build implementation is authorized.
- LinkedIn-specific claims must be omitted unless independently supported by CV or public GitHub material; the profile link itself may be shown.

## Inferred / proposed
- Owner is using existing `Portfolio` repo at `https://github.com/abduIwahid/Portfolio` (not a new repo).
- `abdulwahid.me` is the intended canonical domain; domain appears linked in Vercel dashboard.
- Resend is the intended optional email provider.

## Unknown / pending
- Vercel build with correct Next.js framework preset: owner was advised to update Framework Preset to Next.js in Vercel dashboard; redeploy not yet confirmed successful by owner.
- Live browser QA of session-03 changes (hero PFP, responsive layout, light theme) not yet verified on production URL.
- Contact provider credentials/sender verification and actual end-to-end email delivery are not configured or verified.
- Domain ownership/DNS access and project license remain unconfirmed in documentation.

## Known limitations / follow-up
- Contact rate limiting is in-memory and best-effort; serverless instances do not share counters.
- Project content is based on public repository descriptions and the owner-provided CV; review each linked repository before using case-study text as formal evidence.
- The Predictly README mentions Gemini Vision alongside local Pillow. Portfolio copy describes local image analysis only.
- CV PDF omits the phone number. Review all dates, credentials, and content before formal job applications.
- GitHub PFP uses `<img>` instead of Next.js `<Image>` to avoid requiring `avatars.githubusercontent.com` in `next.config.ts` remotePatterns. Can be migrated later.
