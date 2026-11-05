'use client';
import { useEffect, useRef, useState } from 'react';
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

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** Split an ISO date (yyyy-mm-dd) into parts without timezone drift. */
function dateParts(iso: string): { year: number; month: number; day: number } {
  const [year, month, day] = iso.split('-').map((part) => parseInt(part, 10));
  return { year, month: month - 1, day };
}

function dayLabel(iso: string): string {
  const { month, day } = dateParts(iso);
  return `${day} ${MONTHS_SHORT[month]}`;
}

/** Donut segment tones: theme-aware first/last, brand accents between. */
const DONUT_COLORS = ['var(--foreground)', '#F97316', '#8A8A86', 'var(--accent-text)', '#C9C9C4'];

/** Animated number: counts up once the section plays; renders the final
    value on the server and whenever animation is not armed. */
function CountUp({ value, play, armed, delay = 0, suffix = '' }: { value: number; play: boolean; armed: boolean; delay?: number; suffix?: string }) {
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    if (!armed) { setDisplay(value); return; }
    if (!play) { setDisplay(0); return; }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setDisplay(value); return; }
    let raf = 0;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const t = Math.min(Math.max((now - start) / 1300, 0), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, play, armed, delay]);
  return <>{display.toLocaleString('en-US')}{suffix}</>;
}

export function GitHubSnapshot() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [armed, setArmed] = useState(false);
  const [play, setPlay] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/github', { signal: controller.signal }).then(async (response) => {
      const result = await response.json() as Snapshot;
      if (!response.ok || !result.available) throw new Error('Live repository metadata is unavailable right now.');
      setSnapshot(result);
    }).catch(() => { if (!controller.signal.aborted) setSnapshot({ available: false, message: 'Live repository metadata is unavailable right now. Project links remain available on this site.' }); });
    return () => controller.abort();
  }, []);

  /* Arm the scroll-triggered chart animation once on mount. Reduced
     motion (or no IntersectionObserver) never arms: everything simply
     renders in its final state. */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) { setPlay(true); return; }
    setArmed(true);
  }, []);

  useEffect(() => {
    if (!armed || play) return;
    const element = rootRef.current;
    if (!element) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { setPlay(true); observer.disconnect(); }
    }, { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [armed, play, snapshot]);

  const hidden = armed && !play;

  /* ---- chart data, all derived from the live payload ---- */
  const contributions = snapshot?.available ? snapshot.contributions : null;
  const days: ContributionDay[] = contributions
    ? contributions.weeks.flat().filter((day): day is ContributionDay => Boolean(day && day.date)).sort((a, b) => a.date.localeCompare(b.date))
    : [];

  const monthlyMap = new Map<string, number>();
  for (const day of days) monthlyMap.set(day.date.slice(0, 7), (monthlyMap.get(day.date.slice(0, 7)) ?? 0) + day.count);
  const monthly = [...monthlyMap.entries()].sort(([a], [b]) => a.localeCompare(b)).slice(-13)
    .map(([key, value]) => ({ key, value, month: parseInt(key.slice(5, 7), 10) - 1, year: parseInt(key.slice(0, 4), 10) }));
  const trendMax = Math.max(...monthly.map((entry) => entry.value), 1);
  const trendBase = 190;
  const trendPoints = monthly.map((entry, index) => ({
    ...entry,
    x: 10 + index * (540 / Math.max(monthly.length - 1, 1)),
    y: trendBase - (entry.value / trendMax) * 165,
  }));
  const trendLine = trendPoints.map((point, index) => `${index ? 'L' : 'M'}${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(' ');
  const trendArea = trendPoints.length > 1
    ? `${trendLine} L${trendPoints[trendPoints.length - 1].x.toFixed(1)},${trendBase} L${trendPoints[0].x.toFixed(1)},${trendBase} Z`
    : '';
  const peakMonth = monthly.length ? monthly.reduce((best, entry) => (entry.value > best.value ? entry : best), monthly[0]) : null;
  const firstActiveMonth = monthly.find((entry) => entry.value > 0) ?? null;
  const peakPoint = peakMonth ? trendPoints[monthly.indexOf(peakMonth)] : null;
  const firstActivePoint = firstActiveMonth && firstActiveMonth !== peakMonth ? trendPoints[monthly.indexOf(firstActiveMonth)] : null;
  const anchorFor = (x: number) => (x > 490 ? 'end' : x < 70 ? 'start' : 'middle');

  const languageTotal = snapshot?.available ? snapshot.languages.reduce((sum, language) => sum + language.count, 0) : 0;
  const DONUT_C = 2 * Math.PI * 40;
  let donutAcc = 0;
  const donutSegments = snapshot?.available ? snapshot.languages.map((language, index) => {
    const segment = languageTotal > 0 ? (language.count / languageTotal) * DONUT_C : 0;
    const rendered = Math.max(segment - 3, 0.5);
    const entry = { ...language, dash: `${rendered.toFixed(1)} ${(DONUT_C - rendered).toFixed(1)}`, offset: -donutAcc, color: DONUT_COLORS[index % DONUT_COLORS.length] };
    donutAcc += segment;
    return entry;
  }) : [];

  const last30 = days.slice(-30);
  const last30Max = Math.max(...last30.map((day) => day.count), 1);
  const last30Total = last30.reduce((sum, day) => sum + day.count, 0);
  const last30Active = last30.filter((day) => day.count > 0).length;
  const last30Peak = last30.length ? last30.reduce((best, day) => (day.count > best.count ? day : best), last30[0]) : null;
  const last30Top = new Set([...last30].sort((a, b) => b.count - a.count).slice(0, 3).map((day) => day.date));
  const barHeight = (count: number) => Math.max(3, Math.round((count / last30Max) * 118));
  const axisIndices = [0, 7, 14, 21, 29].filter((index) => index < last30.length);

  return <div className={`github-snapshot${armed ? (play ? ' gh-play' : ' gh-armed') : ''}`} ref={rootRef}>
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
          {contributions ? (
            <div className="gh-stats">
              <div className="gh-stat anim-item" style={{ transitionDelay: '150ms' }}><strong><CountUp value={contributions.total} play={play} armed={armed} /></strong><span>Total contributions</span></div>
              <div className="gh-stat anim-item" style={{ transitionDelay: '220ms' }}><strong><CountUp value={contributions.streak} play={play} armed={armed} delay={70} suffix=" days" /></strong><span>Current streak</span></div>
              <div className="gh-stat anim-item" style={{ transitionDelay: '290ms' }}><strong><CountUp value={contributions.thisMonth} play={play} armed={armed} delay={140} /></strong><span>Contributions in {contributions.monthName}</span></div>
              <div className="gh-stat anim-item" style={{ transitionDelay: '360ms' }}><strong><CountUp value={snapshot.publicRepos} play={play} armed={armed} delay={210} /></strong><span>Public repositories</span></div>
              {snapshot.community && <div className="gh-stat anim-item" style={{ transitionDelay: '430ms' }}><strong><CountUp value={snapshot.community.mergedPrs} play={play} armed={armed} delay={280} /></strong><span>Community PRs merged</span></div>}
            </div>
          ) : (
            <div className="gh-stats">
              <div className="gh-stat"><strong>{snapshot.publicRepos}</strong><span>Public repositories</span></div>
              <div className="gh-stat"><strong>{snapshot.stars}</strong><span>Stars across public repos</span></div>
              <div className="gh-stat"><strong>{snapshot.forks}</strong><span>Forks across public repos</span></div>
            </div>
          )}
          <p className="github-meta-line">{snapshot.stars} stars · {snapshot.forks} forks across public repos</p>

          {contributions && monthly.length > 1 && (
            <div className="gh-charts">
              <div className="gh-card anim-item" style={{ transitionDelay: '300ms' }}>
                <p className="gh-card-title">Contribution trend</p>
                <p className="gh-card-sub">Per month, last {monthly.length} months{peakMonth ? `. Peak in ${MONTHS_LONG[peakMonth.month]} with ${peakMonth.value.toLocaleString('en-US')}` : ''}</p>
                <svg className="gh-trend" viewBox="0 0 560 210" role="img" aria-label={`Monthly contributions trend. Peak ${peakMonth ? `${MONTHS_LONG[peakMonth.month]} ${peakMonth.year}` : ''} with ${peakMonth?.value ?? 0} contributions. Total ${contributions.total} in the last year.`}>
                  <path className="gh-trend-area" d={trendArea} fill="#F97316" opacity={hidden ? 0 : 0.14} />
                  <path className="gh-trend-line" pathLength={1} d={trendLine} fill="none" stroke="#F97316" strokeWidth={2.5} strokeLinejoin="round" strokeDasharray={1} strokeDashoffset={hidden ? 1 : 0} />
                  <line x1={10} y1={trendBase} x2={550} y2={trendBase} stroke="var(--border)" strokeWidth={1} />
                  {firstActivePoint && <>
                    <circle cx={firstActivePoint.x} cy={firstActivePoint.y} r={3.5} fill="var(--foreground)" opacity={hidden ? 0 : 1} className="gh-dot" />
                    <text x={firstActivePoint.x} y={firstActivePoint.y - 14} textAnchor={anchorFor(firstActivePoint.x)} fontSize={11.5} fill="var(--muted)" opacity={hidden ? 0 : 1} className="gh-dot">{MONTHS_SHORT[firstActivePoint.month]} · {firstActivePoint.value}</text>
                  </>}
                  {peakPoint && peakMonth && <>
                    <circle cx={peakPoint.x} cy={peakPoint.y} r={4.5} fill="#F97316" opacity={hidden ? 0 : 1} className="gh-dot" />
                    <text x={peakPoint.x} y={Math.max(peakPoint.y - 14, 12)} textAnchor={anchorFor(peakPoint.x)} fontSize={12.5} fontWeight={700} fill="var(--accent-text)" opacity={hidden ? 0 : 1} className="gh-dot">{MONTHS_SHORT[peakMonth.month]} · {peakMonth.value.toLocaleString('en-US')}</text>
                  </>}
                </svg>
                <div className="gh-axis">
                  <span>{monthly.length ? `${MONTHS_SHORT[monthly[0].month]} ${String(monthly[0].year).slice(2)}` : ''}</span>
                  <span>{monthly.length > 6 ? MONTHS_SHORT[monthly[Math.floor(monthly.length / 3)].month] : ''}</span>
                  <span>{monthly.length > 6 ? MONTHS_SHORT[monthly[Math.floor((2 * monthly.length) / 3)].month] : ''}</span>
                  <span>{monthly.length ? `${MONTHS_SHORT[monthly[monthly.length - 1].month]} ${String(monthly[monthly.length - 1].year).slice(2)}` : ''}</span>
                </div>
              </div>

              <div className="gh-card anim-item" style={{ transitionDelay: '420ms' }}>
                <p className="gh-card-title">Languages</p>
                <p className="gh-card-sub">By repository count</p>
                <div className="gh-donut-wrap">
                  <svg className="gh-donut" viewBox="0 0 100 100" role="img" aria-label={`Languages by repository count: ${snapshot.languages.map((language) => `${language.name} ${language.count}`).join(', ')}`} style={{ transform: hidden ? 'rotate(-38deg) scale(.92)' : 'none', opacity: hidden ? 0 : 1 }}>
                    <circle cx={50} cy={50} r={40} fill="none" stroke="var(--surface-alt)" strokeWidth={15} />
                    {donutSegments.map((segment) => (
                      <circle key={segment.name} cx={50} cy={50} r={40} fill="none" stroke={segment.color} strokeWidth={15} strokeDasharray={segment.dash} strokeDashoffset={segment.offset} transform="rotate(-90 50 50)" />
                    ))}
                    <text x={50} y={47} textAnchor="middle" fontSize={17} fontWeight={700} fill="var(--foreground)">{languageTotal}</text>
                    <text x={50} y={60} textAnchor="middle" fontSize={7.5} fill="var(--muted)">repos tagged</text>
                  </svg>
                  <div className="gh-legend">
                    {donutSegments.map((segment, index) => (
                      <div className="anim-item" style={{ transitionDelay: `${800 + index * 80}ms` }} key={segment.name}><i style={{ background: segment.color }} /><span>{segment.name}</span><b>{segment.count}</b></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {contributions && last30.length > 0 && (
            <div className="gh-charts">
              <div className="gh-card anim-item" style={{ transitionDelay: '540ms' }}>
                <p className="gh-card-title">Last 30 days</p>
                <p className="gh-card-sub">Per day: {last30Total.toLocaleString('en-US')} contributions in 30 days, active on {last30Active} of them{last30Peak ? `. Peak ${dayLabel(last30Peak.date)} with ${last30Peak.count}` : ''}</p>
                <div className="gh-bars" role="img" aria-label={`Daily contributions for the last 30 days: ${last30Total} total, active on ${last30Active} days, peak ${last30Peak ? `${dayLabel(last30Peak.date)} with ${last30Peak.count}` : ''}`}>
                  {last30.map((day, index) => (
                    <div className="gh-bar-col" key={day.date} title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}>
                      {last30Top.has(day.date) && <span className="gh-bar-tip" style={{ opacity: hidden ? 0 : 1 }}>{day.count}</span>}
                      <div className={`gh-bar${day === last30Peak ? ' gh-bar-hot' : ''}`} style={{ height: `${barHeight(day.count)}px`, transform: hidden ? 'scaleY(0)' : 'scaleY(1)', transitionDelay: `${550 + index * 45}ms` }} />
                    </div>
                  ))}
                </div>
                <div className="gh-axis">
                  {axisIndices.map((index) => <span key={last30[index].date}>{dayLabel(last30[index].date)}</span>)}
                </div>
              </div>

              <div className="gh-card anim-item" style={{ transitionDelay: '660ms' }}>
                <p className="gh-card-title">Latest activity</p>
                <p className="gh-card-sub">Most recent pushes</p>
                <div className="gh-activity">
                  {snapshot.topRepositories.slice(0, 3).map((repository, index) => (
                    <div className="gh-activity-row anim-item" style={{ transitionDelay: `${900 + index * 100}ms` }} key={repository.name}>
                      <div className="gh-activity-head">
                        <a className="github-repo-name" href={repository.url} target="_blank" rel="noreferrer">{repository.name}<ArrowUpRight size={13} /></a>
                        {repository.language && <span className="gh-chip">{repository.language}</span>}
                      </div>
                      <p>Pushed {relativeTime(repository.pushedAt)}</p>
                    </div>
                  ))}
                </div>
              </div>
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
