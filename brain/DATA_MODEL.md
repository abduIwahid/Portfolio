# Data Model

## Current state
No database or persistent application data model is present in the supplied repository snapshot.

## Entities
| Entity | Fields | Source |
|---|---|---|
| Portfolio project | title, summary, category, repo URL, demo URL, verified metrics, status | Static content / owner-maintained |
| Certificate | title, issuer, date, verification URL | Owner-provided evidence |
| Article | slug, title, summary, status, date, updated date, body, references | Markdown/static content if implemented |
| Experience entry | organization, role, dates, responsibilities, evidence URL | Owner-confirmed |
| Link | label, destination, route type, verification status | Static configuration |
| Achievement | title, date, issuer/event, result, evidence URL | Owner-confirmed |

## Relations
- A project can have zero or more documentation/article references.
- An article can cite multiple references.
- Project, certificate, experience, and achievement entries can link to external evidence.
- No user-owned records or private accounts exist.

## Indexes and RLS
Not applicable without a database. Do not introduce SQL indexes or row-level security for static files.

## Seed/demo data
Use existing repository links and only owner-verified project facts. No demo account is required. Placeholder content must be visibly marked TBD/draft and must not appear as a verified credential.

## Privacy rules
Do not copy private user data into static content. Public professional links should be checked with the owner before changing.
