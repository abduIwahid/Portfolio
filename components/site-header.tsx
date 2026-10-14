'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

const links = [
  { href: '/projects', label: 'Projects' },
  { href: '/writing', label: 'Writing' },
  { href: '/about', label: 'About' },
  { href: '/cv', label: 'CV' }
];
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="container header-inner">
      <Link href="/" className="brand" aria-label="Abdul Wahid home" onClick={() => setOpen(false)}>
        <span className="brand-mark">AW<span>.</span></span><span className="brand-name">Abdul Wahid <small>AI/ML Developer</small></span>
      </Link>
      <button className="icon-button mobile-menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open}>
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
        {links.map((link) => <Link key={link.href} href={link.href} className={pathname === link.href || pathname.startsWith(`${link.href}/`) ? 'nav-link active' : 'nav-link'} onClick={() => setOpen(false)}>{link.label}</Link>)}
        <Link href="/contact" className={`nav-contact ${pathname === '/contact' ? 'active' : ''}`} onClick={() => setOpen(false)}>Let&apos;s talk <ArrowUpRight size={15} /></Link>
      </nav>
      <ThemeToggle />
    </div>
  </header>;
}
