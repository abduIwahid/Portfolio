'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import Logo from '@/app/components/Logo';
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
        <Logo size={48} />
        <span className="brand-name">Abdul Wahid <small>AI/ML Developer</small></span>
      </Link>
      <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
        {links.map((link) => {
          const isHome = link.href === '/';
          const isActive = isHome ? pathname === '/' : pathname === link.href || pathname.startsWith(`${link.href}/`);
          return <Link key={link.href} href={link.href} className={isActive ? 'nav-link active' : 'nav-link'} onClick={() => setOpen(false)}>{link.label}</Link>;
        })}
        <Link href="/contact" className={`nav-contact ${pathname === '/contact' ? 'active' : ''}`} onClick={() => setOpen(false)}>Let&apos;s talk <ArrowUpRight size={15} /></Link>
      </nav>
      <div className="header-actions">
        <ThemeToggle />
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
      </div>
    </div>
  </header>
}
