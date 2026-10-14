# Testing Strategy

## Test pyramid
- Unit tests: content validation, search/filter behavior, contact schema, role-specific CV selection.
- Component tests: accessible form states and project filter empty state if time permits.
- Browser smoke test: primary project path and key routes.
- Manual: keyboard, mobile layout, theme, external links, contact delivery.

## Critical-path manual checklist
- [ ] Homepage loads on desktop and mobile.
- [ ] Header navigation and skip link work with keyboard.
- [ ] Theme toggle changes theme and persists safely.
- [ ] Project search and filters return correct records.
- [ ] Featured project opens a case study.
- [ ] Case study repository/demo links point to real destinations.
- [ ] Article index and article page render without placeholder/lorem text.
- [ ] CV page renders, PDF download works, print stylesheet is readable.
- [ ] Contact validation blocks malformed/oversized input.
- [ ] Contact success appears only after provider success; provider failure shows a clear error.
- [ ] Unknown route renders custom 404.
- [ ] Sitemap, robots, canonical and Open Graph metadata are valid.
- [ ] No browser console errors or broken images.
- [ ] No API key or private credential appears in browser bundle or repository.
- [ ] Production build passes and deployed URL smoke test passes.

## Minimal automated tests
1. Project content schema accepts valid and rejects invalid records.
2. Search/filter behavior handles no results and combined filters.
3. Contact schema validates boundaries and rejects invalid email/lengths.
4. Case-study links and slugs are unique.
5. Playwright: homepage → projects → one case study → CV route.

## Performance targets
- Lighthouse Performance ≥90.
- Accessibility ≥95.
- LCP <2.5 seconds on a representative production run.
- If a target cannot be met, record test conditions and root cause; do not fabricate scores.

## Definition of done
Build, lint, typecheck, critical tests, manual critical path, accessibility spot check, and production smoke test are complete. Any skipped test is documented with a reason and risk.
