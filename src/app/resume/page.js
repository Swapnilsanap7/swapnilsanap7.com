// File: src/app/resume/page.js

import Link from 'next/link';

// Enhanced SEO metadata for resume page
export const metadata = {
  title: 'Resume - Swapnil Sanap | Full Stack Developer',
  description: 'Download or view the professional resume of Swapnil Sanap, Full Stack Developer with MS in Computer Science from University of Illinois Springfield. Experience in React, Next.js, Node.js, and modern web technologies.',
  keywords: [
    'Swapnil Sanap Resume',
    'Full Stack Developer Resume',
    'Software Engineer Resume',
    'React Developer CV',
    'Computer Science Graduate',
    'University of Illinois Springfield',
    'Download Resume',
    'Professional Experience'
  ],
  openGraph: {
    title: 'Swapnil Sanap Resume - Full Stack Developer',
    description: 'View and download the professional resume of Swapnil Sanap, experienced Full Stack Developer.',
    url: 'https://swapnilsanap7.com/resume',
    type: 'website',
    images: [
      {
        url: '/assets/images/resume-preview.png',
        width: 1200,
        height: 630,
        alt: 'Swapnil Sanap Resume Preview',
      },
    ],
  },
  alternates: {
    canonical: 'https://swapnilsanap7.com/resume',
  },
};

export default function ResumePage() {
  return (
    <article className="min-h-screen py-12 px-6 flex flex-col items-center">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Resume
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
          Full Stack Developer with expertise in modern web technologies, 
          MS in Computer Science, and proven experience in building scalable applications.
        </p>
      </header>

      {/* PDF Viewer */}
      <section className="w-full max-w-4xl aspect-[8.5/11] shadow-lg mb-6">
        <iframe
          src="/assets/documents/Swapnil_Sanap_Resume.pdf"
          title="Swapnil Sanap Resume PDF"
          className="w-full h-full rounded-xl border dark:border-gray-700"
          aria-label="Swapnil Sanap Resume PDF Viewer"
        ></iframe>
      </section>

      {/* Download Button */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <a
          href="/assets/documents/Swapnil_Sanap_Resume.pdf"
          download="Swapnil_Sanap_Resume.pdf"
          className="inline-flex items-center gap-2 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-lg hover:shadow-xl font-medium"
          aria-label="Download Swapnil Sanap Resume as PDF"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Resume
        </a>
        
        <a
          href="mailto:swapnilsanap7@gmail.com?subject=Job%20Opportunity&body=Hi%20Swapnil,%20I%20reviewed%20your%20resume%20and%20would%20like%20to%20discuss%20a%20potential%20opportunity."
          className="inline-flex items-center gap-2 px-6 py-3 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Contact Me
        </a>
      </div>

      {/* Navigation */}
      <nav className="mt-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          aria-label="Go back to homepage"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Portfolio
        </Link>
      </nav>
    </article>
  );
}
