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
 *
 * Visibility is re-derived from the live scroll position on every
 * animation frame (change-guarded, so React re-renders only on an
 * actual show/hide transition) rather than from discrete scroll
 * events. A scroll-event-driven state can be left permanently stale
 * when the tail of a programmatic smooth scroll is coalesced and no
 * final event reaches the listener — the button then stays visible
 * at scrollY = 0 with nothing left to correct it. Reading the
 * position directly each frame (the same direct-read approach as
 * ScrollProgress) makes the state a faithful function of where the
 * page actually is, under every kind of scroll: manual, native
 * smooth, or Lenis-animated.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    let current = false;
    const sync = () => {
      const next = window.scrollY > 600;
      if (next !== current) {
        current = next;
        setVisible(next);
      }
    };
    // Perf (2026-11-10): this used to poll scrollY on a permanent
    // rAF loop. A passive scroll listener reads the same live
    // position the moment it changes — including during Lenis's
    // animated scroll back to the top, which fires real scroll
    // events — plus one sync on mount and on resize. Identical
    // visibility behaviour, zero idle cost.
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      window.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
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
