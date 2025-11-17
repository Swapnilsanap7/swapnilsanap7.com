/**
 * Library Barrel Exports
 * Centralized exports for all library utilities
 */

// Utilities
export * from './utils';
export * from './utils/animations';

// Constants
export * from './constants';

// Configuration
export { default as analytics } from './config/analytics';

// Utils (specific exports for convenience)
export { default as utils } from './utils';
export { default as animationUtils } from './utils/animations';
export { default as seo } from './utils/seo';
