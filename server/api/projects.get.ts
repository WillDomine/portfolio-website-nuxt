import { Project } from "../utils/Project";

export default defineCachedEventHandler(async () => {
  const config = useRuntimeConfig();

  const username = "WillDomine";

  if (!config.githubToken) {
    console.error("Missing GITHUB TOKEN");
    return [];
  }

  const query = `
    query ($searchQuery: String!) {
      search(query: $searchQuery, type: REPOSITORY, first: 4) {
        nodes {
          ... on Repository {
            id
            name
            description
            url
            homepageUrl
            stargazerCount
            owner { login }
            primaryLanguage { name }
            repositoryTopics(first: 10) {
              nodes {
                topic { name }
              }
            }
            object(expression: "HEAD:portfolio.json") {
              ... on Blob {
                text
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    searchQuery: `user:${username} topic:portfolio`
  };

  try {
    const response: any = await $fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.githubToken}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json"
      },
      body: {
        query,
        variables
      }
    });

    if (response.errors) {
      console.error("GitHub GraphQL Errors:", response.errors);
      throw new Error("Github API Error")
    }

    const nodes = response?.data?.search?.nodes ?? [];

    return nodes
      .filter(Boolean)
      .map((repo: any) => new Project(repo));

  } catch (err) {
    console.error("GitHub API FAILED:", err);
    throw createError({
      statusCode:500,
      statusMessage: "Failed to fetch projects"
    })
  }

}, {
  maxAge: 60 * 5, //5 Minutes
  swr: true,
  name: "github-projects",
  getKey: () => "all"
});
