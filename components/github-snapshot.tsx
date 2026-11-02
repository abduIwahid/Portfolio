'use client';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Github, RefreshCw } from 'lucide-react';
import { profile } from '@/content/profile';

type ContributionDay = { date: string; level: number; count: number };
type Snapshot = { available: true; publicRepos: number; stars: number; forks: number; languages: { name: string; count: number }[]; contributions: { total: number; weeks: (ContributionDay | null)[][] } | null; updatedAt: string } | { available: false; message: string };

export function GitHubSnapshot() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/github', { signal: controller.signal }).then(async (response) => {
      const result = await response.json() as Snapshot;
      if (!response.ok || !result.available) throw new Error('Live repository metadata is unavailable right now.');
      setSnapshot(result);
    }).catch(() => { if (!controller.signal.aborted) setSnapshot({ available: false, message: 'Live repository metadata is unavailable right now. Project links remain available on this site.' }); });
    return () => controller.abort();
  }, []);

  return <div className="github-snapshot">
    <div className="github-snapshot-head">
      <span className="metric-icon"><Github size={18} /></span>
      <div>
        <p className="eyebrow">Public GitHub snapshot</p>
        <h3>Repository signals, live when available.</h3>
      </div>
      <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">Open GitHub <ArrowUpRight size={14} /></a>
    </div>

    {!snapshot
      ? <div className="github-snapshot-state" aria-live="polite"><RefreshCw size={15} className="spin" /> Checking public repository metadata…</div>
      : snapshot.available
        ? <>
          <div className="github-stat-grid">
            <div><strong>{snapshot.publicRepos}</strong><span>Public repositories</span></div>
            <div><strong>{snapshot.stars}</strong><span>Stars across public repos</span></div>
            <div><strong>{snapshot.forks}</strong><span>Forks across public repos</span></div>
          </div>
          {snapshot.languages.length > 0 && <div className="github-languages"><span>Languages in public repos</span>{snapshot.languages.map((language) => <span className="tag" key={language.name}>{language.name} · {language.count}</span>)}</div>}
          <p className="github-snapshot-note">Fetched from the public GitHub API. Metadata is cached and may lag behind the profile.</p>
        </>
        : <div className="github-snapshot-state">{snapshot.message}</div>
    }

    {/* Contribution graph, rendered from the calendar data in the
        snapshot so the cells take the site's own theme tokens and read
        correctly under both the light and dark theme toggles. */}
    {snapshot?.available && snapshot.contributions && (
      <div className="github-contrib-wrap">
        <p className="eyebrow" style={{ marginBottom: 14 }}>Contribution activity</p>
        <div className="contrib-grid" role="img" aria-label={`GitHub contribution graph for the last year: ${snapshot.contributions.total} contributions`}>
          {snapshot.contributions.weeks.map((week, weekIndex) => (
            <div className="contrib-week" key={weekIndex}>
              {week.map((day, dayIndex) => day
                ? <span className="contrib-cell" key={dayIndex} data-level={day.level} title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`} />
                : <span className="contrib-cell contrib-cell-empty" key={dayIndex} aria-hidden="true" />)}
            </div>
          ))}
        </div>
        <div className="contrib-foot">
          <span>{snapshot.contributions.total} contributions in the last year</span>
          <span className="contrib-legend">Less {[0, 1, 2, 3, 4].map((level) => <span className="contrib-cell" key={level} data-level={level} />)} More</span>
        </div>
      </div>
    )}
  </div>;
}
