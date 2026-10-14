# Deployment Failure Prompt Template

Read the mandatory start-of-work files, deployment/security docs, current-state, and recent sessions.

Deployment failure: [exact error]
Provider/deployment ID: [if available]
Commit: [hash]
Expected: [result]
Actual: [result]
Logs/evidence: [paste relevant output]

Diagnose from logs and repository config. Do not change DNS, secrets, build settings, dependencies, or architecture without approval. Prefer the smallest reversible fix. Test preview first, then production. Record rollback plan and smoke-test evidence. Update session log/changelog/current-state and mark anything not verified as Unknown.
