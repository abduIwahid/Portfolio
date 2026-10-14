# Abdul Wahid — Personal Portfolio

Static personal portfolio for showcasing AI/ML work, software projects, experience, learning, and professional links. The existing homepage is preserved; supporting pages provide clean short routes for common portfolio destinations.

## Stack

- HTML5, CSS3, vanilla JavaScript
- Vercel static hosting and routing (`vercel.json`)
- No application server, database, login, or build step required

## Pages and routes

| Route | Purpose |
|---|---|
| `/` | Main portfolio |
| `/cv` | Opens the bundled `CV.pdf` |
| `/github`, `/linkedin`, `/leetcode` | Redirects to public profiles |
| `/projects` | Project index |
| `/nearsend`, `/churn-prediction`, `/connect-four-ai` | Project detail pages |
| `/experience`, `/certificates`, `/achievements` | Experience and learning records |
| `/blog` | Proposed article topics (clearly marked as unpublished) |
| `/links`, `/contact`, `/docs` | Contact and reference pages |
| `/privacy`, `/terms` | Site information |

## Run locally

You can open `index.html` directly, but use a local HTTP server to test clean routes and relative assets:

```bash
python -m http.server 8000
```

Open `http://localhost:8000`. The clean routes and redirects in `vercel.json` are applied by Vercel, not by Python's basic HTTP server. For a local routing preview, use Vercel CLI (`vercel dev`) after installing it.

## Deploy

1. Push the repository to GitHub.
2. Import the repository into Vercel as a static project (no build command required).
3. Deploy, then test `/cv`, each clean route, redirects, the PDF, and a nonexistent URL.
4. Attach `abdulwahid.me` in Vercel and verify DNS/HTTPS in the Vercel dashboard. Domain status is not asserted by this repository.

## Accuracy note

Project and credential details should be checked against their linked repositories or issuer records before publication. The blog topic cards are proposals, not published articles. This repository does not implement a contact form or collect form submissions.
