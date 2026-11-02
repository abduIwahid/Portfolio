import type { ReactNode } from 'react';

/**
 * Route-change transition: template.tsx remounts on every client-side
 * navigation, so the wrapper's entrance animation (fade + 8px rise,
 * house ease, ~300ms) replays per route. First load stays covered by
 * the intro loader; the animation is disabled under
 * prefers-reduced-motion via globals.css.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
