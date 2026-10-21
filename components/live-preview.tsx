'use client';
import { useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';
import { shotUrl } from './project-shot';

/**
 * Click-to-load live preview: shows the site's screenshot first (fast, light),
 * and only loads the real deployed site in an iframe when the visitor asks.
 */
export function LivePreview({ demo, name }: { demo: string; name: string }) {
  const [active, setActive] = useState(false);
  return (
    <div className="live-preview">
      {active ? (
        <iframe
          className="live-preview-frame"
          src={demo}
          title={`Live preview of ${name}`}
          loading="lazy"
          allow="clipboard-write; fullscreen"
          referrerPolicy="no-referrer"
        />
      ) : (
        <button
          type="button"
          className="live-preview-poster"
          onClick={() => setActive(true)}
          aria-label={`Load the live preview of ${name}`}
        >
          <img src={shotUrl(demo)} alt="" aria-hidden="true" />
          <span className="live-preview-cta">
            <span className="live-preview-play">
              <Play size={20} aria-hidden="true" />
            </span>
            <span className="live-preview-text">
              <strong>Live preview</strong>
              <small>Run the actual deployed site right here</small>
            </span>
          </span>
        </button>
      )}
      <div className="live-preview-bar">
        <span className="live-preview-url">
          <span className="live-dot" aria-hidden="true" />
          {demo.replace('https://', '')}
        </span>
        <a href={demo} target="_blank" rel="noreferrer" className="text-link">
          Open in new tab <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}
