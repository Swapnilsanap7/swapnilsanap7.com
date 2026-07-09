/**
 * Projects Data Constants
 * Shared project data for portfolio list and detail pages
 */

export const PROJECTS_DATA = {
  'portfolio-website': {
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    subtitle: 'A modern portfolio showcasing my development journey',
    description: 'My personal website showcasing projects and skills.',
    fullDescription: 'A modern, responsive portfolio website built with Next.js and TailwindCSS. Features smooth animations, dark mode support, and a clean design showcasing my development skills and projects.',
    displayType: 'browser',
    imageSrc: '/project/portfolio/1.jpg', // Thumbnail for home grid
    detailImage: '/project/portfolio/web.png', // Main image for details page
    githubLink: 'https://github.com/swapnilsanap7/Personal-Portfolio',
    liveDemoLink: 'https://swapnilsanap7.com',
    techStack: ['Next.js', 'TailwindCSS', 'GSAP'],
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
      { name: 'GSAP', icon: '/icons/js.svg', description: 'GreenSock Animation Platform for smooth, high-performance interactions' }
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
    description: 'A modern ecommerce UI built using HTML, CSS, and JavaScript, featuring smooth animations and a clean product display layout.',
    fullDescription: 'A sleek and fully responsive ecommerce showcase website built with HTML, CSS, and JavaScript. Features modern UI components, product sections, scroll animations, and a clean layout designed for showcasing widgets and products elegantly.',
    displayType: 'browser',
    imageSrc: '/project/E-Commerce/mini.jpg',
    detailImage: '/project/E-Commerce/main.jpg',
    githubLink: 'https://github.com/Swapnilsanap7/Ecommerce-Showcase',
    liveDemoLink: 'https://swapnilsanap7.github.io/Ecommerce-Showcase/',
    techStack: ['React', 'Firebase', 'TailwindCSS'],
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
      challenge: 'Designing a clean and modern ecommerce UI that provides smooth navigation and visually appealing product presentation.',
      solution: 'Created a fully responsive layout with smooth animations, intuitive sections, and optimized styling for a premium ecommerce feel.'
    }
  },
  'splitxpense': { 
    slug: 'splitxpense',
    title: 'SplitExpense – Bill Splitting Web App',
    subtitle: 'A seamless way to split bills, track expenses, and settle balances',
    description: 'A split expense tracker for groups.',
    fullDescription: 'SplitExpense is a modern bill-splitting platform built to make sharing expenses effortless. It enables users to create groups, add expenses, split costs evenly or unevenly, track balances, and settle up in real time. Designed with a clean UI, secure backend, and optimized workflows to ensure transparency and convenience for group finances.',
    displayType: 'browser',
    imageSrc: '/project/splitxpense/web-mini.png',
    detailImage: '/project/splitxpense/web.png',
    githubLink: 'https://github.com/Swapnilsanap7/splitexpense-web',
    liveDemoLink: 'https://splitexpense-web.vercel.app',
    techStack: ['Next.js', 'TailwindCSS', 'Firebase'],
    hero: {
      tagline: 'Easily split bills, track expenses, and settle balances effortlessly.',
      mainImage: '/project/splitxpense/web.png'
    },
    features: [
      { icon: '👥', title: 'Group Management', description: 'Create groups and manage shared expenses efficiently.' },
      { icon: '💸', title: 'Smart Bill Splitting', description: 'Split evenly or assign custom shares to each person.' },
      { icon: '📊', title: 'Clear Balance Tracking', description: 'View how much you owe or are owed in real time.' },
      { icon: '⚡', title: 'Modern UI', description: 'Clean, intuitive, responsive interface built for ease of use.' }
    ],
    techStackDetailed: [
      { name: 'React', icon: '/icons/react.svg', description: 'Component-based UI for interactive, dynamic screens.' },
      { name: 'Node.js', icon: '/icons/node.svg', description: 'JavaScript runtime powering the backend APIs.' },
      { name: 'Express', icon: '/icons/express.svg', description: 'Minimal backend framework for RESTful APIs.' },
      { name: 'MongoDB', icon: '/icons/mongodb.svg', description: 'NoSQL database for group, user, and expense data.' },
      { name: 'TailwindCSS', icon: '/icons/tailwind.svg', description: 'Utility-first framework enabling fast, consistent styling.' }
    ],
    gallery: [
      '/project/splitxpense/web.png',
      '/project/splitxpense/web1.png',
      '/project/splitxpense/web2.png'
    ],
    caseStudy: {
      challenge: 'Managing shared expenses in groups often becomes messy with manual tracking, leading to confusion and errors.',
      solution: 'Built a structured platform with group-based tracking, smart splitting algorithms, and real-time balance updates. The application emphasizes simplicity, accuracy, and modern UI/UX to make expense sharing effortless.'
    }
  },
  'progate-to-modern-web': {
    slug: 'progate-to-modern-web',
    title: 'progate-to-modern-web',
    subtitle: 'Evolution of my web development journey',
    description: 'It is not Classified.',
    fullDescription: 'This project revisits an original site I built during college with Progate, and rebuilds it using semantic HTML5, responsive CSS (Flexbox & Grid), performance-optimised assets and minimal JavaScript. It showcases how my skills have grown from learning to building with best practices in mind.',
    displayType: 'browser',
    imageSrc: '/project/webio/web-mini.png',
    detailImage: '/project/webio/web.png',
    githubLink: 'https://github.com/Swapnilsanap7/web.io',
    liveDemoLink: 'https://swapnilsanap7.github.io/web.io',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    hero: {
      tagline: 'Then vs Now — my web dev evolution',
      mainImage: '/project/webio/web.png'
    },
    features: [
      { icon: '🧭', title: 'Semantic HTML5', description: 'Well-structured, accessible markup throughout.' },
      { icon: '⚙️', title: 'Modern CSS Architecture', description: 'Flexbox & Grid layouts, variables, and smooth animations.' },
      { icon: '🚀', title: 'Performance Optimised', description: 'Minified assets, optimised images and minimal JS overhead.' },
      { icon: '🔁', title: 'Responsive First', description: 'Mobile-first design that adapts seamlessly across devices.' }
    ],
    techStackDetailed: [
      { name: 'HTML5', icon: '/icons/html.svg', description: 'Semantic markup, accessibility-ready.' },
      { name: 'CSS3', icon: '/icons/css.svg', description: 'Flexible layout with Flexbox & Grid, custom properties and animations.' },
      { name: 'JavaScript', icon: '/icons/js.svg', description: 'Vanilla JS for interactive enhancements—kept light for performance.' }
    ],
    gallery: [
      '/project/webio/web.png',
      '/project/webio/web1.png'
    ],
    caseStudy: {
      challenge: 'Modernise an original college-era website while preserving its content and essence, and ensure it was performant, accessible and responsive.',
      solution: 'Rebuilt the entire site using semantic HTML5, structured CSS with Flexbox & Grid, optimised assets, and implemented a mobile-first responsive design with minimal JavaScript to maintain performance and usability.'
    }
  }
};

export const PROJECTS_LIST = Object.values(PROJECTS_DATA);
