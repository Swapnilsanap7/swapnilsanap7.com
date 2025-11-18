import { notFound } from 'next/navigation';
import ProjectDetail from '../../../components/features/ProjectDetail';

// This will be moved to a separate data file later
const projectsData = {
  'portfolio-website': {
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    subtitle: 'A modern portfolio showcasing my development journey',
    description: 'My personal website showcasing projects and skills.',
    displayType: 'browser', // Force browser mockup for web projects
    demo: 'https://swapnilsanap7.com',
    github: 'https://github.com/swapnilsanap7/Personal-Portfolio',
    image: '/project/portfolio/web.png',
    fullDescription: 'A modern, responsive portfolio website built with Next.js and TailwindCSS. Features smooth animations, dark mode support, and a clean design showcasing my development skills and projects.',
    techStack: ['Next.js', 'TailwindCSS', 'Framer Motion'],
    imageSrc: '/project/portfolio/web.png',
    githubLink: 'https://github.com/swapnilsanap7/Personal-Portfolio',
    liveDemoLink: 'https://swapnilsanap7.com',
    hero: {
      tagline: 'A modern portfolio showcasing my development journey',
      mainImage: '/project/portfolio/web.png'
    },
    features: [
      { icon: '⚡', title: 'Fast Performance', description: 'Optimized loading and smooth animations' },
      { icon: '🌙', title: 'Dark Mode', description: 'Seamless light/dark theme switching' },
      { icon: '📱', title: 'Responsive Design', description: 'Perfect experience on all devices' },
      { icon: '🎨', title: 'Modern UI', description: 'Clean and professional interface' }
    ],
    techStackDetailed: [
      { name: 'Next.js', icon: '/icons/next.js.svg', description: 'React framework for production' },
      { name: 'TailwindCSS', icon: '/icons/tailwind.svg', description: 'Utility-first CSS framework' },
      { name: 'Framer Motion', icon: '/icons/react.svg', description: 'Animation library for React' }
    ],
    gallery: [
      '/project/portfolio/web.png',
      '/project/portfolio/web2.png',
      '/project/portfolio/web3.png'
    ],
    caseStudy: {
      challenge: 'Creating a portfolio that stands out while maintaining clean, professional design and optimal performance.',
      solution: 'Implemented modern design patterns with smooth animations, responsive layout, and performance optimizations using Next.js best practices.'
    }
  },
  'ecommerce-showcase': {
  slug: 'ecommerce-showcase',
  title: 'Ecommerce Showcase',
  subtitle: 'A visually rich ecommerce product showcase UI',
  description: 'A modern ecommerce UI featuring product categories, animations, and a clean layout.',
  displayType: 'browser',
  demo: 'https://swapnilsanap7.github.io/Ecommerce-Showcase/',
  github: 'https://github.com/Swapnilsanap7/Ecommerce-Showcase',
  image: '/project/E-Commerce/main.jpg', // Replace with your actual image
  fullDescription:
    'A sleek and fully responsive ecommerce showcase website built with HTML, CSS, and JavaScript. Features modern UI components, product sections, scroll animations, and a clean layout designed for showcasing products elegantly.',
  techStack: ['HTML', 'CSS', 'JavaScript'],
  imageSrc: '/project/E-Commerce/main.jpg',
  githubLink: 'https://github.com/Swapnilsanap7/Ecommerce-Showcase',
  liveDemoLink: 'https://swapnilsanap7.github.io/Ecommerce-Showcase/',
  hero: {
    tagline: 'A beautifully designed UI for showcasing ecommerce products',
    mainImage: '/project/E-Commerce/main.jpg'
  },
  features: [
    { icon: '🛒', title: 'Product Showcase', description: 'Clean and modern product section layout' },
    { icon: '🎞️', title: 'Smooth Animations', description: 'Scroll and hover animations for interactive feel' },
    { icon: '📱', title: 'Fully Responsive', description: 'Optimized for all screen sizes' },
    { icon: '🎨', title: 'Modern UI Design', description: 'Minimalistic and visually appealing interface' }
  ],
  techStackDetailed: [
    { name: 'HTML', icon: '/icons/html.svg', description: 'Structure and semantic layout' },
    { name: 'CSS', icon: '/icons/css.svg', description: 'Modern and responsive styling' },
    { name: 'JavaScript', icon: '/icons/js.svg', description: 'Interactive components and animations' }
  ],
  gallery: [
    '/project/E-Commerce/main.jpg',  
    '/project/E-Commerce/web2.png',
    '/project/E-Commerce/web3.png'
  ],
  caseStudy: {
    challenge:
      'Designing a clean and modern ecommerce UI that provides smooth navigation and visually appealing product presentation.',
    solution:
      'Created a fully responsive layout with smooth animations, intuitive sections, and optimized styling for a premium ecommerce feel.'
  }
}

  // Add other projects as needed
};

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = projectsData[slug];

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}

// Generate static params for known projects
export function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projectsData[slug];

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Swapnil Sanap`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.imageSrc],
    },
  };
}