/**
 * Google Tag Manager configuration
 * Replace 'GTM_ID' with your actual Google Tag Manager ID
 */

import { sendGTMEvent } from '@next/third-parties/google';

export const GTM_ID = 'GTM-5S63WMNJ';

// Log page views
export const pageview = (url) => {
  if (typeof window !== 'undefined') {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[GTM Pageview] ${url}`);
    }
    sendGTMEvent({
      event: 'page_view',
      page_path: url,
    });
  }
};

// Log specific events
export const event = ({ action, category, label, value, params = {} }) => {
  if (typeof window !== 'undefined') {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[GTM Event] action: ${action}, category: ${category}, label: ${label}, value: ${value}`, params);
    }
    sendGTMEvent({
      event: action,
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

// Track experience details expansion
export const trackExperienceExpand = (cardId) => {
  event({
    action: 'experience_expand',
    category: 'engagement',
    label: cardId,
    params: { card_id: cardId },
  });
};

// Track live demo button clicks
export const trackLiveDemoClick = (projectName, location = 'unknown') => {
  event({
    action: 'live_demo_click',
    category: 'engagement',
    label: projectName,
    params: { project_name: projectName, location },
  });
};

// Track code repository button clicks
export const trackProjectCodeClick = (projectName, location = 'unknown') => {
  event({
    action: 'project_code_click',
    category: 'engagement',
    label: projectName,
    params: { project_name: projectName, location },
  });
};

// Track dark/light theme switching
export const trackThemeToggle = (newTheme) => {
  event({
    action: 'theme_toggle',
    category: 'engagement',
    label: newTheme,
    params: { theme: newTheme },
  });
};

// Track section scrolling visibility (scroll funnel)
export const trackSectionView = (sectionId) => {
  event({
    action: 'section_view',
    category: 'engagement',
    label: sectionId,
    params: { section_id: sectionId },
  });
};


