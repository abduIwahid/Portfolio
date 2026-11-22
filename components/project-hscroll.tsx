'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';
import type { Project } from '@/content/projects';
import { shotUrl } from './project-shot';

/**
 * /projects — scroll-driven horizontal showcase (owner-approved design,
 * 2026-11-22): the section pins and vertical scroll translates the
 * panels sideways, one project per viewport, with a parallax word
 * behind each panel. Falls back to a plain vertical stack when the
 * visitor prefers reduced motion.
 */
export function ProjectHScroll({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [staticMode, setStaticMode] = useState(false);
  const n = projects.length;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStaticMode(true);
      return;
    }
    let raf = 0;
    const render = () => {
      raf = 0;
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;
      const total = section.offsetHeight - window.innerHeight;
      const progress = total > 0
        ? Math.min(1, Math.max(0, -section.getBoundingClientRect().top / total))
        : 0;
      const width = section.clientWidth;
      track.style.transform = `translateX(${(-progress * (n - 1) * width).toFixed(1)}px)`;
      if (barRef.current) barRef.current.style.width = `${(progress * 100).toFixed(2)}%`;
      track.querySelectorAll<HTMLElement>('.hs-word').forEach((word, i) => {
        const segment = Math.min(1, Math.max(0, progress * n - i + 0.5));
        word.style.transform = `translateX(calc(-50% + ${((0.5 - segment) * 240).toFixed(1)}px))`;
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(render); };
    render();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [n]);

  return (
    <section
      ref={sectionRef}
      className={`hs-section${staticMode ? ' hs-static' : ''}`}
      style={staticMode ? undefined : { height: `${n * 100}vh` }}
      aria-label="All projects, horizontal showcase"
    >
      <div className="hs-sticky">
        <div className="hs-progress" aria-hidden="true"><span ref={barRef} /></div>
        <div ref={trackRef} className="hs-track">
          {projects.map((project, i) => (
            <article key={project.slug} className="hs-panel">
              <div className="hs-word" aria-hidden="true">{project.name.toUpperCase()}</div>
              {project.demo ? (
                <a
                  className="hs-shot"
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open the live site of ${project.name}`}
                >
                  <img src={shotUrl(project.demo, 1240)} alt={`Live screenshot of ${project.name}`} loading="lazy" />
                </a>
              ) : (
                <div className="hs-shot hs-noshot">
                  <span>{project.name}</span>
                  <small>Repository only — no live demo</small>
                </div>
              )}
              <h2 className="hs-name">{project.name}</h2>
              <p className="hs-summary">{project.summary}</p>
              <div className="tag-row hs-tags">
                {project.stack.slice(0, 4).map((tag) => (
                  <span className="tag" key={tag}>{tag}</span>
                ))}
                {project.stack.length > 4 && <span className="tag more-tag">+{project.stack.length - 4}</span>}
              </div>
              <div className="hs-links">
                <Link className="text-link" href={`/projects/${project.slug}`}>
                  Read the case study <ArrowUpRight size={16} />
                </Link>
                {project.repo && (
                  <a className="hs-gh" href={project.repo} target="_blank" rel="noreferrer" aria-label={`GitHub repository of ${project.name}`}>
                    <Github size={17} />
                  </a>
                )}
              </div>
              <span className="hs-count">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
