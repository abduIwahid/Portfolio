# Session 2026-11-21-01 — Scroll effects round (3D card zoom + line-by-line hero reveal)

## Goal / user request
Owner shared a reel of "10 Scroll Effects" (saved-references #279), asked which fit his portfolio, approved previews of all 10 as GIF mockups in his own brand tokens, then approved Muse's recommendation with "sai hai kro": ship **3D Card Zoom** (project cards) + **Line-by-line Reveal** (big statement lines). Effect #10 (scroll-triggered demo / count-up) was offered as optional for a numbers surface.

## What was done
- `app/globals.css` — one new block after the `.reveal` rules:
  - `.reveal .project-card` starts at `perspective(1100px) rotateX(9deg) translateY(16px) scale(.94)` and settles to flat when the existing IntersectionObserver reveal fires (`.is-visible`); transition .85s on `--ease-house`. No new JS, no scroll-linked driver, nothing runs while idle.
  - Fine-pointer hover keeps the existing −4px lift and adds a gentle `scale(1.012)` zoom, scoped to `@media (hover: hover) and (pointer: fine)` so touch devices never pay for it.
  - `.hg-mask` wrappers mask the two hero headline lines; `.hg-line` runs a one-shot `hg-rise` keyframe (translateY 112% → 0, .9s, house ease), second line delayed .16s. Mask carries a .14em bottom pad/negative-margin pair so the serif line's descenders are never clipped and layout height is unchanged.
  - `prefers-reduced-motion` and print overrides disable both effects, matching the site's existing `.reveal` handling.
- `app/page.tsx`, `app/about/page.tsx` — each `.hg-line` span wrapped in an `.hg-mask` span (second line also `.hg-d2`). No copy, sizing, or colour changes.

## Decisions and reasoning
- 3D zoom keys off the existing `Reveal` component instead of a new scroll driver: the /projects stacking cards were deliberately left untouched (they have their own measured rAF stack driver; an entrance transform would fight it). Home Selected Work is the `.project-card` surface the preview was approved on.
- Line-by-line applied to the two hero headlines only — they are the site's fixed two-line statements (already split into `.hg-line` spans, `nowrap`, container-measured), so masked lines cannot break fluid wrapping the way pre-split spans would on free-flowing headings.
- Effect #10 NOT shipped: the only numbers surface (stats strip) holds text values ("BS AI", "ML + AI", "2026"), not countable metrics; a count-up there would be decoration without meaning. Revisit if a real metrics section is added.
- Lockfile: `npm ci` fails at head (package.json/lock out of sync, `lenis` missing from lock — pre-existing). Local build used `npm install`; the regenerated lockfile was NOT included in this change.

## Problems hit and fixes
- Local clone `portfolio-clone` was stale/dirty → worked from a fresh clone at head `800d62b`.
- CDP probe needed `--user-data-dir` for the headless shell's debug port.
- Live-site geometry could not be read from the sandbox browser (page shell loads, app markup does not render for that client) → parity argued from box geometry instead: `.hg-line`/`.hg-mask` are block boxes, so hero line boxes measure identical (390px = full wrap width at 414) before and after; verified locally at every width.

## Verification (local build, headless Chrome/CDP)
- `npm run build` passes; compiled CSS contains `hg-rise`, `hg-mask`, `rotateX(9deg)`.
- Width matrix 320/360/390/414/768/1024/1280/1440/1920 on home: no horizontal overflow at any width; both hero lines carry the `hg-rise` animation; /about and /projects (414) also overflow-free.
- Mid-animation sample after client-side navigation to /about: line 1 at translateY ≈ 9.9px, line 2 at ≈ 31.8px (stagger working); end state both at 0.
- Project card after reveal: computed transform is the identity matrix3d (settles perfectly flat).
- Screenshots read visually: home hero + project grid at 1440, home + about heroes at 414 — headlines fully rendered, serif descenders unclipped, cards aligned.

## Status
Done (implementation + local verification). Related commit: TBD (push follows this log). Owner's phone feel-check is the final verdict, as with every visual round.
