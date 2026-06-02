'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, lazy, Suspense } from 'react';
import SectionWrapper from '../../layout/SectionWrapper';
import TechCloud from './TechCloud';

const StlViewer = lazy(() => import('../../ui/StlViewer'));

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const textRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      });

      gsap.from(modelRef.current, {
        scrollTrigger: {
          trigger: modelRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 0.2,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      id="about"
      className="py-24 relative overflow-hidden"
    >
      {/* 3D Background Layer - Positioned in center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none z-0 w-96 h-96">
        <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-gray-400">Loading 3D Model...</div>}>
          <StlViewer />
        </Suspense>
      </div>

      {/* Centered Section Title */}
      <div className="relative z-10 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--dark)] dark:text-white drop-shadow-sm">About Me</h2>
      </div>

      {/* Foreground Grid */}
      <div className="relative z-10 flex flex-col md:flex-row items-start justify-between gap-12">
        {/* Left: About Text */}
        <div ref={textRef} className="flex-1 text-center md:text-left max-w-xl">
          <p className="text-[var(--dark)] dark:text-[var(--light)] text-lg leading-7">
            I&apos;m a software developer with a passion for building full-stack applications that are clean, efficient, and user-centered.
          </p>
          <p className="text-[var(--dark)] dark:text-[var(--light)] text-lg leading-7 mt-4">
            I love working on both frontend interfaces and backend systems...
          </p>
          <p className="text-[var(--dark)] dark:text-[var(--light)] text-lg leading-7 mt-4">
            I&apos;ve worked across mobile apps, full-stack projects, and CMS-based platforms...
          </p>
          <p className="text-blue-600 dark:text-blue-400 text-base mt-6 italic">
            Fun fact: I sometimes refactor my personal projects just for fun.
          </p>
        </div>

        {/* Right: Clean TechCloud */}
        <div ref={modelRef} className="flex-1 w-full max-w-md p-2">
          <TechCloud />
        </div>
      </div>
    </SectionWrapper>
  );
}
