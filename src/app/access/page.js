import RequestAccessExperience from '../../components/access/RequestAccessExperience';
import { ACCESS_PROJECTS } from '../../lib/access-hub/projects';

export const metadata = {
  title: 'Request Demo Access',
  description: 'Request private, time-limited access to explore Swapnil Sanap’s working software projects.',
  alternates: { canonical: 'https://swapnilsanap7.com/access' },
  openGraph: {
    title: 'Try the projects yourself',
    description: 'Choose a working project and request a personally reviewed demo experience.',
    url: 'https://swapnilsanap7.com/access',
  },
};

export default async function AccessPage({ searchParams }) {
  const query = await searchParams;
  const requestedProject = ACCESS_PROJECTS.some((project) => project.slug === query?.project)
    ? query.project
    : '';

  return <RequestAccessExperience projects={ACCESS_PROJECTS} initialProject={requestedProject} />;
}

