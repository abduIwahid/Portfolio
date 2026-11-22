# Session 18 — About Experience rebuilt as the UI Layouts ledger

Date: 2026-11-22

## What Wadi asked
Wadi supplied the UI Layouts "Portfolio Experience" design brief
and ordered it used in the About section: "ye about section mai
use kro."

## What was built
The About Experience section (previously the generic .timeline)
is now the block's three-column ledger, adapted to the house
system per the standing UI Layouts rule (adapt the mechanism,
never paste the demo styling):
- Identity column: company in Anton ("Ezitech Institute"),
  accent tagline "Healthcare ML · Explainable AI", muted tabular
  period, and the block's signature metric rails — tinted left
  rule + tiny label + big value (0.83 Best AUC-ROC, 7 Healthcare
  datasets; both figures verbatim from his profile data).
- Metadata column: Position / Location / Organization / Platform
  label-value grid (Platform = the WhyRisk repo link, replacing
  the block's website row) and Key Stack chips (Python, LightGBM,
  scikit-learn, SHAP, MLflow, FastAPI).
- Contributions column: his three profile details verbatim as
  paragraphs + the existing "Review project evidence" link.
- Demo violet -> house orange (accent tint via color-mix), DM
  Sans -> Anton/Archivo, Tailwind classes -> token CSS (.exp-*),
  the motion package -> the site's own Reveal. No new deps.
- Responsive: one column under 900px; the metadata grid goes
  single-column under 560px (the platform URL overflowed its
  two-column row at phone widths — caught in the screenshot pass).
- Education and Community keep the .timeline: they are not
  experience entries and have no position/stack data to ledger.

## Verification (local build, screenshots)
- Desktop 1150 and mobile 390 screenshots of the section: layout
  matches the block's composition, no overflow, wording verbatim
  from content/profile.ts.
- npm run build passes.
