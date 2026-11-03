'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { LogoMark } from './logo-mark';

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/writing', label: 'Writing' },
  { href: '/about', label: 'About' },
  { href: '/cv', label: 'CV' },
  { href: '/links', label: 'Links' },
];

/* Desktop bar shows every destination except Home (the centred mark is
   the home link); the mobile panel lists all six, Home first. */
const desktopLinks = links.slice(1);

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef(0);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  /* Route change closes the panel (link taps navigate, which lands here)
     and brings the bar back — the new page starts at the top. */
  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [pathname]);

  /* Smart bar: scrolling down past ~140px slides the bar up off-screen;
     any upward scroll brings it back, and near the top it is always
     visible. Direction is judged against the last flip point with a 4px
     dead-zone, so small scroll wobbles (and Lenis's eased tail) never
     jitter it. The bar is sticky, so hiding is a pure transform — the
     layout box stays put and nothing below jumps. While the mobile
     panel is open the bar never hides: the panel hangs from it. Reads
     plain window scroll, so it behaves the same with and without
     Lenis (which runs in window mode and drives the real scroll). */
  useEffect(() => {
    anchorRef.current = window.scrollY;
    if (open) {
      setHidden(false);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        if (y <= 140) {
          setHidden(false);
          anchorRef.current = y;
          return;
        }
        const delta = y - anchorRef.current;
        if (delta > 4) {
          setHidden(true);
          anchorRef.current = y;
        } else if (delta < -4) {
          setHidden(false);
          anchorRef.current = y;
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [open ]);

  /* While the panel is open: Escape closes it (focus returns to the menu
     button), a tap outside the header closes it, and ANY deliberate
     scroll closes it — the panel slides back up the moment the page
     moves. Deliberately NO body scroll lock here: the old lock
     (body overflow hidden) silently broke the bar's position: sticky —
     a non-visible overflow on body turns body into the sticky scroll
     container, so at any real scroll depth the whole header, freshly
     opened panel included, teleported back to the top of the document
     and the menu "never opened". Scroll-to-close replaces the lock:
     the page effectively stays put because moving it dismisses the
     panel. The scroll watcher tolerates the momentum tail of the flick
     that surfaced the bar (a large move always closes; a small move
     only counts after a short grace period). */
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const baseY = window.scrollY;
    const openedAt = performance.now();
    const onScroll = () => {
      const moved = Math.abs(window.scrollY - baseY);
      if (moved > 48 || (moved > 6 && performance.now() - openedAt > 250)) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('scroll', onScroll);
    };
  }, [open ]);

  return (
    <>
      <header className={`site-header${hidden ? ' is-hidden' : ''}`} ref={headerRef}>
        <div className="container header-bar">
          <div className="header-left">
            <button
              ref={toggleRef}
              type="button"
              className="icon-button menu-toggle"
              onClick={() => {
                if (!open) setHidden(false);
                setOpen(!open);
              }}
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span className={`hamburger-icon ${open ? 'is-open' : ''}`} aria-hidden="true">
                <span className="bar bar-1" />
                <span className="bar bar-2" />
                <span className="bar bar-3" />
              </span>
            </button>
            <nav className="header-nav" aria-label="Main navigation">
              {desktopLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={isActive(link.href) ? 'nav-link active' : 'nav-link'}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <Link href="/" className="header-brand" aria-label="Abdul Wahid — home" onClick={() => setOpen(false)}>
            <LogoMark height={24} className="header-mark" />
          </Link>
          <div className="header-actions">
            <ThemeToggle />
            <Link href="/contact" className="hire-button">
              Hire me <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className={`mobile-menu ${open ? 'is-open' : ''}`} id="mobile-menu" aria-hidden={!open}>
          <nav className="mobile-panel" aria-label="Mobile navigation">
            <div className="container mobile-menu-inner">
              {links.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={isActive(link.href) ? 'mobile-link active' : 'mobile-link'}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? undefined : -1}
                  style={{ '--i': i } as CSSProperties}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={19} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>
      <div
        className={`mobile-scrim ${open ? 'is-open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
    </>
  );
}
