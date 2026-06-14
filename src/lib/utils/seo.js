/**
 * SEO Component for common meta tags and structured data
 * This component can be used across different pages for consistent SEO
 */

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
    "name": "Swapnil Sanap",
    "url": "https://swapnilsanap7.com",
    "image": "https://swapnilsanap7.com/swapnil.png",
    "sameAs": [
      "https://github.com/Swapnilsanap7",
      "https://www.linkedin.com/in/swapnilsanap7/",
      "mailto:hello@swapnilsanap7.com"
    ],
    "jobTitle": "Full Stack Developer",
    "worksFor": {
      "@type": "EducationalOrganization",
      "name": "University of Illinois Springfield",
      "url": "https://www.uis.edu/"
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
    "name": "Swapnil Sanap Portfolio",
    "description": "Professional portfolio of Swapnil Sanap, Full Stack Developer and Software Engineer",
    "url": "https://swapnilsanap7.com",
    "author": {
      "@type": "Person",
      "name": "Swapnil Sanap"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://swapnilsanap7.com/#projects"
      },
      "query-input": "required name=search_term_string"
    }
  };
}