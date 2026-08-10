import { notFound } from 'next/navigation';
import ProjectDetail from '../../../components/features/ProjectDetail';
import { PROJECTS_DATA } from '../../../lib/constants';
import {
  generateProjectBreadcrumbSchema,
  generateProjectSchema,
  SITE_URL,
} from '../../../lib/utils/seo';

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = PROJECTS_DATA[slug];

  if (!project) {
    notFound();
  }

  const structuredData = [
    generateProjectSchema(project),
    generateProjectBreadcrumbSchema(project),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
      <ProjectDetail project={project} />
    </>
  );
}

// Generate static params for known projects
export function generateStaticParams() {
  return Object.keys(PROJECTS_DATA).map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = PROJECTS_DATA[slug];

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested portfolio project could not be found.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalUrl = `${SITE_URL}/projects/${project.slug}`;
  const socialImage = project.detailImage || project.imageSrc;
  const socialImageAlt = `${project.title} project preview`;

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonicalUrl,
      siteName: 'Swapnil Sanap Portfolio',
      title: project.title,
      description: project.description,
      images: [
        {
          url: socialImage,
          alt: socialImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@swapnilsanap7',
      creator: '@swapnilsanap7',
      title: project.title,
      description: project.description,
      images: [
        {
          url: socialImage,
          alt: socialImageAlt,
        },
      ],
    },
  };
}
