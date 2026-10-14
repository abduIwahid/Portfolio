# Contributing

This is currently a personal static portfolio maintained primarily by its owner. External contributions should be discussed before work begins.

## Branch and PR rules
- Create a focused branch: `feat/short-description`, `fix/short-description`, or `docs/short-description`.
- Keep changes small and scoped to one task.
- Open a PR with summary, screenshots for UI changes, manual test evidence, and any routing/deployment implications.
- Do not merge unreviewed changes directly to production unless the owner explicitly approves.
- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`.
- Never commit secrets, personal data that is not already intentionally public, generated build output, or unrelated files.

## Folder ownership
- Root HTML and current UI: owner approval required.
- `brain/`: project planning, decisions, security, and change history.
- `CV.pdf`, profile assets, contact destinations: owner-only changes unless explicitly approved.
- Vercel/domain configuration: owner approval required.

## Review checklist
- Existing design and responsive behavior preserved.
- All changed links tested.
- No unsupported personal/professional claims.
- Accessibility and security considerations reviewed.
- `brain/changes/` logs updated.
