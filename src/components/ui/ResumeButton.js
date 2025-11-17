'use client';

import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { trackResumeDownload } from '../../lib/config/analytics';

export default function ResumeButton() {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseEnter = () => {
      setHovered(true);
      gsap.to(container, {
        width: 320,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      setHovered(false);
      gsap.to(container, {
        width: 180,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (previewRef.current) {
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
    }
  }, [hovered]);

  return (
    <Link
      href="/resume"
      target="_blank"
      rel="noopener noreferrer"
      className="w-full max-w-xs"
      onClick={() => trackResumeDownload()}
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
              src="/assets/images/resume-preview.png"
              alt="Resume preview"
              width={320}
              height={160}
              className="object-cover w-full h-full"
            />
          </div>
        )}
      </div>
    </Link>
  );
}
