export class Project {
  id: number;
  name: string;
  description: string;
  url: string;
  homepage: string | null;
  stars: number;
  language: string;
  topics: string[];

  constructor(repo: any) {
    this.id = repo.id;
    this.name = repo.name;
    this.description = repo.description || "No description provided"; // Fallback logic
    this.url = repo.html_url;
    this.homepage = repo.homepage;
    this.stars = repo.stargazers_count;
    this.language = repo.language;
    this.topics = repo.topics || [];
  }
}