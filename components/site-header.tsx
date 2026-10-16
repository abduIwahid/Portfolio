'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/writing', label: 'Writing' },
  { href: '/about', label: 'About' },
  { href: '/cv', label: 'CV' },
  { href: '/links', label: 'Links' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="container header-inner">
      <Link href="/" className="brand" aria-label="Abdul Wahid home" onClick={() => setOpen(false)}>
        <span className="brand-mark" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="22" height="22" aria-hidden="true" focusable="false">
            <path
              d="M 28 20 A 11 11 0 1 0 28 40 C 35 36 42 46 46 30 C 50 18 54 44 58 26"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="58" cy="17" r="2.8" fill="#f97316"/>
          </svg>
        </span><span className="brand-name">Abdul Wahid <small>AI/ML Developer</small></span>
      </Link>
      <button
        className="icon-button mobile-menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
      >
        <span className={`hamburger-icon ${open ? 'is-open' : ''}`} aria-hidden="true">
          <span className="bar bar-1" />
          <span className="bar bar-2" />
          <span className="bar bar-3" />
        </span>
      </button>
      <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
        {links.map((link) => {
          const isHome = link.href === '/';
          const isActive = isHome ? pathname === '/' : pathname === link.href || pathname.startsWith(`${link.href}/`);
          return <Link key={link.href} href={link.href} className={isActive ? 'nav-link active' : 'nav-link'} onClick={() => setOpen(false)}>{link.label}</Link>;
        })}
        <Link href="/contact" className={`nav-contact ${pathname === '/contact' ? 'active' : ''}`} onClick={() => setOpen(false)}>Let&apos;s talk <ArrowUpRight size={15} /></Link>
      </nav>
      <ThemeToggle />
    </div>
  </header>;
}
