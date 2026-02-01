import { Project } from "../utils/Project";

export default defineCachedEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const username = "WillDomine"

    const data: any = await $fetch('https://api.github.com/search/repositories', {
        params: {
            q: `user:${username} topic:portfolio`,
            sort: 'updated'
        },
        headers: {
            'Authorization': `Bearer ${config.githubToken}`,
            'User-Agent': 'Portfolio-App'
        }
    });

    const items = data.items || [];

    const projects = await Promise.all(items.map(async (repo: any) => {
        let metadata = null;

        try {
            const rawUrl = `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/portfolio.json`;
            metadata = await $fetch(rawUrl).catch(() => null);
        } catch (e) {}

        return new Project(repo, metadata);
    }));

    return projects;
}, {
    maxAge: 60 * 60, //1 hour
    swr: true, //Give old cache data while looking for new.
    name: 'github-projects',
    getKey: () => 'all'
})