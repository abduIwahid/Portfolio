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

## 2026-11-10 — Ink-bleed theme toggle
- Theme toggle runs a WebGL2 ink-bleed transition (V1 clean style, owner-approved after preview + GIF rounds); fallbacks to instant flip on reduced-motion / no WebGL2. Session: `brain/changes/sessions/2026-11-10-05-ink-bleed-theme-toggle.md`. Visual feel on the owner's phone is the remaining check.

- Ink toggle renderer v2 (2026-11-10 evening): WebGL canvas replaced by a flat DOM overlay after the owner's recording showed tearing on his iPhone; same V1 look. Owner's phone re-check pending.
- Working principles title (2026-11-10): Option 1 fonts live — Anton line + faded serif line, scoped to that heading only; other section headings still Archivo by the owner's pick.
- Working principles title size fix (2026-11-10): Anton line 40px cap + .035em letter-spacing after owner feedback (too big / squeezed); serif line scaled in ratio.
- REVERTED (2026-11-10, owner's order): ink-bleed toggle AND Anton principles title both removed same night they shipped; toggle is the plain instant flip again, principles heading is the original Archivo. Do not re-propose either.
- Performance pass (2026-11-10): rAF loops idle-stop; back-to-top is scroll-listener driven; glow layers display:none on coarse pointers. Lag fix shipped on owner's approval; his phone feel-check is the verdict.

## 2026-11-21 — Scroll effects round
- 3D card zoom on project cards (reveal-driven settle + fine-pointer hover zoom) and line-by-line masked rise on both hero headlines shipped on the owner's approval of the #279 preview set. Transform-only, one-shot; /projects stacking cards deliberately untouched. Effect #10 (count-up demo) not shipped — the stats strip holds text values, not countable metrics. Session: `brain/changes/sessions/2026-11-21-01-scroll-effects-round.md`. Owner's phone feel-check pending.

## 2026-11-21 — MTM Hackathon '26 added
- AXIONS Planner is a featured project (after WhyRisk) with a full case-study page at /projects/axions-planner; About's Community timeline leads with the Team AXIONS entry (Nov 2026) and its Drive certificate proof link. The certificate also lives in the owner's Certificates repo (mtm-hackathon-26/). The /cv page still awaits the owner's updated CV.pdf — he is updating the PDF himself first; the CV section update follows on his handover. Session: `brain/changes/sessions/2026-11-21-02-mtm-project-and-about.md`.
- CV round completed (2026-11-21): the owner's updated CV.pdf is live (AXIONS in, Predictly out) and the /cv page mirrors it — project order WhyRisk → AXIONS → Churn → Study Hub, Activities led by the Team AXIONS (V2) entry with its Drive proof; May 2026 entry labelled (V1). Session: `brain/changes/sessions/2026-11-21-03-cv-pdf-and-page.md`.

- 2026-11-21: AXIONS Planner is now **PlanKaro** (repo github.com/abduIwahid/plankaro, demo plankaro-planner.vercel.app; old domain kept as alias). Team AXIONS remains the team credit.

- 2026-11-21: MTM V2 project renamed PlanKaro → PlanBanao (site planbanao.vercel.app, repo abduIwahid/planbanao); portfolio slugs/links updated.

- 2026-11-21 (later): display name set to "Plan Banao" everywhere; slug/URLs stay planbanao.

- 2026-11-21: Live preview embed removed from all project case-study pages (component + CSS deleted).

- 2026-11-21: Case-study hero actions aligned (back left, GitHub + live icons right); visit-pill CSS restored.

## 2026-11-22 — Home gallery + /projects horizontal scroll
- Home "Selected work" is now the expanding-panel gallery (components/project-gallery.tsx): Plan Banao first and active by default, then WhyRisk, Study Hub, NearSend. The card grid no longer renders on home; its CSS remains in globals.css, unused.
- /projects is now the scroll-driven horizontal showcase (components/project-hscroll.tsx), nine panels in the same lead order (Plan Banao, WhyRisk, then the rest in data order); reduced-motion visitors get a static stack. ProjectExplorer + ProjectStack are no longer rendered anywhere (files kept for a possible return); the /projects search/filter is gone and the hero no longer mentions search.
- Both designs were approved by the owner from in-chat GIF previews the same morning; local production build passes and local renders verified layout/interaction at 1280 + 414. Screenshot paint uses the same mshots URLs as before (verified 200 image/jpeg); the owner's phone check is the final visual verdict.
- 2026-11-22 (later): gallery behaviour refined on owner's live feedback — expansion slowed to .9s and details show only while the pointer is over the gallery (leave = collapse + fade out). Session: `brain/changes/sessions/2026-11-22-06-gallery-hover-behaviour.md`.
- 2026-11-22 (later): /projects showcase order — Study Hub moved from last to third (Plan Banao → WhyRisk → Study Hub → rest). Session: `brain/changes/sessions/2026-11-22-07-projects-order-study-hub-third.md`.
- 2026-11-22 (later): gallery idle state spreads into four equal columns; text-over-screenshot legibility fixed (scrim .42, strong bottom band, 4-line clamp). Session: `brain/changes/sessions/2026-11-22-08-gallery-idle-and-legibility.md`.
- 2026-11-22 (later): REVERTED — the expanding gallery (home) and horizontal scroll (/projects) were rejected by the owner after live use and fully rolled back the same morning (session 2026-11-22-09). Home shows the card grid again, /projects the explorer + stacking cards; Plan Banao-first order kept on home. Do not re-propose either design.
