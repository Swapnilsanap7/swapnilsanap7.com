/** Google Tag Manager and data-layer event configuration. */

import { sendGAEvent, sendGTMEvent } from '@next/third-parties/google';

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-5S63WMNJ';
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';
export const ANALYTICS_MODE = process.env.NEXT_PUBLIC_ANALYTICS_MODE === 'gtm' ? 'gtm' : 'direct';

const isProductionBrowser = () => (
  typeof window !== 'undefined'
  && process.env.NODE_ENV === 'production'
);

const canPushToGTM = () => isProductionBrowser() && Boolean(GTM_ID);
const canSendDirectGA = () => (
  isProductionBrowser()
  && ANALYTICS_MODE === 'direct'
  && Boolean(GA_ID)
);

const currentPageParams = (url) => ({
  page_path: url,
  page_location: window.location.href,
  page_title: document.title,
});

// Log page views
export const pageview = (url) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[GTM Pageview] ${url}`);
  }

  if (!isProductionBrowser()) return;

  const params = currentPageParams(url);

  // Keep route changes visible in the GTM data layer. In `gtm` mode, the
  // container maps this custom event to GA4's `page_view` event.
  if (canPushToGTM()) {
    sendGTMEvent({
      event: 'virtual_page_view',
      ...params,
    });
  }

  // In `direct` mode, gtag sends the SPA pageview without waiting for a GTM
  // container change. The initial pageview is sent by GoogleAnalytics.
  if (canSendDirectGA()) {
    sendGAEvent('event', 'page_view', params);
  }
};

// Log specific events
export const event = ({ action, category, label, value, params = {} }) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[GTM Event] action: ${action}, category: ${category}, label: ${label}, value: ${value}`, params);
  }

  if (!isProductionBrowser()) return;

  const eventParams = {
    ...(category ? { event_category: category } : {}),
    ...(label ? { event_label: label } : {}),
    ...(value !== undefined ? { value } : {}),
    ...params,
  };

  // Push named application events for GTM Preview and any non-GA tags.
  if (canPushToGTM()) sendGTMEvent({
    event: action,
    ...eventParams,
  });

  // Direct GA4 delivery remains active only in `direct` mode. Switching the
  // environment to `gtm` disables this call before GTM GA4 tags are enabled.
  if (canSendDirectGA()) sendGAEvent('event', action, eventParams);
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
