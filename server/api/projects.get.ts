import { Project } from "../utils/Project"

export default defineCachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig()
    const username = "WillDomine"

    // Validate GitHub token
    if (!config.githubToken) {
      console.error("GITHUB_TOKEN environment variable is not set")
      throw createError({
        statusCode: 500,
        statusMessage: "Server configuration error: Missing GitHub token"
      })
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
    `

    const variables = {
      searchQuery: `user:${username} topic:portfolio`
    }

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
        },
        // Add timeout
        timeout: 10000
      })

      // Handle GraphQL errors
      if (response.errors) {
        console.error("GitHub GraphQL Errors:", JSON.stringify(response.errors, null, 2))
        throw createError({
          statusCode: 502,
          statusMessage: "GitHub API returned errors",
          data: { errors: response.errors }
        })
      }

      // Validate response structure
      if (!response.data || !response.data.search) {
        console.error("Invalid GitHub API response structure:", response)
        throw createError({
          statusCode: 502,
          statusMessage: "Invalid response from GitHub API"
        })
      }

      const nodes = response.data.search.nodes || []
      
      // Transform nodes to Project instances
      const projects = nodes
        .filter(Boolean)
        .map((repo: any) => {
          try {
            return new Project(repo)
          } catch (err) {
            console.error(`Failed to parse project ${repo?.name}:`, err)
            return null
          }
        })
        .filter(Boolean)

      console.log(`Successfully fetched ${projects.length} projects`)
      
      return projects

    } catch (err: any) {
      // Handle different error types
      if (err.statusCode) {
        // Re-throw createError errors
        throw err
      }

      // Handle network errors
      console.error("GitHub API request failed:", err.message || err)
      
      throw createError({
        statusCode: 503,
        statusMessage: "Failed to fetch projects from GitHub",
        data: { 
          error: err.message || "Unknown error",
          timestamp: new Date().toISOString()
        }
      })
    }
  },
  {
    // Cache for 5 minutes
    maxAge: 60 * 5,
    // Serve stale content while revalidating
    swr: true,
    // Unique cache key
    name: "github-projects",
    getKey: () => "all-projects",
    // Add cache tags for invalidation
    shouldBypassCache: (event) => {
      // Allow cache bypass with query param
      return event.node.req.url?.includes('refresh=true') || false
    }
  }
)