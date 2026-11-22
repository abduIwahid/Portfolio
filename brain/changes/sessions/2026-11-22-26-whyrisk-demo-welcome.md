# Session 26 — WhyRisk demo URL → /welcome (2026-11-22)

**Owner report (follow-up to session 25):** the WhyRisk panel still showed
the old dark landing.

**Root cause found:** session 25's width bump resized the mShots output
but did NOT bust the underlying capture — the capture is keyed on the
exact target URL, and `https://whyrisk.vercel.app` (which 308-redirects
to /welcome) still maps to the pre-redesign capture. The `/welcome`
target, never captured before, returned the NEW violet landing on the
first request (verified by fetching the capture directly).

**Change:** WhyRisk's `demo` in content/projects.ts →
`https://whyrisk.vercel.app/welcome`. The link destination is unchanged
(the root redirected there anyway); the panel now renders the fresh
capture. Other projects untouched.
