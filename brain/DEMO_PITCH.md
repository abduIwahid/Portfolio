# Demo Pitch

## 3-minute walkthrough
**0:00–0:25 — Problem:** Recruiters need a fast way to verify a candidate's skills and inspect real work. A visually attractive portfolio is not enough if links break or claims cannot be checked.

**0:25–0:50 — Solution:** Introduce Abdul Wahid's portfolio as a lightweight professional hub, prioritizing a memorable CV route and verified project evidence.

**0:50–1:45 — Demo:** Open homepage, use `/cv`, visit a project, show its repository/demo links, then show GitHub/LinkedIn and mobile navigation. Only demo routes confirmed working in production.

**1:45–2:20 — Technical execution:** Explain static HTML/CSS/JavaScript, Vercel hosting, route redirects, public GitHub API integration, and why no database/backend is needed for public content.

**2:20–2:45 — Design/accessibility:** Show responsive layout, readable hierarchy, keyboard focus, loading/error fallback for external data.

**2:45–3:00 — Next steps:** Improve case studies, publish properly cited technical articles, automate link checks if justified.

## Pitch-deck outline
1. Problem: recruiter friction and unverifiable portfolio claims.
2. Solution: clean, fast professional hub with concise URLs.
3. Demo: CV route, projects, repository evidence, mobile.
4. Tech: static site, Vercel, GitHub integration.
5. Future: verified case studies, article library, accessibility/performance improvements.

## Judging criteria mapping
No formal judging criteria were supplied; inferred criteria are product clarity, execution, design, impact, and demo reliability.

| PRD MUST | Product clarity | Execution | Design | Impact | Demo quality |
|---|---|---|---|---|---|
| Working CV route | ✓ | ✓ |  | ✓ | ✓ |
| Correct profile links | ✓ | ✓ |  | ✓ | ✓ |
| Preserve existing site |  | ✓ |  | ✓ | ✓ |
| Responsive navigation |  | ✓ | ✓ | ✓ | ✓ |
| Accurate project evidence | ✓ | ✓ | ✓ | ✓ | ✓ |
| Accessibility baseline |  | ✓ | ✓ | ✓ |  |

## Submission summary
**Title:** Abdul Wahid — AI/ML Developer Portfolio  
**Summary:** A lightweight personal portfolio that connects visitors to verified projects, professional profiles, and a concise CV route. Built with static web technologies and hosted on Vercel.  
**Live demo:** `https://abdulwahid.me` — verify current production state before submission.  
**Differentiator:** Prioritizes working links and evidence-backed project details over unsupported claims and unnecessary infrastructure.

## Backup demo
- Keep a local static copy served with `python -m http.server 8000`.
- Record a 60–90 second demo after the deployed site is verified.
- Keep a screenshot of the homepage and the CV route result.
- If the custom domain fails, use the fallback Vercel domain only after confirming it works.
