'use client';
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * Floating back-to-top button, mounted once in the root layout.
 *
 * A 48px ink circle fixed to the bottom-right corner. It stays hidden
 * (faded, shifted down, inert) until the page has scrolled past 600px,
 * then fades/slides in. Clicking scrolls back to the top: smoothly via
 * the native smooth scroll — the same window scroll Lenis runs on in
 * window mode (SmoothScroll exposes no instance handle to reuse), and
 * instantly under prefers-reduced-motion, where the entrance animation
 * is also disabled in globals.css. Visibility reads plain window
 * scroll, so it behaves the same with and without Lenis.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setVisible(window.scrollY > 600);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const backToTop = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      type="button"
      className={`back-to-top${visible ? ' is-visible' : ''}`}
      aria-label="Back to top"
      onClick={backToTop}
      tabIndex={visible ? undefined : -1}
    >
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  );
}
