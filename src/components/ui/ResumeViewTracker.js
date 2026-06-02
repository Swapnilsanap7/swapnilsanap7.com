'use client';

import { useEffect } from 'react';
import { trackResumeView } from '../../lib/config/analytics';

export default function ResumeViewTracker({ location = 'resume_page' }) {
  useEffect(() => {
    trackResumeView(location);
  }, [location]);

  return null;
}
