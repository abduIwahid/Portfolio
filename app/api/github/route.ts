import { NextResponse } from 'next/server';
import { z } from 'zod';

export const revalidate = 3600;
const profileSchema = z.object({ public_repos: z.number().int().nonnegative() });
const repositorySchema = z.array(z.object({ stargazers_count: z.number().int().nonnegative(), forks_count: z.number().int().nonnegative(), language: z.string().nullable(), archived: z.boolean() }));
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
    return NextResponse.json({ available: true, publicRepos: profileResult.data.public_repos, stars: repositories.reduce((total, repository) => total + repository.stargazers_count, 0), forks: repositories.reduce((total, repository) => total + repository.forks_count, 0), languages, updatedAt: new Date().toISOString() }, { headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' } });
  } catch {
    return NextResponse.json({ available: false, message: 'Live repository metadata is unavailable right now. Project links remain available on this site.' }, { headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=600' } });
  }
}
