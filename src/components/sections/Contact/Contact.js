'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import {
  trackContactForm,
  trackContactSectionView,
  trackEmailClick,
  trackGithubClick,
  trackLinkedinClick,
} from '../../../lib/config/analytics';
import SectionWrapper from '../../layout/SectionWrapper';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const hasTrackedSectionView = useRef(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [errors, setErrors] = useState({});
  const [honeypot, setHoneypot] = useState(''); // Spam protection

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      });

      gsap.from(infoRef.current, {
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 0.2,
      });

      ScrollTrigger.create({
        trigger: formRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          if (!hasTrackedSectionView.current) {
            hasTrackedSectionView.current = true;
            trackContactSectionView();
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    
    // Clear success/error status when user modifies form
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Spam protection (unchanged)
  if (honeypot) {
    console.log('Spam detected');
    return;
  }

  // Validation (unchanged)
  if (!validateForm()) {
    return;
  }

  setIsSubmitting(true);
  setSubmitStatus(null);

  try {
    // SEND DATA TO YOUR OWN API (THIS IS THE BIG CHANGE)
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        honeypot, // pass honeypot to backend
      }),
    });

    // HANDLE RESPONSE (same logic as before)
    if (response.ok) {
      setSubmitStatus('success');

      trackContactForm('website');

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      setErrors({});
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <SectionWrapper
      id="contact"
      className="py-24 relative overflow-hidden"
    >
      {/* Section Title */}
      <div className="relative z-10 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--dark)] dark:text-white drop-shadow-sm">
          Get In Touch
        </h2>
        <p className="text-[var(--dark)] dark:text-[var(--light)] text-lg mt-4 max-w-2xl mx-auto">
          Let&apos;s build something amazing together. I&apos;m always open to discussing new opportunities.
        </p>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-12 max-w-6xl mx-auto">
        
        {/* Left Side - Contact Form */}
        <div ref={formRef} className="flex-1 w-full max-w-xl">
          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-green-400 font-medium">Message sent successfully!</p>
              </div>
              <p className="text-green-300 text-sm mt-1">Thank you for reaching out. I&apos;ll get back to you soon!</p>
            </div>
          )}
          
          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <p className="text-red-400 font-medium">Failed to send message</p>
              </div>
              <p className="text-red-300 text-sm mt-1">Please try again or contact me directly at hello@swapnilsanap7.com</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot field for spam protection */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ display: 'none' }}
              tabIndex="-1"
              autoComplete="off"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--dark)] dark:text-[var(--light)] mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-[var(--dark)] dark:text-white backdrop-blur-sm ${
                    errors.name 
                      ? 'border-red-500 focus:ring-red-400' 
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400'
                  }`}
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--dark)] dark:text-[var(--light)] mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-[var(--dark)] dark:text-white backdrop-blur-sm ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-400' 
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-[var(--dark)] dark:text-[var(--light)] mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-[var(--dark)] dark:text-white backdrop-blur-sm ${
                  errors.subject 
                    ? 'border-red-500 focus:ring-red-400' 
                    : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400'
                }`}
                placeholder="What&apos;s this about?"
              />
              {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[var(--dark)] dark:text-[var(--light)] mb-2">
                Message <span className="text-red-500">*</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">({formData.message.length} characters)</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="6"
                className={`w-full px-4 py-3 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-[var(--dark)] dark:text-white backdrop-blur-sm resize-none ${
                  errors.message 
                    ? 'border-red-500 focus:ring-red-400' 
                    : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400'
                }`}
                placeholder="Your message… (minimum 10 characters)"
              ></textarea>
              {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl ${
                isSubmitting 
                  ? 'bg-blue-400 text-white cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Sending Message...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Message
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Right Side - Contact Info */}
        <div ref={infoRef} className="flex-1 w-full max-w-md">
          <div className="bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-[var(--dark)] dark:text-white mb-6">
              Let&apos;s Connect
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-[var(--dark)] dark:text-[var(--light)] opacity-80">Email</p>
                  <a
                    href="mailto:hello@swapnilsanap7.com"
                    onClick={() => trackEmailClick('contact')}
                    className="text-[var(--dark)] dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    hello@swapnilsanap7.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-[var(--dark)] dark:text-[var(--light)] opacity-80">Location</p>
                  <p className="text-[var(--dark)] dark:text-white font-medium">India</p>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="mt-8">
              <p className="text-[var(--dark)] dark:text-[var(--light)] font-medium mb-4">Find me on</p>
              <div className="flex gap-4">
                <a 
                href="https://github.com/Swapnilsanap7/"
                target="_blank"
                rel="noopener noreferrer" 
                onClick={() => trackGithubClick('contact')}
                className="w-10 h-10 bg-blue-500/20 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors group">
                  <svg className="w-5 h-5 text-blue-500 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a 
                href="https://www.linkedin.com/in/swapnilsanap7/"
                target="_blank"
                rel="noopener noreferrer" 
                onClick={() => trackLinkedinClick('contact')}
                className="w-10 h-10 bg-blue-500/20 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors group">
                  <svg className="w-5 h-5 text-blue-500 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                href="none"
                target="_blank"
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-blue-500/20 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors group">
                  <svg className="w-5 h-5 text-blue-500 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-blue-600 dark:text-blue-400 text-sm italic text-center">
                Ready to Connect? Let&apos;s make it happen! 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
