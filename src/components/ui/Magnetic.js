'use client';

import { gsap } from 'gsap';
import { useEffect, useRef, cloneElement } from 'react';

export default function Magnetic({ children }) {
  const magnetic = useRef(null);

  useEffect(() => {
    // We use matchMedia to only enable Magnetic on devices with fine pointers (mice)
    const mm = gsap.matchMedia();
    
    mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const xTo = gsap.quickTo(magnetic.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
      const yTo = gsap.quickTo(magnetic.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

      const mouseMove = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = magnetic.current.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        xTo(x * 0.35);
        yTo(y * 0.35);
      };

      const mouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      const current = magnetic.current;
      if (current) {
        current.addEventListener("mousemove", mouseMove);
        current.addEventListener("mouseleave", mouseLeave);
      }

      return () => {
        if (current) {
          current.removeEventListener("mousemove", mouseMove);
          current.removeEventListener("mouseleave", mouseLeave);
        }
      };
    });

    return () => mm.revert();
  }, []);

  return cloneElement(children, { ref: magnetic });
}
