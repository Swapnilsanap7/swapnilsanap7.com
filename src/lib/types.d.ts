/**
 * TypeScript type definitions for Portfolio Project Data
 */

export type DisplayType = 'browser' | 'mobile';

export interface HeroData {
  tagline?: string;
  mainImage?: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface TechStackItem {
  name: string;
  icon?: string;
  iconDark?: string;
  description?: string;
}

export interface CaseStudy {
  challenge: string;
  solution: string;
}

export interface ProjectData {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  fullDescription: string;
  displayType?: DisplayType;
  imageSrc?: string;
  detailImage?: string;
  githubLink?: string;
  liveDemoLink?: string;
  techStack: string[];
  hero?: HeroData;
  features?: Feature[];
  techStackDetailed?: TechStackItem[];
  gallery?: string[];
  caseStudy?: CaseStudy;
}
