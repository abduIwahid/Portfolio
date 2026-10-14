'use client';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Github, RefreshCw } from 'lucide-react';
import { profile } from '@/content/profile';

type Snapshot = { available: true; publicRepos: number; stars: number; forks: number; languages: { name: string; count: number }[]; updatedAt: string } | { available: false; message: string };
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
  return <div className="github-snapshot"><div className="github-snapshot-head"><span className="metric-icon"><Github size={18} /></span><div><p className="eyebrow">Public GitHub snapshot</p><h3>Repository signals, live when available.</h3></div><a className="text-link" href={profile.github} target="_blank" rel="noreferrer">Open GitHub <ArrowUpRight size={14} /></a></div>{!snapshot ? <div className="github-snapshot-state" aria-live="polite"><RefreshCw size={15} className="spin" /> Checking public repository metadata…</div> : snapshot.available ? <><div className="github-stat-grid"><div><strong>{snapshot.publicRepos}</strong><span>Public repositories</span></div><div><strong>{snapshot.stars}</strong><span>Stars across public repos</span></div><div><strong>{snapshot.forks}</strong><span>Forks across public repos</span></div></div>{snapshot.languages.length > 0 && <div className="github-languages"><span>Languages in public repos</span>{snapshot.languages.map((language) => <span className="tag" key={language.name}>{language.name} · {language.count}</span>)}</div>}<p className="github-snapshot-note">Fetched from the public GitHub API. Metadata is cached and may lag behind the profile.</p></> : <div className="github-snapshot-state">{snapshot.message}</div>}</div>;
}
