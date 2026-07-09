import ProjectCard from '../../features/ProjectCard';
import SectionWrapper from '../../layout/SectionWrapper';
import { PROJECTS_LIST } from '../../../lib/constants';

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
        {PROJECTS_LIST.map((proj) => (
          <ProjectCard key={proj.title} {...proj} />
        ))}
      </div>
    </SectionWrapper>
  );
}
