'use client';

import StlViewer from '@/components/StlViewer';
import TechCloud from '@/components/sections/About/TechCloud';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-[80vh] px-4 py-20 overflow-hidden" ref={containerRef}>
      
      {/* 3D Background Layer */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <StlViewer />
      </div>

       {/* Centered Section Title */}
      <div className="relative z-10 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white">About Me</h2>
      </div>

      {/* Foreground Grid */}
      <div className="relative z-10 flex flex-col md:flex-row items-start justify-between gap-12 max-w-6xl mx-auto">
        
        {/* Left: About Text */}
        <div
          ref={textRef}
          className="flex-1 text-center md:text-left max-w-xl"
        >
          <p className="text-gray-300 text-lg leading-7">
            I'm a software developer with a passion for building full-stack applications that are clean, efficient, and user-centered.
          </p>
          <p className="text-gray-300 text-lg leading-7 mt-4">
            I love working on both frontend interfaces and backend systems...
          </p>
          <p className="text-gray-300 text-lg leading-7 mt-4">
            I’ve worked across mobile apps, full-stack projects, and CMS-based platforms...
          </p>
          <p className="text-blue-400 text-base mt-6 italic">
            Fun fact: I sometimes refactor my personal projects just for fun.
          </p>
        </div>

        {/* Right: Clean TechCloud */}
        <div ref={modelRef} className="flex-1 w-full max-w-md p-2">
          <TechCloud />
        </div>
      </div>
    </section>
  );
}
