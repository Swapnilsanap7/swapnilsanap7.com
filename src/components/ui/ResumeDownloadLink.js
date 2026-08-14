'use client';

import { trackResumeDownload } from '../../lib/config/analytics';

export default function ResumeDownloadLink({ location = 'hero', className = '' }) {
  return (
    <a
      href="/assets/documents/Swapnil_Sanap_Resume.pdf"
      download="Swapnil_Sanap_Resume.pdf"
      onClick={() => trackResumeDownload(location)}
      className={`inline-flex w-full items-center justify-center gap-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-lg hover:shadow-xl font-medium ${className}`}
      aria-label="Download Swapnil Sanap Resume as PDF"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Download Resume
    </a>
  );
}
