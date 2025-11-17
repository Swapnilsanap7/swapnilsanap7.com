# Feature Components

This directory contains feature-specific components that implement complete functionality areas.

## Components

### ProjectCard
A card component for displaying project information in the portfolio grid.

**Props:**
- `project` (object): Project data object
  - `title` (string): Project title
  - `description` (string): Project description
  - `image` (string): Project image path
  - `technologies` (array): Array of technology names
  - `slug` (string): URL slug for project detail page
- `index` (number): Card index for animation staggering

**Usage:**
```jsx
import { ProjectCard } from '@/components/features';

const project = {
  title: "E-Commerce Platform",
  description: "Full-stack e-commerce solution built with Next.js",
  image: "/project/ecommerce/preview.jpg",
  technologies: ["Next.js", "PostgreSQL", "Stripe"],
  slug: "ecommerce-platform"
};

<ProjectCard project={project} index={0} />
```

### ProjectDetail
A detailed project view component for the individual project pages.

**Props:**
- `slug` (string): Project slug to load data for

**Usage:**
```jsx
import { ProjectDetail } from '@/components/features';

<ProjectDetail slug="ecommerce-platform" />
```

## Data Structure

### Project Object Schema
```typescript
interface Project {
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  technologies: string[];
  slug: string;
  demoUrl?: string;
  githubUrl?: string;
  features?: string[];
  challenges?: string[];
  category: string;
  date: string;
}
```

## Design Principles

- **Feature Focus**: Components encapsulate complete feature functionality
- **Data-Driven**: Components are driven by structured data objects
- **Interactive**: Rich interactions and animations for better UX
- **SEO Friendly**: Proper metadata and URL structure for project pages

## Adding New Feature Components

1. Create the component with comprehensive prop validation
2. Add proper TypeScript types or PropTypes
3. Include loading and error states
4. Add the component to the barrel export
5. Document the component API in this README