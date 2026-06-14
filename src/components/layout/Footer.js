'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { SiGithub, SiGmail, SiLinkedin } from 'react-icons/si';
import {
  trackEmailClick,
  trackGithubClick,
  trackLinkedinClick,
} from '../../lib/config/analytics';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Use ScrollTrigger's scroll position instead of window.scrollY
      const scrollY = ScrollTrigger.getScrollFunc(window)() || window.scrollY;
      setShowScroll(scrollY > 300);
    };

    // Listen to both native scroll and ScrollTrigger updates
    window.addEventListener('scroll', toggleVisibility);
    ScrollTrigger.addEventListener('scrollUpdate', toggleVisibility);
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      ScrollTrigger.removeEventListener('scrollUpdate', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    // Use both methods to ensure compatibility
    window.scrollTo({ top: 0, behavior: 'smooth' });
    gsap.to(window, { duration: 1, scrollTo: 0, ease: "power2.out" });
  };

  return (
    <>
      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 bg-black/10 dark:bg-white/10 text-black dark:text-white p-2 rounded-full backdrop-blur-lg hover:bg-black/20 dark:hover:bg-white/20 transition z-50"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={20} />
        </button>
      )}

      {/* Footer - sticks to bottom of content */}
      <footer className="w-full bg-transparent backdrop-blur-none shadow-none border-none text-gray-600 dark:text-gray-300 py-4 px-4 mt-auto">
        <section className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          
          {/* Center Text */}
          <div className="w-full text-sm text-center md:text-base order-2 md:order-1">
            © {new Date().getFullYear()} Swapnil Sanap. All rights reserved. Made with ❤️ by Swapnil Sanap
          </div>

          {/* Right: Socials */}
          <div className="flex space-x-5 text-xl order-1 md:order-2">
            <Link
              href="https://github.com/Swapnilsanap7"
              target="_blank"
              aria-label="GitHub"
              onClick={() => trackGithubClick('footer')}
            >
              <SiGithub className="hover:text-black dark:hover:text-white transition" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/swapnilsanap7/"
              target="_blank"
              aria-label="LinkedIn"
              onClick={() => trackLinkedinClick('footer')}
            >
              <SiLinkedin className="hover:text-black dark:hover:text-white transition" />
            </Link>
            <Link
              href="mailto:hello@swapnilsanap7.com"
              aria-label="Email"
              onClick={() => trackEmailClick('footer')}
            >
              <SiGmail className="hover:text-black dark:hover:text-white transition" />
            </Link>
          </div>
        </section>
      </footer>
    </>
  );
}
