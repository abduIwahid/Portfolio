'use client';
import { useEffect, useRef } from 'react';

/**
 * Scroll-triggered text animation, adapted from the UI Layouts
 * scroll-text block at the owner's request (2026-11-22): the text
 * splits into words, and as it enters the viewport each word
 * resolves from blur(10px) + transparent + 20px low to sharp and
 * settled, staggered ~90ms per word, one shot. The original runs
 * on the motion package; this keeps the site's zero-dependency
 * pattern — an IntersectionObserver adds .is-visible and CSS does
 * the rest, exactly like Reveal. Under prefers-reduced-motion the
 * words render plainly with no transition. If JS or IO is
 * unavailable the effect still resolves to fully visible.
 */
export function ScrollText({
  text,
  as = 'span',
  className = '',
}: {
  text: string;
  as?: 'h2' | 'p' | 'span';
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      el.classList.add('is-visible');
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(' ');
  const Tag = as as 'span';
  return (
    <Tag ref={ref} className={`scroll-text ${className}`}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="st-word"
          style={{ transitionDelay: `${i * 90}ms` }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
