# Deployment

## Current state
The application source exists. Package installation, production build, remote repository creation, and deployment have not been verified.

## Vercel deployment
1. Create the new GitHub repository and commit the docs.
2. Create the Next.js application only after implementation is authorized.
3. Import the repository into Vercel.
4. Set framework preset to Next.js; keep build command at the framework default unless justified.
5. Add required environment variables to Preview and Production separately.
6. Deploy the initial empty shell early.
7. Verify preview deployment before connecting the custom domain.
8. Connect `abdulwahid.me` only after domain ownership/DNS access is confirmed.
9. Verify HTTPS, redirects, canonical URL, sitemap, robots, contact flow, and all core routes.
10. Keep previous production deployment available for rollback.

## Environment variables
See `ENV.md`. Never place server secrets in `NEXT_PUBLIC_*`. Add variables only when their integration is active.

## Contact provider
- Create Resend account only if contact form is included.
- Verify sender/domain according to current provider requirements.
- Add `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` in Vercel.
- Send an actual test message and confirm receipt.
- If provider configuration blocks delivery, disable the form and present direct email/LinkedIn links. Do not simulate success.

## Preview vs production
- Preview: test branches and PRs; use non-production recipient where possible.
- Production: approved content and correct canonical URL.
- Do not reuse test secrets across environments if avoidable.

## Domain and DNS
- Primary target: `abdulwahid.me` (TBD until ownership/access confirmed).
- Vercel subdomain: TBD, generated after project creation.
- Follow Vercel's current domain instructions; do not guess DNS record values.

## Rollback
1. Open Vercel deployment history.
2. Promote the last known-good deployment.
3. Verify homepage, projects, CV, and contact fallback.
4. Log rollback in `brain/changes/sessions/` and changelog.

## Post-deploy smoke test
- [ ] Open homepage and project directory.
- [ ] Open one case study and one article.
- [ ] Download/print CV.
- [ ] Submit contact test if configured.
- [ ] Check mobile menu/theme toggle.
- [ ] Verify canonical URL, sitemap, robots, and 404.
- [ ] Review Vercel logs for runtime errors.
