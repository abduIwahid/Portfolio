'use client';
import { useEffect, useRef } from 'react';

/**
 * Reading progress bar, mounted once in the root layout.
 *
 * A 3px accent line pinned to the very top of the viewport, above the
 * header. Its fill is the share of the page already scrolled:
 * scrollY / (document height - viewport height). Driven by transform:
 * scaleX (origin left) straight from the scroll position — no width
 * animation and no transition, so it tracks scrolling 1:1. Reads plain
 * window scroll, so it behaves identically with and without Lenis
 * (window mode drives the real document scroll). On a page no taller
 * than the viewport it stays empty.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
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
  }, []);

  return <div className="scroll-progress" ref={barRef} aria-hidden="true" />;
}
