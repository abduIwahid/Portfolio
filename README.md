# Abdul Wahid — AI/ML Developer Portfolio

An evidence-first portfolio for AI/ML projects, technical case studies, research-informed writing, experience, education, and contact. Built as a fresh implementation using Next.js App Router, TypeScript, Tailwind CSS, Lucide icons, Zod, and an optional server-side Resend integration.

## Project goals

- Let a recruiter understand the work quickly, then inspect source code and evaluation context.
- Keep core content local and typed; GitHub availability is not required to render the site. Optional cached GitHub metadata has a graceful fallback.
- Distinguish verified facts, reported metrics, assumptions, and limitations.
- Keep the visual system restrained, responsive, keyboard-accessible, and usable with reduced motion.

## Requirements

- Node.js 20.9+ (Node.js 22 recommended)
- npm
- A Resend account and verified sender only if you want to enable form delivery

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Validation commands

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

The source package was prepared in an environment without package-registry access. The dependency installation, Next.js production build, browser smoke test, and deployed-site verification still need to be run after `npm install` in a network-enabled environment. Do not interpret the static source checks as a successful production build.

## Contact form setup

The form is **disabled by default**. It becomes visible as an active form only when all required server-side variables are configured:

- `RESEND_API_KEY` — server-only secret
- `CONTACT_FROM_EMAIL` — sender verified with Resend
- `CONTACT_TO_EMAIL` — primary destination, set to `contact@abdulwahid.me`
- `CONTACT_CC_EMAIL` — optional secondary destination, set to `abdulwahid.connects@gmail.com`

After setting these in `.env.local` and the deployment environment, send a real test message and confirm it reaches the inboxes. The UI must remain fallback-only until delivery is verified. The in-memory rate limit is best-effort and does not share state across serverless instances; for production abuse protection, use a shared rate limiter or platform-level controls before enabling high-volume contact.

## Deployment to Vercel

1. Create a **new** GitHub repository (suggested name: `abdul-wahid-portfolio`) with no starter README/license so the initial history does not conflict.
2. If you use the Git-ready ZIP, extract it and run `git remote add origin <your-new-repo-url>` followed by `git push -u origin main`. The clean source ZIP can be initialized with `git init -b main` first.
3. Import the repository into Vercel as a Next.js project.
4. Set `NEXT_PUBLIC_SITE_URL` to the actual canonical production URL.
5. Add Resend variables only after sender verification and end-to-end testing.
6. Deploy a preview first and test `/`, `/projects`, at least one case study, `/writing`, `/about`, `/cv`, `/contact`, `/privacy`, the 404 page, sitemap, and robots.
7. Connect `abdulwahid.me` only after confirming domain ownership and DNS access.

A remote GitHub repository and Vercel deployment have **not** been created by this package. No credentials or deployment access were available in the build environment.

## Editing content

- Projects: `content/projects.ts`
- Profile, experience, education, certificates, activities: `content/profile.ts`
- Articles: `content/articles.ts`
- Design tokens and components: `app/globals.css`, `components/`

Review every public claim and its source before publishing. Do not add model metrics without recording the dataset, split, target, and evaluation setup. Case studies intentionally include limitations to avoid implying production readiness where it has not been demonstrated.

## Routes

- `/` — home
- `/projects` — search and filter projects
- `/projects/[slug]` — case studies
- `/writing` — article index
- `/writing/[slug]` — technical notes, references, and a synthetic confusion-matrix playground
- `/api/github` — cached optional public GitHub metadata
- `/about` — experience, education, certificates, activities
- `/cv` — print-ready CV and PDF download
- `/contact` — direct contacts and optional contact form
- `/privacy` — privacy information

## Project brain

The `/brain` directory contains the PRD, architecture, design system, testing, deployment, security, and agent workflow documentation. Every meaningful feature/fix should receive a session log and changelog entry. See `CLAUDE.md` and `AGENTS.md` before continuing development.

## Notes

- No analytics service is enabled by default.
- No database, visitor account, or portfolio-side file upload is included.
- The CV PDF is generated from reviewed portfolio content with `python scripts/generate_cv.py` (requires `reportlab`) and omits the phone number. Review the details before formal use.
- License remains unselected; add one only after owner approval.
