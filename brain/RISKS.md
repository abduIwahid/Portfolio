# Risks and Fallbacks

| Risk | Likelihood/impact | Mitigation | Fallback |
|---|---|---|---|
| `/cv` redirect fails in production | Medium / High | Test preview and both domains; inspect Vercel config | Share the known direct PDF URL temporarily |
| Custom domain points to wrong project | Unknown / High | Verify Vercel Domains and DNS before changes | Use working `*.vercel.app` URL |
| GitHub API is rate-limited/down | Medium / Medium | Catch errors and avoid making stats core to page | Show profile/repository links without live stats |
| External fonts/assets fail | Medium / Low | System font fallback; minimize dependencies | Render with local/system styles |
| Scope grows into full rewrite | High / High | Follow MUST/SHOULD/COULD scope and cut list | Ship CV, profiles, and verified projects first |
| Existing inline HTML/CSS is hard to maintain | High / Medium | Make small changes; avoid broad rewrite under time pressure | Document debt and defer refactor |
| New routes return 404 on refresh | Medium / High | Test direct navigation and Vercel routing behavior | Use static HTML files or tested rewrites |
| Project claims are inaccurate | Medium / High | Verify against source/repositories and owner confirmation | Omit claim or mark it TBD |
| Mobile layout breaks | Medium / High | Test 320/360/768px widths and touch interactions | Roll back affected UI change |
| Deployment fails | Medium / High | Deploy preview first; inspect logs | Roll back to last known-good deployment |
| DNS change causes outage | Low/Unknown / Critical | Do not edit DNS without confirming provider and records | Restore prior records from documented snapshot |
| Free-tier or policy limits change | Medium / Medium | Verify official plan/pricing pages at implementation time | Keep the site static and avoid new service dependency |
| CV or contact info becomes stale | Medium / Medium | Owner review before release | Keep last verified file/link and note update needed |

## Wi-Fi failure
Not applicable: this portfolio is a public website and does not require local network discovery. If demo access is poor, keep screenshots/recording and the fallback Vercel URL available.
