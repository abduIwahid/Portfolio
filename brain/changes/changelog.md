# Changelog

Project initialized. No code yet.

## 2026-10-14 — Documentation scaffold
- Change: Created project requirements, architecture, design system, service plan, security, workflow, testing, deployment, and prompt templates → Reason: establish a resumable project brain before application code → Affected Area: documentation → Impact: provides implementation contract and acceptance criteria → Evidence: files in `/brain/` and root docs → Status: Verified (documentation exists; application code does not).

## 2026-10-14 — Initial portfolio implementation

- **Change:** Implemented a fresh Next.js App Router portfolio with typed local project/article/profile content, project search and filters, detailed case studies, writing pages, about/CV/contact/privacy routes, theme toggle, responsive design, SEO routes, a print-ready CV and PDF, and a server-side optional contact endpoint.
- **Reason:** Owner authorized implementation and confirmed `contact@abdulwahid.me` as primary contact, `abdulwahid.connects@gmail.com` as secondary contact, and the churn metrics in the CV.
- **Affected Area:** `app/`, `components/`, `content/`, `lib/` (reserved), `public/`, tests, root config/docs, `/brain`.
- **Impact:** Source package and downloadable archive are prepared. Contact form stays disabled without verified provider credentials. No remote repository or deployment is claimed.
- **Evidence:** `npm test` passed 6/6; TypeScript/TSX syntax transpilation passed for 29 files. `npm install` timed out because package-registry access was unavailable; Next build, dependency-backed typecheck/lint, browser tests, and deployment smoke tests remain unverified.
- **Status:** Partial — implementation commit `4aa093e` and static checks complete; dependency install, production build, browser QA, and deployment blocked/pending.

## 2026-10-14 — Session 03: UI polish, responsive layout, light theme default, GitHub PFP

- **Change:** Removed hero Technical Skills aside panel → **Reason:** owner requested removal → **Affected Area:** `app/page.tsx`, `app/globals.css` → **Impact:** hero is now single-focus headline + CTA column → **Evidence:** committed `e5c0c0d` → **Status:** Verified.
- **Change:** Replaced bare `.gitignore` with full Next.js + Python + editor-agnostic ignore ruleset; un-tracked `next-env.d.ts` → **Reason:** prevent secrets, build artefacts, and editor noise from being pushed → **Affected Area:** `.gitignore` → **Evidence:** committed `e5c0c0d` → **Status:** Verified.
- **Change:** Pushed all committed changes to `https://github.com/abduIwahid/Portfolio.git` on `main` → **Reason:** owner requested GitHub push before Vercel deployment → **Evidence:** push confirmed to `e5c0c0d` → **Status:** Verified. Vercel deployment pending correct framework preset.
- **Change:** Added comprehensive responsive CSS: `overflow-x: hidden` on `html`/`body`, `width: 100%` on layout blocks, new `≤1024px` tablet breakpoint, improved `≤900px` and `≤700px` breakpoints → **Reason:** layout broke when zoomed out; sections lacked full-width backgrounds → **Affected Area:** `app/globals.css` → **Evidence:** committed `0d7b3b2` → **Status:** Verified (pushed; live QA pending).
- **Change:** Fixed default theme to always be light: removed OS `prefers-color-scheme` from toggle, added `data-theme="light"` to `<html>`, set `colorScheme: 'light'` → **Reason:** owner requested light as the default regardless of OS dark mode → **Affected Area:** `components/theme-toggle.tsx`, `app/layout.tsx` → **Evidence:** committed `43cb37a` → **Status:** Verified (pushed; live QA pending).
- **Change:** Added GitHub profile picture with spinning dashed SVG ring, counter-rotating ring, orbiting accent dot, hover acceleration + glow, and "Available for roles" pulsing badge to hero section → **Reason:** owner requested PFP in the empty right-side hero space → **Affected Area:** `app/page.tsx`, `app/globals.css` → **Evidence:** committed `7eda0b8` → **Status:** Verified (pushed; live QA pending).
