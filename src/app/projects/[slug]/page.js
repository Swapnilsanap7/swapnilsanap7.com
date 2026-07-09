import { notFound } from 'next/navigation';
import ProjectDetail from '../../../components/features/ProjectDetail';
import { PROJECTS_DATA } from '../../../lib/constants';

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = PROJECTS_DATA[slug];

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
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
    };
  }

  return {
    title: `${project.title} | Swapnil Sanap`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.imageSrc],
    },
  };
}