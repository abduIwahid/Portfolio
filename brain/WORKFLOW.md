# Workflow: Humans + Agents

## Roles
- **Planner:** updates scope, acceptance criteria, docs, and plan.
- **Builder:** implements one task at a time.
- **Reviewer:** checks PRD, design tokens, security, tests, and claims.
For a solo sprint, one person may perform each role sequentially, not simultaneously.

## Mandatory before-work routine
1. Read `00-START-HERE.md`.
2. Read `changes/current-state.md`.
3. Read the last three session files (or all available if fewer than three).
4. Read only task-relevant files plus mandatory entry docs.
5. State task goal, acceptance criteria, likely files, and expected duration (<30 minutes).

## Task loop
1. Confirm scope and acceptance criteria.
2. Build mock-first against local typed data.
3. Implement one bounded task.
4. Run relevant tests/lint/typecheck/build.
5. Review for token compliance, accessibility, security, mobile, and unsupported claims.
6. Update session log, changelog, current-state, BUILD_PLAN checkboxes, and DECISIONS/TOOLS if relevant.
7. Commit with Conventional Commits, referencing the session file.
8. Deploy at least once per phase; keep production usable.

## Hard logging rule: git for conversations
After **every feature, fix, or decision**, create `/brain/changes/sessions/YYYY-MM-DD-NN-short-title.md` containing:
- Goal / user request summarized; quote key prompt fragments when useful.
- What was done and files touched.
- Decisions and reasoning.
- Problems hit and fixes.
- Status: Done / Partial / Blocked, plus next steps.
- Related commit hash (or `TBD` before a commit exists).

Then:
- Append a verified entry to `changes/changelog.md` in the form `Change → Reason → Affected Area → Impact → Evidence → Status`.
- Update `changes/current-state.md` with what exists, incomplete work, inconsistencies, deprecated/removed items.
- Update `BUILD_PLAN.md` checkboxes and `DECISIONS.md` / `TOOLS.md` when relevant.
- Commit with `feat:`, `fix:`, `docs:`, `chore:`, `test:`, or `refactor:`, referencing the session file.
- Never invent history. Label claims Verified / Inferred / Unknown.

## Timing and freeze
- Task size ≤30 minutes.
- Dependency freeze at 3:00 of a four-hour sprint.
- No new packages, services, or architecture changes after freeze without human approval.
- If phase is >20% late, cut SHOULD/COULD items first.
- Deploy early and often.

## Definition of done
Task acceptance criteria met, tests and checks run, logs updated, no secrets/unsupported claims, deployment status stated accurately.

## Change freeze
Do not add scope based on aesthetics alone during final 20 minutes. Fix only demo-blocking or production-readiness MUST defects unless owner approves otherwise.
