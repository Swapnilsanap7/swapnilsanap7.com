/**
 * Google Analytics configuration
 * Replace 'GA_MEASUREMENT_ID' with your actual Google Analytics ID
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-LDPKRE8CFP';

// Log page views
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Log specific events
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track contact form submissions
export const trackContactForm = (method) => {
  event({
    action: 'contact_form_submit',
    category: 'engagement',
    label: method,
  });
};

// Track resume downloads
export const trackResumeDownload = () => {
  event({
    action: 'resume_download',
    category: 'engagement',
    label: 'pdf',
  });
};

// Track project views
export const trackProjectView = (projectName) => {
  event({
    action: 'project_view',
    category: 'engagement',
    label: projectName,
  });
};