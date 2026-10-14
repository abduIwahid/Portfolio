# Product Requirements Document

**Demo-critical feature:** A recruiter can explore a curated project, open a detailed case study, understand the problem and implementation, inspect verified evaluation evidence, and navigate to the source repository.

## Problem
Recruiters and collaborators need more than a list of skills. They need a fast way to assess what Abdul has built, how it works, what evidence supports the claims, and where to inspect the implementation.

## Target users
- Recruiters and hiring managers screening AI/ML, data science, and software engineering candidates.
- AI/ML engineers and developers looking for collaboration.
- Scholarship/graduate-program reviewers assessing technical direction and research potential.
- Readers of technical articles.

## Goals
- Communicate a clear AI/ML developer identity without inflated claims.
- Make strongest verified projects discoverable within seconds.
- Provide case studies with methodology, architecture, evaluation, limitations, and source links.
- Show verified education, experience, certificates, and activities.
- Publish technical articles and connect them to relevant projects.
- Provide reliable CV access and a contact path.
- Keep the experience fast, accessible, responsive, and maintainable.

## Non-goals for the first release
- User accounts, public comments, payments, or visitor profiles.
- Database-backed admin panel.
- Live model inference hosted by the portfolio itself.
- Automated claims about employment readiness or job matching.
- Unverified certificates, project metrics, endorsements, or awards.
- Making GitHub API availability essential to the homepage.

## User stories
- As a recruiter, I can see the identity, strongest projects, and CV path quickly.
- As a technical reviewer, I can inspect a project case study and follow links to code/demo.
- As a reader, I can search/filter projects by domain, technology, and type.
- As a reader, I can browse articles and discover related projects.
- As a visitor, I can view or download the CV and print a readable version.
- As a visitor, I can contact Abdul and receive a clear success/error response.
- As Abdul, I can add projects and articles by editing reviewed content files without a database.

## Scope
### MUST
1. Responsive homepage with clear identity and featured projects.
2. Project directory with category/technology filters and search.
3. At least two case-study templates, populated only after project verification.
4. About/experience/education/certificates section using verified content.
5. CV page with PDF link and print stylesheet.
6. Blog index and article template; empty state if no article is approved.
7. Contact links and validated contact form.
8. SEO metadata, canonical URLs, sitemap, robots, accessible navigation, 404 page.
9. Light/dark theme with persisted preference.
10. Session/change documentation and production build verification.
11. Privacy-conscious analytics, subject to final deployment configuration.

### SHOULD
- GitHub repository metadata enhancement with local fallback data.
- Related-project links from articles and case studies.
- Role-specific CV variants generated from the same verified facts.
- Reading time, table of contents, and article search.
- Playwright critical-path test and automated unit tests for project filtering/contact validation.

### COULD
- Small interactive project demonstrations where they work locally and communicate limitations.
- RSS feed.
- Open Graph image per case study/article.
- Downloadable project one-pagers.

## Wow factor
Evidence-linked case studies: every major claim should connect to a repository, live demo, evaluation result, artifact, or clearly labelled limitation. Keep interactions purposeful rather than decorative.

## Acceptance criteria
| Feature | Acceptance criteria | Judging criteria |
|---|---|---|
| Homepage | Identity and featured projects are visible on desktop/mobile; no invented stats | Design, impact, demo |
| Project directory | Search and filters work with local data; empty state is clear | Technical execution, UX |
| Case study | Problem, role, stack, method, evidence, limitations, links are shown when verified | Technical execution, innovation |
| Experience/credentials | Every public claim has a source or explicit owner approval | Impact, credibility |
| CV | View/download/print paths work; no unverified facts | UX, impact |
| Blog | Index, article layout, category/search behavior work; no lorem ipsum | Innovation, impact |
| Contact | Server validates input, rate limit strategy documented, provider configured and tested | Technical execution, reliability |
| Theme/accessibility | Keyboard navigation, visible focus, WCAG AA contrast, theme toggle | Design, accessibility |
| SEO | Unique title/description, canonical, sitemap, robots, OG metadata | Impact, discoverability |
| GitHub enhancement | Failure does not break core pages; content fallback exists | Technical execution |
| Deploy | Production build and smoke tests pass on deployed URL | Demo quality, execution |

## Success criteria
- Primary project path works in a live demo on desktop and mobile.
- No console-breaking errors on key routes.
- Lighthouse target: Performance ≥90, Accessibility ≥95, LCP <2.5s where measured conditions permit.
- Build, lint, typecheck, and core tests pass.
- Every claim presented as fact is verified and approved.

## Content verification gate
Before implementation content is frozen, inspect all relevant public repositories and the supplied CV/LinkedIn. Create a claim ledger: `claim`, `source`, `status (Verified/Inferred/Unknown)`, `owner approval`. Ask the owner about conflicts; do not guess.

## Post-hackathon roadmap
1. Verify all repository and profile claims; gather real screenshots and demo links.
2. Improve case studies with reproducible evaluation evidence.
3. Add article publishing workflow and RSS.
4. Add richer project demos only where they materially prove a capability.
5. Review analytics, accessibility, performance, privacy, and legal pages.
6. Add a CMS only if file-based content becomes genuinely burdensome.
