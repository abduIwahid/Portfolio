import Link from 'next/link';
import { ArrowUpRight, Home } from 'lucide-react';
import { Press_Start_2P } from 'next/font/google';
import { DotsField } from '@/components/dots-field';

const pixelFont = Press_Start_2P({ weight: '400', subsets: ['latin'], variable: '--font-pixel' });

export default function NotFound() {
  return (
    <section className={`page-hero nf-hero ${pixelFont.variable}`} style={{ position: 'relative', overflow: 'hidden' }}>
      <DotsField />
      <div className="container page-heading" style={{ position: 'relative' }}>
        <p className="nf-pixel-chip">
          GAME OVER<span className="nf-cursor" aria-hidden="true">▮</span>
        </p>
        <p className="nf-pixel-code" aria-hidden="true">
          40<span className="nf-accent">4</span>
        </p>
        <h1>
          That path doesn&apos;t
          <br />
          lead anywhere.
        </h1>
        <p>The page may have moved, or the address may be incomplete. Head back to the work or start from the homepage.</p>
        <p>On the bright side, this is the only page on this site with zero evidence behind it.</p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/">
            <Home size={16} /> Respawn at home
          </Link>
          <Link className="button button-secondary" href="/projects">
            <ArrowUpRight size={16} /> Explore projects
          </Link>
        </div>
      </div>
    </section>
  );
}
