# Failed Deployment Fix Template

Read `00-START-HERE.md`, `changes/current-state.md`, and the last three session files first.

- **Deployment URL/ID:** [value]
- **Failure stage:** [install/build/runtime/domain]
- **Exact error:** [redacted log excerpt]
- **Last known-good deployment:** [URL/ID]
- **Recent changes:** [commit/session]
- **Environment:** Preview or Production
- **Acceptance criteria:** deployment succeeds and core routes pass smoke tests.

Do not paste secrets into logs. Inspect failure evidence before changing code. Avoid unrelated changes and new dependencies. If production is broken, restore last known-good deployment first, then debug. Verify env vars and provider/domain configuration. Log all changes and rollback details; update changelog/current-state and commit with `fix:` or `chore:`.
