'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from '../../features/ProjectCard';
import SectionWrapper from '../../layout/SectionWrapper';
import { PROJECTS_LIST } from '../../../lib/constants';

gsap.registerPlugin(ScrollTrigger);

export default function Project() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Heading entrance
      gsap.from(headingRef.current, {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Cards staggered entrance
      gsap.from('.project-card-wrapper', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);
  return (
    <SectionWrapper
      id="project"
      className=""
    >
      <div ref={containerRef} className="w-full">
        <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold text-center mb-16 text-zinc-800 dark:text-white">
          Projects
        </h2>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
        {PROJECTS_LIST.map((proj) => (
          <div key={proj.title} className="project-card-wrapper h-full">
            <ProjectCard {...proj} />
          </div>
        ))}
      </div>
      </div>
    </SectionWrapper>
  );
}
