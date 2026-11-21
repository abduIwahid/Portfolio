# 2026-11-21 — Live preview embed removed from project pages

Change → Removed the click-to-load LivePreview embed from the project case-study template (app/projects/[slug]/page.tsx), its second usage in components/project-flow.tsx, the component file itself, and all .live-preview CSS in globals.css.
Reason → Wadi's order (screenshot of the WhyRisk case study, 21 Nov): remove the live preview block from inside every project.
Affected Area → All project case-study pages.
Impact → Case studies now flow hero → Context directly; View source, Visit pill and sidebar Live demo links are unchanged.
Evidence → Local build passes; local WhyRisk and Plan Banao pages contain zero "Live preview"; live check after push.
Status → Shipped.
