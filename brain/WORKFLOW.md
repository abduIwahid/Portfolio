# Workflow — Humans and Agents

## Roles
- **Planner:** clarifies requirements, updates docs and task plan.
- **Builder:** implements one task in a focused change.
- **Reviewer:** checks against PRD, design tokens, security, and existing behavior.
For solo work, the same person may rotate roles, but should perform each review step explicitly.

## Task rules
- Maximum 30 minutes per task; split larger work.
- Commit after each coherent task using Conventional Commits.
- Deploy at least once per meaningful phase, after preview tests.
- Keep the deployed site working.
- No new package/service or architecture change without human approval.
- For a four-hour sprint, dependency/config freeze begins at 3:00.
- Agents read only relevant files plus mandatory context files.

## Mandatory before-work routine
1. Read `brain/00-START-HERE.md`.
2. Read `brain/changes/current-state.md`.
3. Read the latest three session files; if fewer exist, read all.
4. Read the task-relevant PRD/design/security/deployment documents.

## Mandatory after EVERY feature, fix, or decision
1. Create `/brain/changes/sessions/YYYY-MM-DD-NN-short-title.md` containing:
   - Goal/user request (summarized; quote key prompt fragments when useful)
   - What was done and files touched
   - Decisions and reasoning
   - Problems and fixes
   - Status: Done / Partial / Blocked; next steps
   - Related commit hash, or `Not committed` if none
2. Append a verified entry to `changelog.md`: `Change → Reason → Affected Area → Impact → Evidence → Status`.
3. Update `current-state.md` with actual state, incomplete work, contradictions, deprecated/removed items.
4. Update `BUILD_PLAN.md` checkboxes and `DECISIONS.md` / `TOOLS.md` when relevant.
5. Commit with Conventional Commits and reference the session log.
6. Never invent history. Mark claims **Verified**, **Inferred**, or **Unknown**.

## Logging hard rule
This process applies to documentation-only work too. Do not record a change as deployed unless production verification occurred.

## Review and freeze
Reviewer checks requirements, mobile layout, route behavior, content accuracy, and secret handling. After dependency freeze, no new dependencies/services without explicit human approval.
