export class Project {
  id: number;
  name: string;
  description: any;
  url: string;
  homepage: string | null;
  stars: number;
  language: string;
  topics: string[];
  image: string | null;

  constructor(repo: any, metadata: any = null) {
    this.id = repo.id;
    this.name = metadata?.title || repo.name;
    
    this.description = {
      en: metadata?.description?.en || repo.description || "No description provided",
      ja: metadata?.description?.ja || repo.description || "説明がありません"
    };

    this.url = repo.html_url;
    this.homepage = metadata?.demoUrl || repo.homepage;
    this.stars = repo.stargazers_count;
    this.language = repo.language;
    this.topics = metadata?.tags || repo.topics || [];
    
    // Handle image path logic
    if (metadata?.image) {
      this.image = metadata.image.startsWith('http') 
        ? metadata.image 
        : `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/${metadata.image}`;
    } else {
      this.image = null;
    }
  }
}