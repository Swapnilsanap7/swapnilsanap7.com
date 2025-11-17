'use client';

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Caveat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

gsap.registerPlugin(ScrollToPlugin);

const caveat = Caveat({ subsets: ['latin'], weight: '700' });

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  // Load saved theme or system preference
  useEffect(() => {
    const saved = localStorage.theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (saved === 'dark' || (!saved && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const newTheme = html.classList.contains('dark') ? 'light' : 'dark';
    html.classList.toggle('dark');
    localStorage.theme = newTheme;
    setIsDark(newTheme === 'dark');
  };

  const handleSmoothScroll = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      // Use GSAP scrollTo to work with ScrollSmoother
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: element,
          offsetY: 80 // Account for navbar height
        },
        ease: "power2.inOut"
      });
    }
  };

  return (
    <nav className="top-0 w-full z-50 bg-transparent">
      <section className="py-2 px-8 flex justify-center items-center relative gap-4">
        {/* Main Navigation Capsule */}
        <div className="bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/30 dark:border-gray-600/30 rounded-full px-8 py-4 shadow-lg flex items-center justify-between w-full max-w-4xl">
          
          {/* Left: Logo (stuck to left border) */}
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/assets/favicons/main-logo.svg" 
              alt="Logo" 
              width={40} 
              height={40} 
              priority 
              className={`transition-all duration-300 ${isDark ? 'filter invert brightness-0 contrast-100' : 'filter-none'}`}
            />
            <span className={`${caveat.className} text-3xl text-gray-900 dark:text-white font-bold`}>Swapnil Sanap</span>
          </Link>

          {/* Right: Navigation Links (stuck to right border) */}
          <div className="flex items-center">
            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-6">
              <Link href="#about" className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium" onClick={(e) => handleSmoothScroll(e, 'about')}>About</Link>
              <Link href="#skills" className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium" onClick={(e) => handleSmoothScroll(e, 'skills')}>Skills</Link>
              <Link href="#project" className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium" onClick={(e) => handleSmoothScroll(e, 'project')}>Projects</Link>
              <Link href="#contact" className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium" onClick={(e) => handleSmoothScroll(e, 'contact')}>Contact</Link>
            </div>

            {/* Hamburger (Mobile) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-900 dark:text-white text-xl focus:outline-none hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-white/20 dark:hover:bg-black/20"
              aria-label="Toggle Menu"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Theme Toggle Capsule */}
        <button
          onClick={toggleTheme}
          className="bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/30 dark:border-gray-600/30 rounded-full p-4 text-gray-900 dark:text-white text-xl hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 shadow-lg"
          aria-label="Toggle Dark Mode"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </section>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-md flex flex-col items-start justify-center px-8 space-y-6 md:hidden transition-all duration-300">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-gray-900 dark:text-white text-3xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label="Close Menu"
          >
            ✕
          </button>

          {['about', 'skills', 'project', 'contact'].map((section, i) => (
            <Link
              key={section}
              href={`#${section}`}
              onClick={(e) => {
                handleSmoothScroll(e, section);
                setMenuOpen(false);
              }}
              className="text-gray-900 dark:text-white text-2xl font-medium transform transition-all translate-x-0 opacity-100 hover:text-blue-600 dark:hover:text-blue-400"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {section === 'project' ? 'Projects' : section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
