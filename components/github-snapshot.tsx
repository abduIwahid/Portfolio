'use client';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Github, RefreshCw } from 'lucide-react';
import { profile } from '@/content/profile';

type ContributionDay = { date: string; level: number; count: number };
type TopRepository = { name: string; url: string; description: string | null; language: string | null; pushedAt: string };
type Snapshot = {
  available: true;
  publicRepos: number;
  stars: number;
  forks: number;
  languages: { name: string; count: number }[];
  topRepositories: TopRepository[];
  latestPush: { repo: string; url: string; at: string } | null;
  community: { mergedPrs: number; repos: string[] } | null;
  contributions: { total: number; streak: number; thisMonth: number; monthName: string; weeks: (ContributionDay | null)[][] } | null;
  updatedAt: string;
} | { available: false; message: string };

/** Compact relative time for push timestamps ("3h ago", "2d ago"). */
function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return 'recently';
  const seconds = Math.floor((Date.now() - then) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

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
            {snapshot.contributions
              ? <>
                <div><strong>{snapshot.contributions.total}</strong><span>Contributions in the last year</span></div>
                <div><strong>{snapshot.contributions.streak}</strong><span>Current streak (days)</span></div>
              </>
              : <>
                <div><strong>{snapshot.stars}</strong><span>Stars across public repos</span></div>
                <div><strong>{snapshot.forks}</strong><span>Forks across public repos</span></div>
              </>}
          </div>
          {snapshot.contributions && <p className="github-meta-line">{snapshot.stars} stars · {snapshot.forks} forks across public repos</p>}
          {snapshot.latestPush && <p className="github-meta-line">Latest push: <a href={snapshot.latestPush.url} target="_blank" rel="noreferrer">{snapshot.latestPush.repo}</a> · {relativeTime(snapshot.latestPush.at)}</p>}
          {snapshot.topRepositories.length > 0 && (
            <div className="github-repo-grid">
              {snapshot.topRepositories.map((repository) => (
                <div className="github-repo-card" key={repository.name}>
                  <a className="github-repo-name" href={repository.url} target="_blank" rel="noreferrer">{repository.name}<ArrowUpRight size={13} /></a>
                  {repository.description && <p className="github-repo-desc">{repository.description}</p>}
                  <p className="github-repo-meta">
                    {repository.language && <span>{repository.language}</span>}
                    <span>pushed {relativeTime(repository.pushedAt)}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
          {snapshot.community && (
            <div className="github-community">
              <div className="github-community-head">
                <strong>{snapshot.community.mergedPrs}</strong>
                <span>Merged pull requests in community repos</span>
              </div>
              {snapshot.community.repos.length > 0 && (
                <div className="github-community-repos">
                  {snapshot.community.repos.map((repoName) => (
                    <a className="tag" key={repoName} href={`https://github.com/${repoName}`} target="_blank" rel="noreferrer">{repoName}</a>
                  ))}
                </div>
              )}
            </div>
          )}
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
          <span>{snapshot.contributions.total} contributions in the last year · {snapshot.contributions.thisMonth} in {snapshot.contributions.monthName}</span>
          <span className="contrib-legend">Less {[0, 1, 2, 3, 4].map((level) => <span className="contrib-cell" key={level} data-level={level} />)} More</span>
        </div>
      </div>
    )}
  </div>;
}
