'use client';

import { useEffect, useRef, useState } from 'react';

/** The real AW monogram as ONE continuous stroke: the round "a" flows
 *  diagonally into the "W" and ends under the orange dot. */
const PATH_ONE =
  'M 66 125 C 44 124, 28 112, 21 96 C 14 78, 24 54, 42 43 C 54 36, 74 34, 88 43 C 102 52, 108 66, 107 80 C 106 90, 103 98, 99 105 L 138 127 L 160 57 L 183 127 L 216 68';

const DRAW_MS = 1650;
const HOLD_MS = 240;
const TRAVEL_MS = 680;
const THROUGH_MS = 780;

const STAGES: [number, string][] = [
  [0, 'INIT'],
  [20, 'PROGRESS'],
  [50, 'CONNECT'],
  [80, 'COMPLETE'],
  [97, 'READY'],
];

type Phase = 'draw' | 'hold' | 'travel' | 'through';

/**
 * One-time-per-session intro: the AW monogram draws itself as one connected
 * line with a glowing orange comet, the progress line underneath fills in
 * sync, then the logo's orange dot drifts to the centre of the screen —
 * and the view flies through it into the portfolio.
 */
export function IntroLoader() {
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const stageWrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cometRef = useRef<SVGCircleElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const flyRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const stageLabelRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

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

    const P = pathRef.current;
    const comet = cometRef.current;
    if (!P || !comet) {
      setGone(true);
      return;
    }
    const len = P.getTotalLength();
    P.style.strokeDasharray = `${len}`;
    P.style.strokeDashoffset = `${len}`;

    document.body.style.overflow = 'hidden';

    let raf = 0;
    let phase: Phase = 'draw';
    const start = performance.now();
    let phaseStart = start;
    let lastPct = -1;
    let lastStage = '';
    // Finale geometry, captured when the travel phase begins
    let dotCX = 0;
    let dotCY = 0;
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
      const dot = dotRef.current;
      const fly = flyRef.current;
      if (!dot || !fly) return;
      const r = dot.getBoundingClientRect();
      dotCX = r.left + r.width / 2;
      dotCY = r.top + r.height / 2;
      moveX = window.innerWidth / 2 - dotCX;
      moveY = window.innerHeight / 2 - dotCY;
      coverScale = (Math.max(window.innerWidth, window.innerHeight) * 1.35) / 20;
      fly.style.left = `${dotCX}px`;
      fly.style.top = `${dotCY}px`;
      fly.style.opacity = '1';
      fly.classList.add('intro-fly-pulsing');
      dot.style.opacity = '0';
    };

    const tick = (now: number) => {
      if (phase === 'draw') {
        const t = Math.min(1, (now - start) / DRAW_MS);
        const e = easeInOut(t);
        P.style.strokeDashoffset = `${len * (1 - e)}`;
        const pt = P.getPointAtLength(len * Math.max(0.0001, e));
        comet.setAttribute('cx', `${pt.x}`);
        comet.setAttribute('cy', `${pt.y}`);
        if (barRef.current) barRef.current.style.transform = `scaleX(${e})`;
        if (tipRef.current) tipRef.current.style.left = `${e * 100}%`;
        const pct = Math.round(t * 100);
        if (pct !== lastPct) {
          lastPct = pct;
          if (pctRef.current) pctRef.current.textContent = `${pct}%`;
          let stage = 'INIT';
          for (const [th, label] of STAGES) if (pct >= th) stage = label;
          if (stage !== lastStage && stageLabelRef.current) {
            lastStage = stage;
            stageLabelRef.current.textContent = stage;
          }
        }
        if (t >= 1) {
          phase = 'hold';
          phaseStart = now;
          comet.style.opacity = '0';
          dotRef.current?.classList.add('intro-dot-on');
          if (captionRef.current) captionRef.current.style.opacity = '1';
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
        // Jump to the centred dot and fly through quickly
        P.style.strokeDashoffset = '0';
        comet.style.opacity = '0';
        dotRef.current?.classList.add('intro-dot-on');
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
        <svg className="intro-logo" viewBox="0 0 250 160" fill="none">
          <path className="intro-ghost" d={PATH_ONE} />
          <path className="intro-draw" d={PATH_ONE} ref={pathRef} />
          <circle className="intro-comet" r="6" cx="66" cy="125" ref={cometRef} />
          <circle className="intro-dot" cx="226" cy="44" r="8" ref={dotRef} />
        </svg>
        <div className="intro-meta">
          <span className="intro-stage-label" ref={stageLabelRef}>
            INIT
          </span>
        </div>
        <div className="intro-progress">
          <div className="intro-progress-fill" ref={barRef} />
          <div className="intro-progress-tip" ref={tipRef}>
            <span className="intro-progress-dot" />
            <span className="intro-pct" ref={pctRef}>
              0%
            </span>
          </div>
        </div>
        <p className="intro-caption" ref={captionRef}>
          Portfolio Loaded
        </p>
      </div>
      <div className="intro-fly" ref={flyRef} />
    </div>
  );
}
