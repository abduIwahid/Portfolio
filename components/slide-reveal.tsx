'use client';
import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Directional scroll reveal (2026-11-22): the child starts
 * transparent, slightly blurred and offset to one side; when it
 * enters the viewport it slides in from that side and settles,
 * one shot. Same zero-dependency IO + CSS pattern as Reveal.
 * Under prefers-reduced-motion the child renders plainly.
 */
export function SlideReveal({
  children,
  from = 'left',
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  from?: 'left' | 'right';
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

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
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`slide-reveal slide-from-${from} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
