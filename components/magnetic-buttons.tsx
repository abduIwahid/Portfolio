'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Magnetic hover for primary calls to action.
 *
 * Every `.button-primary` and the header `.hire-button` gently
 * translates toward the cursor (max ~4px) while hovered and eases back
 * on leave. Fine pointers only, disabled under prefers-reduced-motion.
 * A MutationObserver rebinds buttons that appear after client-side
 * navigation or dynamic renders, so no button markup changes anywhere.
 */
export function MagneticButtons() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const bound = new WeakSet<HTMLElement>();
    const cleanups = new Map<HTMLElement, () => void>();

    const bind = (el: HTMLElement) => {
      if (bound.has(el)) return;
      bound.add(el);
      let raf = 0;
      let px = 0;
      let py = 0;
      const onMove = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        px = event.clientX - (rect.left + rect.width / 2);
        py = event.clientY - (rect.top + rect.height / 2);
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          let tx = px * 0.22;
          let ty = py * 0.28;
          const len = Math.hypot(tx, ty);
          if (len > 4) {
            tx = (tx / len) * 4;
            ty = (ty / len) * 4;
          }
          el.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px)`;
        });
      };
      const onLeave = () => {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        el.style.transform = '';
      };
      el.addEventListener('pointermove', onMove, { passive: true });
      el.addEventListener('pointerleave', onLeave);
      cleanups.set(el, () => {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
        if (raf) cancelAnimationFrame(raf);
        el.style.transform = '';
      });
    };

    const scan = () => {
      document.querySelectorAll<HTMLElement>('.button-primary, .hire-button').forEach(bind);
    };
    scan();
    const observer = new MutationObserver(scan);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      cleanups.forEach((fn) => fn());
      cleanups.clear();
    };
  }, [pathname]);

  return null;
}
