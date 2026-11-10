'use client';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

/**
 * Theme toggle — plain instant flip.
 *
 * History: an ink-bleed transition lived here for one evening
 * (2026-11-10, WebGL build, then a DOM clip-path build). Wadi found
 * it did not look good on his phone and ordered everything back to
 * the old behaviour ("toggle wala sab purany pe hi le jao"), so the
 * overlay, its CSS hook and both renderers were removed the same
 * night. This is the pre-ink toggle: flip <html data-theme>, persist
 * to localStorage, swap the icon. Nothing else.
 */
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // The pre-paint init script in app/layout.tsx has already resolved
    // the theme (saved choice first, OS preference on a first visit);
    // mirror whatever it decided instead of forcing a default here.
    const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    setIsDark(current === 'dark');
  }, []);

  function toggle() {
    const next = isDark ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { window.localStorage.setItem('theme', next); } catch { /* storage unavailable */ }
    setIsDark(next === 'dark');
  }

  return (
    <button
      type="button"
      className="icon-button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}
