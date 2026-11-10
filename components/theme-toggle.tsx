'use client';
import { useEffect, useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

/**
 * Ink-bleed theme transition (approved by Wadi 2026-11-10, V1 style —
 * the clean spread, not the feathered/fibred V2 detailing).
 *
 * A fixed overlay in the OLD theme's --background colour spreads from
 * the click point (clip-path polygon with a baked-in wobbly ink edge)
 * until it covers the screen; the theme then flips on
 * <html data-theme> UNDER the full-cover blot, and the blot fades out
 * onto the new theme. Total ~1.3s.
 *
 * Fallbacks: reduced-motion preference or a transition already running
 * degrade to the previous instant flip. The toggle must always work.
 */

/**
 * DOM ink renderer (v2, 2026-11-10): the first build rendered the blot
 * on a fullscreen WebGL2 canvas whose per-frame texture repaints made
 * the transition stutter and visually "break" on Wadi's iPhone 8 Plus
 * (his screen recording showed a torn mid-state). This version uses a
 * plain fixed <div> with a solid fill and an animated clip-path circle
 * — compositing work the browser GPU handles without repainting the
 * page, so the spread stays smooth on weak hardware. The wobbly ink
 * edge is baked into the clip-path polygon (generated per toggle from
 * the same multi-sine wobble the GIF rounds used), so it still reads
 * as ink, not a clean circle.
 */
function inkPolygonPoints(cx: number, cy: number, radius: number, w: number, h: number): string {
  const steps = 72;
  const pts: string[] = [];
  for (let k = 0; k < steps; k++) {
    const ang = (2 * Math.PI * k) / steps;
    const n =
      0.10 * Math.sin(ang * 3 + radius * 0.004) +
      0.07 * Math.sin(ang * 7 - radius * 0.006) +
      0.045 * Math.sin(ang * 13 + radius * 0.011) +
      0.03 * Math.sin(ang * 23 - radius * 0.017);
    const r = radius * (1 + n);
    const x = cx + r * Math.cos(ang);
    const y = cy + r * Math.sin(ang);
    pts.push(`${((x / w) * 100).toFixed(2)}% ${((y / h) * 100).toFixed(2)}%`);
  }
  return `polygon(${pts.join(', ')})`;
}

const SPREAD_MS = 900;
const HOLD_MS = 40;
const DISSOLVE_MS = 350;

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }
function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }


export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const busyRef = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // The pre-paint init script in app/layout.tsx has already resolved
    // the theme (saved choice first, OS preference on a first visit);
    // mirror whatever it decided instead of forcing a default here.
    const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    setIsDark(current === 'dark');
  }, []);

  function applyTheme(next: 'light' | 'dark') {
    document.documentElement.dataset.theme = next;
    try { window.localStorage.setItem('theme', next); } catch { /* storage unavailable */ }
    setIsDark(next === 'dark');
  }

  function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    const next = isDark ? 'light' : 'dark';

    if (busyRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      applyTheme(next);
      return;
    }

    const rect = buttonRef.current?.getBoundingClientRect();
    const origin = {
      x: event.clientX || (rect ? rect.left + rect.width / 2 : window.innerWidth / 2),
      y: event.clientY || (rect ? rect.top + rect.height / 2 : 0),
    };
    const inkValue = getComputedStyle(document.documentElement).getPropertyValue('--background');

    const w = window.innerWidth;
    const h = window.innerHeight;
    const maxDist = Math.max(
      Math.hypot(origin.x, origin.y),
      Math.hypot(w - origin.x, origin.y),
      Math.hypot(origin.x, h - origin.y),
      Math.hypot(w - origin.x, h - origin.y),
    );
    const inkCss = inkValue.trim() || (isDark ? '#171717' : '#F7F7F5');

    let overlay: HTMLDivElement | null = null;
    try {
      overlay = document.createElement('div');
      overlay.className = 'ink-bleed-overlay';
      overlay.style.background = inkCss;
      overlay.style.clipPath = inkPolygonPoints(origin.x, origin.y, 0, w, h);
      overlay.setAttribute('aria-hidden', 'true');
      document.body.appendChild(overlay);
      busyRef.current = true;

      const start = performance.now();
      const total = SPREAD_MS + HOLD_MS + DISSOLVE_MS;
      let flipped = false;

      const frame = (now: number) => {
        const t = now - start;
        if (t < SPREAD_MS) {
          const r = easeOutCubic(t / SPREAD_MS) * maxDist * 1.3;
          overlay!.style.clipPath = inkPolygonPoints(origin.x, origin.y, r, w, h);
        } else {
          if (!flipped) {
            flipped = true;
            overlay!.style.clipPath = 'none';
            applyTheme(next); // flip UNDER the full-cover blot
          }
          const dt = (t - SPREAD_MS - HOLD_MS) / DISSOLVE_MS;
          overlay!.style.opacity = dt <= 0 ? '1' : String(1 - easeInOut(Math.min(dt, 1)));
        }
        if (t < total) {
          requestAnimationFrame(frame);
        } else {
          overlay?.remove();
          busyRef.current = false;
        }
      };
      requestAnimationFrame(frame);
    } catch {
      overlay?.remove();
      busyRef.current = false;
      applyTheme(next);
    }
  }

  return (
    <button
      ref={buttonRef}
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
