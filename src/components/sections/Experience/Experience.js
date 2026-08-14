'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import SectionWrapper from '../../layout/SectionWrapper';
import { trackExperienceExpand } from '../../../lib/config/analytics';
import { EXPERIENCE_DATA } from '../../../lib/constants';

gsap.registerPlugin(ScrollTrigger);

const themeStyles = {
  indigo: {
    text: 'text-indigo-600 dark:text-indigo-400',
    tag: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
    shadow: 'hover:shadow-indigo-500/20',
    border: 'hover:border-indigo-300/30 dark:hover:border-indigo-500/30',
    detailText: 'text-indigo-800 dark:text-indigo-300',
    detailBg: 'bg-indigo-50 dark:bg-indigo-900/20',
    activeGlow: 'shadow-[0_0_25px_rgba(99,102,241,0.3)] border-indigo-400/50 dark:border-indigo-500/50 scale-[1.02]'
  },
  purple: {
    text: 'text-purple-600 dark:text-purple-400',
    tag: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
    shadow: 'hover:shadow-purple-500/20',
    border: 'hover:border-purple-300/30 dark:hover:border-purple-500/30',
    detailText: 'text-purple-800 dark:text-purple-300',
    detailBg: 'bg-purple-50 dark:bg-purple-900/20',
    activeGlow: 'shadow-[0_0_25px_rgba(168,85,247,0.3)] border-purple-400/50 dark:border-purple-500/50 scale-[1.02]'
  },
  blue: {
    text: 'text-blue-600 dark:text-blue-400',
    tag: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    shadow: 'hover:shadow-blue-500/20',
    border: 'hover:border-blue-300/30 dark:hover:border-blue-500/30',
    detailText: 'text-blue-800 dark:text-blue-300',
    detailBg: 'bg-blue-50 dark:bg-blue-900/20',
    activeGlow: 'shadow-[0_0_25px_rgba(59,130,246,0.3)] border-blue-400/50 dark:border-blue-500/50 scale-[1.02]'
  },
  green: {
    text: 'text-green-600 dark:text-green-400',
    tag: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    shadow: 'hover:shadow-green-500/20',
    border: 'hover:border-green-300/30 dark:hover:border-green-500/30',
    detailText: 'text-green-700 dark:text-green-300',
    detailBg: 'bg-green-50 dark:bg-green-900/20',
    activeGlow: 'shadow-[0_0_25px_rgba(34,197,94,0.3)] border-green-400/50 dark:border-green-500/50 scale-[1.02]'
  }
};

const renderSectionContent = (section, styles) => {
  switch (section.type) {
    case 'list':
      return (
        <ul className="space-y-1 text-sm text-[var(--dark)] dark:text-[var(--light)]">
          {section.items.map((bullet, k) => (
            <li key={k} className="p-2 rounded transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5 hover:translate-x-1">
              • {bullet}
            </li>
          ))}
        </ul>
      );
    case 'grid':
      return (
        <div className="grid grid-cols-2 gap-2">
          {section.items.map((item, k) => (
            <span key={k} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5 hover:scale-105 text-center">
              {item}
            </span>
          ))}
        </div>
      );
    case 'cards':
      return (
        <div className="space-y-2">
          {section.items.map((card, k) => (
            <div key={k} className={`${styles.detailBg} p-3 rounded-lg transition-all duration-200 hover:translate-x-2`}>
              <p className={`font-medium ${styles.detailText}`}>{card.name}</p>
              <p className="text-sm text-[var(--dark)] dark:text-[var(--light)]">{card.description}</p>
            </div>
          ))}
        </div>
      );
    case 'impact':
      return (
        <div className="grid grid-cols-1 gap-2">
          {section.items.map((impact, k) => (
            <div key={k} className="bg-green-50 dark:bg-green-900/20 p-2 rounded transition-all duration-200 hover:bg-green-100 dark:hover:bg-green-900/30 hover:scale-105">
              <span className="text-green-700 dark:text-green-300 font-medium">{impact.highlight}</span>
              <span className="text-sm text-[var(--dark)] dark:text-[var(--light)]">{impact.text}</span>
            </div>
          ))}
        </div>
      );
    case 'text_box':
    case 'text_box_alt':
      return (
        <div className={`text-sm text-[var(--dark)] dark:text-[var(--light)] p-3 ${styles.detailBg} rounded-lg transition-all duration-200 hover:scale-[1.01]`}>
          {section.text}
        </div>
      );
    default:
      return null;
  }
};

function ExperienceCard({ item, isExpanded, onToggle }) {
  const styles = themeStyles[item.themeColor] || themeStyles.indigo;
  const detailsId = `experience-details-${item.id}`;

  return (
    <article
      className={`bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-lg border transition-all duration-300 transform hover:scale-[1.02] ${isExpanded ? styles.activeGlow : `border-white/20 dark:border-gray-700/50 ${styles.shadow} ${styles.border}`}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={detailsId}
        className="w-full rounded-lg text-left focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 rounded-full p-2 shadow-md relative transition-transform duration-300 hover:scale-110 flex items-center justify-center ${typeof item.logoSrc === 'object' ? 'bg-white dark:bg-transparent' : 'bg-white'}`}>
          {typeof item.logoSrc === 'object' ? (
            <>
              <Image
                src={item.logoSrc.light}
                alt={`${item.company} Logo`}
                width={32}
                height={32}
                className="w-full h-full object-contain dark:hidden"
              />
              <Image
                src={item.logoSrc.dark}
                alt={`${item.company} Logo`}
                width={32}
                height={32}
                className="w-full h-full object-contain hidden dark:block"
              />
            </>
          ) : (
            <Image
              src={item.logoSrc}
              alt={`${item.company} Logo`}
              width={36}
              height={36}
              className="w-full h-full object-contain"
            />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-[var(--dark)] dark:text-white">
            {item.title}
          </h3>
          <p className={`${styles.text} font-medium`}>{item.duration}</p>
        </div>
        <div className={`${styles.text} transition-all duration-500 ease-out ${isExpanded ? 'rotate-180 scale-110' : 'hover:scale-110'}`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        </div>

        <p className="text-[var(--dark)] dark:text-[var(--light)] mb-3">
          {item.company}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1 ${styles.tag} rounded-full text-sm transition-all duration-200 hover:scale-105`}
            >
              {tag}
            </span>
          ))}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div
          id={detailsId}
          className="border-t border-white/20 dark:border-gray-600 pt-4 mt-4 overflow-hidden"
          data-expand-id={item.id}
        >
          <div className="space-y-4">
            {item.sections.map((section, idx) => (
              <div key={idx} className="expand-child">
                <h4 className="font-semibold text-[var(--dark)] dark:text-white mb-2">
                  {section.title}
                </h4>
                {renderSectionContent(section, styles)}
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export default function Experience() {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (cardId) => {
    const isExpanding = expandedCard !== cardId;
    const targetCard = cardId;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (isExpanding) trackExperienceExpand(cardId);
      setExpandedCard(isExpanding ? cardId : null);
      return;
    }

    if (isExpanding) {
      trackExperienceExpand(cardId);
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

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (expandedCard) {
      const expandedContent = document.querySelector(`[data-expand-id="${expandedCard}"]`);
      if (expandedContent) {
        gsap.set(expandedContent, { height: 'auto', opacity: 0 });
        const height = expandedContent.offsetHeight;
        gsap.set(expandedContent, { height: 0 });

        gsap.to(expandedContent, {
          height: height,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          onComplete: () => {
            gsap.set(expandedContent, { height: 'auto' });
          }
        });

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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const items = timelineRef.current?.querySelectorAll('.timeline-item');
      if (items) {
        items.forEach((item, index) => {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: (index % 4) * 0.15,
          });
        });
      }

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
            delay: (index + 1) * 0.2,
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
        <div ref={timelineRef} className="relative space-y-6 md:space-y-0">
          {EXPERIENCE_DATA.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={item.id} className="timeline-item">
                <div className={`flex w-full ${isEven ? 'md:justify-start' : 'md:justify-end'} md:mb-8`}>
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                    <ExperienceCard
                      item={item}
                      isExpanded={expandedCard === item.id}
                      onToggle={() => toggleExpand(item.id)}
                    />
                  </div>
                </div>

                {/* Wavy Connector on Desktop (except for last item) */}
                {index < EXPERIENCE_DATA.length - 1 && (
                  <div className="wavy-connector hidden md:flex justify-center mb-8">
                    <svg width="400" height="40" viewBox="0 0 400 40" className="text-blue-400/60">
                      <path
                        d={index % 2 === 0 ? "M0,20 Q100,35 200,20 T400,20" : "M0,20 Q100,5 200,20 T400,20"}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                      <circle cx="200" cy="20" r="4" fill="currentColor" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
