# Start Here

## One-liner
Build a premium, evidence-first AI/ML developer portfolio that helps recruiters evaluate verified work through project exploration, technical case studies, research writing, and clear professional contact paths.

## Current phase
**Phase 1 — Initial application implementation created; package install and production verification are pending.**

## Demo-critical feature
A recruiter can browse a curated project, open its case study, understand the problem, method, implementation, and verified evaluation evidence, then inspect the repository or live demo.

## Differentiator
Connect projects to evidence: code/repository, implementation choices, evaluation, limitations, and related technical articles. Avoid unsupported claims and decorative AI clichés.

## Reading order
1. `/CLAUDE.md` — hard rules and entry point
2. `/brain/00-START-HERE.md` — this file
3. `/brain/changes/current-state.md`
4. The three most recent session files in `/brain/changes/sessions/`
5. `/brain/PRD.md`
6. `/brain/DECISIONS.md`, `/brain/TOOLS.md`
7. Task-specific docs: architecture, design, data, API, security, build plan, testing, deployment
8. `/brain/WORKFLOW.md` before every task

## Project files
- [PRD](PRD.md)
- [Architecture](ARCHITECTURE.md)
- [Data model](DATA_MODEL.md)
- [API specification](API_SPEC.md)
- [Design system](DESIGN.md)
- [Tool choices](TOOLS.md)
- [Build plan](BUILD_PLAN.md)
- [Testing](TESTING.md)
- [Deployment](DEPLOYMENT.md)
- [Environment variables](ENV.md)
- [Workflow](WORKFLOW.md)
- [Decisions](DECISIONS.md)
- [Security](SECURITY.md)
- [Production readiness](PRODUCTION_READINESS.md)
- [Risks](RISKS.md)
- [Demo pitch](DEMO_PITCH.md)
- [Glossary](GLOSSARY.md)
- [Ethics and privacy](ETHICS_PRIVACY.md)
- [Claim ledger](claim-ledger.md)
- [Change log](changes/changelog.md)
- [Current state](changes/current-state.md)
- [Audit prompt](prompts/audit-changes.md)
- [Feature prompt](prompts/new-feature.md)
- [Bugfix prompt](prompts/bugfix.md)
- [Refactor prompt](prompts/refactor.md)
- [Review prompt](prompts/review.md)
- [Deploy-fix prompt](prompts/deploy-fix.md)
- [UI polish prompt](prompts/ui-polish.md)

## Inputs and assumptions
- Idea: new personal portfolio for Abdul Wahid — AI/ML Developer.
- Team: solo for initial 4-hour sprint; owner and additional contributors must be confirmed.
- Preferred stack: none specified; see `DECISIONS.md`.
- Judging: assume innovation, technical execution, design, impact, and demo quality.
- Deployment: Vercel target; custom domain `abdulwahid.me` only after ownership/DNS confirmation.
- Content source links supplied: GitHub `https://github.com/abduIwahid`, LinkedIn `https://www.linkedin.com/in/abdu1wahid`, CV `https://abdul-wahid-portfolio.vercel.app/CV.pdf`.
- Source profile information must be verified against repositories and approved before publishing. Some profile details may be stale or conflicting.

## Immediate next step
Human reviews this documentation and answers the open questions in `DECISIONS.md`. The owner authorized implementation on 2026-10-14 and confirmed the two contact emails and churn metrics. Review `brain/claim-ledger.md` and `brain/changes/current-state.md` before continuing. Initial source code exists, but dependency installation, production build, browser QA, and deployment have not been verified.
