'use client';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    // Always default to light; only honour an explicit user-saved preference
    const saved = window.localStorage.getItem('theme');
    const next = saved === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    setTheme(next);
  }, []);
  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem('theme', next);
    setTheme(next);
  }
  return <button className="icon-button theme-toggle" type="button" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title="Toggle colour theme">{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</button>;
}
