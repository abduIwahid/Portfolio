'use client';
import { useEffect, useRef } from 'react';

/**
 * Scroll text marquee (home page, directly under the hero).
 *
 * A slow Anton band that drifts left at a constant base speed and hurries
 * while the visitor scrolls (scroll-velocity boost, smoothed). Direction
 * never reverses. The band is purely decorative and hidden from assistive
 * tech. Hand-rolled rAF loop: transform-only, pauses off-screen, and never
 * starts under prefers-reduced-motion (a static line renders instead).
 */

const WORDS = [
  'MACHINE LEARNING',
  'EXPLAINABLE AI',
  'FULL-STACK SYSTEMS',
  'MLOPS',
  'PREDICTIVE ANALYTICS',
  'DATA PIPELINES',
  'MODEL DEPLOYMENT',
  'HEALTHCARE AI',
];

const BASE_SPEED = 60; // px/s, constant leftward drift
const BOOST_FACTOR = 0.35; // extra px/s per px/s of smoothed scroll velocity
const BOOST_CAP = 420; // px/s, ceiling on the scroll boost

function Sequence() {
  return (
    <div className="marquee-seq">
      {WORDS.map((word) => (
        <span className="marquee-item" key={word}>
          <span className="marquee-word">{word}</span>
          <span className="marquee-sep">—</span>
        </span>
      ))}
    </div>
  );
}

export function TextMarquee() {
  const bandRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const band = bandRef.current;
    const track = trackRef.current;
    if (!band || !track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let running = false;
    let visible = false;
    let offset = 0;
    let seqWidth = 0;
    let lastTime = 0;
    let lastScrollY = window.scrollY;
    let smoothVelocity = 0;

    const measure = () => {
      seqWidth = track.scrollWidth / 2;
    };
    measure();
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {});

    const frame = (time: number) => {
      if (!running) return;
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      if (dt > 0 && seqWidth > 0) {
        const scrollY = window.scrollY;
        const rawVelocity = Math.abs(scrollY - lastScrollY) / dt;
        lastScrollY = scrollY;
        // Smooth the velocity so the band eases into and out of its hurry.
        smoothVelocity += (rawVelocity - smoothVelocity) * Math.min(1, dt * 7);
        const boost = Math.min(smoothVelocity * BOOST_FACTOR, BOOST_CAP);
        offset += (BASE_SPEED + boost) * dt;
        if (offset >= seqWidth) offset -= seqWidth;
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
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
    if (observer) observer.observe(band);
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
    <div className="text-marquee" ref={bandRef} aria-hidden="true">
      <div className="marquee-track" ref={trackRef}>
        <Sequence />
        <Sequence />
      </div>
    </div>
  );
}
