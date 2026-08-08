'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import SectionWrapper from '../../layout/SectionWrapper';

gsap.registerPlugin(ScrollTrigger);

// Top 5 skills data
const topSkills = [
  { name: 'React.js', level: 95, icon: '/icons/react.svg', projectLink: '#project' },
  { name: 'Next.js', level: 90, icon: '/icons/next.js.svg', projectLink: '#project' },
  { name: 'JavaScript (ES6+)', level: 93, icon: '/icons/js.svg', projectLink: '#project' },
  { name: 'React Native', level: 85, icon: '/icons/react.svg', projectLink: '#project' },
  { name: 'Node.js', level: 88, icon: '/icons/node.svg', projectLink: '#project' }
];

// Additional skills grouped by category
const additionalSkills = [
  {
    category: 'Frontend Basics',
    skills: ['HTML', 'CSS', 'Tailwind', 'Responsive UI', 'Accessibility']
  },
  {
    category: 'Backend & Databases',
    skills: ['REST APIs', 'Express.js', 'PostgreSQL', 'MySQL']
  },
  {
    category: 'Tools & Testing',
    skills: ['Git', 'GitHub', 'CI/CD', 'Selenium', 'Jest']
  },
  {
    category: 'AI/ML Basics',
    skills: ['Python', 'TensorFlow', 'OpenCV', 'Analytics', 'SEO']
  }
];

export default function Skills() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const skillCardsRef = useRef([]);
  const additionalSkillsRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: -20,
        duration: 0.6,
      });

      // Skill cards animation
      skillCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "easeOut",
            delay: index * 0.1
          });
        }
      });

      // Additional skills animation
      gsap.from(additionalSkillsRef.current, {
        scrollTrigger: {
          trigger: additionalSkillsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: 0.4,
      });

      // Removed progress bar animation
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle icon click (hidden feature)
  const handleIconClick = (skill) => {
    // Smooth scroll to projects section to show related work
    document.querySelector(skill.projectLink)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <SectionWrapper id="skills">
      <div ref={sectionRef} className="space-y-16">
        {/* Section Title */}
        <div 
          ref={titleRef}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--dark)] dark:text-white mb-4">
            Skills & Expertise
          </h2>
          <p className="text-[var(--dark)] dark:text-[var(--light)] text-lg max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>

        {/* Layer 1 - Top Skills */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 max-w-4xl mx-auto">
          {topSkills.map((skill, index) => (
            <button
              type="button"
              key={skill.name}
              ref={el => skillCardsRef.current[index] = el}
              className="group flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500"
              onClick={() => handleIconClick(skill)}
              title="Click to see related projects"
              aria-label={`View projects using ${skill.name}`}
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:drop-shadow-xl"
              >
                <Image 
                  src={skill.icon} 
                  alt={skill.name}
                  width={48}
                  height={48}
                  className={`w-12 h-12 object-contain transition-all duration-300 opacity-90 group-hover:opacity-100 ${
                    skill.name === 'Next.js' 
                      ? 'dark:filter dark:brightness-0 dark:invert' 
                      : ''
                  }`}
                />
              </div>
              <h3 className="text-[var(--dark)] dark:text-white font-medium text-lg tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">
                {skill.name}
              </h3>
            </button>
          ))}
        </div>

        {/* Layer 2 - Additional Skills */}
        <div 
          ref={additionalSkillsRef}
          className="space-y-8 pt-8"
        >
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-[var(--dark)] dark:text-white mb-2">Additional Skills</h3>
            <p className="text-gray-600 dark:text-gray-500">Other technologies and tools in my toolkit</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {additionalSkills.map((category, categoryIndex) => (
              <div
                key={category.category}
                className="space-y-3"
              >
                <h4 className="text-blue-600 dark:text-blue-400 font-medium text-sm uppercase tracking-wide">
                  {category.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-gray-200 dark:bg-gray-900/70 border border-gray-400 dark:border-gray-700 rounded-full 
                               text-gray-800 dark:text-gray-300 text-sm hover:border-blue-500/50 hover:bg-blue-500/10
                               hover:text-blue-600 dark:hover:text-blue-300 hover:shadow-sm hover:shadow-blue-500/20
                               hover:scale-105 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
