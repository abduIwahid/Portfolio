# Deployment

## Current state
The supplied repository includes `vercel.json` with a redirect from `/cv` to `/CV.pdf`. The ZIP alone does not prove that the custom domain is connected correctly or that production currently serves the latest commit.

## Before deploy
1. Confirm the correct GitHub repository and production branch.
2. Open the Vercel project and inspect Domains and latest deployment.
3. Confirm `abdulwahid.me` and `abdul-wahid-portfolio.vercel.app` are attached as intended.
4. Verify the existing CV file path and all redirect destinations.
5. Preview the change before production where possible.
6. Never change DNS records without confirming current provider/records and owner approval.

## Static deployment
1. Push approved changes to the connected repository/branch.
2. Wait for the Vercel deployment to report Ready.
3. Inspect build/deployment logs for errors.
4. Test the preview URL first.
5. Test production URLs in a private/incognito session and a mobile browser.

## Environment variables
None required for the current site. If future secrets are needed, configure them in Vercel project settings and document names only in `.env.example` and `ENV.md`. Never expose secrets in browser code.

## Domain behavior
- Preferred canonical domain: `https://abdulwahid.me` (confirm www/apex behavior).
- Fallback deployment: `https://abdul-wahid-portfolio.vercel.app`.
- `/cv` should resolve to `/CV.pdf`; preserve the existing rule unless a tested alternative is approved.
- External profile redirects should be added only after confirming destinations.

## Preview vs production
Use preview deployments to test route behavior and visual changes. Do not rely solely on localhost because Vercel redirects and domain routing can differ.

## Rollback
If the deployment breaks the homepage, CV, navigation, or responsive layout, promote the last known-good Vercel deployment using the dashboard's rollback/redeploy controls. Confirm the official current workflow before use.

## Post-deploy smoke test
- [ ] Homepage loads.
- [ ] `/cv` opens the PDF.
- [ ] Existing pages/assets load.
- [ ] Changed routes work.
- [ ] Mobile navigation works.
- [ ] No redirect loop or broken internal links.
- [ ] Latest production deployment and tested commit are recorded in session log.
