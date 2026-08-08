'use client';

import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { trackResumeView } from '../../lib/config/analytics';

export default function ResumeButton() {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {});

    const handleMouseEnter = () => {
      setHovered(true);
      ctx.add(() => {
        gsap.to(container, {
          width: 320,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    };

    const handleMouseLeave = () => {
      setHovered(false);
      ctx.add(() => {
        gsap.to(container, {
          width: 180,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (!previewRef.current) return;

    const ctx = gsap.context(() => {
      if (hovered) {
        gsap.fromTo(previewRef.current, 
          { opacity: 0, height: 0 },
          { opacity: 1, height: 160, duration: 0.3, ease: "power2.out" }
        );
      } else {
        gsap.to(previewRef.current, {
          opacity: 0,
          height: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });

    return () => ctx.revert();
  }, [hovered]);

  return (
    <a
      href="/assets/documents/Swapnil_Sanap_Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="w-full max-w-xs"
      onClick={() => trackResumeView('hero')}
    >
      <div
        ref={containerRef}
        className="bg-white/10 border border-blue-500 text-blue-400 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer backdrop-blur-md shadow-md w-[180px]"
      >
        <div className="px-6 py-2 rounded-x1 transition text-center font-medium md:w-auto">
          Resume
        </div>

        {/* Image preview */}
        {hovered && (
          <div
            ref={previewRef}
            className="bg-black bg-opacity-60 overflow-hidden"
          >
            <Image
              src="/assets/images/resume-preview.webp"
              alt="Resume preview"
              width={320}
              height={160}
              className="object-cover w-full h-full"
            />
          </div>
        )}
      </div>
    </a>
  );
}
