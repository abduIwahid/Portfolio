'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Github, Search, X } from 'lucide-react';
import type { Project } from '@/content/projects';
import { ProjectShot } from './project-shot';
import { Reveal } from './reveal';

export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('featured');
  const categories = ['All', ...Array.from(new Set(projects.map((project) => project.category)))];
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const found = projects.filter((project) => {
      const matchesCategory = category === 'All' || project.category === category;
      const haystack = [project.name, project.summary, project.kind, ...project.stack].join(' ').toLowerCase();
      return matchesCategory && (!normalized || haystack.includes(normalized));
    });
    return sort === 'name' ? [...found].sort((a, b) => a.name.localeCompare(b.name)) : [...found].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [projects, query, category, sort]);
  return <>
    <div className="project-controls">
      <label className="search-field"><Search size={17} /><span className="sr-only">Search projects</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects, tools, methods…" />{query && <button type="button" className="clear-search" aria-label="Clear search" onClick={() => setQuery('')}><X size={15} /></button>}</label>
      <label className="sort-field"><span className="sr-only">Sort projects</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured first</option><option value="name">Name A–Z</option></select></label>
    </div>
    <div className="filter-row" aria-label="Filter by category">{categories.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} className={`filter-chip ${category === item ? 'selected' : ''}`} aria-pressed={category === item}>{item}</button>)}</div>
    <p className="results-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'project' : 'projects'} <span>·</span> {category === 'All' ? 'All categories' : category}</p>
    {filtered.length ? <div className="project-grid">{filtered.map((project, index) => <Reveal key={project.slug} delay={(index % 3) * 90}><article className={`project-card project-${project.accent}`}>
      {project.demo && <ProjectShot demo={project.demo} name={project.name} />}
      <div className="project-card-top">
        <span className="project-card-name">{project.name}</span>
        <div className="project-card-top-actions">
          {project.repo && <a href={project.repo} target="_blank" rel="noreferrer" className="project-github-btn" aria-label={`GitHub repo for ${project.name}`}><Github size={15} /></a>}
          <Link href={`/projects/${project.slug}`} className="project-arrow project-arrow-link" aria-label={`Read the case study of ${project.name}`}><ArrowUpRight size={19} /></Link>
        </div>
      </div>
      <div className="project-card-body"><p className="project-summary">{project.summary}</p><div className="tag-row">{project.stack.slice(0, 4).map((tag) => <span className="tag" key={tag}>{tag}</span>)}{project.stack.length > 4 && <span className="tag more-tag">+{project.stack.length - 4}</span>}</div></div>
      
    </article></Reveal>)}</div> : <div className="empty-state"><p className="eyebrow">No matching projects</p><h2>Try another search.</h2><p>Clear the search or choose a different category to see more work.</p><button className="button button-secondary" onClick={() => { setQuery(''); setCategory('All'); }}>Reset filters</button></div>}
  </>;
}
