'use client';
import { useState } from 'react';

/** Fresh screenshot of a live site, captured on demand by the mShots service.
 *  mShots caches per (URL, width): bumping the width is the cache-bust
 *  lever when a project's site is redesigned (session 25, WhyRisk). */
export function shotUrl(demo: string, width = 1240) {
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(demo)}?w=${width}`;
}

export function ProjectShot({ demo, name, width = 820 }: { demo: string; name: string; width?: number }) {
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
        src={shotUrl(demo, width)}
        alt={`Live screenshot of ${name}`}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </a>
  );
}
