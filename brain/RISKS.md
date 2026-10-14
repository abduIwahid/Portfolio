# Risks and Fallbacks

| Risk | Likelihood / impact | Prevention | Fallback |
|---|---|---|---|
| Profile/repository claims are inaccurate or stale | Medium / High | Verify repositories, CV, LinkedIn; maintain claim ledger | Omit disputed claim until owner confirms |
| Contact email fails due to domain verification | Medium / High | Set up early and test actual delivery | Hide/disable form; show approved email/LinkedIn links |
| GitHub API is unavailable/rate-limited | Medium / Medium | Local project content is source of truth; cache optional metadata | Render local project records only |
| Custom domain/DNS not accessible | Medium / Medium | Deploy to Vercel URL first | Use generated Vercel subdomain for demo |
| Vercel plan terms/limits unsuitable | Low / High | Check current official terms and intended use | Choose a compliant plan/host with owner approval |
| Scope creep | High / High | 30-minute tasks, MUST/SHOULD/COULD, freeze at 3:00 | Apply cut list in BUILD_PLAN |
| Dependency conflict or install delay | Medium / High | Minimal stack; lockfile; early build | Remove optional package and use native implementation |
| Four-hour time overrun | High / High | Deploy empty app first; mock-first | Cut optional animations, advanced search, CV variants |
| Demo Wi-Fi/network failure | Medium / High | Test venue/network; pre-record demo | Local preview if available + 60–90s video |
| Mobile layout defect | Medium / High | Test mobile early, not only at end | Simplify layout and remove decorative elements |
| Fake or unverified project metrics appear | Medium / High | Evidence ledger and owner review | Remove metric; describe method/limitations only |
| Analytics/privacy mismatch | Low / Medium | Use minimal analytics; review terms and legal obligations | Disable analytics |
| Font/image licensing issue | Low / Medium | System font; owner-approved project screenshots | Remove asset and use CSS/text layout |
| Secrets leaked | Low / Critical | Env vars, `.gitignore`, secret scanning | Revoke/rotate immediately, rollback if needed |
| Project screenshots are missing | High / Low | Use structured text case studies initially | Keep neutral screenshot placeholder out of production |
