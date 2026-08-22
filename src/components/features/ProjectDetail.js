'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  trackGithubClick,
  trackLiveDemoClick,
  trackProjectCodeClick,
  trackProjectView,
} from '../../lib/config/analytics';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetail({ project }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const modalOpenerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation refs
  const backButtonRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    trackProjectView(project.title);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Back button animation
      gsap.from(backButtonRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: 'power2.out',
      });

      // Hero section animations
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.1,
        ease: 'power2.out',
      });

      gsap.from(descriptionRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.2,
        ease: 'power2.out',
      });

      gsap.from(buttonsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.3,
        ease: 'power2.out',
      });

      gsap.from(imageRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.6,
        delay: 0.2,
        ease: 'power2.out',
      });

      // ScrollTrigger animations for sections
      gsap.utils.toArray('.scroll-reveal').forEach((element) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 50,
          duration: 0.6,
          ease: 'power2.out',
        });
      });

      // Feature cards stagger animation
      gsap.utils.toArray('.feature-card').forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 30,
          duration: 0.5,
          delay: index * 0.1,
          ease: 'power2.out',
        });
      });

      // Tech stack items stagger
      gsap.utils.toArray('.tech-item').forEach((item, index) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          delay: index * 0.1,
          ease: 'power2.out',
        });
      });

      // Gallery items
      gsap.utils.toArray('.gallery-item').forEach((item, index) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          delay: index * 0.1,
          ease: 'power2.out',
        });
      });
    });

    return () => ctx.revert();
  }, [project.title]);

  const openModal = (index, event) => {
    modalOpenerRef.current = event.currentTarget;
    setSelectedImage(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = '';
    requestAnimationFrame(() => modalOpenerRef.current?.focus());
  }, []);

  const nextImage = useCallback(() => {
    if (!project.gallery) return;

    setSelectedImage((current) => {
      if (current === null) return 0;
      return (current + 1) % project.gallery.length;
    });
  }, [project.gallery]);

  const prevImage = useCallback(() => {
    if (!project.gallery) return;

    setSelectedImage((current) => {
      if (current === null) return 0;

      return current === 0
        ? project.gallery.length - 1
        : current - 1;
    });
  }, [project.gallery]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }

      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeModal, isModalOpen, nextImage, prevImage]);

  useEffect(() => {
    if (!isModalOpen) return;

    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const demoHostname = (() => {
    if (!project.liveDemoLink) return `${project.title.toLowerCase().replace(/\s+/g, '')}.com`;
    try {
      return new URL(project.liveDemoLink).hostname;
    } catch {
      return project.liveDemoLink.replace(/^https?:\/\//, '').split('/')[0] || `${project.title.toLowerCase().replace(/\s+/g, '')}.com`;
    }
  })();

  return (
    <div className="min-h-screen">
      {/* Fixed Back Navigation */}
      <div
        ref={backButtonRef}
        className="fixed top-6 left-6 z-40"
      >
        <Link
          href="/#project"
          className="inline-flex items-center gap-2 bg-[var(--light)]/95 dark:bg-black/80 backdrop-blur-md hover:bg-[var(--light)] dark:hover:bg-black/90 px-4 py-2.5 rounded-full border border-[var(--dark)]/10 dark:border-white/20 text-[var(--dark)]/70 dark:text-white/80 hover:text-[var(--dark)] dark:hover:text-white text-sm font-medium transition-all duration-300 group shadow-lg hover:shadow-xl"
        >
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="min-h-[calc(100vh-6rem)] pt-3 flex items-center justify-center">
        <div className="flex items-center justify-center w-full mx-auto max-w-7xl px-6 md:px-16">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center w-full">
            {/* LEFT SIDE - Content Section */}
            <div
              ref={heroRef}
              className="space-y-8 md:space-y-10"
            >
              {/* 1. Main Title */}
              <h1 
                ref={titleRef}
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[var(--dark)] dark:text-white"
              >
                {project.title}
              </h1>
              
              {/* 2. Two-Line Description */}
              <div 
                ref={descriptionRef}
                className="space-y-4"
              >
                {/* Subtitle / Primary tagline */}
                <p className="text-xl md:text-2xl text-[var(--dark)]/80 dark:text-white/80 leading-relaxed font-medium">
                  {project.hero?.tagline || project.description}
                </p>
                {/* Supporting description */}
                <p className="text-lg text-[var(--dark)]/60 dark:text-white/60 leading-relaxed max-w-lg">
                  {project.fullDescription ? `${project.fullDescription.split('.')[0]}.` : project.description}
                </p>
              </div>

              {/* 3. CTA Buttons */}
              <div 
                ref={buttonsRef}
                className="flex flex-wrap gap-4 pt-6"
              >
                <Link
                  href={`/access?project=${project.slug}`}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-blue-500/25"
                >
                  Request Demo Access
                </Link>
                {/* Live Demo Button - Blue gradient */}
                {project.liveDemoLink && (
                  <Link
                    href={project.liveDemoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackLiveDemoClick(project.title, 'detail_hero')}
                    className="bg-transparent border-2 border-[var(--dark)]/20 dark:border-white/20 hover:bg-[var(--dark)]/10 dark:hover:bg-white/10 text-[var(--dark)] dark:text-white px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg backdrop-blur-sm"
                  >
                    Live Demo
                  </Link>
                )}
                
                {/* GitHub Repo Button - Transparent with border */}
                {project.githubLink && (
                  <Link
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackGithubClick('project');
                      trackProjectCodeClick(project.title, 'detail_hero');
                    }}
                    className="bg-transparent border-2 border-[var(--dark)]/20 dark:border-white/20 hover:bg-[var(--dark)]/10 dark:hover:bg-white/10 text-[var(--dark)] dark:text-white px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg backdrop-blur-sm"
                  >
                    GitHub Repo
                  </Link>
                )}
              </div>
            </div>

            {/* RIGHT SIDE - Visual Section */}
            <div
              ref={imageRef}
              className="relative flex justify-center items-center"
            >
              <div className="relative">
                {/* Device Mockup or Screenshot */}
                {project.hero?.mainImage || project.imageSrc ? (
                  project.displayType === 'browser' ? (
                    // Browser/Laptop Mockup
                    <div className="relative w-[300px] h-[188px] sm:w-[400px] sm:h-[250px] md:w-[500px] md:h-[312px] lg:w-[580px] lg:h-[362px]">
                      {/* Laptop frame */}
                      <div className="relative w-full h-full bg-gradient-to-b from-gray-700 to-gray-800 rounded-2xl p-2 shadow-2xl">
                        {/* Screen area */}
                        <div className="relative w-full h-full bg-black rounded-xl overflow-hidden border-2 border-gray-600">
                          {/* Browser window header */}
                          <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border-b border-gray-600">
                            <div className="flex gap-2">
                              <span className="w-3 h-3 rounded-full bg-red-500"></span>
                              <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                              <span className="w-3 h-3 rounded-full bg-green-500"></span>
                            </div>
                            <div className="flex-1 mx-4">
                              <div className="bg-gray-700 rounded-md px-3 py-1 text-xs text-gray-300 text-center truncate">
                                {demoHostname}
                              </div>
                            </div>
                          </div>
                          
                          {/* Website content */}
                          <div className="relative w-full h-[calc(100%-40px)]">
                            <Image
                              src={project.hero?.mainImage || project.imageSrc}
                              alt={`${project.title} preview`}
                              fill
                              className="object-cover object-top"
                              priority
                            />
                            
                            {/* Subtle overlay */}
                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Laptop base/keyboard area */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[calc(100%+40px)] h-6 bg-gradient-to-b from-gray-600 to-gray-700 rounded-b-3xl"></div>
                      
                      {/* Drop shadow for depth */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-blue-500/15 rounded-2xl -z-10 transform translate-y-6 blur-2xl"></div>
                    </div>
                  ) : (
                    // Mobile Mockup (default)
                    <div className="relative w-72 h-[432px] sm:w-80 sm:h-[480px] md:w-96 md:h-[580px] lg:w-[420px] lg:h-[640px]">
                      {/* Mobile-style mockup frame */}
                      <div className="relative w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl">
                        {/* Screen area */}
                        <div className="relative w-full h-full bg-black rounded-[2.5rem] overflow-hidden">
                          <Image
                            src={project.hero?.mainImage || project.imageSrc}
                            alt={`${project.title} preview`}
                            fill
                            className="object-cover rounded-[2.5rem]"
                            priority
                          />
                          
                          {/* Faded bottom shadow */}
                          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                        
                        {/* Mobile device details */}
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full"></div>
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-700 rounded-full"></div>
                      </div>
                      
                      {/* Drop shadow for depth */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-blue-500/20 rounded-[3rem] -z-10 transform translate-y-8 blur-2xl"></div>
                    </div>
                  )
                ) : (
                  // Fallback
                  <div className="w-72 h-[432px] sm:w-80 sm:h-[480px] md:w-96 md:h-[580px] lg:w-[420px] lg:h-[640px] relative">
                    <div className="relative w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl">
                      <div className="relative w-full h-full bg-black rounded-[2.5rem] flex items-center justify-center">
                        <div className="text-6xl opacity-20">📱</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="scroll-reveal text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--dark)] dark:text-white">Project Overview</h2>
            <p className="text-lg md:text-xl text-[var(--dark)]/80 dark:text-white/80 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      {project.features && (
        <section className="py-20 px-6 md:px-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="scroll-reveal text-3xl md:text-4xl font-bold text-center mb-16 text-[var(--dark)] dark:text-white">
              Key Features
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.features.map((feature) => (
                <div
                  key={feature.title}
                  className="feature-card bg-[var(--dark)]/5 dark:bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-[var(--dark)]/10 dark:border-white/10 hover:bg-[var(--dark)]/10 dark:hover:bg-white/10 hover:border-[var(--dark)]/20 dark:hover:border-white/20 transition-all duration-300"
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--dark)] dark:text-white">{feature.title}</h3>
                  <p className="text-sm text-[var(--dark)]/70 dark:text-white/70">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tech Stack */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="scroll-reveal text-3xl md:text-4xl font-bold mb-16 text-[var(--dark)] dark:text-white">
            Tech Stack
          </h2>

          <div className="flex flex-wrap justify-center gap-6">
            {(project.techStackDetailed || project.techStack.map(tech => ({ name: tech }))).map((tech) => (
              <div
                key={tech.name}
                className="tech-item flex items-center gap-3 bg-[var(--dark)]/10 dark:bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-[var(--dark)]/20 dark:border-white/20 hover:bg-[var(--dark)]/20 dark:hover:bg-white/20 transition-all duration-300"
              >
                {tech.icon && !tech.iconDark && (
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
                {tech.icon && tech.iconDark && (
                  <>
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      width={24}
                      height={24}
                      className="object-contain dark:hidden"
                    />
                    <Image
                      src={tech.iconDark}
                      alt={tech.name}
                      width={24}
                      height={24}
                      className="object-contain hidden dark:block"
                    />
                  </>
                )}
                <span className="font-medium text-[var(--dark)] dark:text-white">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-20 px-6 md:px-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="scroll-reveal text-3xl md:text-4xl font-bold mb-16 text-center text-[var(--dark)] dark:text-white">
              Image gallery
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((image, index) => (
                <button
                  type="button"
                  key={index}
                  className="gallery-item relative aspect-video w-full rounded-xl overflow-hidden shadow-xl cursor-pointer hover:shadow-2xl transition-shadow duration-300 border border-[var(--dark)]/10 dark:border-white/10 focus-visible:ring-2 focus-visible:ring-blue-500"
                  onClick={(event) => openModal(index, event)}
                  aria-label={`Open ${project.title} screenshot ${index + 1} of ${project.gallery.length}`}
                >
                  <Image
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Challenges & Solutions */}
      {project.caseStudy && (
        <section className="py-20 px-6 md:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="scroll-reveal text-3xl md:text-4xl font-bold mb-16 text-center text-[var(--dark)] dark:text-white">
              Challenges & Solutions
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="scroll-reveal bg-red-500/10 backdrop-blur-sm p-8 rounded-xl border border-red-500/20">
                <h3 className="text-xl font-semibold mb-4 text-red-400">Challenge</h3>
                <p className="text-[var(--dark)]/80 dark:text-white/80 leading-relaxed">
                  {project.caseStudy.challenge}
                </p>
              </div>

              <div className="scroll-reveal bg-green-500/10 backdrop-blur-sm p-8 rounded-xl border border-green-500/20">
                <h3 className="text-xl font-semibold mb-4 text-green-400">Solution</h3>
                <p className="text-[var(--dark)]/80 dark:text-white/80 leading-relaxed">
                  {project.caseStudy.solution}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20 px-6 md:px-16 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="scroll-reveal">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[var(--dark)] dark:text-white">
              Interested in this project?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/access?project=${project.slug}`}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/25"
              >
                Request Demo Access
              </Link>
              {project.liveDemoLink && (
                <Link
                  href={project.liveDemoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackLiveDemoClick(project.title, 'detail_footer')}
                  className="bg-transparent border-2 border-[var(--dark)]/20 dark:border-white/20 hover:bg-[var(--dark)]/10 dark:hover:bg-white/10 text-[var(--dark)] dark:text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                >
                  View Live Demo
                </Link>
              )}
              {project.githubLink && (
                <Link
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackGithubClick('project');
                    trackProjectCodeClick(project.title, 'detail_footer');
                  }}
                  className="bg-transparent border-2 border-[var(--dark)]/20 dark:border-white/20 hover:bg-[var(--dark)]/10 dark:hover:bg-white/10 text-[var(--dark)] dark:text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                >
                  View Source Code
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {mounted && isModalOpen && selectedImage !== null && project.gallery && createPortal(
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} image gallery`}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={closeModal}
          style={{ opacity: 1 }}
        >
          {/* Modal Content Container */}
          <div
            className="relative flex items-center justify-center w-full h-full max-w-7xl max-h-full"
            onClick={(e) => e.stopPropagation()}
            style={{ opacity: 1, transform: 'scale(1)' }}
          >
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation Buttons */}
            {project.gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image Container */}
            <div className="relative flex items-center justify-center w-full h-full p-4">
              <div className="relative w-full max-w-5xl max-h-full rounded-2xl overflow-y-auto overflow-x-hidden shadow-2xl border border-[var(--dark)]/10 dark:border-white/10 bg-[var(--light)]/5 dark:bg-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.gallery[selectedImage]}
                  alt={`${project.title} screenshot ${selectedImage + 1}`}
                  className="w-full h-auto object-top"
                />
              </div>
            </div>

            {/* Image Counter */}
            {project.gallery.length > 1 && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 bg-black/60 text-white px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                <span className="text-sm font-medium">
                  {selectedImage + 1} / {project.gallery.length}
                </span>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
