'use client';

import { useEffect, useRef, useState } from 'react';

/* Centreline of the AW mark, baked from the approved loader preview's
   extraction (aw-centreline.json, measured in the brand art's 1278x630
   canvas space — the same space LogoMark's paths are authored in, so
   these constants sit directly alongside them under the shared tight
   viewBox). MAIN runs from the bottom tip of the 'a', around the loop
   and out through the 'w' wave (length 1367.7); TAIL is the separate
   final flourish (length 211.8) — the real mark lifts the pen between
   them, and so does this draw. A mask stroke of width 62 covers the
   ribbon (half-width max ≈ 29.2) with negligible bleed. */
const MAIN_D = 'M 445.0 400.0 L 429.0 417.0 L 399.0 437.0 L 364.0 448.0 L 322.0 451.0 L 288.0 446.0 L 260.0 435.0 L 233.0 417.0 L 209.0 390.0 L 195.0 361.0 L 189.0 328.0 L 191.0 295.0 L 202.0 263.0 L 221.0 235.0 L 252.0 209.0 L 290.0 192.0 L 320.0 187.0 L 380.0 192.0 L 414.0 206.0 L 429.0 217.0 L 454.0 246.0 L 517.0 366.0 L 532.0 383.0 L 551.0 394.0 L 575.0 397.0 L 605.0 387.0 L 619.0 374.0 L 650.0 329.0 L 672.0 304.0 L 686.0 296.0 L 704.0 293.0 L 727.0 296.0 L 739.0 302.0 L 759.0 324.0 L 801.0 392.0 L 822.0 411.0 L 852.0 416.0 L 880.0 407.0 L 897.0 392.0 L 900.0 363.0';
const MAIN_LEN = 1367.7;
const TAIL_D = 'M 944.0 364.0 L 946.0 328.0 L 969.0 296.0 L 990.0 276.0 L 1023.0 264.0 L 1063.0 260.0 L 1095.0 261.0';
const TAIL_LEN = 211.8;
const TOTAL_LEN = MAIN_LEN + TAIL_LEN;
const MASK_WIDTH = 62;

const DRAW_MS = 2400;
const HOLD_MS = 350;
const SLIDE_MS = 850;
/* Hard cap: whatever happens (throttled rAF, a slow device), the loader
   unmounts by this point so it can never trap the page. */
const FALLBACK_MS = 4600;

/* Pen-speed profile: constant along the stroke, with a gentle blend
   over only the first and last 8% of the draw so the pen neither jerks
   off the mark nor stops dead. Integrated once into a lookup table —
   the rAF loop itself only interpolates and writes styles. */
const PROFILE_STEPS = 480;
const PEN_PROFILE = (() => {
  const BLEND = 0.08;
  const MIN_SPEED = 0.45;
  const cum = [0];
  for (let i = 1; i <= PROFILE_STEPS; i++) {
    const u = i / PROFILE_STEPS;
    const edge = Math.min(u / BLEND, (1 - u) / BLEND, 1);
    const s = edge * edge * (3 - 2 * edge);
    cum.push(cum[i - 1] + (MIN_SPEED + (1 - MIN_SPEED) * s));
  }
  const total = cum[PROFILE_STEPS];
  return cum.map((c) => c / total);
})();

function penProgress(u: number) {
  const x = Math.min(1, Math.max(0, u)) * PROFILE_STEPS;
  const i = Math.floor(x);
  const f = x - i;
  const a = PEN_PROFILE[i];
  const b = PEN_PROFILE[Math.min(PROFILE_STEPS, i + 1)];
  return a + (b - a) * f;
}

/* The house ease, cubic-bezier(.22, .8, .3, 1) (the --ease-house
   token), precomputed as a lookup so the slide is a pure transform
   read per frame. */
const EASE_STEPS = 100;
const HOUSE_EASE = (() => {
  const bx = (t: number) =>
    3 * (1 - t) * (1 - t) * t * 0.22 + 3 * (1 - t) * t * t * 0.3 + t * t * t;
  const by = (t: number) =>
    3 * (1 - t) * (1 - t) * t * 0.8 + 3 * (1 - t) * t * t * 1 + t * t * t;
  const pts: number[] = [];
  for (let i = 0; i <= EASE_STEPS; i++) {
    const x = i / EASE_STEPS;
    let lo = 0;
    let hi = 1;
    for (let k = 0; k < 24; k++) {
      const mid = (lo + hi) / 2;
      if (bx(mid) < x) lo = mid;
      else hi = mid;
    }
    pts.push(by((lo + hi) / 2));
  }
  return pts;
})();

function houseEase(x: number) {
  const c = Math.min(1, Math.max(0, x)) * EASE_STEPS;
  const i = Math.floor(c);
  const f = c - i;
  const a = HOUSE_EASE[i];
  const b = HOUSE_EASE[Math.min(EASE_STEPS, i + 1)];
  return a + (b - a) * f;
}

/**
 * One-time-per-session intro: the AW brand mark IS the loading bar.
 * It draws itself as a single line — pen starting at the bottom of
 * the 'a', following the stroke's centreline around the loop and out
 * through the 'w', then lifting to finish the separate flourish —
 * holds a beat, and the whole loader panel slides up off the top of
 * the screen, revealing the already-rendered page behind it.
 *
 * One rAF timeline drives everything; the loop only writes
 * stroke-dashoffset, transform and opacity (no layout work), and a
 * fallback timer guarantees the page is never trapped.
 */
export function IntroLoader() {
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<SVGPathElement>(null);
  const tailRef = useRef<SVGPathElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

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

    const root = rootRef.current;
    const main = mainRef.current;
    const tail = tailRef.current;
    if (!root || !main || !tail) {
      setGone(true);
      return;
    }

    document.body.style.overflow = 'hidden';

    let raf = 0;
    let done = false;
    let overflowRestored = false;
    let drawnFull = false;
    let start = performance.now();

    const restoreOverflow = () => {
      if (!overflowRestored) {
        overflowRestored = true;
        document.body.style.overflow = '';
      }
    };

    const finish = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
      restoreOverflow();
      setGone(true);
    };
    const fallback = window.setTimeout(finish, FALLBACK_MS);

    const setDrawn = (drawn: number) => {
      main.style.strokeDashoffset = `${MAIN_LEN - Math.min(drawn, MAIN_LEN)}`;
      tail.style.strokeDashoffset = `${
        TAIL_LEN - Math.min(Math.max(drawn - MAIN_LEN, 0), TAIL_LEN)
      }`;
    };

    const tick = (now: number) => {
      if (done) return;
      const elapsed = now - start;
      if (elapsed < DRAW_MS) {
        setDrawn(penProgress(elapsed / DRAW_MS) * TOTAL_LEN);
      } else if (elapsed < DRAW_MS + HOLD_MS) {
        if (!drawnFull) {
          drawnFull = true;
          setDrawn(TOTAL_LEN);
        }
      } else if (elapsed < DRAW_MS + HOLD_MS + SLIDE_MS) {
        if (!drawnFull) {
          drawnFull = true;
          setDrawn(TOTAL_LEN);
        }
        const s = (elapsed - DRAW_MS - HOLD_MS) / SLIDE_MS;
        root.style.transform = `translateY(${-houseEase(s) * 100}%)`;
        const shadow = shadowRef.current;
        if (shadow) {
          /* Peaks as the panel starts to lift, gone by the time it
             has left the screen. */
          const o = s < 0.18 ? s / 0.18 : 1 - (s - 0.18) / 0.82;
          shadow.style.opacity = `${Math.max(0, Math.min(1, o))}`;
        }
        if (s >= 0.9) restoreOverflow();
      } else {
        finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const skip = () => {
      /* A press during the draw or the hold completes the mark and
         starts the exit slide from its beginning — the same
         don't-keep-me-waiting contract the old fade finale had. */
      const now = performance.now();
      if (now - start < DRAW_MS + HOLD_MS) {
        setDrawn(TOTAL_LEN);
        drawnFull = true;
        start = now - (DRAW_MS + HOLD_MS);
      }
    };
    window.addEventListener('pointerdown', skip);
    return () => {
      done = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
      window.removeEventListener('pointerdown', skip);
      document.body.style.overflow = '';
    };
  }, []);

  if (gone) return null;

  return (
    <div className="intro" ref={rootRef} aria-hidden="true">
      <div className="intro-stage">
        <div className="intro-mark">
          <svg
            className="intro-mark-svg"
            viewBox="161 159 963 321"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <mask
                id="intro-draw-mask"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="1278"
                height="630"
              >
                <path
                  ref={mainRef}
                  d={MAIN_D}
                  fill="none"
                  stroke="#fff"
                  strokeWidth={MASK_WIDTH}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={MAIN_LEN}
                  strokeDashoffset={MAIN_LEN}
                />
                <path
                  ref={tailRef}
                  d={TAIL_D}
                  fill="none"
                  stroke="#fff"
                  strokeWidth={MASK_WIDTH}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={TAIL_LEN}
                  strokeDashoffset={TAIL_LEN}
                />
              </mask>
            </defs>
            <g mask="url(#intro-draw-mask)" fill="currentColor">
              <path d="M0 0 C1.6 0.44 3.19 0.88 4.84 1.34 C11.05 3.34 16.56 6.08 22.31 9.12 C23.42 9.71 24.52 10.29 25.66 10.89 C39.09 18.07 50.06 26.4 61 37 C62.3 38.24 63.6 39.47 64.94 40.75 C68.29 44.31 71.14 48.04 74 52 C75.03 53.34 76.06 54.68 77.12 56.06 C79.72 59.62 81.85 63.17 84 67 C84.91 68.32 85.81 69.64 86.75 71 C92.88 80.08 97.61 89.99 102 100 C106.44 109.13 111.1 118.11 116 127 C120.87 135.87 125.38 144.56 128.82 154.08 C130.35 157.87 132.36 161.18 134.54 164.61 C136 167 136 167 138.31 171.88 C140.86 177.12 144.24 181.56 147.82 186.14 C150 189 150 189 151.97 192.16 C157.96 200.55 169.18 203.61 179 204 C199.89 199.82 212.04 177.24 222.5 160.5 C244.75 125.29 272.04 99.17 315.68 99.81 C332.11 100.53 343.38 103.92 357 113 C357.8 113.5 358.6 114 359.43 114.52 C370.62 121.78 380.06 131.66 387 143 C388.15 144.47 389.32 145.93 390.5 147.38 C393.62 151.32 395.94 155.4 398.27 159.84 C401.15 165.1 404.41 170.13 407.61 175.2 C409.53 178.25 411.41 181.33 413.25 184.44 C416.03 189.06 418.94 193.56 422 198 C422.61 198.89 423.21 199.78 423.84 200.69 C431.57 211.69 438.86 221.69 453.56 220.94 C470.41 218.74 486.43 202.86 495.5 189.25 C498.29 185.62 500.92 184 505 182 C510.61 184.24 511.07 185.05 513.81 190.12 C514.15 190.75 514.15 190.75 515.88 193.93 C519.34 200.58 522.73 207.26 526 214 C526.53 215.07 527.06 216.14 527.61 217.25 C532.12 226.61 531.82 230.79 526.2 239.2 C523.29 242.9 520 245.85 516.41 248.88 C514 251 514 251 510.5 255.19 C507.01 258.98 504.02 261.05 499.58 263.5 C496.99 265 494.78 266.71 492.44 268.56 C471.58 283.52 439.28 280.67 417 271 C412.8 268.76 409.46 266.26 406 263 C404.92 261.99 403.85 260.99 402.74 259.95 C394.38 251.84 387.01 243.37 380.68 233.58 C379.4 231.61 378.09 229.67 376.76 227.73 C371.16 219.54 366.2 211.15 361.45 202.43 C358.45 197 355.25 191.7 352.02 186.4 C350.22 183.37 348.53 180.31 346.88 177.19 C339.53 163.58 329.46 147.4 312.69 146.81 C297.39 147.08 291.81 156.92 283.88 168.76 C281.08 172.88 278.16 176.88 275.19 180.88 C272.23 184.87 269.41 188.81 266.94 193.12 C263.25 199.54 258.57 205.2 254 211 C252.93 212.44 251.86 213.89 250.75 215.38 C239.8 229.39 228.3 240.11 212.49 248.21 C209.99 249.49 207.54 250.87 205.12 252.31 C181.71 261.89 156.53 257.74 135 246 C133.93 245.5 132.86 245 131.75 244.49 C127.98 242.45 126.47 239.47 124 236 C121.36 233.96 118.7 231.96 116 230 C102.77 217.47 94.57 201.93 86.2 185.99 C83.84 181.5 81.33 177.19 78.56 172.94 C74.79 167.02 72.34 160.76 69.77 154.25 C66.99 147.57 63.48 141.34 60 135 C58.35 131.88 56.7 128.75 55.06 125.62 C54.22 124.03 53.38 122.43 52.51 120.78 C50.89 117.69 49.28 114.6 47.68 111.5 C42.91 102.33 37.75 93.59 32 85 C31.34 83.97 30.68 82.95 30 81.89 C25.36 75.19 19.41 69.9 12.5 65.6 C10.62 64.4 8.79 63.1 7 61.77 C-0.45 56.28 -7.06 53.24 -16 51 C-16.78 50.74 -16.78 50.74 -20.75 49.44 C-34.62 45.64 -47.95 44.53 -62.26 44.94 C-64.87 45 -67.47 44.99 -70.07 44.99 C-83.41 45.19 -94.61 48.47 -107 53 C-108.43 53.5 -109.87 54.01 -111.35 54.53 C-114.57 55.83 -116.94 57.11 -119.69 59.19 C-123.53 62 -127.46 64.51 -131.56 66.94 C-141.31 72.9 -148.08 79.99 -155 89 C-155.87 90.01 -156.73 91.02 -157.62 92.06 C-163.01 98.72 -166.73 105.16 -169.82 113.11 C-171 116 -171 116 -172.51 118.71 C-182.93 141.66 -179.78 174.11 -169 196 C-168.72 196.57 -168.72 196.57 -167.32 199.43 C-153.73 225.07 -131.84 241.74 -104.69 251.12 C-103.72 251.47 -102.75 251.82 -101.75 252.18 C-88.95 256.63 -77.18 257.34 -63.69 257.31 C-62.89 257.32 -62.89 257.32 -58.85 257.36 C-45.14 257.37 -33.14 254.95 -20.19 250.69 C-18.47 250.13 -16.75 249.58 -14.98 249.01 C-9.74 246.89 -5.62 244.25 -1 241 C0.31 240.22 1.62 239.44 2.96 238.64 C12.59 232.85 20.1 226.46 27.67 218.19 C35.93 209.37 45.84 205.59 58 207 C66.18 209.65 70.47 213.56 73.25 221.62 C76.41 240.08 70.04 252.31 56 264 C54.74 265.13 53.48 266.27 52.19 267.44 C28.33 287.73 2.38 299.82 -28 307 C-28.57 307.14 -28.57 307.14 -31.46 307.86 C-41.86 310.23 -51.93 310.42 -62.56 310.31 C-64.24 310.32 -65.91 310.32 -67.64 310.32 C-85.66 310.24 -102.17 307.56 -119 301 C-119.79 300.77 -119.79 300.77 -123.81 299.62 C-129.48 297.85 -134.66 295.57 -140 293 C-141.36 292.36 -142.72 291.72 -144.12 291.06 C-147.71 289.15 -151.05 287.05 -154.4 284.75 C-156.32 283.46 -158.26 282.22 -160.23 281 C-168.82 275.66 -176.44 269.71 -184 263 C-184.96 262.19 -185.92 261.37 -186.91 260.54 C-197 251.79 -204.35 241.49 -211 230 C-211.95 228.68 -212.9 227.36 -213.88 226 C-232.62 198.31 -236.04 162.19 -232 130 C-231.88 129.01 -231.76 128.01 -231.64 126.99 C-229.82 112.47 -226.51 100.2 -220 87 C-219.41 85.79 -218.82 84.57 -218.21 83.32 C-214.97 77.01 -211.23 71.33 -206.96 65.68 C-205.03 63.05 -203.36 60.36 -201.69 57.56 C-194.96 46.87 -185.88 38.7 -176 31 C-175.6 30.66 -175.6 30.66 -173.58 28.95 C-166.89 23.32 -159.63 19.21 -152 15 C-149.67 13.63 -147.33 12.25 -145 10.88 C-134.72 5.01 -124.41 1 -113 -2 C-112.08 -2.49 -111.15 -2.98 -110.2 -3.48 C-106.39 -5.29 -102.91 -5.94 -98.75 -6.62 C-98.05 -6.74 -98.05 -6.74 -94.48 -7.35 C-62.99 -11.91 -29.91 -10.94 0 0 Z " transform="translate(395,169)" />
              <path d="M0 0 C4.97 -0.07 9.94 -0.12 14.91 -0.15 C16.92 -0.16 18.93 -0.18 20.94 -0.21 C38.3 -0.39 55.57 -0.32 66.77 15.08 C69.64 26.55 68.29 34.85 60.58 43.77 C51.87 51.33 43.23 52.16 32.15 52.36 C31.69 52.37 31.69 52.37 29.34 52.42 C26.38 52.47 23.42 52.53 20.45 52.58 C-39.22 53.64 -39.22 53.64 -58.23 74.08 C-59.04 74.82 -59.84 75.56 -60.67 76.33 C-68.35 84.57 -74.09 94.42 -80.05 103.93 C-83.46 109.37 -87 114.68 -90.76 119.9 C-92.23 122.08 -92.23 122.08 -94.17 125.95 C-95.99 129.58 -97.92 132.92 -100.11 136.33 C-100.75 137.32 -101.38 138.32 -102.04 139.34 C-104.46 142.36 -106.93 144.1 -110.23 146.08 C-116.32 143.64 -117.06 141.67 -120.23 136.08 C-121.04 134.73 -121.84 133.39 -122.66 132 C-123.47 130.62 -124.28 129.25 -125.11 127.83 C-125.97 126.35 -126.84 124.88 -127.73 123.36 C-130.42 118.75 -133.1 114.14 -135.76 109.52 C-137.23 107.08 -137.23 107.08 -139.67 103.83 C-143.14 97.73 -141.37 91.93 -138.23 86.08 C-136.87 84.25 -135.51 82.43 -134.1 80.64 C-131.63 77.24 -129.49 73.67 -127.3 70.08 C-123.64 64.17 -119.95 59.15 -115.23 54.08 C-113.91 52.46 -112.6 50.84 -111.3 49.2 C-110.63 48.37 -109.96 47.53 -109.27 46.66 C-107.91 44.93 -106.56 43.19 -105.23 41.43 C-101.04 35.97 -96.95 32.03 -91.23 28.08 C-90.41 27.41 -89.58 26.75 -88.73 26.07 C-76.13 16.02 -61.98 8.62 -46.23 5.08 C-44.9 4.72 -43.56 4.36 -42.18 4 C-28.13 0.45 -14.38 0.21 0 0 Z " transform="translate(1055.2333984375,234.921875)" />
            </g>
          </svg>
        </div>
      </div>
      <div className="intro-shadow" ref={shadowRef} />
    </div>
  );
}
