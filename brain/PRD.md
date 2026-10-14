# Product Requirements Document

**Demo-critical feature:** A recruiter can open `abdulwahid.me/cv` and reach the existing CV PDF without needing to know the underlying file path.

## Problem
A portfolio is only useful if recruiters can quickly navigate to credible evidence of skills and work. Long or inconsistent links create friction; unverified claims and nonfunctional routes damage trust.

## Target users
- Recruiters and internship coordinators
- Developers reviewing project work
- Hackathon/team collaborators
- The portfolio owner maintaining a professional web presence

## Goals
- Keep the current website working and recognizable.
- Make CV and profile links short and dependable.
- Present selected projects with repositories, demos, methods, and verified results.
- Make future content updates maintainable without unnecessary infrastructure.
- Improve mobile usability, accessibility, and basic SEO.

## Non-goals
- User accounts, login, password reset, or account deletion.
- Database-backed CMS, payments, uploads, or private dashboards.
- Contact form backend unless a human explicitly approves a service and configuration.
- Inventing new project pages/content, credentials, statistics, or awards.
- Replacing the existing static site with a framework without approval.

## User stories
- As a recruiter, I can open `/cv` and view/download the current CV.
- As a visitor, I can reach GitHub, LinkedIn, and LeetCode using memorable routes.
- As a reviewer, I can inspect a project's repository and live demo where verified.
- As a reader, I can read technical articles with references and publication status.
- As the owner, I can update projects/articles without adding a backend.
- As a mobile visitor, I can navigate without horizontal overflow or blocked controls.

## Scope
| Priority | Feature |
|---|---|
| MUST | Preserve homepage and existing pages/assets |
| MUST | `/cv` works on the custom domain and fallback Vercel domain |
| MUST | External profile shortcuts point to correct profiles |
| MUST | Mobile navigation and direct route refresh work |
| MUST | All claims, project links, and credentials are accurate |
| SHOULD | Projects page and project detail pages |
| SHOULD | Experience, certificates, contact, and central links pages |
| SHOULD | Technical blog with real citations and draft/published status |
| SHOULD | Metadata, sitemap, robots.txt, custom 404 |
| COULD | Portfolio PDF, search, theme toggle, analytics |
| OUT OF SCOPE | Authentication, database, payments, AI API, uploads |

## Wow factor
A polished but fast portfolio where each project page shows the real problem, implementation, evidence/results, limitations, and source/demo links—not just a flashy card.

## Acceptance criteria
- **CV route:** `/cv` returns a successful redirect or serves the existing `CV.pdf`; no loop; PDF opens on desktop/mobile.
- **Profile shortcuts:** `/github`, `/linkedin`, `/leetcode` resolve to the intended profiles.
- **Internal pages:** `/projects`, `/experience`, `/certificates`, `/blog`, `/contact`, `/links`, `/achievements`, `/docs` show meaningful page content or are intentionally deferred and not linked as if complete.
- **Project detail:** every published project has a verified repo link; demo link is shown only when tested.
- **Blog:** drafts are labeled; published technical articles cite primary/reliable sources.
- **Responsive:** 320px-wide viewport has no unintended horizontal overflow; navigation and controls work.
- **Accessibility:** keyboard focus visible, links descriptive, images have suitable alt text, text contrast meets WCAG AA where practical.
- **SEO:** unique title/description for indexable pages; canonical domain is consistent.
- **Deployment:** production smoke test passes after deployment.

## Success criteria
- No broken existing homepage/CV links.
- All shipped routes tested directly and after refresh.
- No fabricated claims or fake testimonials.
- Lighthouse target: performance ≥90, accessibility ≥95, LCP <2.5s where external APIs/assets do not dominate; document justified misses.

## Post-launch roadmap
1. Establish a verified project/content inventory.
2. Improve project case studies and research articles.
3. Add automated route/link checks if they justify the setup cost.
4. Consider a content system only when static content editing becomes a real bottleneck.
