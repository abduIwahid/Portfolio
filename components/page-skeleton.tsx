/**
 * Skeleton preview shown while a page loads, so visitors see the shape of
 * the site immediately instead of a blank page. Theme colours only.
 */
export function PageSkeleton({ variant = 'home' }: { variant?: 'home' | 'list' | 'detail' }) {
  return (
    <div className="container skel" role="status" aria-label="Loading page">
      {variant === 'home' && (
        <>
          <div className="skel-hero">
            <div className="skel-block skel-circle" />
            <div className="skel-block skel-pill" />
            <div className="skel-block skel-line skel-line-xl" />
            <div className="skel-block skel-line skel-line-lg" />
            <div className="skel-block skel-line" />
            <div className="skel-row">
              <div className="skel-block skel-btn" />
              <div className="skel-block skel-btn" />
            </div>
          </div>
          <div className="skel-block skel-line skel-line-md" />
          <div className="skel-grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <div className="skel-card" key={i}>
                <div className="skel-block skel-shot" />
                <div className="skel-block skel-line" />
                <div className="skel-block skel-line skel-line-sm" />
              </div>
            ))}
          </div>
        </>
      )}
      {variant === 'list' && (
        <>
          <div className="skel-block skel-line skel-line-xl" />
          <div className="skel-block skel-line" />
          <div className="skel-row">
            {Array.from({ length: 5 }).map((_, i) => (
              <div className="skel-block skel-chip" key={i} />
            ))}
          </div>
          <div className="skel-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="skel-card" key={i}>
                <div className="skel-block skel-shot" />
                <div className="skel-block skel-line" />
                <div className="skel-block skel-line skel-line-sm" />
              </div>
            ))}
          </div>
        </>
      )}
      {variant === 'detail' && (
        <>
          <div className="skel-block skel-line skel-line-lg" />
          <div className="skel-block skel-line skel-line-xl" />
          <div className="skel-block skel-line" />
          <div className="skel-block skel-shot skel-shot-lg" />
          <div className="skel-block skel-line" />
          <div className="skel-block skel-line" />
          <div className="skel-block skel-line skel-line-sm" />
        </>
      )}
    </div>
  );
}
