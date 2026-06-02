/**
 * GSAP Animation Utilities
 * Common animation functions using GSAP
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ANIMATION_CONFIG } from '../constants';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Fade in animation with optional delay and stagger
 * @param {string|HTMLElement|Array} targets - Element(s) to animate
 * @param {Object} options - Animation options
 */
export const fadeIn = (targets, options = {}) => {
  const defaults = {
    duration: ANIMATION_CONFIG.duration.normal,
    ease: ANIMATION_CONFIG.easing.ease,
    delay: 0,
    stagger: 0,
    y: 30,
    opacity: 0,
  };

  const config = { ...defaults, ...options };

  return gsap.from(targets, {
    y: config.y,
    opacity: config.opacity,
    duration: config.duration,
    ease: config.ease,
    delay: config.delay,
    stagger: config.stagger,
  });
};

/**
 * Scale in animation
 * @param {string|HTMLElement|Array} targets - Element(s) to animate
 * @param {Object} options - Animation options
 */
export const scaleIn = (targets, options = {}) => {
  const defaults = {
    duration: ANIMATION_CONFIG.duration.normal,
    ease: ANIMATION_CONFIG.easing.bounce,
    delay: 0,
    scale: 0,
    opacity: 0,
  };

  const config = { ...defaults, ...options };

  return gsap.from(targets, {
    scale: config.scale,
    opacity: config.opacity,
    duration: config.duration,
    ease: config.ease,
    delay: config.delay,
  });
};

/**
 * Slide in from left animation
 * @param {string|HTMLElement|Array} targets - Element(s) to animate
 * @param {Object} options - Animation options
 */
export const slideInLeft = (targets, options = {}) => {
  const defaults = {
    duration: ANIMATION_CONFIG.duration.normal,
    ease: ANIMATION_CONFIG.easing.ease,
    delay: 0,
    x: -100,
    opacity: 0,
  };

  const config = { ...defaults, ...options };

  return gsap.from(targets, {
    x: config.x,
    opacity: config.opacity,
    duration: config.duration,
    ease: config.ease,
    delay: config.delay,
  });
};

/**
 * Slide in from right animation
 * @param {string|HTMLElement|Array} targets - Element(s) to animate
 * @param {Object} options - Animation options
 */
export const slideInRight = (targets, options = {}) => {
  const defaults = {
    duration: ANIMATION_CONFIG.duration.normal,
    ease: ANIMATION_CONFIG.easing.ease,
    delay: 0,
    x: 100,
    opacity: 0,
  };

  const config = { ...defaults, ...options };

  return gsap.from(targets, {
    x: config.x,
    opacity: config.opacity,
    duration: config.duration,
    ease: config.ease,
    delay: config.delay,
  });
};

/**
 * Hover scale animation
 * @param {string|HTMLElement} target - Element to animate
 * @param {Object} options - Animation options
 */
export const hoverScale = (target, options = {}) => {
  const defaults = {
    scale: 1.05,
    duration: ANIMATION_CONFIG.duration.fast,
    ease: ANIMATION_CONFIG.easing.ease,
  };

  const config = { ...defaults, ...options };

  const element = typeof target === 'string' ? document.querySelector(target) : target;
  
  if (!element) return;

  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      scale: config.scale,
      duration: config.duration,
      ease: config.ease,
    });
  });

  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      scale: 1,
      duration: config.duration,
      ease: config.ease,
    });
  });
};

/**
 * Reveal animation with ScrollTrigger
 * @param {string|HTMLElement|Array} targets - Element(s) to animate
 * @param {Object} options - Animation options
 */
export const revealOnScroll = (targets, options = {}) => {
  const defaults = {
    trigger: targets,
    start: 'top 80%',
    toggleActions: 'play none none none',
    duration: ANIMATION_CONFIG.duration.normal,
    ease: ANIMATION_CONFIG.easing.ease,
    y: 50,
    opacity: 0,
  };

  const config = { ...defaults, ...options };

  return gsap.from(targets, {
    scrollTrigger: {
      trigger: config.trigger,
      start: config.start,
      toggleActions: config.toggleActions,
    },
    y: config.y,
    opacity: config.opacity,
    duration: config.duration,
    ease: config.ease,
  });
};

/**
 * Stagger reveal animation with ScrollTrigger
 * @param {string|HTMLElement|Array} targets - Element(s) to animate
 * @param {Object} options - Animation options
 */
export const staggerReveal = (targets, options = {}) => {
  const defaults = {
    trigger: targets,
    start: 'top 80%',
    toggleActions: 'play none none none',
    duration: ANIMATION_CONFIG.duration.normal,
    ease: ANIMATION_CONFIG.easing.ease,
    stagger: ANIMATION_CONFIG.stagger,
    y: 30,
    opacity: 0,
  };

  const config = { ...defaults, ...options };

  return gsap.from(targets, {
    scrollTrigger: {
      trigger: config.trigger,
      start: config.start,
      toggleActions: config.toggleActions,
    },
    y: config.y,
    opacity: config.opacity,
    duration: config.duration,
    ease: config.ease,
    stagger: config.stagger,
  });
};

/**
 * Parallax scroll effect
 * @param {string|HTMLElement} target - Element to animate
 * @param {Object} options - Animation options
 */
export const parallaxScroll = (target, options = {}) => {
  const defaults = {
    yPercent: -50,
    ease: 'none',
  };

  const config = { ...defaults, ...options };

  return gsap.to(target, {
    scrollTrigger: {
      trigger: target,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
    yPercent: config.yPercent,
    ease: config.ease,
  });
};

/**
 * Typewriter effect animation
 * @param {string|HTMLElement} target - Element containing text
 * @param {Object} options - Animation options
 */
export const typewriter = (target, options = {}) => {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return;

  const text = element.textContent;
  const defaults = {
    duration: text.length * 0.05,
    ease: 'none',
    delay: 0,
  };

  const config = { ...defaults, ...options };
  
  element.textContent = '';
  
  return gsap.to(element, {
    duration: config.duration,
    ease: config.ease,
    delay: config.delay,
    text: {
      value: text,
      delimiter: '',
    },
  });
};

/**
 * Create a timeline with multiple animations
 * @param {Array} animations - Array of animation objects
 */
export const createTimeline = (animations = []) => {
  const tl = gsap.timeline();
  
  animations.forEach((animation) => {
    const { target, animationType, options = {}, position = '>' } = animation;
    
    switch (animationType) {
      case 'fadeIn':
        tl.from(target, {
          opacity: 0,
          y: 30,
          duration: ANIMATION_CONFIG.duration.normal,
          ease: ANIMATION_CONFIG.easing.ease,
          ...options,
        }, position);
        break;
      case 'scaleIn':
        tl.from(target, {
          scale: 0,
          opacity: 0,
          duration: ANIMATION_CONFIG.duration.normal,
          ease: ANIMATION_CONFIG.easing.bounce,
          ...options,
        }, position);
        break;
      default:
        console.warn(`Unknown animation type: ${animationType}`);
    }
  });
  
  return tl;
};

const animations = {
  fadeIn,
  scaleIn,
  slideInLeft,
  slideInRight,
  hoverScale,
  revealOnScroll,
  staggerReveal,
  parallaxScroll,
  typewriter,
  createTimeline,
};

export default animations;