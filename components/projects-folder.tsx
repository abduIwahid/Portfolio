'use client';

import { useEffect, useRef, useState } from 'react';

type FolderItem = { name: string; category: string };

/**
 * Decorative folder that opens when the projects section scrolls into view.
 * The "files" inside are the featured projects; they fan out as the folder
 * front folds down. Colours come only from the site theme variables.
 */
export function ProjectsFolder({ items }: { items: FolderItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const files = items.slice(0, 5);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOpen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setOpen(true);
          io.disconnect();
        }
      },
      { threshold: 0.45 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`projects-folder${open ? ' is-open' : ''}`} aria-hidden="true">
      <div className="pf-stage">
        <svg className="pf-back" viewBox="0 0 50 40" fill="none" aria-hidden="true">
          <path
            d="M0 4C0 1.79086 1.79086 0 4 0H16.524C17.721 0 18.8415 0.54051 19.574 1.4673L22.426 5.0654C23.1585 5.99219 24.279 6.5327 25.476 6.5327H46C48.2091 6.5327 50 8.32356 50 10.5327V36C50 38.2091 48.2091 40 46 40H4C1.79086 40 0 38.2091 0 36V4Z"
            fill="currentColor"
          />
        </svg>
        {files.map((file, i) => (
          <div
            key={file.name}
            className={`pf-file pf-file-${i + 1}`}
            style={{ transitionDelay: open ? `${0.12 + i * 0.07}s` : '0s' }}
          >
            <span className="pf-file-name">{file.name}</span>
            <span className="pf-file-tag">{file.category}</span>
          </div>
        ))}
        <div className="pf-front">
          <span className="pf-front-line" />
          <span className="pf-front-label">Projects</span>
          <span className="pf-count">
            <span className="pf-dot" />
            Files
            <strong>{String(files.length).padStart(2, '0')}</strong>
          </span>
        </div>
        <span className="pf-hint">Scroll to open</span>
      </div>
    </div>
  );
}
