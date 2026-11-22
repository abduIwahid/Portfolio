# 2026-11-22 — Gallery: slower expansion, details only while hovering

Change → Two owner-reported fixes to the home gallery: (1) panel expansion slowed — width transition .55s → .9s (house ease), with the content fade-in re-timed to land as the panel opens (delay .35s) and fade out promptly on close; buttons and the vertical label got matching in/out timing. (2) Details now exist only while the pointer is on the gallery: the strip's onMouseLeave (and focus leaving the strip) clears the active panel, so every panel collapses and its details fade out; hovering any panel brings its details back. Touch keeps tap-to-open (no hover-leave on touch, so the open panel stays readable).
Reason → Owner's live feedback the same morning: "show hony ki speed boht fast hai" and details should fade out when the cursor leaves a project and return when it comes back.
Affected Area → Home gallery only (components/project-gallery.tsx + .pg-* rules in globals.css).
Impact → Calmer, pointer-following showcase; at rest after the pointer leaves, the section is four slim strips.
Evidence → Production build passes. Live CSS bundle check after deploy (grep for the .9s panel transition) plus the owner's phone/desktop check.
Status → Shipped.
