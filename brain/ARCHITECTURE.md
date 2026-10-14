# Architecture

## Current stack (verified from repository snapshot)
- Static HTML/CSS/vanilla JavaScript in `index.html`.
- Separate `3d_about_me.html`.
- `CV.pdf` and `profile.png` in repository root.
- `vercel.json` currently contains a `/cv` redirect to `/CV.pdf`.
- No `package.json`, server, database, auth, or build pipeline was observed in the supplied ZIP.
- `index.html` references public GitHub API endpoints and external fonts/assets.

## Proposed approach
Keep the existing static architecture unless a concrete requirement proves it insufficient. Prefer static internal pages or a small shared client-side navigation strategy over adding a framework for simple content.

## Intended folder structure
```text
/
├── index.html
├── 3d_about_me.html
├── CV.pdf
├── profile.png
├── vercel.json
├── README.md
├── CLAUDE.md
├── AGENTS.md
├── .env.example
└── brain/
    ├── *.md
    ├── changes/
    └── prompts/
```
Additional source files/routes are **proposed, not verified**. Decide structure only after auditing the complete existing HTML and deployment behavior.

## Data flow
```mermaid
flowchart TD
  Visitor --> Vercel
  Vercel --> StaticPages[HTML/CSS/JS assets]
  StaticPages --> GitHubAPI[Public GitHub API]
  StaticPages --> ExternalAssets[Fonts and third-party assets]
  Visitor --> CVRoute[/cv]
  CVRoute --> CVPDF[CV.pdf]
```

## Auth flow
Not applicable: current site has no user accounts or authentication. Do not add auth for a public portfolio.

## Components / services
- Main page: `index.html`.
- 3D/about page: `3d_about_me.html`.
- CV file: `CV.pdf`.
- Profile image: `profile.png`.
- Vercel redirects: `vercel.json`.
- External GitHub data/widgets: client-side calls; handle failures with a graceful fallback.

## Code conventions for future changes
- Prefer semantic HTML and small, readable vanilla JS modules.
- Avoid adding TypeScript or a framework unless architecture is explicitly approved.
- Keep styles centralized where feasible; no new hardcoded color values outside design tokens.
- Use clear names, avoid duplicated logic, and guard optional DOM elements.
- Validate any form inputs at boundaries; never trust browser validation alone.
- Use one consistent error presentation pattern.
- Do not place secrets in browser JavaScript.
- Keep pages usable if a third-party API is unavailable.

## Unknowns to verify
- Actual Vercel project settings and domain attachment.
- Whether all existing content is truly inlined in `index.html`.
- Exact production behavior of `/cv` and external CV links.
- Current accessibility/performance scores.
