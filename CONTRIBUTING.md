# Contributing

This is planned for a solo-owned portfolio; use the rules below if collaborators are added.

## Branch and PR rules
- `main` must remain deployable.
- Use short branches: `feat/project-explorer`, `fix/contact-validation`, `docs/case-study-evidence`.
- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `test:`, `refactor:`.
- PRs must state goal, acceptance criteria, screenshots for UI changes, test/build results, and linked session log.
- Do not merge if build, typecheck, or core tests fail.
- No direct production-only edits that are absent from Git.

## Folder ownership
| Area | Default owner | Notes |
|---|---|---|
| `/app`, `/components` | Builder | UI and route implementation |
| `/content` | Abdul Wahid/content approver | Verified public claims only |
| `/brain` | Planner / task owner | Update logs with every change |
| `/lib/integrations` | Integration owner | Contact, GitHub metadata, analytics |
| `/tests` | Reviewer / Builder | Critical-path tests |

## Content review
- Verify project descriptions against repositories and working demos.
- Ask before publishing phone numbers, private email addresses, personal identifiers, or unapproved details.
- Never invent metrics or label a mock feature as live.
