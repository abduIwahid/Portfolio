# 2026-11-21 — Case-study hero actions aligned; Visit pill CSS restored

Change → Case-study hero actions row restructured per Wadi's screenshot order: "All projects" back button on the left; GitHub (icon-only circle) and the live Visit pill on the right; the "View source" text button removed. Same round: restored the .visit-pill base/label/icon CSS, which the live-preview removal earlier that evening had clipped along with the preview block (the rules sat directly after it in globals.css).
Reason → Wadi's alignment order for every project page; the CSS restore fixes a regression from the removal round before it could be reported as done.
Affected Area → All project case-study heroes; /projects stack panels (Visit pill styling).
Impact → Actions row reads left/right as ordered; Visit pill renders as the 44px ink circle again everywhere.
Evidence → Local build passes; compiled CSS contains visit-pill base + case-icon-btn and zero live-preview; local 414px screenshot verified (All projects left, GitHub + Visit circles right, no preview block).
Status → Shipped.
