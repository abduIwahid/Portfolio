# Session 29 — Sync package-lock.json with package.json (2026-11-24)

**Owner order:** item 3 of the GitHub upkeep list — "kr do" (24 Nov), with
explicit approval to run `npm install` and `npm run build` inside a fresh
clone of this repo (22:08 PKT).

**Goal:** fix the out-of-sync lock file found by the daily GitHub upkeep
pass, so a clean checkout installs again.

**What was done:**
- Diagnosis (verified read-only first): `package.json` declares
  `"lenis": "^1.3.27"` but the committed `package-lock.json` contained no
  lenis entry at all — its root entry listed only lucide-react, next,
  react, react-dom, resend, zod. Every other dependency matched.
  `npm ci` on a clean checkout therefore failed with npm's
  "Missing: lenis@^1.3.27 from lock file" sync error.
- Ran `npm install` (Node v24.22.1, npm 10.9.4) in a fresh clone at HEAD
  `60c18ed`. The lock file was regenerated: `node_modules/lenis` added at
  1.3.28 (satisfies ^1.3.27), plus two entries npm had omitted
  (`@img/sharp-wasm32`, its nested `@emnapi/runtime`). No existing
  package's version changed; `package.json` is byte-identical
  (md5 21ec2143cc524f12f7b241ee903ecfbf before and after).
- Files touched: `package-lock.json` only, plus these brain logs.

**Decisions and reasoning:**
- Regenerate via `npm install` rather than hand-editing the lock — the
  standard fix; no dependency added, removed, or re-versioned by hand.
- lenis stays at the range already declared in `package.json`; npm
  resolved it to the current 1.3.28 within that range.

**Problems hit and fixes:**
- The first attempt (earlier the same evening) stopped after the
  read-only diagnosis: running install/build scripts inside cloned
  content needed the owner's explicit approval. He gave it in chat, and
  this session completed the run.

**Verification:**
- `npm ci --dry-run` now completes with no sync complaint.
- `npm run build` passes: compiled successfully, type/lint checks pass,
  all 26 static pages generated.
- Push verified by blob-SHA read-back against the GitHub API and the
  commit's file list (see changelog entry).

**Status:** Done. Pushing the lock file triggers a Vercel redeploy of the
portfolio — expected; the change is lock-only, no site code changed.
Related commit: TBD at write time — the `chore(deps): sync package-lock.json with package.json (add missing lenis)` commit created by this session's push; its SHA is confirmed by blob-SHA read-back in the same run.
