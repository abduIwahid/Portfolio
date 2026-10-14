# Environment Variables

No real values belong in this document or in version control.

| Name | Purpose | Used by | Secret? | Where to get it |
|---|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site origin for metadata and absolute links | Server and client only where necessary | No | Set to local URL in development and production domain in production |
| `RESEND_API_KEY` | Authorize contact email delivery | Server-only contact route | **Yes** | Resend dashboard; create only if integration is enabled |
| `CONTACT_FROM_EMAIL` | Verified sender address | Server-only contact route | No, but operationally sensitive | Configure in Resend after sender/domain verification |
| `CONTACT_TO_EMAIL` | Destination for contact submissions | Server-only contact route | Private configuration | Owner-approved professional inbox |
| `GITHUB_TOKEN` | Optional authenticated public-repository metadata requests | Server/build-time only | **Yes** | GitHub token settings; omit if unauthenticated public metadata is sufficient |

## Rules
- `.env.local` is ignored by Git and never committed.
- `.env.example` contains names only, no secrets.
- Never expose `RESEND_API_KEY` or `GITHUB_TOKEN` to client components.
- Prefer no `GITHUB_TOKEN` unless rate limits or a clear use case justify it.
- Keep Preview and Production variables separate.
- If a credential is exposed, revoke/rotate it immediately and document the incident without copying the secret into logs.
