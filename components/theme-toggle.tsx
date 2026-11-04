'use client';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

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
    window.localStorage.setItem('theme', next);
    setIsDark(!isDark);
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
