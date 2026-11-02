'use client';
import { useEffect, useRef, useState } from 'react';

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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
  }, []);

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
