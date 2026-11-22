'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Giant faded wordmark — the footer's closing signature.
 *
 * "ABDUL WAHID" in Anton at viewport scale, letters clipped by
 * per-letter overflow-hidden wrappers. The first time the band
 * scrolls into view (IntersectionObserver, once) the letters rise
 * from translateY(110%) to 0 on the house ease, staggered ~35ms
 * per letter, then stay. Purely decorative: aria-hidden, since his
 * name already appears in the footer text. Under reduced motion
 * the letters are simply static (CSS forces no transform).
 */

const NAME = 'ABDUL WAHID';

export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  const pathname = usePathname();

  // The footer lives in the shared layout, so without this the rise
  // would only ever play on the first page of a visit. Bump playKey
  // on every route change — and on a bfcache restore (mobile Safari
  // refresh/back), which remounts nothing — so the animation replays
  // on every page load, exactly as the owner asked (2026-11-22).
  useEffect(() => {
    setPlayKey((k) => k + 1);
  }, [pathname]);

  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) setPlayKey((k) => k + 1);
    };
    window.addEventListener('pageshow', onShow);
    return () => window.removeEventListener('pageshow', onShow);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setInView(false);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [playKey]);

  return (
    <div
      ref={ref}
      className={`footer-wordmark${inView ? ' in-view' : ''}`}
      aria-hidden="true"
    >
      {NAME.split('').map((ch, i) => (
        <span key={i} className="wm-letter">
          <span
            className="wm-letter-in"
            style={{ transitionDelay: `${i * 35}ms` }}
          >
            {ch === ' ' ? ' ' : ch}
          </span>
        </span>
      ))}
    </div>
  );
}
