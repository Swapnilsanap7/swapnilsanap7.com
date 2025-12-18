import { Caveat } from 'next/font/google';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import SmoothScrollWrapper from '../components/layout/SmoothScrollWrapper';
import './globals.css';

const caveat = Caveat({ subsets: ['cyrillic'], weight: '700' });

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
        url: '/assets/images/swapnil.png',
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
    images: ['/assets/images/swapnil.png'],
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
  const structuredData = {
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

  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script 
          async 
          src="https://www.googletagmanager.com/gtag/js?id=G-LDPKRE8CFP"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LDPKRE8CFP');
            `,
          }}
        />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
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
