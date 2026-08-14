/**
 * Application Constants
 * Centralized constants for the portfolio application
 */

// Site Configuration
export const SITE_CONFIG = {
  name: 'Swapnil Sanap',
  title: 'Swapnil Sanap - Full Stack Developer & Software Engineer',
  description: 'Experienced Full Stack Developer specializing in React.js, Next.js, Node.js, and modern web technologies. Building scalable applications with clean code and innovative solutions.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://swapnilsanap7.com',
  ogImage: '/og.png',
  links: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/Swapnilsanap7',
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/swapnilsanap7/',
    email: process.env.NEXT_PUBLIC_EMAIL || 'hello@swapnilsanap7.com',
  },
};

// Animation Constants
export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.0,
    extraSlow: 1.5,
  },
  easing: {
    ease: 'power2.out',
    easeIn: 'power2.in',
    easeInOut: 'power2.inOut',
    bounce: 'bounce.out',
    elastic: 'elastic.out',
  },
  stagger: 0.1,
  delay: 0.2,
};

// Theme Configuration
export const THEME = {
  colors: {
    primary: 'var(--primary)',
    secondary: 'var(--secondary)',
    accent: 'var(--accent)',
    dark: 'var(--dark)',
    light: 'var(--light)',
    background: 'var(--background)',
    surface: 'var(--surface)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

// Navigation Constants
export const NAVIGATION = {
  main: [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#project' },
    { name: 'Contact', href: '#contact' },
  ],
  social: [
    {
      name: 'GitHub',
      href: SITE_CONFIG.links.github,
      icon: 'github',
    },
    {
      name: 'LinkedIn', 
      href: SITE_CONFIG.links.linkedin,
      icon: 'linkedin',
    },
    {
      name: 'Email',
      href: `mailto:${SITE_CONFIG.links.email}`,
      icon: 'email',
    },
  ],
};

// Tech Stack Constants
export const TECH_STACK = {
  frontend: [
    'React.js',
    'Next.js',
    'JavaScript',
    'TypeScript',
    'HTML5',
    'CSS3',
    'TailwindCSS',
    'GSAP',
  ],
  backend: [
    'Node.js',
    'Express.js',
    'Python',
    'PostgreSQL',
    'MongoDB',
    'REST APIs',
    'GraphQL',
  ],
  tools: [
    'Git',
    'VS Code',
    'Docker',
    'AWS',
    'Vercel',
    'Figma',
    'Postman',
  ],
};

// Project Categories
export const PROJECT_CATEGORIES = {
  ALL: 'all',
  WEB: 'web',
  MOBILE: 'mobile',
  FULLSTACK: 'fullstack',
  AI: 'ai',
  OPENSOURCE: 'opensource',
};

// Form Constants
export const FORM_CONFIG = {
  contact: {
    endpoint: '/api/contact',
    fields: {
      name: {
        minLength: 2,
        maxLength: 80,
        required: true,
      },
      email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        required: true,
      },
      subject: {
        minLength: 3,
        maxLength: 120,
        required: true,
      },
      message: {
        minLength: 10,
        maxLength: 3000,
        required: true,
      },
    },
  },
};

import { PROJECTS_DATA, PROJECTS_LIST } from './projects';
import { EXPERIENCE_DATA } from './experience';

const constants = {
  SITE_CONFIG,
  ANIMATION_CONFIG,
  THEME,
  NAVIGATION,
  TECH_STACK,
  PROJECT_CATEGORIES,
  FORM_CONFIG,
  PROJECTS_DATA,
  PROJECTS_LIST,
  EXPERIENCE_DATA,
};

export { PROJECTS_DATA, PROJECTS_LIST, EXPERIENCE_DATA };
export default constants;
