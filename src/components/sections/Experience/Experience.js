'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import SectionWrapper from '../../layout/SectionWrapper';
import { trackExperienceExpand } from '../../../lib/config/analytics';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (cardId) => {
    const isExpanding = expandedCard !== cardId;
    const targetCard = cardId;

    if (isExpanding) {
      trackExperienceExpand(cardId);
      // Close any currently expanded card first
      if (expandedCard) {
        const currentExpandedContent = document.querySelector(`[data-expand-id="${expandedCard}"]`);
        if (currentExpandedContent) {
          gsap.to(currentExpandedContent, {
            height: 0,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.inOut',
            onComplete: () => {
              setExpandedCard(targetCard);
            }
          });
        } else {
          setExpandedCard(targetCard);
        }
      } else {
        setExpandedCard(targetCard);
      }
    } else {
      // Close the current card
      const expandedContent = document.querySelector(`[data-expand-id="${cardId}"]`);
      if (expandedContent) {
        gsap.to(expandedContent, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete: () => {
            setExpandedCard(null);
          }
        });
      } else {
        setExpandedCard(null);
      }
    }
  };

  // Animation for expanding content
  useEffect(() => {
    if (expandedCard) {
      const expandedContent = document.querySelector(`[data-expand-id="${expandedCard}"]`);
      if (expandedContent) {
        // Set initial state
        gsap.set(expandedContent, { height: 'auto', opacity: 0 });
        const height = expandedContent.offsetHeight;
        gsap.set(expandedContent, { height: 0 });

        // Animate to full height
        gsap.to(expandedContent, {
          height: height,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          onComplete: () => {
            gsap.set(expandedContent, { height: 'auto' });
          }
        });

        // Animate child elements
        const childElements = expandedContent.querySelectorAll('.expand-child');
        gsap.from(childElements, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.2
        });
      }
    }
  }, [expandedCard]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the timeline items
      const items = timelineRef.current?.querySelectorAll('.timeline-item');
      if (items) {
        items.forEach((item, index) => {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            x: index % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            delay: index * 0.2,
          });
        });
      }

      // Animate the wavy connectors
      const connectors = timelineRef.current?.querySelectorAll('.wavy-connector');
      if (connectors) {
        connectors.forEach((connector, index) => {
          gsap.from(connector, {
            scrollTrigger: {
              trigger: connector,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 0.8,
            ease: 'power2.out',
            delay: (index + 1) * 0.3,
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      id="experience"
      className="py-24 relative overflow-hidden"
    >
      {/* Section Title */}
      <div className="relative z-10 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--dark)] dark:text-white drop-shadow-sm">
          Experience & Education
        </h2>
        <p className="text-[var(--dark)] dark:text-[var(--light)] text-lg mt-4">
          My journey through academics and professional development
        </p>
      </div>

      {/* Timeline Container */}
      <div ref={containerRef} className="relative max-w-6xl mx-auto">
        <div ref={timelineRef} className="relative">

          {/* Desktop Layout */}
          <div className="hidden md:block">

            {/* DXC Technology - Left Aligned */}
            <div className="timeline-item flex justify-start mb-8">
              <div className="w-1/2 pl-12">
                <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-indigo-500/20 hover:border-indigo-300/30 dark:hover:border-indigo-500/30 transform hover:scale-[1.02]"
                  onClick={() => toggleExpand('dxc')}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full dark:bg-white bg-white p-2 shadow-md relative transition-transform duration-300 hover:scale-110 flex items-center justify-center">
                      <Image
                        src="/logo/DXC/DXC-Veritcal-Tagline-Full-Color-Dark.png"
                        alt="DXC Logo"
                        width={36}
                        height={36}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[var(--dark)] dark:text-white">
                        Analyst I Software Engineering
                      </h3>
                      <p className="text-indigo-600 dark:text-indigo-400 font-medium">June 2026 – Present</p>
                    </div>
                    <div className={`text-indigo-600 dark:text-indigo-400 transition-all duration-500 ease-out ${expandedCard === 'dxc' ? 'rotate-180 scale-110' : 'hover:scale-110'}`}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  <p className="text-[var(--dark)] dark:text-[var(--light)] mb-3">
                    DXC Technology
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm transition-all duration-200 hover:scale-105">
                      Python Development
                    </span>
                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm transition-all duration-200 hover:scale-105">
                      AI & Machine Learning
                    </span>
                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm transition-all duration-200 hover:scale-105">
                      Software Engineering
                    </span>
                  </div>

                  {/* Expanded Content */}
                  {expandedCard === 'dxc' && (
                    <div className="border-t border-white/20 dark:border-gray-600 pt-4 mt-4 overflow-hidden" data-expand-id="dxc">
                      <div className="space-y-4">
                        <div className="expand-child">
                          <h4 className="font-semibold text-[var(--dark)] dark:text-white mb-2">Key Focus Areas</h4>
                          <ul className="space-y-1 text-sm text-[var(--dark)] dark:text-[var(--light)]">
                            <li className="p-2 rounded transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:translate-x-1">• Designing and implementing scalable Python-based microservices and AI pipelines.</li>
                            <li className="p-2 rounded transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:translate-x-1">• Developing and deploying Machine Learning algorithms and LLM (Large Language Model) integrations.</li>
                            <li className="p-2 rounded transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:translate-x-1">• Optimizing data processing workflows, pipeline efficiency, and model inference performance.</li>
                          </ul>
                        </div>

                        <div className="expand-child">
                          <h4 className="font-semibold text-[var(--dark)] dark:text-white mb-2">Technologies & Tools</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm transition-all duration-200 hover:bg-indigo-100 dark:hover:bg-indigo-800 hover:scale-105">Python</span>
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm transition-all duration-200 hover:bg-indigo-100 dark:hover:bg-indigo-800 hover:scale-105">PyTorch / TensorFlow</span>
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm transition-all duration-200 hover:bg-indigo-100 dark:hover:bg-indigo-800 hover:scale-105">FastAPI / Flask</span>
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm transition-all duration-200 hover:bg-indigo-100 dark:hover:bg-indigo-800 hover:scale-105">OpenAI / Hugging Face</span>
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm transition-all duration-200 hover:bg-indigo-100 dark:hover:bg-indigo-800 hover:scale-105">Docker</span>
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm transition-all duration-200 hover:bg-indigo-100 dark:hover:bg-indigo-800 hover:scale-105">Git & CI/CD</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Wavy Connector 0 */}
            <div className="wavy-connector flex justify-center mb-8">
              <svg width="400" height="40" viewBox="0 0 400 40" className="text-blue-400/60">
                <path
                  d="M0,20 Q100,35 200,20 T400,20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                <circle cx="200" cy="20" r="4" fill="currentColor" />
              </svg>
            </div>

            {/* Internship - Right Aligned */}
            <div className="timeline-item flex justify-end mb-8">
              <div className="w-1/2 pr-12">
                <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-purple-500/20 hover:border-purple-300/30 dark:hover:border-purple-500/30 transform hover:scale-[1.02]"
                  onClick={() => toggleExpand('internship')}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full dark:bg-transparent bg-white p-2 shadow-md relative transition-transform duration-300 hover:scale-110">
                      <Image
                        src="/logo/UIS Dome Logo/UISLegacyDome_UISBlue.png"
                        alt="UIS Logo"
                        width={32}
                        height={32}
                        className="w-full h-full object-contain dark:hidden"
                      />
                      <Image
                        src="/logo/UIS Dome Logo/UISLegacyDome_White.png"
                        alt="UIS Logo"
                        width={32}
                        height={32}
                        className="w-full h-full object-contain hidden dark:block"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[var(--dark)] dark:text-white">
                        Junior Web Specialist Intern
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">2023 – 2024</p>
                    </div>
                    <div className={`text-blue-600 dark:text-blue-400 transition-all duration-500 ease-out ${expandedCard === 'internship' ? 'rotate-180 scale-110' : 'hover:scale-110'}`}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  <p className="text-[var(--dark)] dark:text-[var(--light)] mb-3">
                    University of Illinois Springfield
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm transition-all duration-200 hover:scale-105">
                      React
                    </span>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm transition-all duration-200 hover:scale-105">
                      Node.js
                    </span>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm transition-all duration-200 hover:scale-105">
                      React Native
                    </span>
                  </div>

                  {/* Expanded Content */}
                  {expandedCard === 'internship' && (
                    <div className="border-t border-white/20 dark:border-gray-600 pt-4 mt-4 overflow-hidden" data-expand-id="internship">
                      <div className="space-y-4">
                        <div className="expand-child">
                          <h4 className="font-semibold text-[var(--dark)] dark:text-white mb-2">Key Responsibilities</h4>
                          <ul className="space-y-1 text-sm text-[var(--dark)] dark:text-[var(--light)]">
                            <li className="p-2 rounded transition-all duration-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:translate-x-1">• Built interactive front-end components using React.js</li>
                            <li className="p-2 rounded transition-all duration-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:translate-x-1">• Improved accessibility and mobile responsiveness</li>
                            <li className="p-2 rounded transition-all duration-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:translate-x-1">• Developed backend modules with Node.js + Express</li>
                            <li className="p-2 rounded transition-all duration-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:translate-x-1">• Enhanced UIS Mobile App using React Native</li>
                            <li className="p-2 rounded transition-all duration-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:translate-x-1">• Integrated REST APIs for dynamic content</li>
                            <li className="p-2 rounded transition-all duration-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:translate-x-1">• Implemented automated tests with Selenium and Jest</li>
                          </ul>
                        </div>

                        <div className="expand-child">
                          <h4 className="font-semibold text-[var(--dark)] dark:text-white mb-2">Key Projects</h4>
                          <div className="space-y-2">
                            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg transition-all duration-200 hover:bg-purple-100 dark:hover:bg-purple-900/30 transform hover:translateX-2">
                              <p className="font-medium text-purple-800 dark:text-purple-300">UIS Mobile App Optimization</p>
                              <p className="text-sm text-[var(--dark)] dark:text-[var(--light)]">Enhanced performance and user experience using React Native</p>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg transition-all duration-200 hover:bg-purple-100 dark:hover:bg-purple-900/30 transform hover:translateX-2">
                              <p className="font-medium text-purple-800 dark:text-purple-300">University Website Components</p>
                              <p className="text-sm text-[var(--dark)] dark:text-[var(--light)]">Interactive React.js components for university web platform</p>
                            </div>
                          </div>
                        </div>

                        <div className="expand-child">
                          <h4 className="font-semibold text-[var(--dark)] dark:text-white mb-2">Achievements & Impact</h4>
                          <div className="grid grid-cols-1 gap-2">
                            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded transition-all duration-200 hover:bg-green-100 dark:hover:bg-green-900/30 hover:scale-105">
                              <span className="text-green-700 dark:text-green-300 font-medium">20% increase</span>
                              <span className="text-sm text-[var(--dark)] dark:text-[var(--light)]"> in data availability through API integration</span>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded transition-all duration-200 hover:bg-green-100 dark:hover:bg-green-900/30 hover:scale-105">
                              <span className="text-green-700 dark:text-green-300 font-medium">30% reduction</span>
                              <span className="text-sm text-[var(--dark)] dark:text-[var(--light)]"> in post-deployment bugs through testing</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Wavy Connector 1 */}
            <div className="wavy-connector flex justify-center mb-8">
              <svg width="400" height="40" viewBox="0 0 400 40" className="text-blue-400/60">
                <path
                  d="M0,20 Q100,5 200,20 T400,20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                <circle cx="200" cy="20" r="4" fill="currentColor" />
              </svg>
            </div>

            {/* MSCS - Left Aligned */}
            <div className="timeline-item flex justify-start mb-8">
              <div className="w-1/2 pl-12">
                <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-blue-500/20 hover:border-blue-300/30 dark:hover:border-blue-500/30 transform hover:scale-[1.02]"
                  onClick={() => toggleExpand('mscs')}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full dark:bg-transparent bg-white p-2 shadow-md relative transition-transform duration-300 hover:scale-110">
                      <Image
                        src="/logo/UIS Dome Logo/UISLegacyDome_UISBlue.png"
                        alt="UIS Logo"
                        width={32}
                        height={32}
                        className="w-full h-full object-contain dark:hidden"
                      />
                      <Image
                        src="/logo/UIS Dome Logo/UISLegacyDome_White.png"
                        alt="UIS Logo"
                        width={32}
                        height={32}
                        className="w-full h-full object-contain hidden dark:block"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[var(--dark)] dark:text-white">
                        Master of Science in Computer Science
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">2022 – 2024</p>
                    </div>
                    <div className={`text-blue-600 dark:text-blue-400 transition-all duration-500 ease-out ${expandedCard === 'mscs' ? 'rotate-180 scale-110' : 'hover:scale-110'}`}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  <p className="text-[var(--dark)] dark:text-[var(--light)] mb-3">
                    University of Illinois Springfield
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm transition-all duration-200 hover:scale-105">
                      Web Development
                    </span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm transition-all duration-200 hover:scale-105">
                      Machine Learning
                    </span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm transition-all duration-200 hover:scale-105">
                      Data Visualization
                    </span>
                  </div>

                  {/* Expanded Content */}
                  {expandedCard === 'mscs' && (
                    <div className="border-t border-white/20 dark:border-gray-600 pt-4 mt-4 overflow-hidden" data-expand-id="mscs">
                      <div className="space-y-4">
                        <div className="expand-child">
                          <h4 className="font-semibold text-[var(--dark)] dark:text-white mb-2">Notable Projects</h4>
                          <div className="space-y-2">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-900/30 transform hover:translateX-2">
                              <p className="font-medium text-blue-800 dark:text-blue-300">SentinelVision - Real-Time Face Recognition</p>
                              <p className="text-sm text-[var(--dark)] dark:text-[var(--light)]">React dashboard with real-time feeds and efficient rendering</p>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-900/30 transform hover:translateX-2">
                              <p className="font-medium text-blue-800 dark:text-blue-300">SplitExpense - Expense Sharing App</p>
                              <p className="text-sm text-[var(--dark)] dark:text-[var(--light)]">Full-stack web & mobile app with React/React Native, Redux, PostgreSQL</p>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-900/30 transform hover:translateX-2">
                              <p className="font-medium text-blue-800 dark:text-blue-300">Smart-Restaurant Project</p>
                              <p className="text-sm text-[var(--dark)] dark:text-[var(--light)]">Next.js, Socket.io, JWT authentication, MongoDB + PostgreSQL</p>
                            </div>
                          </div>
                        </div>

                        <div className="expand-child">
                          <h4 className="font-semibold text-[var(--dark)] dark:text-white mb-2">Technologies Mastered</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-800 hover:scale-105">React.js</span>
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-800 hover:scale-105">Next.js</span>
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-800 hover:scale-105">PostgreSQL</span>
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-800 hover:scale-105">TensorFlow</span>
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-800 hover:scale-105">OpenCV</span>
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-800 hover:scale-105">REST APIs</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Wavy Connector 2 */}
            <div className="wavy-connector flex justify-center mb-8">
              <svg width="400" height="40" viewBox="0 0 400 40" className="text-blue-400/60">
                <path
                  d="M0,20 Q100,35 200,20 T400,20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                <circle cx="200" cy="20" r="4" fill="currentColor" />
              </svg>
            </div>

            {/* BSCS - Right Aligned */}
            <div className="timeline-item flex justify-end">
              <div className="w-1/2 pr-12">
                <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-green-500/20 hover:border-green-300/30 dark:hover:border-green-500/30 transform hover:scale-[1.02]"
                  onClick={() => toggleExpand('bscs')}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full dark:bg-white bg-white p-2 shadow-md relative transition-transform duration-300 hover:scale-110">
                      <Image
                        src="/logo/piemr.svg"
                        alt="PIEMR Logo"
                        width={32}
                        height={32}
                        className="w-full h-full object-contain dark:hidden"
                      />
                      <Image
                        src="/logo/piemr.svg"
                        alt="PIEMR Logo"
                        width={32}
                        height={32}
                        className="w-full h-full object-contain hidden dark:block"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[var(--dark)] dark:text-white">
                        Bachelor of Science in Computer Science
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">2018 – 2022</p>
                    </div>
                    <div className={`text-blue-600 dark:text-blue-400 transition-all duration-500 ease-out ${expandedCard === 'bscs' ? 'rotate-180 scale-110' : 'hover:scale-110'}`}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  <p className="text-[var(--dark)] dark:text-[var(--light)] mb-3">
                    Prestige Institute of Engineering, Management and Research, Indore
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm transition-all duration-200 hover:scale-105">
                      Programming Fundamentals
                    </span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm transition-all duration-200 hover:scale-105">
                      Software Engineering
                    </span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm transition-all duration-200 hover:scale-105">
                      Database Systems
                    </span>
                  </div>

                  {/* Expanded Content */}
                  {expandedCard === 'bscs' && (
                    <div className="border-t border-white/20 dark:border-gray-600 pt-4 mt-4 overflow-hidden" data-expand-id="bscs">
                      <div className="space-y-4">
                        <div className="expand-child">
                          <h4 className="font-semibold text-[var(--dark)] dark:text-white mb-2">Foundation Skills</h4>
                          <div className="text-sm text-[var(--dark)] dark:text-[var(--light)] mb-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg transition-all duration-200 hover:bg-green-100 dark:hover:bg-green-900/30">
                            Built strong foundation in computer science principles, algorithms, and software development practices.
                          </div>
                        </div>

                        <div className="expand-child">
                          <h4 className="font-semibold text-[var(--dark)] dark:text-white mb-2">Technologies Learned</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm transition-all duration-200 hover:bg-green-100 dark:hover:bg-green-800 hover:scale-105">JavaScript</span>
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm transition-all duration-200 hover:bg-green-100 dark:hover:bg-green-800 hover:scale-105">HTML/CSS</span>
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm transition-all duration-200 hover:bg-green-100 dark:hover:bg-green-800 hover:scale-105">Python</span>
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm transition-all duration-200 hover:bg-green-100 dark:hover:bg-green-800 hover:scale-105">MySQL</span>
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm transition-all duration-200 hover:bg-green-100 dark:hover:bg-green-800 hover:scale-105">Node.js</span>
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm transition-all duration-200 hover:bg-green-100 dark:hover:bg-green-800 hover:scale-105">PostgreSQL</span>
                          </div>
                        </div>

                        <div className="expand-child">
                          <h4 className="font-semibold text-[var(--dark)] dark:text-white mb-2">Academic Excellence</h4>
                          <p className="text-sm text-[var(--dark)] dark:text-[var(--light)] p-3 bg-green-50 dark:bg-green-900/20 rounded-lg transition-all duration-200 hover:bg-green-100 dark:hover:bg-green-900/30">
                            RGPV University affiliated program focusing on theoretical foundations and practical applications in computer science.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Mobile Layout - Simple Vertical */}
          <div className="md:hidden space-y-6">

            {/* DXC Technology */}
            <div className="timeline-item">
              <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full dark:bg-white bg-white p-2 shadow-md relative flex items-center justify-center">
                    <Image
                      src="/logo/DXC/DXC-Veritcal-Tagline-Full-Color-Dark.png"
                      alt="DXC Logo"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--dark)] dark:text-white">
                      Analyst I Software Engineering
                    </h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium">June 2026 – Present</p>
                  </div>
                </div>
                <p className="text-[var(--dark)] dark:text-[var(--light)] mb-3">DXC Technology</p>
              </div>
            </div>

            {/* Internship First on Mobile */}
            <div className="timeline-item">
              <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full dark:bg-transparent bg-white p-2 shadow-md relative">
                    <Image
                      src="/logo/UIS Dome Logo/UISLegacyDome_UISBlue.png"
                      alt="UIS Logo"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain dark:hidden"
                    />
                    <Image
                      src="/logo/UIS Dome Logo/UISLegacyDome_White.png"
                      alt="UIS Logo"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain hidden dark:block"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--dark)] dark:text-white">
                      Junior Web Specialist Intern
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">2023 – 2024</p>
                  </div>
                </div>
                <p className="text-[var(--dark)] dark:text-[var(--light)] mb-3">University of Illinois Springfield</p>
              </div>
            </div>

            {/* MSCS */}
            <div className="timeline-item">
              <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full dark:bg-transparent bg-white p-2 shadow-md relative">
                    <Image
                      src="/logo/UIS Dome Logo/UISLegacyDome_UISBlue.png"
                      alt="UIS Logo"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain dark:hidden"
                    />
                    <Image
                      src="/logo/UIS Dome Logo/UISLegacyDome_White.png"
                      alt="UIS Logo"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain hidden dark:block"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--dark)] dark:text-white">
                      Master of Science in CS
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">2022 – 2024</p>
                  </div>
                </div>
                <p className="text-[var(--dark)] dark:text-[var(--light)] mb-3">University of Illinois Springfield</p>
              </div>
            </div>

            {/* BSCS */}
            <div className="timeline-item">
              <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full dark:bg-transparent bg-white p-2 shadow-md relative">
                    <Image
                      src="/logo/piemr.svg"
                      alt="PIEMR Logo"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain dark:hidden"
                    />
                    <Image
                      src="/logo/piemr.svg"
                      alt="PIEMR Logo"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain hidden dark:block"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--dark)] dark:text-white">
                      Bachelor of Science in CS
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">2018 – 2022</p>
                  </div>
                </div>
                <p className="text-[var(--dark)] dark:text-[var(--light)] mb-3">Prestige Institute of Engineering, Management and Research</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </SectionWrapper>
  );
}
