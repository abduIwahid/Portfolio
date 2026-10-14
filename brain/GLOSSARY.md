# Glossary and Naming

| Term | Meaning |
|---|---|
| Project | A verified repository or application Abdul materially worked on |
| Case study | Detailed, evidence-based explanation of a project's problem, approach, implementation, evaluation, and limitations |
| Evidence link | Repository, live demo, benchmark, report, credential, or other source supporting a claim |
| Featured project | Curated project selected for the homepage |
| Article | Technical writing entry, stored as reviewed content |
| Credential | Certificate or credential with verified issuer/date and public proof where available |
| Claim ledger | Table of factual claims, sources, status, and owner approval |
| External metadata | Information fetched from GitHub or another provider; optional enhancement |
| MUST/SHOULD/COULD | Priority categories; MUST is required for initial release |
| Demo-critical path | Homepage → project directory → case study → evidence/repository link |

## Naming conventions
- Routes and content slugs: lowercase kebab-case.
- Components: PascalCase.
- Functions/variables: camelCase.
- Types: PascalCase.
- Environment variables: uppercase snake case.
- CSS variables: `--semantic-shade`.
- Session logs: `YYYY-MM-DD-NN-short-title.md`.
- Commits: Conventional Commits, with session file referenced in message/body.

## Claim labels
- **Verified:** directly supported by an inspected source or owner-approved evidence.
- **Inferred:** reasonable but not directly established; do not publish as a factual achievement.
- **Unknown:** insufficient evidence; ask the owner or omit.
