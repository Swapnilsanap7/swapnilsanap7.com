import AccessAdminDashboard from '../../../components/access/AccessAdminDashboard';
import { ACCESS_PROJECTS } from '../../../lib/access-hub/projects';

export const metadata = {
  title: 'Project Access Hub',
  robots: { index: false, follow: false, nocache: true },
};

export default async function AccessAdminPage({ searchParams }) {
  const query = await searchParams;
  return <AccessAdminDashboard projects={ACCESS_PROJECTS} initialRequestId={query?.request || ''} />;
}

