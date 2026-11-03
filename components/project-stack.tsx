'use client';
import { useEffect, useRef, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';
import type { Project } from '@/content/projects';
import { ProjectShot } from './project-shot';
import { VisitPill } from './visit-pill';

/**
 * Stacking project panels for /projects.
 *
 * Each panel wraps in a CSS-sticky shell (offset by a 14px step per index)
 * so a strip of every covered panel peeks at the top. A
 * small rAF driver measures how far the next panel has travelled over the
 * current one and scales the covered panel down (0.045 per panel above it,
 * floor 0.9) with a slight dim. Transform/filter only, passive listeners,
 * paused while the stack is off-screen, and fully inert under
 * prefers-reduced-motion (CSS also drops the sticky shells there, leaving
 * a plain stacked list). Without JS the panels render as a readable list.
 */

const SCALE_STEP = 0.045;
const SCALE_FLOOR = 0.9;
const DIM_STEP = 0.06;

export function ProjectStack({ projects }: { projects: Project[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const panels = Array.from(root.querySelectorAll<HTMLElement>('.stack-card'));
    panels.forEach((panel) => {
      panel.style.transform = '';
      panel.style.filter = '';
    });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const wraps = Array.from(root.querySelectorAll<HTMLElement>('.stack-card-wrap'));
    if (wraps.length < 2) return;

    let raf = 0;
    let running = false;
    let visible = false;
    let dirty = true;
    let lastScrollY = window.scrollY;
    const applied = panels.map(() => ({ scale: 1, dim: 1 }));

    const compute = () => {
      const peek = 14;
      const covers: number[] = new Array(wraps.length).fill(0);
      for (let i = 0; i < wraps.length - 1; i++) {
        const current = wraps[i].getBoundingClientRect();
        const next = wraps[i + 1].getBoundingClientRect();
        const span = Math.max(current.height - peek, 1);
        const raw = (current.bottom - next.top) / span;
        covers[i] = raw < 0 ? 0 : raw > 1 ? 1 : raw;
      }
      // Suffix sums: how much stack sits above each panel, in cover units
      // (a panel's own cover counts — the next panel sliding over it is
      // what starts its shrink; deeper panels add their covers on top).
      let above = 0;
      for (let i = wraps.length - 1; i >= 0; i--) {
        above += covers[i];
        const targetScale = Math.max(SCALE_FLOOR, 1 - SCALE_STEP * above);
        const targetDim = 1 - DIM_STEP * Math.min(above, 1);
        const prev = applied[i];
        if (Math.abs(targetScale - prev.scale) > 0.0004 || Math.abs(targetDim - prev.dim) > 0.0004) {
          panels[i].style.transform = targetScale === 1 ? '' : `scale(${targetScale.toFixed(4)})`;
          panels[i].style.filter = targetDim === 1 ? '' : `brightness(${targetDim.toFixed(4)})`;
          applied[i] = { scale: targetScale, dim: targetDim };
        }
      }
    };

    const frame = () => {
      if (!running) return;
      if (dirty || window.scrollY !== lastScrollY) {
        lastScrollY = window.scrollY;
        dirty = false;
        compute();
      }
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (running) return;
      running = true;
      dirty = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const observer = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              visible = entry.isIntersecting;
              if (visible) start();
              else stop();
            });
          },
          { rootMargin: '120px 0px' },
        )
      : null;
    if (observer) observer.observe(root);
    else start();

    const onResize = () => { dirty = true; };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      stop();
      if (observer) observer.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [projects]);

  return (
    <div className="project-stack" ref={rootRef}>
      {projects.map((project, index) => (
        <div
          className="stack-card-wrap"
          key={project.slug}
          style={{ '--stack-i': index, zIndex: index + 1 } as CSSProperties}
        >
          <article className={`stack-card project-${project.accent}`}>
            <div className="stack-card-text">
              <p className="eyebrow stack-card-eyebrow">{project.kind}</p>
              <h2 className="stack-card-title">{project.name}</h2>
              <p className="stack-card-summary">{project.summary}</p>
              <div className="tag-row stack-card-tags">
                {project.stack.slice(0, 6).map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                {project.stack.length > 6 && <span className="tag more-tag">+{project.stack.length - 6}</span>}
              </div>
              <div className="stack-card-actions">
                <Link className="text-link" href={`/projects/${project.slug}`}>Read case study <ArrowUpRight size={16} /></Link>
                <div className="stack-card-icon-actions">
                  {project.repo && <a href={project.repo} target="_blank" rel="noreferrer" className="project-github-btn" aria-label={`GitHub repo for ${project.name}`}><Github size={15} /></a>}
                  {project.demo && <VisitPill href={project.demo} name={project.name} />}
                </div>
              </div>
            </div>
            <div className="stack-card-media">
              {project.demo
                ? <ProjectShot demo={project.demo} name={project.name} width={1200} />
                : (
                  <div className="stack-card-cover" aria-hidden="true">
                    <span className="stack-card-cover-mono">{project.name.split(' ').filter(Boolean).slice(0, 2).map((word) => word[0]).join('')}</span>
                    <span className="stack-card-cover-name">{project.name}</span>
                    <span className="stack-card-cover-kind">{project.category} · {project.kind}</span>
                  </div>
                )}
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}
