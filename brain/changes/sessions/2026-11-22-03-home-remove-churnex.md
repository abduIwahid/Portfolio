# 2026-11-22 — Churnex removed from home Selected work

Change → `HOME_PROJECT_SLUGS` in app/page.tsx: removed 'customer-churn-prediction' (the Churnex project). Home now shows 4 projects: WhyRisk, Plan Banao, Study Hub, NearSend.
Reason → Wadi's order, 22 Nov: home had 5 projects; remove Churnex so only 4 show.
Affected Area → Home "Selected work" grid only. The project itself is untouched: its case study and its /projects listing remain live.
Impact → 4 cards flow cleanly in the auto-fit grid (2x2 on phone, one row of 4 on desktop).
Evidence → Pushed to main; live home HTML checked after deploy: 4 project cards, no Churn card.
Status → Shipped.
