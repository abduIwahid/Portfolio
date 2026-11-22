# 2026-11-22 — Gallery: one project is always open (sticky active)

Change → Owner's spec, replacing the session-06 leave behaviour: the gallery now ALWAYS has one project open. Plan Banao (index 0) is open on load, as if hovered; hovering / tapping / focusing another panel opens that one; moving the pointer away closes NOTHING — the last open project stays open until another is chosen. Clicking the already-open panel opens its case study (router push); the vertical name labels on the strips are removed (markup + CSS); details legibility: scrim .34 → .40, the content's bottom band strengthened (rgba(23,23,23,.82) → .42 at 58% → transparent), summary clamped to 4 lines at all widths. Home gallery only — /projects untouched.
Reason → Owner's messages + photo: the all-collapsed state ("is phase pe nahi ana chayen ye projects") must never occur; details must be properly visible; vertical names removed.
Affected Area → components/project-gallery.tsx + .pg-* rules in globals.css.
Impact → The section is never empty/collapsed; first paint already shows Plan Banao in full.
Evidence → tsc --noEmit clean; production build passes; live check after deploy (no pg-vlabel in home HTML; new gradient in the CSS bundle). NOTE: an intermediate edit in this round briefly referenced an undeclared router variable — caught and fixed before shipping; the shipped tree is the verified one.
Status → Shipped.
