'use client';

import { useEffect, useRef, useState } from 'react';

const PATH_ONE =
  'M 64 124 C 34 118, 20 96, 21 72 C 22 46, 42 30, 68 32 C 88 34, 97 50, 96 72 C 95 92, 80 105, 61 103 C 42 101, 34 85, 40 66 C 45 51, 60 45, 73 51 C 85 55, 91 64, 92 76 C 96 94, 102 108, 110 118 L 129 60 L 148 118 L 186 56';

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
  const pathRef = useRef<SVGPathElement>(null);
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
          <path className="intro-ghost" d={PATH_ONE} />
          <path className="intro-draw" d={PATH_ONE} ref={pathRef} />
          <circle className="intro-comet" r="6" cx="64" cy="124" ref={cometRef} />
          <circle className="intro-dot" cx="210" cy="38" r="7.5" ref={dotRef} />
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
