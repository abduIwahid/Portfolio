# Code Review Task Template

Read `00-START-HERE.md`, `changes/current-state.md`, and the last three session files first.

Review read-only against PRD acceptance criteria, DESIGN.md, SECURITY.md, and relevant tests.

Check:
- Functional correctness and edge cases.
- Accessibility, keyboard/focus, mobile layout, loading/empty/error/success states.
- Token compliance; no gradients, hardcoded colors, or glassmorphism.
- Input validation, secret exposure, unsafe rendering, rate limiting, privacy.
- Unsupported claims, fake metrics, broken/external links.
- Performance, dependency changes, deployment compatibility.
- Tests and documentation/logging completeness.

Report findings by severity with file/line evidence and suggested minimal fix. Do not silently implement changes. If changes are made later, follow session/changelog/current-state rules.
