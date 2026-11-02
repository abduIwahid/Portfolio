'use client';

import { useEffect, useRef, useState } from 'react';
import { LogoMark } from './logo-mark';

const DRAW_MS = 1650;
const HOLD_MS = 240;
const TRAVEL_MS = 680;
const THROUGH_MS = 780;

type Phase = 'draw' | 'hold' | 'travel' | 'through';

/**
 * One-time-per-session intro: the AW brand mark IS the loading bar — a
 * full-colour copy fills left to right over a 13% ghost copy, driven by
 * the same rAF progress that used to draw the old glyph. Once full, the
 * accent disc at the mark's tail drifts to the centre of the screen —
 * and the view flies through it into the portfolio.
 */
export function IntroLoader() {
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const stageWrapRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const flyRef = useRef<HTMLDivElement>(null);

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
    // Finale geometry, captured when the travel phase begins
    let anchorX = 0;
    let anchorY = 0;
    let moveX = 0;
    let moveY = 0;
    let coverScale = 60;
    let overflowRestored = false;

    const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    const easeIn = (t: number) => t * t * t;

    const finish = () => {
      if (!overflowRestored) document.body.style.overflow = '';
      setGone(true);
    };

    const setupTravel = () => {
      const mark = markRef.current;
      const fly = flyRef.current;
      if (!mark || !fly) return;
      const r = mark.getBoundingClientRect();
      // The disc starts on the mark's tail flick — the detached stroke at
      // the right end of the glyph, centred in its bounding area (the old
      // glyph's orange dot sat at the same end of its logo).
      anchorX = r.left + r.width * 0.89;
      anchorY = r.top + r.height * 0.46;
      moveX = window.innerWidth / 2 - anchorX;
      moveY = window.innerHeight / 2 - anchorY;
      coverScale = (Math.max(window.innerWidth, window.innerHeight) * 1.35) / 20;
      fly.style.left = `${anchorX}px`;
      fly.style.top = `${anchorY}px`;
      fly.style.opacity = '1';
      fly.classList.add('intro-fly-pulsing');
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
          phase = 'travel';
          phaseStart = now;
          setupTravel();
        }
      } else if (phase === 'travel') {
        const t = Math.min(1, (now - phaseStart) / TRAVEL_MS);
        const e = easeInOut(t);
        const fly = flyRef.current;
        if (fly) {
          fly.style.transform = `translate(-50%, -50%) translate(${moveX * e}px, ${moveY * e}px) scale(${1 + e * 0.55})`;
        }
        const wrap = stageWrapRef.current;
        if (wrap) {
          wrap.style.opacity = `${1 - e * 0.88}`;
          wrap.style.transform = `scale(${1 - e * 0.04})`;
        }
        if (t >= 1) {
          phase = 'through';
          phaseStart = now;
          fly?.classList.remove('intro-fly-pulsing');
        }
      } else {
        const t = Math.min(1, (now - phaseStart) / THROUGH_MS);
        const e = easeIn(t);
        const fly = flyRef.current;
        if (fly) {
          fly.style.transform = `translate(-50%, -50%) translate(${moveX}px, ${moveY}px) scale(${1.55 + e * coverScale})`;
        }
        const root = rootRef.current;
        if (root && t > 0.62) root.style.opacity = `${1 - (t - 0.62) / 0.38}`;
        if (t > 0.8 && !overflowRestored) {
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
        // Fill the mark instantly, jump to the centred disc and fly through
        fill.style.width = '100%';
        setupTravel();
        const fly = flyRef.current;
        if (fly) {
          fly.style.transform = `translate(-50%, -50%) translate(${moveX}px, ${moveY}px) scale(1.55)`;
          fly.classList.remove('intro-fly-pulsing');
        }
        const wrap = stageWrapRef.current;
        if (wrap) wrap.style.opacity = '0.12';
        phase = 'through';
        phaseStart = performance.now() - THROUGH_MS * 0.35;
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
        <div className="intro-mark" ref={markRef}>
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
      <div className="intro-fly" ref={flyRef} />
    </div>
  );
}
