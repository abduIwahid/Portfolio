import { NextResponse } from 'next/server';
import { z } from 'zod';

export const revalidate = 3600;
const profileSchema = z.object({ public_repos: z.number().int().nonnegative() });
const repositorySchema = z.array(z.object({ stargazers_count: z.number().int().nonnegative(), forks_count: z.number().int().nonnegative(), language: z.string().nullable(), archived: z.boolean() }));

type ContributionDay = { date: string; level: number; count: number };
type ContributionWeek = (ContributionDay | null)[];

/**
 * Contribution calendar from GitHub's public contributions fragment
 * (the same unauthenticated surface the profile page renders). Cell
 * levels (0–4) and per-day counts are parsed defensively; any shape
 * surprise returns null and the snapshot simply omits the graph.
 */
function parseContributions(html: string): { total: number; weeks: ContributionWeek[] } | null {
  try {
    const counts = new Map<string, number>();
    const tipPattern = /for="(contribution-day-component-[\d-]+)"[^>]*>([^<]*)</g;
    let match: RegExpExecArray | null;
    while ((match = tipPattern.exec(html)) !== null) {
      const parsed = /^(\d+)\s+contribution/.exec(match[2].trim());
      counts.set(match[1], parsed ? Number.parseInt(parsed[1], 10) : 0);
    }
    const cellPattern = /data-date="(\d{4}-\d{2}-\d{2})"\s+id="(contribution-day-component-[\d-]+)"\s+data-level="([0-4])"/g;
    const days: ContributionDay[] = [];
    while ((match = cellPattern.exec(html)) !== null) {
      days.push({ date: match[1], level: Number.parseInt(match[3], 10), count: counts.get(match[2]) ?? 0 });
    }
    if (days.length < 300) return null;
    days.sort((a, b) => a.date.localeCompare(b.date));
    const total = days.reduce((sum, day) => sum + day.count, 0);
    const weeks: ContributionWeek[] = [];
    let week: ContributionWeek = [];
    const firstDayOfWeek = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
    for (let i = 0; i < firstDayOfWeek; i += 1) week.push(null);
    for (const day of days) {
      week.push(day);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }
    if (week.length > 0) {
      while (week.length < 7) week.push(null);
      weeks.push(week);
    }
    if (weeks.length < 50) return null;
    return { total, weeks };
  } catch {
    return null;
  }
}
export async function GET() {
  try {
    const headers = { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'abdul-wahid-portfolio' };
    const [profileResponse, repositoriesResponse] = await Promise.all([
      fetch('https://api.github.com/users/abduIwahid', { headers, signal: AbortSignal.timeout(3500), next: { revalidate: 3600 } }),
      fetch('https://api.github.com/users/abduIwahid/repos?per_page=100&sort=updated', { headers, signal: AbortSignal.timeout(3500), next: { revalidate: 3600 } })
    ]);
    if (!profileResponse.ok || !repositoriesResponse.ok) throw new Error('GitHub API unavailable');
    const profilePayload: unknown = await profileResponse.json();
    const repositoriesPayload: unknown = await repositoriesResponse.json();
    const profileResult = profileSchema.safeParse(profilePayload);
    const repositoriesResult = repositorySchema.safeParse(repositoriesPayload);
    if (!profileResult.success || !repositoriesResult.success) throw new Error('Unexpected GitHub response');
    const repositories = repositoriesResult.data;
    const languageCounts = new Map<string, number>();
    for (const repository of repositories) if (!repository.archived && repository.language) languageCounts.set(repository.language, (languageCounts.get(repository.language) || 0) + 1);
    const languages = [...languageCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, count]) => ({ name, count }));
    /* The contribution graph is independently optional: a failed or
       unparseable calendar response never takes the snapshot down. */
    let contributions: { total: number; weeks: ContributionWeek[] } | null = null;
    try {
      const contributionsResponse = await fetch('https://github.com/users/abduIwahid/contributions', { headers: { 'User-Agent': 'abdul-wahid-portfolio' }, signal: AbortSignal.timeout(3500), next: { revalidate: 3600 } });
      if (contributionsResponse.ok) contributions = parseContributions(await contributionsResponse.text());
    } catch {
      contributions = null;
    }
    return NextResponse.json({ available: true, publicRepos: profileResult.data.public_repos, stars: repositories.reduce((total, repository) => total + repository.stargazers_count, 0), forks: repositories.reduce((total, repository) => total + repository.forks_count, 0), languages, contributions, updatedAt: new Date().toISOString() }, { headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' } });
  } catch {
    return NextResponse.json({ available: false, message: 'Live repository metadata is unavailable right now. Project links remain available on this site.' }, { headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=600' } });
  }
}
