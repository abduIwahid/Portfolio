# Tools and Services

## Selection principle
Use the fewest services possible. The portfolio is content-first and does not need a database, authentication, file storage, or an AI API in v1.

| Category | Pick | Purpose | Free-tier note (checked 2026-10-14) | Env vars | Setup estimate | Fallback / gotcha |
|---|---|---|---|---|---|---|
| Code hosting/CI | GitHub + GitHub Actions | Source control and CI | Verify current Actions minutes/storage on official page before relying on CI quota | GitHub repo secrets only if needed | 10–20 min | Local build/test; no secrets in repo |
| Frontend/backend hosting | Vercel | Next.js and contact route | Hobby is personal/non-commercial; docs show 100 GB Fast Data Transfer and 50,000 Analytics events, limits can change | `NEXT_PUBLIC_SITE_URL`, provider vars | 15–30 min | Static site remains useful if contact integration is unavailable |
| Content | MDX/JSON files | Projects, articles, profile | No service quota; repository is source of truth | None | 15–30 min | Use validated local data |
| Contact email | Resend | Deliver contact form | Official pricing currently states 3,000 emails/month and 100/day on Free; domain verification/recipient restrictions must be checked before demo | `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` | 15–30 min | If not configured, show direct email/LinkedIn links and disable form honestly |
| Analytics | Vercel Analytics | Basic traffic analytics | Official docs list 50,000 events on Hobby, one-month reporting; check current limits before enabling | Usually integration-managed | 5–10 min | Omit analytics until consent/privacy configuration is reviewed |
| Icons | Lucide | Consistent UI icons | Open-source; verify current license/usage | None | 5 min | Text labels |
| Testing | Vitest + Playwright | Unit tests and browser smoke test | Package/license/version details verify at install | None | 15–30 min | Manual critical path if time constrained |
| Forms/schema | Zod | Server-side validation | Open-source; check current package docs | None | 5–10 min | Server-side manual validation is not preferred |

Official pages:
- Vercel Hobby: https://vercel.com/docs/plans/hobby
- Vercel Analytics limits: https://vercel.com/docs/analytics/limits-and-pricing
- Resend pricing: https://resend.com/pricing
- GitHub Actions billing: https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions
- Lucide: https://lucide.dev/
- Zod: https://zod.dev/

## Accounts to create in the first 15 minutes
- [ ] GitHub account/repository (new repo; name TBD).
- [ ] Vercel account and link GitHub.
- [ ] Resend account only if the contact form is included in the first release.
- [ ] Confirm control of `abdulwahid.me` and access to DNS provider; do not change DNS until deployment is verified.

## Free-tier gotchas
- Vercel Hobby is restricted to personal, non-commercial use; confirm the intended use and current terms. If the site becomes commercial, choose a compliant plan.
- Vercel usage quotas and function limits can change; check official pages immediately before deployment.
- Resend free tier: current pricing page states 3,000 emails/month and 100/day. Sender/domain verification and allowed recipients can constrain the demo; verify domain and test an actual delivery.
- GitHub public API limits and caching rules must be verified if using authenticated metadata. The site must not rely on API availability.
- Avoid Supabase/Render/Railway for v1: no database/backend service is required; Render free services sleep and Railway relies on trial credits.
- No paid font, image, CMS, or model API is required.

## Cost and scaling
Start with file-backed content and Vercel personal hosting only if permitted by current terms. Resend handles low-volume contact submissions. If traffic or contact volume grows, inspect actual usage before upgrading. Consider a CMS or database only after a documented need; do not add infrastructure speculatively.
