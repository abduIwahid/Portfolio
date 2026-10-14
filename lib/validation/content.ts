import { z } from 'zod';

const httpsUrl = z.string().url().refine((value) => value.startsWith('https://'), 'Expected an HTTPS URL');
export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().trim().min(2).max(100),
  category: z.enum(['Machine Learning', 'Applied AI', 'Web Engineering', 'Database Systems']),
  kind: z.string().trim().min(2).max(120),
  summary: z.string().trim().min(20).max(500),
  problem: z.string().trim().min(20).max(1500),
  role: z.string().trim().min(5).max(500),
  status: z.string().trim().min(2).max(100),
  featured: z.boolean(),
  stack: z.array(z.string().trim().min(1)).min(1).max(30),
  highlights: z.array(z.string().trim().min(5)).min(1).max(20),
  approach: z.array(z.object({ title: z.string().trim().min(2), body: z.string().trim().min(10) })).min(1).max(10),
  evidence: z.array(z.object({ label: z.string().trim().min(1), value: z.string().trim().min(1), note: z.string().trim().min(5), source: httpsUrl.optional() })).min(1).max(20),
  limitations: z.array(z.string().trim().min(10)).min(1).max(20),
  repo: httpsUrl.optional(),
  demo: httpsUrl.optional(),
  accent: z.enum(['orange', 'ink', 'paper'])
}).strict();

export const articleSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().trim().min(5).max(180),
  deck: z.string().trim().min(15).max(400),
  category: z.string().trim().min(2).max(60),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  readTime: z.string().regex(/^\d+ min read$/),
  status: z.enum(['Published', 'Draft']),
  projectSlugs: z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)),
  sections: z.array(z.object({ heading: z.string().trim().min(3), paragraphs: z.array(z.string().trim().min(20)).min(1), bullets: z.array(z.string().trim().min(5)).optional() })).min(1),
  references: z.array(z.object({ label: z.string().trim().min(3), href: httpsUrl })).min(1)
}).strict();
