'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const techIcons = [
  '/icons/react.svg',
  '/icons/node.svg',
  '/icons/tailwind.svg',
  '/icons/drupal.svg',
  '/icons/js.svg',
  '/icons/ts.svg',
  '/icons/seo.svg',
  '/icons/git.svg',
  '/icons/mysql.svg',
];

export default function TechCloud() {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;

    tlRef.current = gsap.to(el, {
      x: '-50%',
      duration: 20,
      repeat: -1,
      ease: 'linear',
    });

    const pause = () => tlRef.current.pause();
    const play = () => tlRef.current.resume();

    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', play);

    gsap.from(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power2.out',
    });

    return () => {
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', play);
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
      <div ref={scrollRef} className="flex gap-12 w-[200%]">
        {[...Array(2)].map((_, cloneIdx) => (
          <div key={cloneIdx} className="flex flex-col gap-4">
            {[0, 1, 2].map((row) => (
              <div key={row} className={`flex gap-4 ${row % 2 !== 0 ? 'ml-6' : ''}`}>
                {techIcons.slice(row * 3, row * 3 + 3).map((src, i) => (
                  <div
                    key={i}
                    className="transition-transform duration-300 hover:scale-125 hover:drop-shadow-lg"
                  >
                    <Image
                      src={src}
                      alt="tech"
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
