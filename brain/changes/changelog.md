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
- **Change:** Added "Available for roles" badge with pulsing green dot to hero PFP on home and about pages → **Reason:** badge CSS was implemented in session 03 but the JSX element was never added → **Affected Area:** `app/page.tsx`, `app/about/page.tsx` → **Evidence:** browser QA screenshots confirmed badge visible on desktop and mobile → **Status:** Verified (local dev).
- **Change:** Fixed about page hero layout — removed excess padding from `.about-hero-row` and converted `.about-pfp-wrap` to flex-column (matching hero pattern) → **Reason:** double padding caused too much whitespace; fixed layout needed for badge below PFP → **Affected Area:** `app/globals.css` → **Status:** Verified (local dev).
- **Change:** Fixed CV PDF test path — copied `public/cv/CV.pdf` to `public/cv/abdul-wahid-cv.pdf` → **Reason:** test expected `public/cv/abdul-wahid-cv.pdf` matching the claim ledger; file was only at wrong path → **Affected Area:** `public/cv/` → **Status:** Verified (file exists; npm test pending final confirmation).

## 2026-11-10 — Ink-bleed theme toggle (V1)
- **Change:** Theme toggle now runs a WebGL2 ink-bleed transition (blot spreads from the click point in the old theme's background colour, theme flips under full cover, blot dissolves onto the new theme) → **Reason:** owner found the ink-bleed-theme-changer concept, previewed it on his own design, picked the V1 clean style and asked to apply it → **Affected Area:** `components/theme-toggle.tsx`, `app/globals.css` → **Impact:** theme switching becomes a signature moment; no new dependencies; reduced-motion / no-WebGL2 fall back to the previous instant flip → **Evidence:** local `npm run build` + typecheck pass; commit file list verified via GitHub API; live bundle contains the ink shader → **Status:** Verified (build + deploy); visual feel pending owner's phone check.

- **Change (fix, same day):** Replaced the ink toggle's WebGL2 canvas renderer with a flat DOM overlay (solid fill + animated clip-path polygon, fade reveal) → **Reason:** owner's iPhone screen recording showed the WebGL version stuttering/tearing mid-transition → **Affected Area:** `components/theme-toggle.tsx`, `app/globals.css` → **Impact:** same V1 look, no per-frame canvas repaints, smooth on weak hardware → **Status:** Verified (build gates); owner's phone re-check pending.

- **Change:** Working principles heading restyled to the hero's two-line font pattern (Anton caps + faded Instrument Serif italic line), scoped via `.principles-title` → **Reason:** owner asked for the section's fonts changed to the portfolio's own, previewed three aligned options as images, and picked Option 1 → **Affected Area:** `app/page.tsx`, `app/globals.css` → **Impact:** section now matches the hero type system; the phone-width hyphen break of "impressive-looking." is gone → **Status:** Verified (build gates + live check); owner's phone feel-check pending.

- **Change:** Working principles title scaled down and Anton letters given breathing room (letter-spacing .035em; sizes 44px→40px cap, serif ratio kept) → **Reason:** owner found the live heading too big with squeezed letters → **Affected Area:** `app/globals.css` → **Impact:** calmer section-scale title, same hero pattern and alignment → **Status:** Verified (build gates + live check); owner's phone feel-check pending.

- **Change:** FULL REVERT of the evening's two experiments — theme toggle back to the pre-ink instant flip (both ink renderers + `.ink-bleed-overlay` CSS removed) and Working Principles heading back to the original Archivo `<h2>` (`.principles-title` removed) → **Reason:** owner: "toggle wala sab purany pe hi le jao, ye acha nahi lag rha"; the Anton title had already drawn "too big / squeezed" → **Affected Area:** `components/theme-toggle.tsx`, `app/globals.css`, `app/page.tsx` → **Impact:** site returns to its pre-2026-11-10-evening behaviour; the session-07 size fix was superseded before shipping → **Status:** Verified (build gates + live check).

- **Change:** Performance pass — idle-stop rAF loops (pointer glow x2, custom cursor), back-to-top polling loop replaced with a scroll listener, pointer-glow layers removed on touch devices → **Reason:** owner reported lag/stalling animations on his iPhone 8 Plus and approved the fix → **Affected Area:** `components/pointer-glow.tsx`, `components/custom-cursor.tsx`, `components/back-to-top.tsx`, `app/globals.css` → **Impact:** idle JS cost near zero; scroll frames on phones no longer repaint two giant gradient layers; no visible behaviour change on desktop → **Status:** Verified (build gates + live check); owner's phone smoothness check pending.

- **Change:** Scroll-effects round — project cards settle out of a slight 3D tilt as their reveal fires (plus a gentle scale(1.012) zoom on fine-pointer hover), and both hero headlines rise line-by-line out of masks with a .16s stagger → **Reason:** owner approved Muse's recommendation from the 10-effect preview set (reel #279) with "sai hai kro" → **Affected Area:** `app/globals.css`, `app/page.tsx`, `app/about/page.tsx` → **Impact:** premium depth on Selected Work cards and a calmer hero entrance; transform-only, one-shot, no scroll-linked drivers, reduced-motion/print disable both → **Evidence:** production build passes, rules present in compiled CSS, CDP width matrix 320–1920 overflow-free, mid-animation transform samples show the stagger, cards settle to identity transform → **Status:** Verified locally; live check + owner's phone feel-check pending. Session: `brain/changes/sessions/2026-11-21-01-scroll-effects-round.md`.

## 2026-11-21 — MTM Hackathon '26 project + About entry
- **Change:** New featured project entry "AXIONS Planner" in `content/projects.ts` (after WhyRisk) with a full case-study page, and a new first Community entry on About in `content/profile.ts` ("Team Lead & Presenter, Team AXIONS — MTM Hackathon '26 · GDG On Campus CUI Wah — November 2026") carrying the owner's Drive certificate link as its proof → **Reason:** owner asked to add the hackathon project to the project section and the participation to About, in the same format as existing entries; copy previewed as an in-chat image and approved → **Affected Area:** `content/projects.ts`, `content/profile.ts` → **Impact:** home Selected Work grid grows to 5 featured projects; /projects gains the AXIONS case study; About timeline leads with the Nov 2026 hackathon; the judging-pack 5/6 venue result is disclosed in the project's limitations → **Evidence:** production build + zod schema parse pass; local page checks; live check after deploy → **Status:** Shipped; owner's phone check pending. Session: `brain/changes/sessions/2026-11-21-02-mtm-project-and-about.md`.

## 2026-11-21 — CV.pdf replaced; /cv page mirrored
- **Change:** `public/CV.pdf` replaced with the owner's updated CV (AXIONS Planner in, Predictly out, MTM V2 Team Lead activity added); `app/cv/page.tsx` project list now mirrors the PDF (WhyRisk → AXIONS → Churn → Study Hub) and its Activities list gains the Team AXIONS (V2) entry with the Drive certificate proof, with the May 2026 entry labelled (V1) → **Reason:** owner updated the PDF himself from the supplied details and handed it over; the CV section update was sequenced to follow his PDF → **Affected Area:** `public/CV.pdf`, `app/cv/page.tsx` → **Impact:** the site's downloadable CV and the readable /cv page now match the owner's current PDF and the V1/V2 convention → **Evidence:** PDF inspected pre-deploy (2 pages, AXIONS present, Predictly absent); production build passes; live /CV.pdf byte-compared after deploy → **Status:** Shipped. Session: `brain/changes/sessions/2026-11-21-03-cv-pdf-and-page.md`.

## 2026-11-21 — PlanKaro rename

Change → Reason → Affected Area → Impact → Evidence → Status: AXIONS Planner renamed to PlanKaro (product name chosen by Wadi) → repo + demo links updated to plankaro / plankaro-planner.vercel.app → content/projects.ts, app/page.tsx, app/cv/page.tsx → project page moves to /projects/plankaro → build + live verification → shipped.

## 2026-11-21 — PlanKaro renamed to PlanBanao

Project entry, slugs and links updated across home, /projects and /cv (demo: planbanao.vercel.app, repo: abduIwahid/planbanao). Team AXIONS credit unchanged.

## 2026-11-21 — Live preview removed from project pages

The embedded live-preview block was removed from every project case study at Wadi's order; component and its CSS deleted.

## 2026-11-21 — Case hero actions aligned + Visit pill CSS restored

All projects left, GitHub/live icon buttons right, "View source" text removed; visit-pill base CSS restored after the preview-removal round clipped it.

## 2026-11-22 — Case hero actions centred

The case-study hero actions row ("All projects" + GitHub/Visit icon buttons) is now centred as one group on every project page, per Wadi's screenshot order; previously split left/right via space-between.

## 2026-11-22 — Project card header CSS restored

The home project cards' header rules (.project-card-top, .project-card-name, .project-card-top-actions, .project-github-btn) were missing from globals.css, stacking the title, GitHub glyph and arrow on separate lines; the rules are restored, mirroring the arrow button's styling.

## 2026-11-22 — Churnex removed from home

Home Selected work now shows 4 projects (WhyRisk, Plan Banao, Study Hub, NearSend); Churnex (Customer Churn Prediction) removed from the home list at Wadi's order. Its case study and /projects entry remain.

## 2026-11-22 — Home gallery + /projects horizontal scroll; Plan Banao first

Home Selected work is now the expanding-panel gallery and /projects is the scroll-driven horizontal showcase (both built to Wadi's approved previews, same morning). Project order leads with Plan Banao, then WhyRisk, on both pages. The /projects search/filter explorer is replaced; its hero line about search was removed to match.

## 2026-11-22 — Gallery hover behaviour fix

Expansion slowed (.55s → .9s) and the gallery now follows the pointer strictly: cursor leaves the strip → active panel collapses and its details fade out; cursor returns → details fade back in. Owner's live feedback, same morning.

## 2026-11-22 — /projects order: Study Hub third

Showcase order is now Plan Banao → WhyRisk → Study Hub → the rest in data order, on the owner's instruction (Study Hub was last).

## 2026-11-22 — Gallery idle spread + legibility fix

When the pointer leaves, the four panels now spread into equal columns filling the row (was: slim strips clustered left). Text over light screenshots fixed: stronger scrim + bottom band, summary clamped to 4 lines. From the owner's laptop photos.

## 2026-11-22 — Rollback: gallery + horizontal scroll reverted

Owner rejected both new designs after live use. Home grid and /projects explorer (stacking cards) restored exactly as before the round; Plan Banao-first order kept. Gallery/hscroll components and CSS removed.

## 2026-11-22 — Correction: restored to one commit back

The full rollback (session 09) overshot the owner's instruction — he meant one commit back. Code restored byte-for-byte from 63d6a0d4: gallery + horizontal scroll live again, without session 08's idle-spread/legibility round.

## 2026-11-22 — Gallery: sticky open project, labels removed

One project is always open (Plan Banao by default); the pointer leaving no longer closes anything; clicking the open panel opens its case study; vertical strip labels removed; text band strengthened for legibility. Owner's spec + photo.

## 2026-11-22 — Explore link moved under the gallery

"Explore all projects" is now a centred pill button below the home gallery instead of a small link in the section heading. Owner's annotated photo.

## 2026-11-22 — Gallery touch tap fix

First tap on a project now expands it on touch screens (was: synthetic mouseenter made the tap count as a second click and jumped straight to the case study). Verified with touch emulation.

## 2026-11-22 — Footer wordmark replays per page

The footer name animation now replays on every page load, refresh and route change (was: once per visit, because the footer never remounts). Owner's request; nothing else changed.
- 2026-11-22 (15): Hero composition rebuilt to the approved preview layout on Home + About: left-aligned, sentence case, solid muted serif line, portrait right with the badge on its shoulder; cursor background decision parked. `feat(hero): apply preview composition to home and about heroes (session 15)`
- 2026-11-22 (16): Cursor physics rebuilt SmoothFollower-style: position/heading/scale are pure lerps (0.20 / 0.12 / 0.22), springs removed — zero overshoot verified by CDP; arrow look and heading-freeze rule kept. `feat(cursor): smooth lerp follow, remove spring bounce (session 16)`
- 2026-11-22 (17): "Available for Opportunities" hero badge removed from Home and About at the owner's order; its session-15 CSS rules removed with it. `chore(hero): remove availability badge from home and about (session 17)`
- 2026-11-22 (18): About Experience rebuilt as the UI Layouts portfolio-experience ledger (Anton company, metric rails, metadata grid, stack chips) in house tokens; content verbatim from profile data. `feat(about): experience ledger from UI Layouts block (session 18)`
- 2026-11-22 (19): Ledger treatment extended to About Education (full 3-column), Credentials and Community (slim 2-column) at the owner's order. `feat(about): ledger for education, credentials, community (session 19)`
- 2026-11-22 (20): Pointer-follow orange glow (global + hero layers) removed entirely at the owner's order; component deleted. `chore(site): remove pointer-follow glow layers (session 20)`
- 2026-11-22 (21): Working principles: scroll-text (word blur reveal) on the heading + intro; the stacking-cards system removed at the owner's order, cards now a static list. `feat(home): scroll-text principles, remove stacking (session 21)`
- 2026-11-22 (22): Correction to (21): the directional animation sits on the three principle cards (left / right / left slide-in); heading text effect removed. `feat(home): principle cards slide left/right/left (session 22)`
- 2026-11-22 (23): Principles are now bare text points (cards removed); each point's text slides in word-by-word from alternating sides per the supplied scroll-text code. `feat(home): principle text points slide left/right/left (session 23)`
- 2026-11-22 (24): Working principles stacking restored at the owner's order (sessions 21-23 text experiments fully reverted). `revert(home): restore principles stacking (session 24)`
- 2026-11-22 (26): WhyRisk demo URL now points at /welcome — the root URL's mShots capture stayed stale after the redesign (the root 308-redirects to /welcome; mShots keys its cache on the exact URL), while the /welcome capture is fresh. Same destination, current screenshot. `fix(projects): point WhyRisk demo at /welcome for a fresh capture (session 26)`
- 2026-11-22 (27): Default zoom set to the owner's spec — 90% on PC/laptop (≥1025px) and 75% on mobile/tablet (≤1024px) via CSS zoom on html, appended to globals.css. `feat(site): default zoom 90% desktop, 75% mobile/tablet (session 27)`
