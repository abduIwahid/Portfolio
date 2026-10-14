import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { colors: { background: 'var(--background)', surface: 'var(--surface)', border: 'var(--border)', foreground: 'var(--foreground)', muted: 'var(--muted)', accent: 'var(--accent)' } } },
  plugins: []
};
export default config;
