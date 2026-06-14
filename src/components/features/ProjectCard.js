'use client';

import Image from 'next/image';
import Link from 'next/link';
import { trackGithubClick, trackProjectCardClick, trackLiveDemoClick, trackProjectCodeClick } from '../../lib/config/analytics';

export default function ProjectCard({
  title,
  description,
  techStack,
  imageSrc,
  githubLink,
  liveDemoLink,
  slug,
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

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="backdrop-blur-sm bg-white/10 rounded-full px-3 py-1 text-xs text-gray-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 w-full max-w-xs">
          {/* Primary Action - View Details */}
          <Link
            href={`/projects/${slug}`}
            onClick={() => trackProjectCardClick(title)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-center transform hover:scale-105"
          >
            View Details
          </Link>
          
          {/* Secondary Actions */}
          <div className="flex gap-3 justify-center">
            {liveDemoLink && (
              <Link
                href={liveDemoLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} Live Demo`}
                onClick={() => trackLiveDemoClick(title, 'card')}
                className="flex-1 border border-white/30 hover:border-white/60 hover:bg-white/10 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-center"
              >
                Live Demo
              </Link>
            )}
            {githubLink && (
              <Link
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} GitHub repository`}
                onClick={() => {
                  trackGithubClick('project');
                  trackProjectCodeClick(title, 'card');
                }}
                className="flex-1 border border-white/30 hover:border-white/60 hover:bg-white/10 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-center"
              >
                GitHub
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
