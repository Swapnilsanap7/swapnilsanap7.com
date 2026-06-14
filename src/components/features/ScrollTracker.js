'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { trackSectionView } from '../../lib/config/analytics';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTracker() {
  const trackedSections = useRef(new Set());

  useEffect(() => {
    const sections = ['about', 'skills', 'experience', 'project', 'contact'];

    const triggers = sections.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;

      return ScrollTrigger.create({
        trigger: element,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          if (!trackedSections.current.has(id)) {
            trackedSections.current.add(id);
            trackSectionView(id);
          }
        },
      });
    });

    return () => {
      triggers.forEach((trigger) => {
        if (trigger) trigger.kill();
      });
    };
  }, []);

  return null;
}
