// @/types/project.ts

export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tools: string[];
  liveLink?: string;
  projectLink?: string;
  isPublished: boolean;
  createdAt?: string; // Optional: good for sorting later
};

export type StatusFilter = "all" | "published" | "draft";
export type SortOption = "title-asc" | "title-desc";