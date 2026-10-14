# API Specification

## Current API surface
No custom backend or application API is defined in the repository snapshot.

| External endpoint | Purpose | Auth | Failure handling |
|---|---|---|---|
| `https://api.github.com/users/{username}` | Public GitHub profile data | None for basic public requests | Show static profile links; avoid breaking page |
| `https://api.github.com/users/{username}/repos?...` | Public repository cards/stats | None for basic public requests | Show graceful fallback; respect rate limits |
| Other third-party asset URLs | Fonts, icons, or visuals | Varies | Prefer local/system fallback where practical |

## Proposed route behavior
| Route | Type | Expected behavior |
|---|---|---|
| `/cv` | Redirect | `/CV.pdf` |
| `/github` | Redirect | `https://github.com/abduIwahid` |
| `/linkedin` | Redirect | `https://www.linkedin.com/in/abdu1wahid` |
| `/leetcode` | Redirect | `https://leetcode.com/u/abdu1wahid/` |
| `/projects`, `/blog`, etc. | Internal page | Must be implemented and tested before linked as live |

Only `/cv` is present in the supplied `vercel.json`; other redirects are proposals and must not be described as implemented until verified.

## Error format
No custom API error format is currently needed. For client-side external calls, catch failures and show a non-blocking message or static fallback.

## Rate limits
GitHub public API limits can change and may vary by authentication and request context. Verify the official documentation before relying on high-volume requests. Do not hardcode credentials in frontend code.

## Auth and CORS
No app auth. Browser requests to third-party APIs are governed by those services' CORS policies; do not create a proxy backend unless justified and approved.
