# Session 2026-11-10-05 — Ink-bleed theme toggle (V1)

- **Goal / user request:** Wadi found the ink-bleed-theme-changer repo
  (codemure-official), asked for a preview on his own portfolio design,
  approved the V1 (clean) style of the effect over the V2 (feathered /
  fibred) detailing, and said "lgao" — apply it to the live portfolio.
- **What was done:** `components/theme-toggle.tsx` rebuilt so a toggle
  runs a WebGL2 ink transition: a transparent fixed canvas, an ink blot
  in the OLD theme's `--background` colour spreading from the click
  point with fbm-noise-warped edges, the theme flipping under full
  cover, then a noise dissolve revealing the new theme (~1.2s total).
  `.ink-bleed-canvas` rule appended to `app/globals.css`.
- **Files touched:** `components/theme-toggle.tsx`, `app/globals.css`,
  this session file, `brain/changes/changelog.md`,
  `brain/changes/current-state.md`.
- **Decisions:** No new dependencies (the original demo's GSAP /
  html2canvas / Vite stack not adopted; the capture step is unnecessary
  because the transparent-canvas design shows the live old-theme page
  until the blot covers it). Colours come only from the existing
  `--background` design token. Fallbacks: reduced-motion, no WebGL2,
  shader failure, or a mid-transition click all degrade to the previous
  instant flip. V1 clean edge per owner's explicit pick.
- **Problems hit:** none in implementation; headless-Chrome capture of
  the animation in the sandbox was unreliable during preview work, so
  the owner's phone check of the live feel remains the final word.
- **Status:** Done (implementation + build gates + live push); live
  behaviour verified via served bundle; visual feel = owner's check.
- **Related commit:** TBD
