# 2026-11-22 — Correction: restore to one commit back (63d6a0d4)

Change → The session-09 rollback overshot: the owner clarified "wapis ka matlab tha sirf aik commit peechy" — he rejected only the LAST round (session 08's idle spread + legibility changes), not the gallery / horizontal-scroll designs themselves. The five code files (app/globals.css, app/page.tsx, app/projects/page.tsx, components/project-gallery.tsx, components/project-hscroll.tsx) are restored byte-for-byte from commit 63d6a0d4: gallery with the .9s expansion + pointer-leave fade (session 06/07 state), /projects horizontal scroll with Study Hub third, and NO idle-spread or scrim/gradient changes. Brain logs keep the full history (sessions 08/09 stand as the record of what was tried and reverted).
Reason → Owner's correction, same morning.
Affected Area → Home gallery + /projects showcase, back to the exact pre-session-08 state.
Impact → The design the owner approved (and checked on mobile) is live again; only the disliked last fix round is undone.
Evidence → Files fetched from 63d6a0d4 and marker-checked (no .pg-strip.idle rule, .9s panel transition present, Study Hub in LEAD_SLUGS); production build passes; live bundle/HTML check after deploy.
Status → Shipped.
