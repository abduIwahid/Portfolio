'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';
import type { Project } from '@/content/projects';
import { shotUrl } from './project-shot';

/**
 * Home "Selected work" — expanding panel gallery (owner-approved design,
 * 2026-11-22): collapsed panels are slim strips with a vertical name
 * label; the hovered / tapped / focused panel expands to show the live
 * screenshot with its summary, stack and links.
 */
export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(0);
  return (
    <div
      className={`pg-strip${active === null ? ' idle' : ''}`}
      onMouseLeave={() => setActive(null)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setActive(null);
      }}
    >
      {projects.map((project, i) => {
        const isActive = i === active;
        return (
          <article
            key={project.slug}
            className={`pg-panel${isActive ? ' active' : ''}`}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            onFocus={() => setActive(i)}
            tabIndex={0}
            aria-label={`${project.name} — activate to expand`}
          >
            {project.demo && (
              <img
                className="pg-shot"
                src={shotUrl(project.demo, 1200)}
                alt={`Live screenshot of ${project.name}`}
                loading="lazy"
              />
            )}
            <div className="pg-scrim" />
            <span className="pg-idx">{String(i + 1).padStart(2, '0')}</span>
            <span className="pg-vlabel" aria-hidden="true">{project.name}</span>
            <div className="pg-pbtns">
              {project.repo && (
                <a
                  className="pg-btn"
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`GitHub repository of ${project.name}`}
                  onClick={(event) => event.stopPropagation()}
                >
                  <Github size={15} />
                </a>
              )}
              <Link
                className="pg-btn"
                href={`/projects/${project.slug}`}
                aria-label={`Read the case study of ${project.name}`}
                onClick={(event) => event.stopPropagation()}
              >
                <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="pg-content">
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <div className="tag-row pg-tags">
                {project.stack.slice(0, 4).map((tag) => (
                  <span className="tag" key={tag}>{tag}</span>
                ))}
                {project.stack.length > 4 && <span className="tag more-tag">+{project.stack.length - 4}</span>}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
