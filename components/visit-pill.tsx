import { ArrowUpRight } from 'lucide-react';

/**
 * Expanding "Visit" pill — the live-site action, shared by the
 * /projects stack panels and the case-study heroes.
 *
 * At rest it is a 44px solid ink circle with the arrow pinned in
 * it (on touch, where there is no hover, the circle is all that
 * shows — the accessible name carries the meaning). On hover or
 * keyboard focus the "Visit" label slides in and the pill grows
 * to ~108px, gliding its siblings along the actions row. The
 * GitHub circle beside it stays a plain circle.
 */
export function VisitPill({ href, name }: { href: string; name?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="visit-pill"
      aria-label={name ? `Visit live site of ${name}` : 'Visit live site'}
    >
      <span className="visit-pill-label" aria-hidden="true">
        Visit
      </span>
      <span className="visit-pill-icon" aria-hidden="true">
        <ArrowUpRight size={17} />
      </span>
    </a>
  );
}
