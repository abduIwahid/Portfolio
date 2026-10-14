'use client';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    const saved = window.localStorage.getItem('theme');
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const next = saved === 'dark' || saved === 'light' ? saved : preferred;
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
