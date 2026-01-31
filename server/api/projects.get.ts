import { Project } from "../utils/Project";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const username = "WillDomine"

    const data = await $fetch('https://api.github.com/search/repositories', {
        params: {
            q:`user:${username} topic:portfolio`,
            sort: 'updated'
        },
        headers: {
            'Authorization': `Bearer ${config.githubToken}`,
            'User-Agent': 'Portfolio-App'
        }
    });

    return (data as any).items.map((repo: any) => new Project(repo))
})