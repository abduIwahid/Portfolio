# Security

## Threat model
Public portfolio with no visitor accounts. Main risks: contact-form abuse, leaked API credentials, untrusted input, dependency compromise, external API failure, and accidentally publishing private/unverified information.

## Rules
- No secrets in Git, client bundles, logs, screenshots, or docs.
- Use Vercel environment variables for server-side secrets.
- Keep API keys out of `NEXT_PUBLIC_*`.
- Validate contact payload with Zod on the server; trim and bound every field.
- Render user-provided text as text, never raw HTML.
- Limit body size and add abuse controls/rate limiting before production.
- Do not persist contact message bodies by default.
- Do not expose provider errors or stack traces to visitors.
- Use HTTPS, security headers, and a restrictive Content Security Policy where compatible.
- Validate external links and avoid embedding arbitrary remote HTML.
- Pin/lock dependencies; inspect new packages and run dependency audit.
- Keep third-party SDK count low.
- Separate Preview and Production variables.
- GitHub API integration is optional and must fail gracefully.
- No database/RLS in v1. If persistent user data is added later, require a separate security design and explicit approval.

## CORS and headers
- Same-origin contact endpoint by default; do not enable permissive wildcard CORS.
- Add `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, and frame protection appropriate to the app.
- CSP must account for analytics/provider scripts actually enabled; avoid broad `unsafe-eval` unless unavoidable and documented.

## Contact form
- Validate name/email/message lengths.
- Add honeypot and/or rate limiting; neither is sufficient alone for high-volume abuse.
- Avoid logging message body and email address unless operationally necessary.
- Return generic provider failure messages.
- Verify email delivery end-to-end before claiming the form is active.

## Incident response
1. Disable compromised integration or form.
2. Revoke/rotate leaked keys.
3. Restore last known-good deployment.
4. Record incident without exposing secrets.
5. Re-test production and update session/changelog/current-state.
