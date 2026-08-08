'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import SectionWrapper from '../../layout/SectionWrapper';
import ResumeButton from '../../ui/ResumeButton';
import Magnetic from '../../ui/Magnetic';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });

      gsap.from(textRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });

      gsap.from(buttonsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      id="hero"
      className="min-h-[calc(100vh-6rem)] pt-3 flex items-center justify-center relative"
    >
      <style>
        {`
          @keyframes subtle-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-subtle-float {
            animation: subtle-float 6s ease-in-out infinite;
          }
        `}
      </style>
      {/* Container ref moved here */}
      <div
        ref={containerRef}
        className="flex items-center justify-center w-full mx-auto gap-6 flex-wrap md:flex-nowrap"
      >
        {/* Profile Image */}
        <div
          ref={imageRef}
          className="flex-shrink-0 p-1 rounded-full bg-white/10 backdrop-blur-md shadow-xl overflow-hidden animate-subtle-float"
        >
          <Image
            src="/assets/images/swapnil.png"
            alt="Swapnil Sanap"
            width={300}
            height={300}
            className="rounded-full"
            priority
          />
        </div>

        {/* Decorative Line */}
        <div className="h-88 w-[2px] bg-blue-400/30 shadow-[0_0_20px_#3b82f6] rounded-sm hidden md:block" />

        {/* Text Block */}
        <div
          ref={textRef}
          className="text-center md:text-left overflow-hidden"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--dark)] dark:text-white ">
            Hi, I’m <span className="text-blue-600 dark:text-blue-400">Swapnil Sanap</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-[var(--dark)] dark:text-[var(--light)] max-w-md">
            Full-stack software engineer building secure web products and AI-powered tools with Next.js, Node.js, and Python.
          </p>
        </div>

        {/* Decorative Line 2 */}
        <div className="h-88 w-[2px] bg-blue-400/30 shadow-[0_0_20px_#3b82f6] rounded-sm hidden md:block" />

        {/* Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col gap-4 items-center md:items-start mt-6 w-full max-w-[200px]"
        >
          <Magnetic>
            <Link
              href="#contact"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl transition-all duration-300 shadow-md w-full text-center hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] block"
            >
              Contact Me
            </Link>
          </Magnetic>
          <Magnetic>
            <div className="w-full">
              <ResumeButton />
            </div>
          </Magnetic>
        </div>
      </div>
    </SectionWrapper>
  );
}
