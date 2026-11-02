'use client';

import { useEffect, useRef, useState } from 'react';
import { LogoMark } from './logo-mark';

const DRAW_MS = 1650;
const HOLD_MS = 240;
/* Finale length preserves the old travel (680ms) + through (780ms)
   beats as a single fade: the filled mark and stage fade out, then the
   root fades. Lock-release and root-fade moments inside the finale are
   placed at the same absolute times they had in the old timeline. */
const FINALE_MS = 1460;

type Phase = 'draw' | 'hold' | 'finale';

/**
 * One-time-per-session intro: the AW brand mark IS the loading bar — a
 * full-colour copy fills left to right over a 13% ghost copy, driven by
 * the same rAF progress that used to draw the old glyph. Once full, the
 * mark holds briefly, then the filled logo and stage fade out into the
 * portfolio.
 */
export function IntroLoader() {
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const stageWrapRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem('aw-intro-v1') === '1';
    } catch {
      seen = false;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (seen || reduced) {
      setGone(true);
      return;
    }
    try {
      sessionStorage.setItem('aw-intro-v1', '1');
    } catch {
      /* private mode: intro simply plays again next time */
    }

    const fill = fillRef.current;
    if (!fill) {
      setGone(true);
      return;
    }

    document.body.style.overflow = 'hidden';

    let raf = 0;
    let phase: Phase = 'draw';
    const start = performance.now();
    let phaseStart = start;
    let overflowRestored = false;

    const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    const finish = () => {
      if (!overflowRestored) document.body.style.overflow = '';
      setGone(true);
    };

    const tick = (now: number) => {
      if (phase === 'draw') {
        const t = Math.min(1, (now - start) / DRAW_MS);
        const e = easeInOut(t);
        fill.style.width = `${e * 100}%`;
        if (t >= 1) {
          phase = 'hold';
          phaseStart = now;
        }
      } else if (phase === 'hold') {
        if (now - phaseStart >= HOLD_MS) {
          phase = 'finale';
          phaseStart = now;
        }
      } else {
        const t = Math.min(1, (now - phaseStart) / FINALE_MS);
        const e = easeInOut(t);
        const wrap = stageWrapRef.current;
        if (wrap) {
          wrap.style.opacity = `${1 - e * 0.88}`;
          wrap.style.transform = `scale(${1 - e * 0.04})`;
        }
        /* Root fade starts 1164ms into the finale and the scroll lock
           releases at 1304ms — the same absolute moments the old
           through phase faded (t > 0.62 of 780ms after a 680ms travel)
           and restored overflow (t > 0.8), so total runtime and the
           Lenis interplay are unchanged. */
        const root = rootRef.current;
        if (root && t > 0.797) root.style.opacity = `${1 - (t - 0.797) / (1 - 0.797)}`;
        if (t > 0.893 && !overflowRestored) {
          overflowRestored = true;
          document.body.style.overflow = '';
        }
        if (t >= 1) {
          finish();
          return;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const skip = () => {
      if (phase === 'draw' || phase === 'hold') {
        /* Fill the mark instantly and jump into the finale at the point
           that leaves the same remaining runtime the old skip had
           (65% of the old 780ms through phase = 507ms, i.e. finale
           t = 1 - 507/1460 ≈ 0.653), with the stage already faded to
           that moment's value. */
        fill.style.width = '100%';
        const wrap = stageWrapRef.current;
        if (wrap) {
          wrap.style.opacity = '0.332';
          wrap.style.transform = 'scale(0.9696)';
        }
        phase = 'finale';
        phaseStart = performance.now() - FINALE_MS * 0.653;
      }
    };
    window.addEventListener('pointerdown', skip);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointerdown', skip);
      document.body.style.overflow = '';
    };
  }, []);

  if (gone) return null;

  return (
    <div className="intro" ref={rootRef} aria-hidden="true">
      <div className="intro-stage" ref={stageWrapRef}>
        <div className="intro-mark">
          <div className="intro-mark-base">
            <LogoMark className="intro-mark-svg" />
          </div>
          <div className="intro-mark-fill" ref={fillRef}>
            <div className="intro-mark-fill-inner">
              <LogoMark className="intro-mark-svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
