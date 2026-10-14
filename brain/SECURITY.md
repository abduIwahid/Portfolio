# Security

## Current attack surface
- Static HTML/CSS/JavaScript served publicly.
- Client-side requests to public GitHub API and external assets.
- External links and a public CV PDF.
- No app authentication, database, custom API, or upload endpoint observed.

## Requirements
- Never commit secrets, tokens, private keys, or `.env.local`.
- Never place secret API keys in browser JavaScript.
- Validate and safely render any future user input; prefer `textContent` over unsafe HTML insertion.
- Avoid adding a contact form backend without a threat/abuse review.
- External links opened in a new tab should use safe `rel` attributes as appropriate.
- Add suitable security headers through hosting configuration only after testing compatibility.
- Keep third-party scripts to a minimum; review their purpose and privacy impact.
- Do not collect analytics or personal data without owner approval and appropriate disclosure.
- Do not claim rate limiting, CORS policy, database RLS, or account deletion exists when no such backend exists.

## Authentication, RLS, backups
Not applicable to current static site. Reassess only if a backend or private data store is introduced.

## Rate limiting and CORS
No custom endpoint exists to rate-limit. Browser requests are subject to third-party API policies. Do not add a proxy merely to bypass a public API's limits.

## Dependency checks
No package manifest was found in the supplied snapshot. If dependencies are introduced later, audit dependency count, license, vulnerabilities, and maintenance status before approval.

## Incident response
If a secret is accidentally committed: revoke/rotate it first, remove it from active use, inspect exposure, and follow repository/hosting cleanup steps. Deleting the visible line alone does not invalidate a leaked secret.
