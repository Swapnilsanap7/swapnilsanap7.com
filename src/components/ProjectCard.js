import Image from 'next/image';
import Link from 'next/link';

export default function ProjectCard({ title, description, techStack, imageSrc, githubLink, liveDemoLink }) {
  return (
    <div className="relative group overflow-hidden rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105">
      {/* Project Image */}
      <Image
        src={imageSrc}
        alt={title}
        width={600}
        height={400}
        className="w-full h-auto object-cover transition-all duration-300 group-hover:blur-sm"
      />

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-opacity-60 flex flex-col justify-center items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm mb-4">{description}</p>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="bg-blur bg-opacity-20 rounded-full px-3 py-1 text-xs"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          {githubLink && (
            <Link href={githubLink} target="_blank" rel="noopener noreferrer" className="underline text-sm">
              GitHub
            </Link>
          )}
          {liveDemoLink && (
            <Link href={liveDemoLink} target="_blank" rel="noopener noreferrer" className="underline text-sm">
              Live Demo
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
