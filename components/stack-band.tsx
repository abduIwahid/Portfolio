/**
 * Tech-stack band for /about — a constant-speed loop of the tools
 * Wadi actually works with (icons: Simple Icons, CC0, saved under
 * public/stack-icons/). Pure CSS animation, no client JS: the set
 * repeats twice and the track translates -50%; the duplicate is
 * aria-hidden. Pauses on hover; under reduced motion it rests as a
 * static single set. Icons render as monochrome silhouettes in the
 * site ink (see .stack-band-icon in globals.css).
 */

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
        {[0, 1].map((copy) => (
          <div
            className="stack-band-set"
            key={copy}
            aria-hidden={copy === 1 || undefined}
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
