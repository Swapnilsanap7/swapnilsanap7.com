'use client';

import { useRef } from 'react';
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
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative group h-full min-h-[360px] overflow-hidden rounded-xl shadow-lg transition-transform duration-300 md:hover:scale-[1.03] bg-zinc-900"
    >
      {/* Glare effect using CSS vars set via JS */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20 hidden md:block"
        style={{
          background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.15), transparent 40%)'
        }}
      />
      {/* Project Image */}
      <Image
        src={imageSrc}
        alt={title}
        width={600}
        height={400}
        className="w-full h-full min-h-[360px] object-cover transition-all duration-500 brightness-[0.45] md:brightness-100 md:group-hover:blur-sm md:group-hover:brightness-50 md:group-focus-within:blur-sm md:group-focus-within:brightness-50"
      />

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/35 md:bg-black/20 backdrop-blur-[2px] md:backdrop-blur-sm flex flex-col justify-center items-center px-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity duration-300 text-center text-white z-30">
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
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-center transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-white"
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
