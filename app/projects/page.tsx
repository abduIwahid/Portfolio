import type { Metadata } from 'next';
import { ProjectHScroll } from '@/components/project-hscroll';
import { projects } from '@/content/projects';
export const metadata: Metadata = { title: 'Projects', description: 'Explore AI/ML projects, engineering work, and evidence-based technical case studies by Abdul Wahid.', alternates: { canonical: '/projects' } };
const LEAD_SLUGS = ['planbanao', 'medisight-ai', 'study-hub'];
const orderedProjects = [
  ...LEAD_SLUGS.map((slug) => projects.find((project) => project.slug === slug)!),
  ...projects.filter((project) => !LEAD_SLUGS.includes(project.slug)),
].filter(Boolean);
export default function ProjectsPage() { return <><section className="page-hero"><div className="container"><div className="page-heading"><p className="eyebrow">Project directory: {projects.length} projects</p><h1>Work you can<br />look under the <span className="accent-serif">hood</span> of.</h1><p>Scroll through the work. Each case study separates implementation details from evaluation evidence and makes limitations explicit.</p></div><aside className="page-side-note page-side-note-center">Repository links are the source of truth for implementation. This site adds context; it does not replace code review.</aside></div></section><ProjectHScroll projects={orderedProjects} /></>; }
