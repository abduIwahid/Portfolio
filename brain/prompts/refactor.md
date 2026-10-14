# Safe Refactor Prompt Template

Read `brain/00-START-HERE.md`, current-state, latest three session logs, and relevant architecture/design/testing docs.

Goal: [maintainability issue]
Behavior that must remain unchanged: [list]
Allowed scope: [files]
Explicitly out of scope: [list]

Record baseline behavior first. Make small changes without changing visible behavior, route destinations, content claims, or deployment configuration. No dependency/architecture change without approval. Run the same smoke tests before and after. If a behavior change is necessary, stop and request approval. Log evidence and update docs.
