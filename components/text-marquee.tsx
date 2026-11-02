'use client';
import { useEffect, useRef } from 'react';

/**
 * Crossed text marquees (home page, directly under the hero).
 *
 * Two Anton bands cross in an X at the section centre. The front band
 * (theme foreground, falling to the right) drifts left with the skills
 * list; the back band (fixed accent orange, rising to the right) drifts
 * right with the evidence list. Each band loops its own list seamlessly
 * (doubled track, wraps at exactly -50%), runs at a constant base drift
 * plus a smoothed scroll-velocity boost that never reverses it, and the
 * two are deliberately unsynchronised — different words, different
 * phases. Purely decorative, hidden from assistive tech. Hand-rolled rAF
 * loop: transform-only, pauses off-screen, and never starts under
 * prefers-reduced-motion (the static crossed bands render instead).
 */

const FRONT_WORDS = [
  'MACHINE LEARNING',
  'EXPLAINABLE AI',
  'FULL-STACK SYSTEMS',
  'MLOPS',
  'PREDICTIVE ANALYTICS',
  'DATA PIPELINES',
  'MODEL DEPLOYMENT',
  'HEALTHCARE AI',
];

const BACK_WORDS = [
  'EVIDENCE OVER HYPE',
  'REAL DATA',
  'HONEST METRICS',
  'DEEP LEARNING',
  'DATA SCIENCE',
  'PYTHON',
  'FASTAPI',
  'NEXT.JS',
  'SUPABASE',
  'DOCKER',
  'DASHBOARDS',
  'OPEN SOURCE',
];

const BASE_SPEED = 60; // px/s, constant drift in each band's own direction
const BOOST_FACTOR = 0.35; // extra px/s per px/s of smoothed scroll velocity
const BOOST_CAP = 420; // px/s, ceiling on the scroll boost
const BACK_PHASE = 0.37; // back band starts part-way through its list

function Sequence({ words }: { words: string[] }) {
  return (
    <div className="x-seq">
      {words.map((word) => (
        <span className="x-item" key={word}>
          <span className="x-word">{word}</span>
          <span className="x-sep">—</span>
        </span>
      ))}
    </div>
  );
}

type Band = {
  track: HTMLDivElement;
  dir: 1 | -1; // -1 = moves left, +1 = moves right
  offset: number;
  seqW: number;
  phase: number; // starting offset as a fraction of seqW
  phased: boolean;
};

export function TextMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frontTrackRef = useRef<HTMLDivElement>(null);
  const backTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frontTrack = frontTrackRef.current;
    const backTrack = backTrackRef.current;
    if (!section || !frontTrack || !backTrack) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const bands: Band[] = [
      { track: frontTrack, dir: -1, offset: 0, seqW: 0, phase: 0, phased: true },
      { track: backTrack, dir: 1, offset: 0, seqW: 0, phase: BACK_PHASE, phased: false },
    ];

    let raf = 0;
    let running = false;
    let visible = false;
    let lastTime = 0;
    let lastScrollY = window.scrollY;
    let smoothVelocity = 0;

    const measure = () => {
      bands.forEach((band) => {
        band.seqW = band.track.scrollWidth / 2;
        if (!band.phased && band.seqW > 0) {
          band.offset = band.seqW * band.phase;
          band.phased = true;
        }
      });
    };
    measure();
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {});

    const frame = (time: number) => {
      if (!running) return;
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      if (dt > 0) {
        const scrollY = window.scrollY;
        const rawVelocity = Math.abs(scrollY - lastScrollY) / dt;
        lastScrollY = scrollY;
        // Smooth the velocity so the bands ease into and out of their hurry.
        smoothVelocity += (rawVelocity - smoothVelocity) * Math.min(1, dt * 7);
        const boost = Math.min(smoothVelocity * BOOST_FACTOR, BOOST_CAP);
        const step = (BASE_SPEED + boost) * dt;
        bands.forEach((band) => {
          if (band.seqW <= 0) return;
          band.offset += step;
          if (band.offset >= band.seqW) band.offset -= band.seqW;
          band.track.style.transform =
            band.dir === -1
              ? `translate3d(${-band.offset}px, 0, 0)`
              : `translate3d(${band.offset - band.seqW}px, 0, 0)`;
        });
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTime = performance.now();
      lastScrollY = window.scrollY;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const observer = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              visible = entry.isIntersecting;
              if (visible) start();
              else stop();
            });
          },
          { threshold: 0 },
        )
      : null;
    if (observer) observer.observe(section);
    else start();

    const onResize = () => measure();
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      stop();
      if (observer) observer.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="x-marquee" ref={sectionRef} aria-hidden="true">
      <div className="x-band x-band-back">
        <div className="x-track" ref={backTrackRef}>
          <Sequence words={BACK_WORDS} />
          <Sequence words={BACK_WORDS} />
        </div>
      </div>
      <div className="x-band x-band-front">
        <div className="x-track" ref={frontTrackRef}>
          <Sequence words={FRONT_WORDS} />
          <Sequence words={FRONT_WORDS} />
        </div>
      </div>
    </div>
  );
}
