export class Project {
  id: string;
  name: string;
  description: any;
  url: string;
  homepage: string | null;
  stars: number;
  language: string | null;
  topics: string[];
  image: string | null;

  constructor(node: any) {
    let metadata: any = null;
    if (node.object?.text) {
      try {
        metadata = JSON.parse(node.object.text);
      } catch (e) {
        console.error(`Failed to parse JSON for ${node.name}`, e);
      }
    }

    this.id = node.id;
    this.name = metadata?.title || node.name;
    
    this.description = {
      en: metadata?.description?.en || node.description || "No description provided",
      ja: metadata?.description?.ja || node.description || "説明がありません"
    };

    this.url = node.url; 
    this.homepage = metadata?.demoUrl || node.homepageUrl;
    this.stars = node.stargazerCount;
    this.language = node.primaryLanguage?.name || "Unknown";
    
    const repoTopics = node.repositoryTopics?.nodes?.map((t: any) => t.topic.name) || [];
    this.topics = metadata?.tags || repoTopics;

    if (metadata?.image) {
      this.image = metadata.image.startsWith('http') 
        ? metadata.image 
        : `https://raw.githubusercontent.com/${node.owner.login}/${node.name}/HEAD/${metadata.image}`;
    } else {
      this.image = null;
    }
  }
}