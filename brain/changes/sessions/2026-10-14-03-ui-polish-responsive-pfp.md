# Session: UI Polish, Responsive Layout, Default Theme, GitHub PFP

- **Date:** 2026-10-14
- **Goal / user request:** Multiple sequential requests after initial implementation: (1) remove hero skills panel, (2) update .gitignore, (3) push to GitHub and deploy on Vercel, (4) full responsive layout for all screen sizes and zoom levels, (5) fix default theme to light, (6) add GitHub profile picture with animated ring to hero.

## What was done

### Task 1 — Remove hero Technical Skills panel
- Deleted `<aside className="hero-aside">` block from `app/page.tsx` hero section.
- Removed hero-grid two-column layout; hero wrapper reverted to plain `.container`.
- Removed dead CSS: `.hero-grid`, `.hero-aside`, `.aside-head`, `.aside-label`, `.skills-panel`, `.skill-group`, `.skill-group-label` from `app/globals.css`.
- **Files touched:** `app/page.tsx`, `app/globals.css`

### Task 2 — Update .gitignore
- Replaced bare `node_modules` entry with a full, categorised gitignore.
- Sections added: Dependencies, Next.js build output, Environment variables, TypeScript auto-generated files, Python artefacts (CV generation script), OS/editor noise, Vercel, debug logs.
- `next-env.d.ts` was already committed; ran `git rm --cached next-env.d.ts` to untrack it.
- **Files touched:** `.gitignore`

### Task 3 — Push to GitHub
- Staged and committed all changes (`e5c0c0d`).
- Pushed to `https://github.com/abduIwahid/Portfolio.git` on `main` branch.
- Vercel was already connected to this repo from the previous portfolio; build settings were stale (old framework), causing a 404. Advised owner to update Framework Preset → Next.js in Vercel settings and redeploy.

### Task 4 — Full responsive layout
- Added `overflow-x: hidden` and `width: 100%` to `html` and `body`.
- Added `max-width: 100%` to `.container`.
- Added new `≥1280px` large-screen clamp.
- Added new `≤1024px` tablet-landscape breakpoint with intermediate layouts.
- Improved `≤900px` tablet-portrait breakpoint.
- Overhauled `≤700px` mobile breakpoint: all multi-column grids collapse, buttons go full-width, footer stacks, hero font uses `clamp()`.
- Added `width: 100%` to `.hero`, `.section`, `.site-header`, `.site-footer` so backgrounds fill edge-to-edge at any zoom level.
- Removed duplicate inline `closing-cta` media query.
- **Files touched:** `app/globals.css`
- **Commit:** `0d7b3b2`

### Task 5 — Fix default theme to light
- `components/theme-toggle.tsx`: removed OS `prefers-color-scheme` detection; now only reads an explicit user-saved `localStorage` value of `'dark'`. Default is always `'light'` for new visitors.
- `app/layout.tsx`: added `data-theme="light"` to `<html>` element so the page renders light on SSR before JS hydrates; changed `colorScheme` to `'light'` and `themeColor` to `'#f8f8f8'`.
- **Files touched:** `components/theme-toggle.tsx`, `app/layout.tsx`
- **Commit:** `43cb37a`

### Task 6 — GitHub PFP with animated ring
- `app/page.tsx`: changed hero wrapper from `.container` to `.container .hero-split` (two-column grid). Added `<div className="hero-pfp-wrap">` on the right containing:
  - SVG with two rotating circles (dashed accent ring + counter-rotating subtle ring) and one orbiting accent dot.
  - `<img src="https://avatars.githubusercontent.com/abduIwahid">` inside `.pfp-img-wrap` (circle crop).
  - `.pfp-badge` availability chip with pulsing green dot.
- `app/globals.css`: added all PFP CSS —
  - `.hero-split` grid layout.
  - `.pfp-ring-outer`, `.pfp-ring-svg`, `.pfp-ring-spin`, `.pfp-ring-counter`, `.pfp-orbit-dot` with `ring-spin` keyframe.
  - Hover: ring speeds up 3×, image scale + saturation, border flips to accent.
  - `.pfp-badge` with `pulse-dot` keyframe.
  - `prefers-reduced-motion` guard on all animations.
  - Responsive: 190px at ≤1024px, 170px at ≤900px, 160px at ≤700px (photo moves above text on mobile).
- **Files touched:** `app/page.tsx`, `app/globals.css`
- **Commit:** `7eda0b8`

## Decisions + reasoning
- GitHub avatar URL `https://avatars.githubusercontent.com/abduIwahid` used (no API key required, always current).
- `prefers-color-scheme` removed from theme toggle: owner explicitly wants light as default regardless of OS setting. Previous visitors with saved `'dark'` in localStorage still see dark.
- `data-theme="light"` on `<html>` prevents flash of dark on SSR.
- Kept `<img>` instead of Next.js `<Image>` to avoid domain allow-list config for external GitHub CDN.

## Problems hit + fixes
- `git push` failed initially with PowerShell `&&` operator → split into separate commands.
- Vercel showed 404 after push because old project had stale framework settings. Fix: update Framework Preset in Vercel dashboard → Next.js and redeploy.
- Brain docs (changelog, current-state, session log) not updated during session — caught and corrected at owner's request.

## Verification
- `git push` confirmed for commits `e5c0c0d`, `0d7b3b2`, `43cb37a`, `7eda0b8`.
- Vercel build status: awaiting redeploy with correct framework settings.
- Browser QA of live site: not yet re-verified after latest PFP commit (Vercel auto-redeploy in progress).

## Status
Partial — all source changes pushed; Vercel deployment pending correct framework preset and redeploy confirmation.

## Next steps
1. Confirm Vercel build succeeds with Next.js preset.
2. Visual QA of live site: hero PFP, responsive breakpoints, light theme default.
3. Test theme toggle: new visitor gets light, toggle persists in localStorage.
4. Test mobile layout on real device or DevTools.
