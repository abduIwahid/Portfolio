# Session 27 — Default zoom: 90% desktop, 75% mobile/tablet (2026-11-22)

**Owner request:** the portfolio should render by default as if the
browser were zoomed to 90% on PC/laptop and 75% on mobile/tablet.

**Change:** appended two media queries to the end of `app/globals.css`
setting CSS `zoom` on `html` — `0.9` at widths ≥1025px, `0.75` at
≤1024px. CSS zoom is layout-level (not a transform), so the sticky
stacking cards, fixed header and custom cursor keep working in the
scaled coordinate space. Nothing else in the file changed.

**Verify:** after deployment, headless Chromium against the live home
page — computed `zoom` on `document.documentElement` reads 0.9 at a
1440×900 viewport and 0.75 at 390×844, with no horizontal overflow at
either size; screenshots saved from both viewports.
