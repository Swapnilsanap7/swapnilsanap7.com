// File: src/app/resume/page.js

import Link from 'next/link';

export default function ResumePage() {
  return (
    <div className="min-h-screen py-12 px-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">My Resume</h1>

      {/* PDF Viewer */}
      <div className="w-full max-w-4xl aspect-[8.5/11] shadow-lg">
        <iframe
          src="/swapnil_sanap_resume.pdf"
          title="Resume PDF"
          className="w-full h-full rounded-xl border dark:border-gray-700"
        ></iframe>
      </div>

      {/* Download Button */}
      <a
        href="/swapnil_sanap_resume.pdf"
        download
        className="mt-6 inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full transition"
      >
        Download Resume
      </a>

      {/* Back to Home */}
      <Link href="/" className="mt-4 text-blue-500 hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
}
