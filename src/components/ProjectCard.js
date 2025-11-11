import Image from 'next/image';
import Link from 'next/link';

export default function ProjectCard({
  title,
  description,
  techStack,
  imageSrc,
  githubLink,
  liveDemoLink,
}) {
  return (
    <div className="relative group overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
      {/* Project Image */}
      <Image
        src={imageSrc}
        alt={title}
        width={600}
        height={400}
        className="w-full h-auto object-cover transition-all duration-500 group-hover:blur-sm group-hover:brightness-75"
      />

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-opacity-70 backdrop-blur-sm flex flex-col justify-center items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm mb-4 max-w-xs">{description}</p>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="backdrop-blur-sm bg-white/10 rounded-full px-3 py-1 text-xs text-gray-200"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          {githubLink && (
            <Link
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} GitHub repository`}
              className="underline text-sm hover:text-gray-300 transition-colors"
            >
              GitHub
            </Link>
          )}
          {liveDemoLink && (
            <Link
              href={liveDemoLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} Live Demo`}
              className="underline text-sm hover:text-gray-300 transition-colors"
            >
              Live Demo
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
