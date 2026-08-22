'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
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
        <div className="project-card-wrapper h-full">
          <Link
            href="/access"
            className="group relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-xl border border-blue-400/30 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.38),_transparent_42%),linear-gradient(135deg,_#0f172a,_#172554)] p-7 text-white shadow-lg transition-transform duration-300 md:hover:scale-[1.03]"
          >
            <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-blue-400/20 blur-3xl transition-transform duration-500 group-hover:scale-125" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-blue-200">
              <ShieldCheck size={24} />
            </div>
            <p className="relative mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">Portfolio Access Hub</p>
            <h3 className="relative mt-3 text-2xl font-semibold">Request private demo access</h3>
            <p className="relative mt-3 max-w-sm text-sm leading-6 text-slate-300">
              Choose a project, share a little context, and request time-limited access to a working demo.
            </p>
            <div className="relative mt-6 flex flex-wrap gap-2">
              {['Manual review', 'Private demos', 'Time-limited'].map((label) => (
                <span key={label} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-blue-100">{label}</span>
              ))}
            </div>
            <span className="relative mt-auto inline-flex w-fit items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium transition-colors group-hover:bg-blue-400">
              Request access <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>
      </div>
      </div>
    </SectionWrapper>
  );
}
