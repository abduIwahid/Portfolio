# Tools and Services

## Selection principle
Use the fewest services possible. This portfolio is currently static; adding a database, auth provider, email sender, cache, or AI API is unnecessary for the stated goals.

| Category | Choice | Why | Limits/setup/fallback |
|---|---|---|---|
| Code hosting | GitHub | Existing repository | Account already appears to exist; check repo permissions |
| Hosting | Vercel | Existing deployment/config | Verify current plan limits and domain settings on official Vercel pages; fallback is the existing `*.vercel.app` domain |
| Domain/DNS | Existing registrar/DNS provider — TBD | Custom domain already referenced | Provider and DNS records unknown; do not alter until verified |
| Icons | Lucide for new UI | Consistent lightweight icon family | Current site uses Font Awesome references; use existing icons until migration is approved |
| Fonts | System Helvetica stack for new pages | Avoid remote font dependency | Current page references Google Fonts; fallback system stack |
| Testing | Browser manual checks; Playwright only if approved | No test runner is currently configured | No new dependency by default; manual route/link checklist fallback |
| Diagrams | Mermaid | Text-based and versionable | No account required for source diagrams |
| Secrets | Vercel environment settings only if later needed | No env vars currently required | Never commit real values |

## Official pages to verify before implementation
- Vercel pricing: https://vercel.com/pricing
- Vercel redirects: https://vercel.com/docs/redirects
- GitHub pricing: https://github.com/pricing
- GitHub REST API rate limits: https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api
- Lucide: https://lucide.dev/
- Playwright: https://playwright.dev/

Free-tier numbers are intentionally not stated here because they change. Verify the official page immediately before relying on a limit.

## Accounts to check in the first 15 minutes
- [ ] GitHub account and repository write access
- [ ] Vercel account and correct project access
- [ ] Domain registrar/DNS account access (provider TBD)
- [ ] Confirm whether the custom domain is attached to the same Vercel project as the fallback domain

No additional account should be created for the current static portfolio scope.

## Free-tier gotchas
- Vercel plan terms, build quotas, function limits, and commercial-use terms can change; verify the current official plan. The current static site should not need serverless functions.
- External GitHub API calls can be rate-limited or unavailable; the page must remain useful without live stats.
- Google Fonts and third-party assets can fail or increase load time.
- Domain configuration may differ between apex and `www`; inspect actual DNS and Vercel domain settings before changing records.

## Cost and scaling
The static site can remain low-cost at current scale. If traffic or content needs grow, first measure performance and maintenance pain. Add services only for a concrete need; any paid plan, backend, CMS, or analytics requires owner approval and a cost review.

## Decision record
See `DECISIONS.md` for choices and alternatives.
