# Code Review Prompt Template

Review the proposed change against `brain/PRD.md`, `DESIGN.md`, `SECURITY.md`, `TESTING.md`, and `DEPLOYMENT.md`. Read mandatory start-of-work files and recent sessions first.

Review for:
- Requirement/acceptance-criteria coverage
- Existing behavior regressions
- Route and redirect correctness
- Mobile responsiveness and accessibility
- Design token compliance; no new hardcoded colors/gradients
- Unsafe DOM/input handling and exposed secrets
- Broken links/assets, console errors, external-service failure handling
- Unsupported claims or unverified metrics
- Unnecessary dependencies and scope creep

Do not modify files during review unless asked. Return findings by severity with file/line evidence and recommended fix. Mark unverified items clearly.
