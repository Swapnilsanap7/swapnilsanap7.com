/**
 * Assets Constants
 * Centralized constants for all static assets
 */

// Base paths
const ASSETS_BASE = '/assets';
const IMAGES_BASE = `${ASSETS_BASE}/images`;
const DOCUMENTS_BASE = `${ASSETS_BASE}/documents`;
const FAVICONS_BASE = `${ASSETS_BASE}/favicons`;

// Images
export const IMAGES = {
  // Profile and personal images
  profile: `${IMAGES_BASE}/swapnil.png`,
  
  // Error and placeholder images
  error: `${IMAGES_BASE}/error.png`,
  errorGif: `${IMAGES_BASE}/error.gif`,
  
  // Preview images
  resumePreview: `${IMAGES_BASE}/resume-preview.png`,
  
  // Project images (in organized folders)
  projects: {
    ecommerce: '/project/E-Commerce',
    portfolio: '/project/portfolio',
  },
  
  // Logo and branding
  logos: {
    main: `${FAVICONS_BASE}/main-logo.svg`,
    uis: {
      blue: '/logo/UIS Dome Logo/UISLegacyDome_UISBlue.png',
      white: '/logo/UIS Dome Logo/UISLegacyDome_White.png',
    },
    piemr: '/logo/piemr.svg',
  },
  
  // Technology icons
  icons: '/icons', // Base path for technology icons
};

// Documents
export const DOCUMENTS = {
  resume: `${DOCUMENTS_BASE}/Swapnil_Sanap_Resume.pdf`,
};

// Favicons and app icons
export const FAVICONS = {
  mainLogo: `${FAVICONS_BASE}/main-logo.svg`,
  manifest192: `${FAVICONS_BASE}/web-app-manifest-192x192.png`,
  manifest512: `${FAVICONS_BASE}/web-app-manifest-512x512.png`,
};

// 3D Models
export const MODELS = {
  base: '/models',
  // Add specific model paths as needed
};

// Social Media and External Assets
export const EXTERNAL_ASSETS = {
  // GitHub
  github: {
    avatar: 'https://github.com/Swapnilsanap7.png',
  },
  
  // LinkedIn  
  linkedin: {
    // Add LinkedIn specific assets if needed
  },
  
  // Other external CDN assets
  cdn: {
    // Add CDN assets if needed
  },
};

// Asset optimization settings
export const ASSET_CONFIG = {
  images: {
    quality: 85,
    formats: ['webp', 'png', 'jpg'],
    sizes: {
      thumbnail: 150,
      small: 300,
      medium: 600,
      large: 1200,
      xlarge: 1920,
    },
  },
  
  compression: {
    enabled: true,
    level: 6,
  },
  
  lazyLoading: {
    enabled: true,
    rootMargin: '50px',
  },
};

// SEO and Open Graph Images
export const SEO_IMAGES = {
  ogImage: '/og-image.png',
  twitterImage: '/twitter-image.png',
  appleTouchIcon: '/apple-touch-icon.png',
  favicon: '/favicon.ico',
};

const assets = {
  IMAGES,
  DOCUMENTS,
  FAVICONS,
  MODELS,
  EXTERNAL_ASSETS,
  ASSET_CONFIG,
  SEO_IMAGES,
};

export default assets;