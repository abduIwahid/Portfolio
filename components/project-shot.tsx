'use client';
import { useState } from 'react';

/** Fresh screenshot of a live site, captured on demand by the mShots service. */
export function shotUrl(demo: string) {
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(demo)}?w=1200`;
}

export function ProjectShot({ demo, name }: { demo: string; name: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <a
      className="project-shot"
      href={demo}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open the live site of ${name}`}
    >
      <img
        src={shotUrl(demo)}
        alt={`Live screenshot of ${name}`}
        loading="lazy"
        onError={() => setFailed(true)}
      />
      <span className="project-shot-badge">
        <span className="live-dot" aria-hidden="true" />
        Live site
      </span>
    </a>
  );
}
