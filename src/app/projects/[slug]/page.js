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
},
 'splitxpense': { 
  slug: 'splitxpense',
  title: 'SplitExpense – Bill Splitting Web App',
  subtitle: 'A seamless way to split bills, track expenses, and settle balances',
  description: 'A full-stack expense-splitting web application designed to simplify shared expenses with friends, roommates, or groups.',
  displayType: 'browser',
  demo: 'https://splitexpense-web.vercel.app', // If your deployed link differs, tell me & I’ll update
  github: 'https://github.com/Swapnilsanap7/splitexpense-web',
  image: '/project/splitxpense/web.png',

  fullDescription:
    'SplitExpense is a modern bill-splitting platform built to make sharing expenses effortless. It enables users to create groups, add expenses, split costs evenly or unevenly, track balances, and settle up in real time. Designed with a clean UI, secure backend, and optimized workflows to ensure transparency and convenience for group finances.',

  techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS'],

  imageSrc: '/project/splitexpense/cover.png',
  githubLink: 'https://github.com/Swapnilsanap7/splitexpense-web',
  liveDemoLink: 'https://splitexpense-web.vercel.app',

  hero: {
    tagline: 'Easily split bills, track expenses, and settle balances effortlessly.',
    mainImage: '/project/splitxpense/web.png'
  },

  features: [
    {
      icon: '👥',
      title: 'Group Management',
      description: 'Create groups and manage shared expenses efficiently.'
    },
    {
      icon: '💸',
      title: 'Smart Bill Splitting',
      description: 'Split evenly or assign custom shares to each person.'
    },
    {
      icon: '📊',
      title: 'Clear Balance Tracking',
      description: 'View how much you owe or are owed in real time.'
    },
    {
      icon: '⚡',
      title: 'Modern UI',
      description: 'Clean, intuitive, responsive interface built for ease of use.'
    }
  ],

  techStackDetailed: [
    {
      name: 'React',
      icon: '/icons/react.svg',
      description: 'Component-based UI for interactive, dynamic screens.'
    },
    {
      name: 'Node.js',
      icon: '/icons/node.svg',
      description: 'JavaScript runtime powering the backend APIs.'
    },
    {
      name: 'Express',
      icon: '/icons/express.svg',
      description: 'Minimal backend framework for RESTful APIs.'
    },
    {
      name: 'MongoDB',
      icon: '/icons/mongodb.svg',
      description: 'NoSQL database for group, user, and expense data.'
    },
    {
      name: 'TailwindCSS',
      icon: '/icons/tailwind.svg',
      description: 'Utility-first framework enabling fast, consistent styling.'
    }
  ],

  gallery: [
    '/project/splitxpense/web.png',
    '/project/splitxpense/web1.png',
    '/project/splitxpense/web2.png'
  ],

  caseStudy: {
    challenge:
      'Managing shared expenses in groups often becomes messy with manual tracking, leading to confusion and errors.',
    solution:
      'Built a structured platform with group-based tracking, smart splitting algorithms, and real-time balance updates. The application emphasizes simplicity, accuracy, and modern UI/UX to make expense sharing effortless.'
  }
},
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