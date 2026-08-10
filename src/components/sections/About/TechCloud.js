'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const techIcons = [
  { src: '/icons/react.svg', name: 'React' },
  { src: '/icons/node.svg', name: 'Node.js' },
  { src: '/icons/tailwind.svg', name: 'Tailwind CSS' },
  { src: '/icons/drupal.svg', name: 'Drupal' },
  { src: '/icons/js.svg', name: 'JavaScript' },
  { src: '/icons/ts.svg', name: 'TypeScript' },
  { src: '/icons/next.js.svg', name: 'Next.js' },
  { src: '/icons/git.svg', name: 'Git' },
  { src: '/icons/mysql.svg', name: 'MySQL' },
];

export default function TechCloud() {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const tlRef = useRef(null);

  // Turn icons into rows of 3 automatically
  const rows = [];
  for (let i = 0; i < techIcons.length; i += 3) {
    rows.push(techIcons.slice(i, i + 3));
  }

  useEffect(() => {
    const el = scrollRef.current;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tl = gsap.to(el, {
      x: "-50%",
      duration: 20,
      repeat: -1,
      ease: "linear",
    });

    tlRef.current = tl;

    // Scroll fade effect
    gsap.from(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
      },
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out",
    });

    return () => {
      tl.kill(); // IMPORTANT cleanup
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden py-6"
      style={{
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
        maskImage:
          'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
      }}
    >
      <div
        ref={scrollRef}
        className="flex gap-12 w-[200%]"
        style={{ willChange: 'transform' }}
        onMouseEnter={() => tlRef.current?.pause()}
        onMouseLeave={() => tlRef.current?.resume()}
      >
        {[...Array(2)].map((_, cloneIdx) => (
          <div key={cloneIdx} className="flex flex-col gap-4">
            {rows.map((row, i) => (
              <div key={i} className={`flex gap-4 ${i % 2 !== 0 ? 'ml-6' : ''}`}>
                {row.map((tech, j) => (
                  <div
                    key={tech.name}
                    className="transition-transform duration-300 hover:scale-125 hover:drop-shadow-lg"
                  >
                    <Image
                      src={tech.src}
                      alt={cloneIdx === 0 ? `${tech.name} logo` : ''}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
