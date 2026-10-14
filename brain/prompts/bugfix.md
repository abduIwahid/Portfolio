# Bugfix Task Template

Read `00-START-HERE.md`, `changes/current-state.md`, and the last three session files first.

- **Observed behavior:** [exact symptom]
- **Expected behavior:** [expected result]
- **Reproduction steps:** [steps]
- **Environment:** [local/preview/production, browser/device]
- **Evidence:** [logs/screenshot/test; redact secrets]
- **Likely area:** [routes/components/integration]
- **Acceptance criteria:** reproduce, fix root cause, add regression test where practical.
- **Constraints:** no unrelated refactors; do not add dependencies/services without approval; honor dependency freeze.

Inspect before editing. Run targeted test, lint/typecheck/build as relevant, and smoke-test affected route. Log the session and verified changelog/current-state update. Commit as `fix: ...` and reference the session file.
