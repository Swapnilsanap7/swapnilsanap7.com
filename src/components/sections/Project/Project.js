import ProjectCard from '@/components/ProjectCard';

const project = [
  {
    title: 'Portfolio Website',
    description: 'My personal website showcasing projects and skills.',
    techStack: ['Next.js', 'TailwindCSS', 'Framer Motion'],
    imageSrc: '/project/1.jpg',
    githubLink: 'https://github.com/swapnilsanap7/Personal-Portfolio',
    liveDemoLink: 'https://swapnilsanap7.com',
  },
  {
    title: 'RetailSense for E-commerce',
    description: 'A comprehensive e-commerce platform for retail businesses.',
    techStack: ['react', 'Firebase', 'TailwindCSS'],
    imageSrc: '/project/2.jpg',
    
  },
  {
    title: 'Smart Restaurant',
    description: 'A smart restaurant management system.',
    techStack: ['Next.js', 'Sanity', 'TailwindCSS'],
    imageSrc: '/project/3.jpg',
  },
  {
    title: 'SplitXpense',
    description: 'A split expense tracker for groups.',
    techStack: ['React', 'OpenWeather API', 'TailwindCSS'],
    imageSrc: '/project/4.jpg',
  },
];

export default function Project() {
  return (
    <section id="project" className="flex flex-col items-center">
      <div className="w-full max-w-[1600px] 2xl:max-w-[2000px] mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-zinc-800 dark:text-white">Projects</h2>
        <div className="grid gap-8 w-full sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {project.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
