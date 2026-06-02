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
export const event = ({ action, category, label, value, params = {} }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...params,
    });
  }
};

// Track contact form submissions
export const trackContactForm = (method) => {
  event({
    action: 'contact_form_submit',
    category: 'engagement',
    label: method,
    params: { method },
  });
};

// Track resume views
export const trackResumeView = (location = 'unknown') => {
  event({
    action: 'resume_view',
    category: 'engagement',
    label: location,
    params: { location },
  });
};

// Track resume downloads
export const trackResumeDownload = (location = 'unknown') => {
  event({
    action: 'resume_download',
    category: 'engagement',
    label: 'pdf',
    params: { location },
  });
};

// Track project views
export const trackProjectView = (projectName) => {
  event({
    action: 'project_view',
    category: 'engagement',
    label: projectName,
    params: { project_name: projectName },
  });
};

// Track project card clicks
export const trackProjectCardClick = (projectName) => {
  event({
    action: 'project_card_click',
    category: 'engagement',
    label: projectName,
    params: { project_name: projectName },
  });
};

// Track outbound social/contact clicks
export const trackGithubClick = (location = 'unknown') => {
  event({
    action: 'github_click',
    category: 'engagement',
    label: location,
    params: { location },
  });
};

export const trackLinkedinClick = (location = 'unknown') => {
  event({
    action: 'linkedin_click',
    category: 'engagement',
    label: location,
    params: { location },
  });
};

export const trackEmailClick = (location = 'unknown') => {
  event({
    action: 'email_click',
    category: 'engagement',
    label: location,
    params: { location },
  });
};

// Track contact section visibility
export const trackContactSectionView = () => {
  event({
    action: 'contact_section_view',
    category: 'engagement',
    label: 'contact',
  });
};
