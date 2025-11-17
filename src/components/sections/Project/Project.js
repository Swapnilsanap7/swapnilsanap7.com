import ProjectCard from '../../features/ProjectCard';
import SectionWrapper from '../../layout/SectionWrapper';

const projects = [
  {
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    description: 'My personal website showcasing projects and skills.',
    techStack: ['Next.js', 'TailwindCSS', 'Framer Motion'],
    imageSrc: '/project/1.jpg',
    githubLink: 'https://github.com/swapnilsanap7/Personal-Portfolio',
    liveDemoLink: 'https://swapnilsanap7.com',
  },
  {
    slug: 'ecommerce-showcase',
    title: 'Ecommerce Showcase',
    description: 'A modern ecommerce UI built using HTML, CSS, and JavaScript, featuring smooth animations and a clean product display layout.',
    techStack: ['React', 'Firebase', 'TailwindCSS'],
    imageSrc: '/project/E-Commerce/mini.jpg',
    githubLink: 'https://github.com/Swapnilsanap7/Ecommerce-Showcase',
    liveDemoLink: 'https://swapnilsanap7.github.io/Ecommerce-Showcase/',
  },
  {
    slug: 'smartmenu-plus',
    title: 'SmartMenu+',
    description: 'A SmartMenu+ management system.',
    techStack: ['Next.js', 'Sanity', 'TailwindCSS'],
    imageSrc: '/project/3.jpg',
  },
  {
    slug: 'splitxpense',
    title: 'SplitXpense',
    description: 'A split expense tracker for groups.',
    techStack: ['React', 'OpenWeather API', 'TailwindCSS'],
    imageSrc: '/project/4.jpg',
  },
];

export default function Project() {
  return (
    <SectionWrapper
      id="project"
      className=""
    >
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-zinc-800 dark:text-white">
        Projects
      </h2>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
        {projects.map((proj) => (
          <ProjectCard key={proj.title} {...proj} />
        ))}
      </div>
    </SectionWrapper>
  );
}
