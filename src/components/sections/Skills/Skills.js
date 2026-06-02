'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import SectionWrapper from '../../layout/SectionWrapper';

gsap.registerPlugin(ScrollTrigger);

// Top 5 skills data
const topSkills = [
  { name: 'React.js', level: 95, icon: '/icons/react.svg', projectLink: '#projects' },
  { name: 'Next.js', level: 90, icon: '/icons/next.js.svg', projectLink: '#projects' },
  { name: 'JavaScript (ES6+)', level: 93, icon: '/icons/js.svg', projectLink: '#projects' },
  { name: 'React Native', level: 85, icon: '/icons/react.svg', projectLink: '#projects' },
  { name: 'Node.js', level: 88, icon: '/icons/node.svg', projectLink: '#projects' }
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

      // Animate skill bars after cards are visible
      setTimeout(() => {
        skillCardsRef.current.forEach((card, index) => {
          if (card) {
            const progressBar = card.querySelector('.skill-progress-bar');
            const level = topSkills[index % topSkills.length]?.level || 0;
            if (progressBar) {
              gsap.fromTo(progressBar, 
                { width: '0%' },
                { 
                  width: `${level}%`,
                  duration: 1.5,
                  delay: 0.3 + (index * 0.1),
                  ease: "easeOut"
                }
              );
            }
          }
        });
      }, 500);
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
        <div className="space-y-8">
          {/* Top 5 Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* First 4 skills in 2x2 grid */}
            {topSkills.slice(0, 4).map((skill, index) => (
              <div
                key={skill.name}
                ref={el => skillCardsRef.current[index] = el}
                className="group bg-white/10 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-300 dark:border-gray-800 rounded-xl p-6 
                         hover:border-blue-500/50 hover:shadow-[0_0_20px_#3b82f6] 
                         hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center 
                              group-hover:bg-blue-500/20 transition-all duration-300 cursor-pointer
                              hover:scale-110 hover:drop-shadow-lg"
                    onClick={() => handleIconClick(skill)}
                    title="Click to see related projects"
                  >
                    <Image 
                      src={skill.icon} 
                      alt={skill.name}
                      width={32}
                      height={32}
                      className={`w-8 h-8 object-contain transition-all duration-300 opacity-90 group-hover:opacity-100 contrast-125 ${
                        skill.name === 'Next.js' 
                          ? 'dark:filter dark:brightness-0 dark:invert' 
                          : ''
                      }`}
                    />
                  </div>
                  <h3 className="text-[var(--dark)] dark:text-white font-medium text-lg">{skill.name}</h3>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Proficiency</span>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">{skill.level}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-300 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="skill-progress-bar h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full shadow-lg shadow-blue-500/30"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* 5th skill centered */}
          <div className="flex justify-center">
            <div
              ref={el => skillCardsRef.current[4] = el}
              className="group bg-white/10 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-300 dark:border-gray-800 rounded-xl p-6 
                       hover:border-blue-500/50 hover:shadow-[0_0_20px_#3b82f6] 
                       hover:scale-[1.02] transition-all duration-300 w-full max-w-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center 
                            group-hover:bg-blue-500/20 transition-all duration-300 cursor-pointer
                            hover:scale-110 hover:drop-shadow-lg"
                  onClick={() => handleIconClick(topSkills[4])}
                  title="Click to see related projects"
                >
                  <Image 
                    src={topSkills[4].icon} 
                    alt={topSkills[4].name}
                    width={32}
                    height={32}
                    className={`w-8 h-8 object-contain transition-all duration-300 opacity-90 group-hover:opacity-100 contrast-125 ${
                      topSkills[4].name === 'Node.js' 
                        ? '' 
                        : topSkills[4].name === 'Next.js'
                        ? 'dark:filter dark:brightness-0 dark:invert'
                        : ''
                    }`}
                  />
                </div>
                <h3 className="text-[var(--dark)] dark:text-white font-medium text-lg">{topSkills[4].name}</h3>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Proficiency</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">{topSkills[4].level}%</span>
                </div>
                <div className="h-2.5 bg-gray-300 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="skill-progress-bar h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full shadow-lg shadow-blue-500/30"
                  />
                </div>
              </div>
            </div>
          </div>
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
