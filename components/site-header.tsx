'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
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
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  /* Route change closes the panel (link taps navigate, which lands here). */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* While the panel is open: Escape closes it (focus returns to the menu
     button), a tap outside the header closes it, and body scroll locks —
     the same lock the intro loader uses, which also stops Lenis via its
     overflow watcher in smooth-scroll.tsx. */
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
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open ]);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="container header-bar">
        <div className="header-left">
          <button
            ref={toggleRef}
            type="button"
            className="icon-button menu-toggle"
            onClick={() => setOpen(!open)}
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
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={isActive(link.href) ? 'mobile-link active' : 'mobile-link'}
                aria-current={isActive(link.href) ? 'page' : undefined}
                onClick={() => setOpen(false)}
                tabIndex={open ? undefined : -1}
              >
                <span>{link.label}</span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
