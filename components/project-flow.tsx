'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Github, X } from 'lucide-react';
import type { Project } from '@/content/projects';
import { ProjectShot } from './project-shot';
import { LivePreview } from './live-preview';

/**
 * Scroll-driven project flow. A tall stage pins a sticky viewport; the
 * scroll position alone decides which project card is in front, so the
 * flow runs forwards and backwards at exactly the visitor's scroll speed.
 * Performance: transforms are written straight to the DOM in a rAF loop —
 * React only re-renders when the front card index actually changes.
 * Clicking the front card opens its details with a live preview.
 */
export function ProjectFlow({ projects }: { projects: Project[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const [active, setActive] = useState(0);
  const [staticMode, setStaticMode] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const n = projects.length;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStaticMode(true);
      return;
    }
    let raf = 0;
    let lastActive = 0;
    const applyCard = (i: number, s: number) => {
      const node = cardRefs.current[i];
      if (!node) return;
      const d = s - i;
      let opacity = 0;
      let ty = 64;
      let sc = 0.95;
      if (d <= -1) {
        opacity = 0;
      } else if (d < 0) {
        const t = d + 1;
        opacity = t;
        ty = 64 * (1 - t);
        sc = 0.95 + 0.05 * t;
      } else if (d < 1) {
        opacity = 1 - d;
        ty = -44 * d;
        sc = 1 - 0.06 * d;
      } else {
        opacity = 0;
        ty = -44;
        sc = 0.94;
      }
      node.style.opacity = opacity.toFixed(3);
      node.style.transform = `translate3d(0, ${ty.toFixed(1)}px, 0) scale(${sc.toFixed(3)})`;
      node.style.zIndex = String(50 - Math.round(Math.abs(d) * 10));
      node.style.visibility = opacity <= 0.01 ? 'hidden' : 'visible';
      node.style.pointerEvents = Math.round(s) === i ? 'auto' : 'none';
    };
    const update = () => {
      raf = 0;
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      const s = p * (n - 1);
      for (let i = 0; i < n; i++) applyCard(i, s);
      if (hintRef.current) {
        hintRef.current.style.opacity = s < 0.15 ? '1' : '0';
      }
      const a = Math.min(n - 1, Math.max(0, Math.round(s)));
      if (a !== lastActive) {
        lastActive = a;
        setActive(a);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [n]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [selected]);

  const stop = (e: MouseEvent) => e.stopPropagation();

  const renderCard = (project: Project) => (
    <article
      className={`project-card project-${project.accent}`}
      onClick={() => setSelected(project)}
    >
      {project.demo && <ProjectShot demo={project.demo} name={project.name} />}
      <div className="project-card-top">
        <span className="project-card-name">{project.name}</span>
        <div className="project-card-top-actions">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="project-github-btn"
              aria-label={`GitHub repo for ${project.name}`}
              onClick={stop}
            >
              <Github size={15} />
            </a>
          )}
          <span className="project-arrow project-arrow-link" aria-hidden="true">
            <ArrowUpRight size={19} />
          </span>
        </div>
      </div>
      <div className="project-card-body">
        <p className="project-summary">{project.summary}</p>
        <div className="tag-row">
          {project.stack.slice(0, 4).map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
          {project.stack.length > 4 && <span className="tag more-tag">+{project.stack.length - 4}</span>}
        </div>
        <p className="flow-tap-hint">Tap card for details &amp; live preview</p>
      </div>
    </article>
  );

  return (
    <>
      {staticMode ? (
        <div className="flow-static">
          {projects.map((project) => (
            <div key={project.slug}>{renderCard(project)}</div>
          ))}
        </div>
      ) : (
        <div className="flow" ref={stageRef} style={{ height: `${n * 115}vh` }}>
          <div className="flow-sticky">
            <div className="flow-cards">
              {projects.map((project, i) => (
                <div
                  key={project.slug}
                  className="flow-card"
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  {renderCard(project)}
                </div>
              ))}
            </div>
            <div className="flow-ui">
              <div className="flow-dots" aria-hidden="true">
                {projects.map((project, i) => (
                  <span key={project.slug} className={`flow-dot${i === active ? ' is-active' : ''}`} />
                ))}
              </div>
              <p className="flow-counter">
                {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')} · {projects[active].name}
              </p>
              <p className="flow-scroll-hint" ref={hintRef}>
                Scroll — projects flow by, scroll back to rewind
              </p>
            </div>
          </div>
        </div>
      )}

      {selected && (
        <div className="flow-modal-backdrop" onClick={() => setSelected(null)}>
          <div
            className="flow-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.name} details`}
            onClick={stop}
          >
            <button
              className="icon-button flow-modal-close"
              onClick={() => setSelected(null)}
              aria-label="Close details"
            >
              <X size={18} />
            </button>
            <p className="eyebrow">{selected.kind}</p>
            <h3 className="flow-modal-title">{selected.name}</h3>
            <p className="flow-modal-summary">{selected.summary}</p>
            {selected.demo && <LivePreview demo={selected.demo} name={selected.name} />}
            <div className="tag-row">
              {selected.stack.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            {selected.highlights.length > 0 && (
              <ul className="flow-highlights">
                {selected.highlights.slice(0, 3).map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
            <div className="flow-modal-actions">
              {selected.demo && (
                <a className="button button-primary" href={selected.demo} target="_blank" rel="noreferrer">
                  Visit live site <ArrowUpRight size={16} />
                </a>
              )}
              <Link className="button button-secondary" href={`/projects/${selected.slug}`}>
                Read case study <ArrowUpRight size={16} />
              </Link>
              {selected.repo && (
                <a className="button button-secondary" href={selected.repo} target="_blank" rel="noreferrer">
                  <Github size={16} /> GitHub
                </a>
              )}
            </div>
            <p className="flow-modal-status">
              {selected.status} · {selected.role}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
