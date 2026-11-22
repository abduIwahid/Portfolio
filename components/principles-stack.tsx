'use client';
import { useEffect, useRef, type CSSProperties } from 'react';

/**
 * Stacking principle cards for the home "Working principles" section.
 *
 * The same mechanism as the /projects stack (project-stack.tsx): each
 * card wraps in a CSS-sticky shell (offset by a 14px step per index,
 * 8px on mobile) so a strip of every covered card peeks at the top,
 * and a small rAF driver scales the covered card down (0.045 per card
 * above it, floor 0.9) with a slight dim. Transform/filter only,
 * passive listeners, paused while the stack is off-screen. Under
 * prefers-reduced-motion the driver stays inert but the sticky shells
 * keep working — sticking is positional, not an animation — so the
 * cards still stack on scroll. Without JS the cards render as a
 * readable stacked list.
 */

const SCALE_STEP = 0.045;
const SCALE_FLOOR = 0.9;
const DIM_STEP = 0.06;

export type Principle = { title: string; body: string };

export function PrinciplesStack({ principles }: { principles: Principle[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const panels = Array.from(root.querySelectorAll<HTMLElement>('.principle-stack-card'));
    panels.forEach((panel) => {
      panel.style.transform = '';
      panel.style.filter = '';
    });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const wraps = Array.from(root.querySelectorAll<HTMLElement>('.principle-stack-wrap'));
    if (wraps.length < 2) return;

    let raf = 0;
    let running = false;
    let visible = false;
    let dirty = true;
    let lastScrollY = window.scrollY;
    const applied = panels.map(() => ({ scale: 1, dim: 1 }));

    const compute = () => {
      const peek = window.innerWidth < 760 ? 8 : 14;
      const covers: number[] = new Array(wraps.length).fill(0);
      for (let i = 0; i < wraps.length - 1; i++) {
        const current = wraps[i].getBoundingClientRect();
        const next = wraps[i + 1].getBoundingClientRect();
        const span = Math.max(current.height - peek, 1);
        const raw = (current.bottom - next.top) / span;
        covers[i] = raw < 0 ? 0 : raw > 1 ? 1 : raw;
      }
      // Suffix sums: how much stack sits above each panel, in cover units.
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
  }, [principles]);

  return (
    <div className="principles-stack" ref={rootRef}>
      {principles.map((principle, index) => (
        <div
          className="principle-stack-wrap"
          key={principle.title}
          style={{ '--stack-i': index, zIndex: index + 1 } as CSSProperties}
        >
          <article className="principle-stack-card">
            <span className="principle-tick" aria-hidden="true" />
            <h3>{principle.title}</h3>
            <p>{principle.body}</p>
          </article>
        </div>
      ))}
    </div>
  );
}
