import ScrollTracker from '../components/features/ScrollTracker';
import About from '../components/sections/About/About';
import Contact from '../components/sections/Contact/Contact';
import Experience from '../components/sections/Experience/Experience';
import Hero from '../components/sections/Hero/Hero';
import Project from '../components/sections/Project/Project';
import Skills from '../components/sections/Skills/Skills';

// Enhanced metadata for the home page
export const metadata = {
  title: 'Swapnil Sanap - Full Stack Developer & Software Engineer',
  description: 'Professional portfolio of Swapnil Sanap, an experienced Full Stack Developer with MS in Computer Science from University of Illinois Springfield. Specializing in React, Next.js, Node.js, and modern web technologies.',
  keywords: [
    'Swapnil Sanap',
    'Full Stack Developer',
    'Software Engineer',
    'React Developer',
    'Next.js Developer',
    'Portfolio',
    'University of Illinois Springfield',
    'Computer Science',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'Web Development'
  ],
  openGraph: {
    title: 'Swapnil Sanap - Full Stack Developer Portfolio',
    description: 'Experienced Full Stack Developer specializing in modern web technologies. View my projects, experience, and skills.',
    url: 'https://swapnilsanap7.com',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Swapnil Sanap - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swapnil Sanap - Full Stack Developer Portfolio',
    description: 'Experienced Full Stack Developer specializing in modern web technologies.',
    images: ['/og.png'],
  },
  alternates: {
    canonical: 'https://swapnilsanap7.com',
  },
};

export default function Home() {
  return (
    <>
      <ScrollTracker />
      {/* Semantic HTML structure for better SEO */}
      <article>
        <header>
          <Hero />
        </header>
        
        <section aria-label="About Swapnil Sanap">
          <About />
        </section>
        
        <section aria-label="Technical Skills">
          <Skills />
        </section>
        
        <section aria-label="Professional Experience">
          <Experience />
        </section>
        
        <section aria-label="Portfolio Projects">
          <Project />
        </section>
        
        <section aria-label="Contact Information">
          <Contact />
        </section>
      </article>
    </>
  );
}
