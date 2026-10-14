# Environment Variables

## Current variables
No environment variables are required by the current static portfolio in the supplied repository snapshot.

| Name | Purpose | Used in | Secret? | Where to get it |
|---|---|---|---|---|
| None | No backend/config variable currently required | N/A | N/A | N/A |

## Rules for future additions
- Add names (never real values) to `.env.example`.
- Record purpose, usage, secrecy, and setup source here.
- Put secrets only in Vercel environment settings or local `.env.local` excluded by `.gitignore`.
- Never put secret API keys in frontend JavaScript; browser code is public.
- Avoid adding environment variables unless a concrete approved feature needs them.
