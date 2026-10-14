import Link from 'next/link';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '@/content/profile';
export function SiteFooter() {
  return <footer className="site-footer">
    <div className="container footer-top">
      <div><p className="eyebrow">Have a useful problem?</p><h2>Let&apos;s make the next<br className="desktop-only" /> thing worth inspecting.</h2></div>
      <Link href="/contact" className="round-arrow" aria-label="Go to contact"><ArrowUpRight size={24} /></Link>
    </div>
    <div className="container footer-bottom">
      <span>© {new Date().getFullYear()} Abdul Wahid</span>
      <span className="footer-note">Built around evidence, not hype. · <Link href="/privacy">Privacy</Link></span>
      <div className="footer-links">
        <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
        <a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={17} /></a>
        <Link href="/contact" aria-label="Contact page"><ArrowUpRight size={17} /></Link>
      </div>
    </div>
  </footer>;
}
