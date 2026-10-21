'use client';

import { useEffect, useRef, useState } from 'react';

const PATH_A =
  'M 86 40 C 58 26, 24 44, 21 75 C 18 105, 36 125, 61 123 C 83 121, 95 103, 93 79 C 91 57, 76 44, 59 47 C 43 50, 35 65, 38 80 C 41 95, 54 103, 67 100 C 79 97, 88 87, 91 74 L 97 108 C 99 118, 108 120, 112 112';
const PATH_W =
  'M 104 56 L 118 112 C 120 121, 128 121, 131 113 L 146 62 L 161 113 C 164 121, 172 121, 174 112 L 190 54';

const DRAW_MS = 1650;
const HOLD_MS = 280;
const ZOOM_MS = 800;

const STAGES: [number, string][] = [
  [0, 'INIT'],
  [20, 'PROGRESS'],
  [50, 'CONNECT'],
  [80, 'COMPLETE'],
  [97, 'READY'],
];

/**
 * One-time-per-session intro: the AW monogram draws itself with a glowing
 * orange comet, a progress bar and stage labels run underneath, then the
 * view flies into the logo's orange dot and the portfolio opens.
 */
export function IntroLoader() {
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const stageWrapRef = useRef<HTMLDivElement>(null);
  const pathARef = useRef<SVGPathElement>(null);
  const pathWRef = useRef<SVGPathElement>(null);
  const cometRef = useRef<SVGCircleElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
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

    const A = pathARef.current;
    const W = pathWRef.current;
    const comet = cometRef.current;
    if (!A || !W || !comet) {
      setGone(true);
      return;
    }
    const lenA = A.getTotalLength();
    const lenW = W.getTotalLength();
    A.style.strokeDasharray = `${lenA}`;
    A.style.strokeDashoffset = `${lenA}`;
    W.style.strokeDasharray = `${lenW}`;
    W.style.strokeDashoffset = `${lenW}`;

    document.body.style.overflow = 'hidden';

    let raf = 0;
    let phase: 'draw' | 'hold' | 'zoom' = 'draw';
    const start = performance.now();
    let holdStart = 0;
    let zoomStart = 0;
    let lastPct = -1;
    let lastStage = '';

    const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const setupZoom = () => {
      const wrap = stageWrapRef.current;
      const dot = dotRef.current;
      if (!wrap || !dot) return;
      const s = wrap.getBoundingClientRect();
      const d = dot.getBoundingClientRect();
      wrap.style.transformOrigin = `${d.left + d.width / 2 - s.left}px ${d.top + d.height / 2 - s.top}px`;
    };

    const finish = () => {
      document.body.style.overflow = '';
      setGone(true);
    };

    const tick = (now: number) => {
      if (phase === 'draw') {
        const t = Math.min(1, (now - start) / DRAW_MS);
        const e = easeInOut(t);
        const aT = Math.min(1, e / 0.58);
        const wT = Math.max(0, Math.min(1, (e - 0.5) / 0.5));
        A.style.strokeDashoffset = `${lenA * (1 - aT)}`;
        W.style.strokeDashoffset = `${lenW * (1 - wT)}`;
        const pt = wT > 0 ? W.getPointAtLength(lenW * wT) : A.getPointAtLength(lenA * Math.max(0.0001, aT));
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
          holdStart = now;
          comet.style.opacity = '0';
          dotRef.current?.classList.add('intro-dot-on');
          if (captionRef.current) captionRef.current.style.opacity = '1';
        }
      } else if (phase === 'hold') {
        if (now - holdStart >= HOLD_MS) {
          phase = 'zoom';
          zoomStart = now;
          setupZoom();
        }
      } else {
        const zt = Math.min(1, (now - zoomStart) / ZOOM_MS);
        const ze = easeOut(zt);
        const wrap = stageWrapRef.current;
        if (wrap) wrap.style.transform = `scale(${1 + ze * 15})`;
        const root = rootRef.current;
        if (root) root.style.opacity = zt < 0.55 ? '1' : `${1 - (zt - 0.55) / 0.45}`;
        if (zt >= 1) {
          finish();
          return;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const skip = () => {
      if (phase !== 'zoom') {
        phase = 'zoom';
        zoomStart = performance.now();
        dotRef.current?.classList.add('intro-dot-on');
        if (cometRef.current) cometRef.current.style.opacity = '0';
        setupZoom();
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
        <svg className="intro-logo" viewBox="0 0 240 150" fill="none">
          <path className="intro-ghost" d={PATH_A} />
          <path className="intro-ghost" d={PATH_W} />
          <path className="intro-draw" d={PATH_A} ref={pathARef} />
          <path className="intro-draw" d={PATH_W} ref={pathWRef} />
          <circle className="intro-comet" r="6" cx="86" cy="40" ref={cometRef} />
          <circle className="intro-dot" cx="206" cy="38" r="7.5" ref={dotRef} />
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
    </div>
  );
}
