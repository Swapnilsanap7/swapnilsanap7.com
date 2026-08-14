/**
 * SEO Component for common meta tags and structured data
 * This component can be used across different pages for consistent SEO
 */

export const SITE_URL = 'https://swapnilsanap7.com';

const absoluteUrl = (path) => new URL(path, SITE_URL).toString();

export function generateSEO({
  title,
  description,
  keywords = [],
  canonical,
  openGraph = {},
  twitter = {},
  noIndex = false
}) {
  const defaultKeywords = [
    'Swapnil Sanap',
    'Full Stack Developer',
    'Software Engineer',
    'React Developer',
    'Next.js Developer',
    'Portfolio'
  ];

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: noIndex,
    },
    alternates: {
      canonical: canonical || 'https://swapnilsanap7.com',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: 'Swapnil Sanap Portfolio',
      ...openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@swapnilsanap7',
      creator: '@swapnilsanap7',
      ...twitter,
    },
  };
}

/**
 * Generate structured data for Person schema
 */
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    "name": "Swapnil Sanap",
    "url": SITE_URL,
    "image": `${SITE_URL}/assets/images/swapnil.png`,
    "email": "hello@swapnilsanap7.com",
    "sameAs": [
      "https://github.com/Swapnilsanap7",
      "https://www.linkedin.com/in/swapnilsanap7/",
      "https://x.com/swapnilsanap7"
    ],
    "jobTitle": "Full Stack Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "DXC Technology",
      "url": "https://dxc.com/"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "University of Illinois Springfield",
      "url": "https://www.uis.edu/"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "addressCountry": "India"
    },
    "knowsAbout": [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Python",
      "Full Stack Development",
      "Software Engineering",
      "Web Development",
      "React Native",
      "TailwindCSS",
      "GSAP"
    ]
  };
}

/**
 * Generate structured data for WebSite schema
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "name": "Swapnil Sanap Portfolio",
    "description": "Professional portfolio of Swapnil Sanap, Full Stack Developer and Software Engineer",
    "url": SITE_URL,
    "author": {
      "@id": `${SITE_URL}/#person`
    }
  };
}

/**
 * Generate SoftwareSourceCode schema for a portfolio project.
 */
export function generateProjectSchema(project) {
  const projectUrl = `${SITE_URL}/projects/${project.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": `${projectUrl}#project`,
    "name": project.title,
    "description": project.fullDescription || project.description,
    "url": projectUrl,
    "image": absoluteUrl(project.detailImage || project.imageSrc),
    "author": {
      "@id": `${SITE_URL}/#person`
    },
    "programmingLanguage": project.techStack,
    "codeRepository": project.githubLink,
    "sameAs": [project.liveDemoLink, project.githubLink].filter(Boolean)
  };
}

/**
 * Generate a simple Home > Project breadcrumb trail.
 */
export function generateProjectBreadcrumbSchema(project) {
  const projectUrl = `${SITE_URL}/projects/${project.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${projectUrl}#breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": project.title,
        "item": projectUrl
      }
    ]
  };
}
