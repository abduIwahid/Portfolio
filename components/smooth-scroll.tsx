'use client';
import Lenis from 'lenis';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Site-wide smooth scrolling (Lenis), mounted once in the root layout.
 *
 * Lenis runs in its default WINDOW mode: it drives the real document
 * scroll (window.scrollY) and adds no wrapper element and no transformed
 * container around the content. That is deliberate — position: sticky
 * keeps working exactly as with native scroll (the /projects stacking
 * cards and the case-study sticky sidebar depend on it), and readers of
 * window.scrollY (the text marquee's velocity boost, the project stack's
 * scale driver) keep receiving real scroll values on real scroll events.
 *
 * Behaviour contract:
 * - Wheel input is smoothed (lerp 0.1); touch is NOT smoothed
 *   (syncTouch off), so phones keep their native scrolling.
 * - prefers-reduced-motion: Lenis is never initialised; native scroll
 *   (and the CSS scroll-behavior in globals.css) is left untouched.
 * - Route changes jump to the top instantly, in a layout effect, so the
 *   new page is never painted mid-scroll underneath template.tsx's
 *   fade + rise entrance. Back/forward navigations are exempt: the
 *   browser + Next.js restore the previous position instead.
 * - A route change carrying a hash scrolls (instantly) to that target;
 *   same-page hash links (the skip link) are handled by Lenis's own
 *   anchors support, which honours the site's scroll-padding-top.
 * - The site's existing scroll lock wins: while the intro loader holds
 *   body overflow hidden, Lenis is stopped, so wheel input during the
 *   intro cannot accumulate into a jump when the lock lifts.
 */

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const firstRunRef = useRef(true);
  const skipResetRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      anchors: true,
      stopInertiaOnNavigate: true,
    });
    lenisRef.current = lenis;

    let raf = 0;
    let lockStopped = false;
    const loop = (time: number) => {
      const locked = document.body.style.overflow === 'hidden';
      if (locked !== lockStopped) {
        lockStopped = locked;
        if (locked) lenis.stop();
        else lenis.start();
      }
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Back/forward: let the browser + Next.js restore scroll position.
    const onPopState = () => {
      skipResetRef.current = true;
    };
    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (firstRunRef.current) {
      firstRunRef.current = false;
      return;
    }
    if (skipResetRef.current) {
      skipResetRef.current = false;
      return;
    }
    const lenis = lenisRef.current;
    const hash = window.location.hash;
    const target = hash
      ? document.getElementById(decodeURIComponent(hash.slice(1)))
      : null;
    if (lenis) {
      if (target) lenis.scrollTo(target, { immediate: true });
      else lenis.scrollTo(0, { immediate: true });
    } else {
      if (target) target.scrollIntoView();
      else window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
