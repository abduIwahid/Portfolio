import { NextResponse } from 'next/server';
import { z } from 'zod';

export const revalidate = 3600;
const profileSchema = z.object({ public_repos: z.number().int().nonnegative() });
const repositorySchema = z.array(z.object({
  name: z.string(),
  html_url: z.string(),
  description: z.string().nullable(),
  language: z.string().nullable(),
  stargazers_count: z.number().int().nonnegative(),
  forks_count: z.number().int().nonnegative(),
  fork: z.boolean(),
  archived: z.boolean(),
  pushed_at: z.string()
}));
const pullRequestSearchSchema = z.object({
  total_count: z.number().int().nonnegative(),
  items: z.array(z.object({ repository_url: z.string() }))
});

type ContributionDay = { date: string; level: number; count: number };
type ContributionWeek = (ContributionDay | null)[];
type ContributionSummary = { total: number; streak: number; thisMonth: number; monthName: string; weeks: ContributionWeek[] };
type TopRepository = { name: string; url: string; description: string | null; language: string | null; pushedAt: string };

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
/* The two project repositories the snapshot always surfaces when they
   exist, even on a week when coursework or profile chores were pushed
   more recently. */
const FLAGSHIP_REPOSITORIES = ['whyrisk', 'fa24-bai'];
const PROFILE_REPOSITORY = 'abduiwahid';

/**
 * Contribution calendar from GitHub's public contributions fragment
 * (the same unauthenticated surface the profile page renders). Cell
 * levels (0–4) and per-day counts are parsed defensively; any shape
 * surprise returns null and the snapshot simply omits the graph.
 */
function parseContributions(html: string): ContributionSummary | null {
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
    /* Current streak: consecutive days with at least one contribution,
       ending today — or ending yesterday when today has none yet, so a
       streak is not reported broken before the day is over. */
    let streak = 0;
    let cursor = days.length - 1;
    if (cursor >= 0 && days[cursor].count === 0) cursor -= 1;
    while (cursor >= 0 && days[cursor].count > 0) {
      streak += 1;
      cursor -= 1;
    }
    const lastDay = days[days.length - 1];
    const monthKey = lastDay.date.slice(0, 7);
    const thisMonth = days.reduce((sum, day) => (day.date.startsWith(monthKey) ? sum + day.count : sum), 0);
    const monthName = MONTH_NAMES[Number.parseInt(lastDay.date.slice(5, 7), 10) - 1] ?? '';
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
    return { total, streak, thisMonth, monthName, weeks };
  } catch {
    return null;
  }
}

/**
 * Top repositories for the snapshot cards: his own public, non-fork
 * repositories (the profile repository excluded), most recently pushed
 * first. The flagship project repositories are guaranteed a place —
 * if recency alone leaves one out, it takes the slot of the
 * lowest-ranked non-flagship pick.
 */
function selectTopRepositories(repositories: z.infer<typeof repositorySchema>): TopRepository[] {
  const candidates = repositories
    .filter((repository) => !repository.fork && repository.name.toLowerCase() !== PROFILE_REPOSITORY)
    .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at));
  const picks = candidates.slice(0, 4);
  for (const flagship of FLAGSHIP_REPOSITORIES) {
    if (picks.some((pick) => pick.name.toLowerCase() === flagship)) continue;
    const flagshipRepo = candidates.find((repository) => repository.name.toLowerCase() === flagship);
    if (!flagshipRepo) continue;
    if (picks.length >= 4) {
      const nonFlagshipIndexes = picks
        .map((pick, index) => (FLAGSHIP_REPOSITORIES.includes(pick.name.toLowerCase()) ? -1 : index))
        .filter((index) => index >= 0);
      if (nonFlagshipIndexes.length === 0) continue;
      picks.splice(nonFlagshipIndexes[nonFlagshipIndexes.length - 1], 1);
    }
    picks.push(flagshipRepo);
  }
  return picks
    .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))
    .map((repository) => ({ name: repository.name, url: repository.html_url, description: repository.description, language: repository.language, pushedAt: repository.pushed_at }));
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
    const topRepositories = selectTopRepositories(repositories);
    const latestRepository = repositories.reduce<typeof repositories[number] | null>(
      (latest, repository) => (latest === null || repository.pushed_at > latest.pushed_at ? repository : latest),
      null
    );
    const latestPush = latestRepository ? { repo: latestRepository.name, url: latestRepository.html_url, at: latestRepository.pushed_at } : null;
    /* The contribution graph is independently optional: a failed or
       unparseable calendar response never takes the snapshot down. */
    let contributions: ContributionSummary | null = null;
    try {
      const contributionsResponse = await fetch('https://github.com/users/abduIwahid/contributions', { headers: { 'User-Agent': 'abdul-wahid-portfolio' }, signal: AbortSignal.timeout(3500), next: { revalidate: 3600 } });
      if (contributionsResponse.ok) contributions = parseContributions(await contributionsResponse.text());
    } catch {
      contributions = null;
    }
    /* Community pull requests are independently optional too: the
       public search API counts merged PRs authored by abduIwahid in
       repositories owned by other people (-user: excludes his own). */
    let community: { mergedPrs: number; repos: string[] } | null = null;
    try {
      const searchQuery = encodeURIComponent('author:abduIwahid type:pr is:merged -user:abduIwahid');
      const searchResponse = await fetch(`https://api.github.com/search/issues?q=${searchQuery}&per_page=100`, { headers, signal: AbortSignal.timeout(3500), next: { revalidate: 3600 } });
      if (searchResponse.ok) {
        const searchResult = pullRequestSearchSchema.safeParse(await searchResponse.json());
        if (searchResult.success) {
          const repos: string[] = [];
          for (const item of searchResult.data.items) {
            const fullName = item.repository_url.replace('https://api.github.com/repos/', '');
            if (fullName !== item.repository_url && !repos.includes(fullName)) repos.push(fullName);
            if (repos.length >= 3) break;
          }
          community = { mergedPrs: searchResult.data.total_count, repos };
        }
      }
    } catch {
      community = null;
    }
    return NextResponse.json({ available: true, publicRepos: profileResult.data.public_repos, stars: repositories.reduce((total, repository) => total + repository.stargazers_count, 0), forks: repositories.reduce((total, repository) => total + repository.forks_count, 0), languages, topRepositories, latestPush, community, contributions, updatedAt: new Date().toISOString() }, { headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' } });
  } catch {
    return NextResponse.json({ available: false, message: 'Live repository metadata is unavailable right now. Project links remain available on this site.' }, { headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=600' } });
  }
}
