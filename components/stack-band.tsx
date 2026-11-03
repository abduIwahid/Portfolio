/**
 * Tech-stack band for /about — a constant-speed loop of the tools
 * Wadi actually works with (icons: Simple Icons, CC0, saved under
 * public/stack-icons/). Pure CSS animation, no client JS.
 *
 * Coverage rule (the same run-out the X-marquee had, fixed the same
 * way): the track is two identical HALVES and the keyframes translate
 * -50% — exactly one half — so the loop is seamless at any set count,
 * but the band only stays full while one half is at least as wide as
 * the band itself. One set measures ~1513px, so with a single set per
 * half the band ran empty on every viewport wider than ~1513px, worst
 * just before the wrap (gap ≈ viewport − 1513). Each half therefore
 * holds SETS_PER_HALF sets (~6052px), keeping the band full far beyond
 * a 3440px viewport; the globals.css duration is 32s × SETS_PER_HALF
 * so the scroll speed (one set per 32s) is unchanged. Only the first
 * set is exposed to assistive tech; the rest are aria-hidden. Pauses
 * on hover; under reduced motion it rests as a static single set.
 * Icons render as monochrome silhouettes in the site ink (see
 * .stack-band-icon in globals.css).
 */
const SETS_PER_HALF = 4;

const TOOLS = [
  { name: 'Python', icon: '/stack-icons/python.svg' },
  { name: 'scikit-learn', icon: '/stack-icons/scikitlearn.svg' },
  { name: 'FastAPI', icon: '/stack-icons/fastapi.svg' },
  { name: 'Next.js', icon: '/stack-icons/nextdotjs.svg' },
  { name: 'React', icon: '/stack-icons/react.svg' },
  { name: 'TypeScript', icon: '/stack-icons/typescript.svg' },
  { name: 'Supabase', icon: '/stack-icons/supabase.svg' },
  { name: 'PostgreSQL', icon: '/stack-icons/postgresql.svg' },
  { name: 'Docker', icon: '/stack-icons/docker.svg' },
  { name: 'Git', icon: '/stack-icons/git.svg' },
];

export function StackBand() {
  return (
    <div className="stack-band" aria-label="Tools I work with">
      <div className="stack-band-track">
        {Array.from({ length: SETS_PER_HALF * 2 }, (_, copy) => (
          <div
            className="stack-band-set"
            key={copy}
            aria-hidden={copy > 0 || undefined}
          >
            {TOOLS.map((tool) => (
              <span className="stack-band-item" key={tool.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tool.icon}
                  alt=""
                  width={26}
                  height={26}
                  className="stack-band-icon"
                />
                <span className="stack-band-name">{tool.name}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
