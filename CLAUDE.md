# Abdul Wahid — AI/ML Developer Portfolio

## Five-line project summary
- Build a new, premium personal portfolio for Abdul Wahid, an AI/ML Developer and BS Artificial Intelligence student.
- The site should help recruiters evaluate verified projects, technical depth, experience, education, certificates, and research-oriented writing.
- The demo-critical feature is a polished project explorer that opens detailed, evidence-based case studies for selected projects.
- The differentiator is a technical portfolio that connects project outcomes, implementation details, evaluation evidence, GitHub repositories, and related articles.
- Current phase: **Initial application source implemented; dependency installation, production build, browser QA, and deployment remain pending.**

**Start here:** read `/brain/00-START-HERE.md` first.

## Required reading order
1. `/brain/00-START-HERE.md`
2. `/brain/changes/current-state.md`
3. The three most recent files in `/brain/changes/sessions/` (when available)
4. `/brain/PRD.md`
5. `/brain/DECISIONS.md` and `/brain/TOOLS.md`
6. The task-relevant files among `ARCHITECTURE.md`, `DESIGN.md`, `DATA_MODEL.md`, `API_SPEC.md`, `SECURITY.md`, `BUILD_PLAN.md`, and `TESTING.md`
7. `/brain/WORKFLOW.md` before making changes

## Hard rules
- Use design tokens from `brain/DESIGN.md` only. No hardcoded colors, gradients, AI-style purple/blue glow palettes, or glassmorphism.
- Never commit secrets, `.env.local`, API keys, private credentials, or personal data not approved for publication.
- Validate all external input at boundaries with Zod; escape/render user-generated text safely.
- Keep the deployed app working at all times: deploy early and often.
- Log every feature, fix, or decision per `brain/WORKFLOW.md`, including a session file, verified changelog entry, current-state update, and plan/decision updates when applicable.
- Build the UI against local typed fixture data first; wire integrations after the primary experience works.
- Dependency freeze at 3:00 elapsed time in a 4-hour build. No new package/service after freeze without human approval.
- Ask before adding dependencies, services, or changing architecture.
- Keep each task under 30 minutes; split larger work into reviewable tasks.
- Never invent project metrics, user counts, model scores, credentials, awards, or experience. Label claims Verified / Inferred / Unknown.
- Do not make essential portfolio content depend on a live GitHub API call.
- Do not claim a contact form works until its provider is configured and an end-to-end message is verified.
- Respect project scope: documentation phase means no app code until explicitly authorized.

## Commands (planned; commands do not work until implementation exists)
- Install: `npm install`
- Development: `npm run dev`
- Build: `npm run build`
- Test: `npm run test`
- Lint/typecheck: `npm run lint` and `npm run typecheck`
- Seed: `npm run seed` — **TBD**; likely unnecessary for file-backed content.
- Deploy: `vercel --prod` (after linking project and setting environment variables)

## Definition of done for any task
- Acceptance criteria in PRD are met and checked against DESIGN/SECURITY rules.
- Relevant tests, lint, typecheck, and production build pass.
- Mobile, loading, empty, error, and success states are considered where relevant.
- No secrets or unsupported claims were introduced.
- A session log, changelog entry, and current-state update are committed.
- Deployment and smoke-test status are stated honestly.
