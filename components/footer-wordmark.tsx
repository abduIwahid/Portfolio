'use client';
import { useEffect, useRef } from 'react';

/**
 * Giant faded wordmark — the footer's closing signature.
 *
 * "ABDUL WAHID" in Anton at viewport scale. The name is bound to
 * the scroll position (scrubbed, never timed): as the wordmark
 * band enters the viewport the name rises from below and fades
 * in, following the band's entry progress through the house
 * ease; scrolling back up plays the identical motion in
 * reverse, and stopping mid-scroll freezes it mid-state. The
 * driver writes only transform/opacity on the inner track, so
 * the footer's height and layout never change, and at full
 * entry the name rests exactly as the static design. Progress
 * reads the band's live position against the window scroll
 * (the same direct-read approach as ScrollProgress), so it
 * tracks manual scrolling and Lenis-animated scrolling alike.
 * Under prefers-reduced-motion no driver runs and the name is
 * simply static.
 */

const NAME = 'ABDUL WAHID';

/** cubic-bezier(.22, .8, .3, 1) — the house ease (--ease-house). */
function houseEase(x: number): number {
  const cx = 3 * 0.22;
  const bx = 3 * (0.3 - 0.22) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * 0.8;
  const by = 3 * (1 - 0.8) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const sampleDX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  let t = x;
  for (let i = 0; i < 5; i += 1) {
    const err = sampleX(t) - x;
    if (Math.abs(err) < 1e-4) break;
    const slope = sampleDX(t);
    if (Math.abs(slope) < 1e-4) break;
    t -= err / slope;
  }
  return sampleY(Math.min(1, Math.max(0, t)));
}

export function FooterWordmark() {
  const stripRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const strip = stripRef.current;
    const track = trackRef.current;
    if (!strip || !track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let lastEased = -1;
    let lastProgress = -1;
    const update = () => {
      raf = 0;
      const rect = strip.getBoundingClientRect();
      const raw = (window.innerHeight - rect.top) / rect.height;
      // Snap the last/first sliver of the range: sub-pixel rounding
      // can leave a settled page a hair off the exact ends, and the
      // resting state must be exactly the static design.
      const progress = raw <= 0.01 ? 0 : raw >= 0.99 ? 1 : raw;
      const eased = houseEase(progress);
      // Change-guarded writes — but an exact end state (progress
      // 0 or 1) is always written, even if the eased value is
      // within the guard's epsilon of the previous frame.
      if (Math.abs(eased - lastEased) <= 0.0005 && progress === lastProgress) return;
      lastEased = eased;
      lastProgress = progress;
      // ~90px of rise at desktop strip heights, scaled down with
      // the strip on smaller screens.
      const rise = Math.min(96, Math.max(24, rect.height * 0.34));
      track.style.transform = `translate3d(0, ${((1 - eased) * rise).toFixed(2)}px, 0)`;
      track.style.opacity = eased.toFixed(3);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={stripRef} className="footer-wordmark" aria-hidden="true">
      <div ref={trackRef} className="wm-track">
        {NAME.split('').map((ch, i) => (
          <span key={i} className="wm-letter">
            <span className="wm-letter-in">{ch === ' ' ? ' ' : ch}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
