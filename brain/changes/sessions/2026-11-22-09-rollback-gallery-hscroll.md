# 2026-11-22 — REVERTED: gallery + horizontal scroll rejected by owner

Change → Full rollback of sessions 04–08 at the owner's order ("nahi ye design mujhe acha nahi laga, pechly waly pe jao"). app/page.tsx restored byte-for-byte from commit 0acf83d2 (the pre-gallery grid) with ONE kept change: HOME_PROJECT_SLUGS stays Plan Banao-first per his standing order instruction. app/projects/page.tsx restored byte-for-byte (ProjectExplorer + stacking cards + the original hero copy). The .pg-* / .hs-* CSS blocks are removed from globals.css (the file is back to its pre-gallery tail), and components/project-gallery.tsx + components/project-hscroll.tsx are deleted.
Reason → Owner tried both designs live (desktop + phone) and rejected them; he will direct what comes next himself.
Affected Area → Home Selected work + /projects, back to the exact previous designs.
Impact → Site is as it was on the morning of 22 Nov before the gallery round, plus the Plan Banao-first order. Both rejected designs are NOT to be re-proposed.
Evidence → Production build passes on the restored tree; live HTML check after deploy (project-grid present, pg-strip absent, explorer controls back).
Status → Shipped.
