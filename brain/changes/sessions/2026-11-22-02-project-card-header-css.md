# 2026-11-22 — Project card header CSS restored (home Selected work)

Change → Added the missing base rules for the home project-card header in app/globals.css: `.project-card-top` (flex row, title left / actions right, padding matched to `.project-card-body`), `.project-card-name` (margin 0, weight 650, clamp size), `.project-card-top-actions` (inline-flex row), and `.project-github-btn` (34px circle button mirroring `.project-arrow-link`, same hover treatment), plus the <=640px padding override for the top row.
Reason → The base rules for these classes were absent from globals.css (only :hover/:active references and a mobile font-size remained), so on every card the title, a bare GitHub glyph and the arrow button stacked on separate lines — reported by Wadi with a circled screenshot, 22 Nov. Same failure pattern as the visit-pill CSS loss on 2026-11-21: rules clipped in an earlier round, layout silently broken.
Affected Area → Home "Selected work" project cards (all four). /projects stacking cards use different markup and were not affected.
Impact → Card header reads as one row again: name left, GitHub + arrow circles right, at every width.
Evidence → Pushed to main; GitHub raw read-back matches; live CSS bundle greps for the new rules after deploy.
Status → Shipped.
