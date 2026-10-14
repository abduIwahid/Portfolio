import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const root = process.cwd();
const projects = readFileSync(join(root, 'content/projects.ts'), 'utf8');
const articles = readFileSync(join(root, 'content/articles.ts'), 'utf8');
const routeFiles = ['app/page.tsx', 'app/projects/page.tsx', 'app/projects/[slug]/page.tsx', 'app/writing/page.tsx', 'app/writing/[slug]/page.tsx', 'app/about/page.tsx', 'app/cv/page.tsx', 'app/contact/page.tsx', 'app/privacy/page.tsx', 'app/api/contact/route.ts', 'app/api/github/route.ts', 'app/not-found.tsx', 'app/sitemap.ts', 'app/robots.ts'];

test('project slugs are unique and URL-safe', () => {
  const slugs = [...projects.matchAll(/slug: '([^']+)'/g)].map((match) => match[1]);
  assert.ok(slugs.length >= 8, 'expected at least eight curated project records');
  assert.equal(new Set(slugs).size, slugs.length, 'duplicate project slug found');
  for (const slug of slugs) assert.match(slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
});

test('project records contain repository links and explicit limitations', () => {
  assert.match(projects, /repo: 'https:\/\/github\.com\//);
  assert.ok((projects.match(/limitations:/g) || []).length >= 8);
  assert.doesNotMatch(projects.toLowerCase(), /lorem ipsum|insert project here|todo: replace/);
});

test('article slugs and references are present', () => {
  const slugs = [...articles.matchAll(/slug: '([^']+)'/g)].map((match) => match[1]);
  assert.ok(slugs.length >= 2);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.match(articles, /https:\/\/scikit-learn\.org/);
  assert.match(articles, /https:\/\/shap\.readthedocs\.io/);
});

test('required app routes and CV PDF exist', () => {
  for (const file of routeFiles) assert.ok(existsSync(join(root, file)), `missing route: ${file}`);
  assert.ok(existsSync(join(root, 'public/cv/abdul-wahid-cv.pdf')), 'missing downloadable CV PDF');
});

test('GitHub metadata is optional and has a graceful fallback', () => {
  const api = readFileSync(join(root, 'app/api/github/route.ts'), 'utf8');
  const widget = readFileSync(join(root, 'components/github-snapshot.tsx'), 'utf8');
  assert.match(api, /safeParse/);
  assert.match(api, /Cache-Control/);
  assert.match(api, /available: false/);
  assert.match(widget, /Project links remain available/);
});

test('contact route contains server-side validation and does not expose provider key', () => {
  const api = readFileSync(join(root, 'app/api/contact/route.ts'), 'utf8');
  assert.match(api, /safeParse/);
  assert.match(api, /RESEND_API_KEY/);
  assert.match(api, /status: 429/);
  assert.doesNotMatch(api, /NEXT_PUBLIC_RESEND_API_KEY/);
});
