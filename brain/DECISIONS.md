# Architecture Decision Records

## ADR-001 — Keep the current static-site architecture
- **Date:** 2026-10-14
- **Decision:** Keep HTML/CSS/vanilla JavaScript and Vercel for the planned portfolio updates.
- **Options:** Keep static site; migrate to Next.js; use a separate backend/CMS.
- **Why:** Existing source is static and no current requirement needs authentication, a database, or server-side processing. A migration adds risk and setup without clear value.
- **Status:** Proposed for future implementation; no application code changed in this documentation task.

## ADR-002 — Keep the existing CV PDF
- **Date:** 2026-10-14
- **Decision:** Reuse root `CV.pdf` and maintain `/cv` redirect behavior.
- **Options:** Replace CV; host elsewhere; serve existing PDF.
- **Why:** Existing file and redirect are present in the supplied snapshot; preserving them reduces risk.
- **Status:** Verified in repository snapshot; production behavior remains unverified.

## ADR-003 — No database or authentication
- **Date:** 2026-10-14
- **Decision:** Do not add a database/auth provider for a public portfolio.
- **Options:** Supabase, Firebase, static content.
- **Why:** Public portfolio content can be stored in version-controlled static files; no private user accounts are required.
- **Status:** Proposed.

## ADR-004 — Use design tokens for new UI
- **Date:** 2026-10-14
- **Decision:** Define a solid-color token system and use it for new/modified components.
- **Options:** Continue arbitrary per-component colors; token system.
- **Why:** Consistency, accessibility review, and easier maintenance.
- **Status:** Documentation created; existing page has not been migrated.

## ADR-005 — Avoid additional service accounts
- **Date:** 2026-10-14
- **Decision:** Keep current hosting/repository; do not add analytics, email, CMS, or error-tracking services without a demonstrated need.
- **Options:** Add services from catalog; keep dependency count low.
- **Why:** The current scope is a static portfolio and extra services add setup and failure points.
- **Status:** Proposed.
