'use client';
import { useEffect, useRef } from 'react';

/**
 * Scroll-triggered text animation, following the UI Layouts
 * scroll-text block the owner supplied (2026-11-22): the text
 * splits into words; as it enters the viewport each word
 * resolves from blur(10px) + transparent + offset to sharp and
 * settled, staggered, one shot. `direction` picks where the
 * words come from: 'left' / 'right' slide along X, 'down' the
 * default rise along Y. The original runs on the motion
 * package; this keeps the site's zero-dependency pattern — an
 * IntersectionObserver adds .is-visible and CSS does the rest.
 * Under prefers-reduced-motion the text renders plainly.
 */
export function ScrollText({
  text,
  as = 'span',
  direction = 'down',
  className = '',
}: {
  text: string;
  as?: 'h2' | 'h3' | 'p' | 'span';
  direction?: 'left' | 'right' | 'down';
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
    <Tag ref={ref} className={`scroll-text st-dir-${direction} ${className}`}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="st-word"
          style={{ transitionDelay: `${i * 80}ms` }}
        >
          {word}
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  );
}
