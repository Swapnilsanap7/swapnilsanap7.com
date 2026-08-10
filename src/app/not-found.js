import NotFoundContent from '../components/features/NotFoundContent';

const description = 'The requested page could not be found. Return to Swapnil Sanap’s portfolio to explore projects, experience, and skills.';

export const metadata = {
  title: 'Page Not Found',
  description,
  alternates: {
    canonical: null,
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Page Not Found',
    description,
  },
  twitter: {
    card: 'summary',
    title: 'Page Not Found',
    description,
  },
};

export default function NotFound() {
  return <NotFoundContent />;
}
