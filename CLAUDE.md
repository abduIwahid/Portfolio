# Agent Entry Point — Abdul Wahid Portfolio

## Project summary
1. Personal portfolio for Abdul Wahid, a BS Artificial Intelligence student focused on AI/ML, data science, and software engineering.
2. Existing site is a single-page HTML/CSS/JavaScript website hosted on Vercel; repository currently includes `index.html`, `3d_about_me.html`, `CV.pdf`, `profile.png`, `README.md`, and `vercel.json`.
3. Primary objective: improve recruiter navigation and maintain reliable, short links to the CV and professional profiles without breaking the existing site.
4. Demo-critical feature: visitors can open `abdulwahid.me/cv` and reach the existing CV PDF.
5. Differentiator: a fast, dependency-light personal hub with concise routes to verified projects and professional resources.

**Current phase:** Documentation/context scaffolding only. No application code changes are authorized by the current task.

## Mandatory first step
Read `/brain/00-START-HERE.md` first. Before any work, also read `/brain/changes/current-state.md` and the latest three files in `/brain/changes/sessions/` (if fewer exist, read all available).

## Reading order
1. `/brain/00-START-HERE.md`
2. `/brain/changes/current-state.md`
3. Latest three session logs
4. Relevant task files: `PRD.md`, `ARCHITECTURE.md`, `DESIGN.md`, `SECURITY.md`, `BUILD_PLAN.md`
5. Relevant supporting docs in `/brain/`

## Hard rules
- Use `DESIGN.md` tokens only for new or changed UI; no hardcoded colors and no gradients in new UI.
- Never commit secrets, private contact data, or credentials.
- Validate all user-controlled input; avoid adding forms/backends unless required and approved.
- Keep the deployed app working; inspect before modifying and deploy early only after human approval.
- Log every feature, fix, and decision per `WORKFLOW.md`.
- Mock-first for any new UI that needs data; preserve static-site simplicity.
- For hackathon-style timeboxed work, freeze dependencies at the planned freeze point; for normal portfolio work, never add a dependency/service without human approval.
- Keep tasks under 30 minutes; split larger work into smaller, reviewable tasks.
- Ask before adding dependencies, services, database/auth, or changing architecture.
- Do not invent qualifications, project metrics, certificates, achievements, or test results.
- Do not claim a URL is live or verified unless tested.
- Do not edit application code when the task explicitly says documentation-only.
- Mark statements as **Verified**, **Inferred**, or **Unknown** in change records.

## Commands
Current repository is static HTML and does not declare a package manager.
- Install: **Not required** for current site.
- Dev: use a local static server, e.g. `python -m http.server 8000` (if Python is installed).
- Build: **Not configured**.
- Test: manually open pages/routes; automated tests are **not configured**.
- Lint: **not configured**.
- Seed: **not applicable** (no database).
- Deploy: push approved changes to the connected GitHub branch and verify Vercel deployment; confirm project settings first.

## Definition of done
- Acceptance criteria for the task are met and checked.
- Existing homepage, CV, assets, and external links are preserved unless explicitly changed.
- No console errors or broken paths are introduced, to the extent tested.
- Relevant docs and `/brain/changes/` logs are updated.
- No unsupported claims; unknowns remain marked TBD.
- Commit message follows Conventional Commits and references the session log.
