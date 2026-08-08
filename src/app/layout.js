import { GoogleTagManager } from '@next/third-parties/google';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import SmoothScrollWrapper from '../components/layout/SmoothScrollWrapper';
import { generatePersonSchema, generateWebSiteSchema } from '../lib/utils/seo';
import './globals.css';


export const metadata = {
  title: {
    default: 'Swapnil Sanap - Full Stack Developer & Software Engineer',
    template: '%s | Swapnil Sanap'
  },
  description: 'Experienced Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. MS in Computer Science from University of Illinois Springfield. Available for freelance projects and full-time opportunities.',
  keywords: [
    'Swapnil Sanap',
    'Full Stack Developer',
    'Software Engineer',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'JavaScript Developer',
    'TypeScript Developer',
    'Web Developer',
    'Frontend Developer',
    'Backend Developer',
    'Portfolio',
    'University of Illinois Springfield',
    'Computer Science',
    'Software Development',
    'Web Development',
    'React Native Developer',
    'PostgreSQL',
    'MongoDB',
    'GSAP',
    'TailwindCSS'
  ],
  authors: [{ name: 'Swapnil Sanap', url: 'https://swapnilsanap7.com' }],
  creator: 'Swapnil Sanap',
  publisher: 'Swapnil Sanap',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://swapnilsanap7.com'),
  alternates: {
    canonical: 'https://swapnilsanap7.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://swapnilsanap7.com',
    siteName: 'Swapnil Sanap Portfolio',
    title: 'Swapnil Sanap - Full Stack Developer & Software Engineer',
    description: 'Experienced Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. MS in Computer Science from University of Illinois Springfield.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Swapnil Sanap - Full Stack Developer',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@swapnilsanap7',
    creator: '@swapnilsanap7',
    title: 'Swapnil Sanap - Full Stack Developer & Software Engineer',
    description: 'Experienced Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({ children }) {
  const personSchema = generatePersonSchema();
  const websiteSchema = generateWebSiteSchema();


  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}})();`,
          }}
        />
        <GoogleTagManager gtmId="GTM-5S63WMNJ" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personSchema, websiteSchema])
          }}
        />
        <link rel="icon" href="/assets/favicons/main-logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/assets/favicons/web-app-manifest-192x192.png" />
        <meta name="theme-color" content="#0066FF" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="bg-[var(--light)] dark:bg-[var(--dark)] text-black dark:text-white transition-colors duration-500">
        <SmoothScrollWrapper>
          <Navbar />
          <main className="relative w-full min-h-screen px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </SmoothScrollWrapper>
      </body>
    </html>
  );
}
