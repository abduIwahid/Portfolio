# Abdul Wahid — AI/ML Developer

This repository is the source code of my **personal portfolio website** — not a starter template or a sample project.

![Portfolio preview](https://www.abdulwahid.me/opengraph-image)

**Live site:** [abdulwahid.me](https://www.abdulwahid.me)

## About me

I'm Abdul Wahid, an Artificial Intelligence undergraduate at **COMSATS University Islamabad, Attock Campus** (BS AI, 2024–2028), and a Machine Learning intern at **Ezitech Institute, Islamabad**, where I worked on healthcare ML with XGBoost/LightGBM, MLflow experiment tracking, and SHAP-based explainability served through FastAPI.

My focus is practical machine learning: explainable AI (XAI), MLOps, and building full-stack applications around models.

## What's on the site

- **Home** — introduction and selected work
- **Projects** — case studies with approach, evaluation, and limitations
- **Writing** — technical articles on ML evaluation and explainability
- **About** — experience, education, and certificates
- **CV** — print-ready CV with PDF download
- **Links & Contact** — profiles and a contact form

## Features

- **Case-study project pages** — every project documents the problem, the approach, measured results, and honest limitations, not just screenshots
- **Scroll-reveal motion** — sections and cards appear one by one as you scroll, with reduced-motion support for users who prefer it
- **Light and dark themes** — a toggle in the header, with matching theme colours for the browser chrome
- **Responsive by design** — the same layout and header work from phones to wide desktops, with touch-friendly targets
- **Print-ready CV** — the CV page prints cleanly to PDF
- **Contact form** — messages delivered by email via Resend (requires domain verification in production)

## Featured projects

- **MediSight AI** — healthcare risk prediction with benchmarked classifiers, MLflow tracking, and SHAP explanations (internship work)
- **Customer Churn Prediction** — classification study comparing linear, tree-based, and neural models (84% accuracy, 71% F1)
- **Predictly** — Pakistani real-estate valuation dashboard with transparent estimate context
- **NearSend** — private nearby file sharing between devices, no accounts or cloud uploads (WebRTC)
- **Study Hub** — course-resource web app for my FA24-BAI class cohort (notes, lab manuals, study helpers)
- **Smart Doctor Connect** — healthcare-assistance concept built at the Mind to Machine 2026 AI hackathon
- **Freelance Marketplace Database** — relational database design for a freelance marketplace
- **Inventory Management System** — stock and inventory management web app

## Tech stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS · Lucide icons · Resend (contact form) · Deployed on Vercel

Design: Anton for display type, Archivo for body text, JetBrains Mono for labels and eyebrows.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Production build:

```bash
npm run build
npm run start
```

## Project structure

```
app/          # routes: home, projects, writing, about, cv, contact, links
components/   # shared UI: header, footer, reveal, project cards
content/      # site content: profile, projects, articles (edit here)
public/       # images, icons, CV, and static assets
```

Content lives in `content/` — updating a project or article is a data edit, not a layout change.

## Connect

- Portfolio: [abdulwahid.me](https://www.abdulwahid.me)
- GitHub: [github.com/abduIwahid](https://github.com/abduIwahid)
- LinkedIn: [linkedin.com/in/abdu1wahid](https://www.linkedin.com/in/abdu1wahid)
- Email: [contact@abdulwahid.me](mailto:contact@abdulwahid.me)
