# 2026-11-22 — "Explore all projects" moves under the gallery

Change → The Explore all projects link leaves the Selected work heading (where it sat small beside the paragraph) and becomes a centred pill button directly under the home gallery (.pg-more / .pg-more-link: 48px tall, bordered, surface background, accent border + lift on hover). Same words, same destination — just placed where the owner pointed in his annotated photo and made properly visible so visitors can tell there are more projects.
Reason → Owner's annotated laptop photo: move it to the bottom, make it clearly visible.
Affected Area → Home Selected work section only (app/page.tsx + .pg-more rules in globals.css).
Impact → The heading block is cleaner; the path to the full /projects showcase is now an obvious button after the gallery.
Evidence → Production build passes; live HTML check after deploy (link markup after the gallery, absent from the heading).
Status → Shipped.
