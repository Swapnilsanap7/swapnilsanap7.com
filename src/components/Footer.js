'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { SiGithub, SiGmail, SiLinkedin } from 'react-icons/si';

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 bg-white/10 text-white p-2 rounded-full backdrop-blur-lg hover:bg-white/20 transition z-50"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={20} />
        </button>
      )}

      {/* Fixed Footer */}
      <footer className="fixed bottom-0 w-full bg-transparent backdrop-blur-none shadow-none border-none text-gray-300 py-4">
        <section className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Center Text */}
          <div className="w-full text-sm text-center md:text-base">
            © {new Date().getFullYear()} Swapnil Sanap. All rights reserved.
          </div>

          {/* Right: Socials */}
          <div className="absolute right-6 bottom-4 flex space-x-5 text-xl">
            <Link href="https://github.com/Swapnilsanap7" target="_blank" aria-label="GitHub">
              <SiGithub className="hover:text-white transition" />
            </Link>
            <Link href="https://www.linkedin.com/in/swapnilsanap7/" target="_blank" aria-label="LinkedIn">
              <SiLinkedin className="hover:text-white transition" />
            </Link>
            <Link href="mailto:swapnilsanap7@gmail.com" aria-label="Email">
              <SiGmail className="hover:text-white transition" />
            </Link>
          </div>
        </section>
      </footer>
    </>
  );
}
