# Testing Strategy

## Current testing status
No automated test configuration was found in the supplied repository snapshot. The project currently has no declared install/build/lint scripts.

## Manual critical-path checklist
- [ ] Homepage opens on custom domain and fallback Vercel domain.
- [ ] `/cv` reaches the current `CV.pdf` without a redirect loop.
- [ ] PDF renders/downloads on mobile and desktop.
- [ ] `/github`, `/linkedin`, and `/leetcode` point to the intended profiles if implemented.
- [ ] Every internal route linked from navigation opens directly and survives refresh.
- [ ] Existing 3D/about page still loads.
- [ ] Every project repository/demo link opens the intended destination.
- [ ] External GitHub API failure does not break the page.
- [ ] Mobile menu works by touch and keyboard.
- [ ] No horizontal overflow at 320px, 360px, 768px, and desktop widths.
- [ ] Focus is visible; images have meaningful alt text; links have descriptive labels.
- [ ] Browser console has no new uncaught errors.
- [ ] No secrets or private configuration are present in client assets.
- [ ] Vercel production deployment is checked after publishing.

## Automated tests
For this static site, begin with a link/route smoke test only if the test runner is approved. Do not install Playwright/Vitest solely to satisfy documentation. If added, keep tests focused on:
- CV redirect destination
- Required page availability
- No internal broken links
- Key navigation interactions

## Lighthouse targets
- Performance ≥ 90
- Accessibility ≥ 95
- LCP < 2.5 seconds
Targets are goals, not claims. Third-party scripts, fonts, and GitHub requests may affect results; record measured results and context.

## Definition of done
Acceptance criteria in PRD pass; critical links work; mobile layout is usable; no new severe console errors; docs/change logs updated; deployment smoke test is complete or explicitly marked unverified.
