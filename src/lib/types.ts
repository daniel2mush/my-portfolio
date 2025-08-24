export interface uploadTypes {
  title: string;
  description: string;
  tools: string[];
  liveLink: string;
  projectLink: string;
  thumbNail: string;
}

export type Project = {
  id: string;
  title: string;
  description: string;
  tools: string[];
  liveLink: string;
  projectLink: string;
  imageUrl: string;
  isPublished: boolean;
  createdAt: string; // ISO date string
  updatedAt: string | null;
};
