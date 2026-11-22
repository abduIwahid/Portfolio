# 2026-11-22 — Gallery: idle spread + text legibility over light screenshots

Change → Two fixes from the owner's laptop photos of the live site: (1) The pointer-leave state (all panels collapsed, session 06) rendered as four slim strips clustered at the left with empty space after them. The strip now gets an .idle class when nothing is active and the panels take equal quarter widths, filling the row with index chips + vertical labels — the leave behaviour the owner asked for, without the broken look. (2) Over light screenshots (Plan Banao's cream UI) the white summary was unreadable: the active scrim goes .34 → .42, the content's bottom band is now a strong gradient (rgba(23,23,23,.85) → .45 at 58% → transparent), and the summary is clamped to 4 lines at every width so it stays inside the darkened zone.
Reason → Owner's photos of abdulwahid.me on his laptop, same morning ("aisa dikh rha hai").
Affected Area → Home gallery only (globals.css .pg-* rules + one className change in project-gallery.tsx).
Impact → Idle gallery reads as a deliberate four-column index; expanded text is legible on the lightest screenshot in the set.
Evidence → Production build passes; local render verified the idle spread at 1280 after a hover → leave cycle. Live CSS bundle grep after deploy (idle rule + new gradient). Screenshot paint remains mshots (sandbox cannot load it; URLs verified 200 earlier).
Status → Shipped.
