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
import Magnetic from '../../ui/Magnetic';

gsap.registerPlugin(ScrollTrigger);


const FIELD_LIMITS = {
  name: 80,
  email: 254,
  subject: 120,
  message: 3000,
};
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const LOADING_TEXTS = [
  'Waking up the servers...',
  'Encrypting message...',
  'Routing to inbox...',
  'Almost there...',
];

export default function Contact() {
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const turnstileRef = useRef(null);
  const turnstileWidgetId = useRef(null);
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
  const [turnstileToken, setTurnstileToken] = useState('');
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (isSubmitting) {
      interval = setInterval(() => {
        setLoadingTextIndex((prev) => (prev + 1) % LOADING_TEXTS.length);
      }, 1500);
    } else {
      setLoadingTextIndex(0);
    }
    return () => clearInterval(interval);
  }, [isSubmitting]);

  useEffect(() => {
    const renderTurnstile = () => {
      if (!TURNSTILE_SITE_KEY || !turnstileRef.current || !window.turnstile || turnstileWidgetId.current) {
        return;
      }

      turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token) => {
          setTurnstileToken(token);
          setErrors((currentErrors) => ({ ...currentErrors, form: '' }));
        },
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => {
          setTurnstileToken('');
          setErrors((currentErrors) => ({
            ...currentErrors,
            form: 'Verification failed. Please refresh and try again.',
          }));
        },
      });
    };

    if (TURNSTILE_SITE_KEY) {
      if (window.turnstile) {
        renderTurnstile();
      } else {
        const existingScript = document.querySelector('script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]');
        const script = existingScript || document.createElement('script');

        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
        script.async = true;
        script.defer = true;
        script.onload = renderTurnstile;

        if (!existingScript) {
          document.head.appendChild(script);
        }
      }
    }

    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (!shouldReduceMotion) {
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
      }

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

    return () => {
      if (window.turnstile && turnstileWidgetId.current) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }

      ctx.revert();
    };
  }, []);

  const resetTurnstile = () => {
    setTurnstileToken('');

    if (window.turnstile && turnstileWidgetId.current) {
      window.turnstile.reset(turnstileWidgetId.current);
    }
  };

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
      newErrors.name = "I'd love to know your name!";
    } else if (formData.name.trim().length > FIELD_LIMITS.name) {
      newErrors.name = `That's quite a long name! Please keep it under ${FIELD_LIMITS.name} characters.`;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Where should I send my reply?";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Hmm, that email doesn't look quite right.";
    } else if (formData.email.trim().length > FIELD_LIMITS.email) {
      newErrors.email = `Let's keep the email under ${FIELD_LIMITS.email} characters.`;
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "What's this about?";
    } else if (formData.subject.trim().length > FIELD_LIMITS.subject) {
      newErrors.subject = `Let's keep the subject brief (under ${FIELD_LIMITS.subject} characters).`;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Don't be shy, say hello!";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Could you tell me a little bit more? (Minimum 10 characters)";
    } else if (formData.message.trim().length > FIELD_LIMITS.message) {
      newErrors.message = `That's a lot of detail! Please keep it under ${FIELD_LIMITS.message} characters.`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Spam protection
  if (honeypot) {
    console.log('Spam detected');
    return;
  }

  if (!validateForm()) {
    return;
  }

  // Turnstile check bypassed if not configured so the form still works.

  if (TURNSTILE_SITE_KEY && !turnstileToken) {
    setErrors({ form: 'Please complete the verification before sending.' });
    setSubmitStatus('error');
    return;
  }

  setIsSubmitting(true);
  setSubmitStatus(null);

  try {
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
        turnstileToken,
      }),
    });

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
      resetTurnstile();
    } else if (response.status === 429) {
      setErrors({ form: 'Too many messages sent. Please try again later.' });
      setSubmitStatus('error');
      resetTurnstile();
    } else if (response.status === 403) {
      setErrors({ form: 'Verification failed. Please refresh and try again.' });
      setSubmitStatus('error');
      resetTurnstile();
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    setSubmitStatus('error');
    resetTurnstile();
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
          {/* Success Celebration State */}
          {submitStatus === 'success' ? (
            <div className="flex flex-col items-center justify-center py-16 text-center" role="status" aria-live="polite">
              <div className="w-24 h-24 mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
                <svg className="w-12 h-12 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <style>
                    {`
                      .checkmark-draw {
                        stroke-dasharray: 50;
                        stroke-dashoffset: 50;
                        animation: draw 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
                      }
                      @keyframes draw {
                        to { stroke-dashoffset: 0; }
                      }
                      .success-content {
                        animation: slideUpFade 0.6s ease-out forwards;
                      }
                      @keyframes slideUpFade {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                      }
                    `}
                  </style>
                  <path 
                    className="checkmark-draw"
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              <div className="success-content">
                <h3 className="text-3xl font-bold text-[var(--dark)] dark:text-white mb-3">Message Acquired!</h3>
                <p className="text-[var(--dark)] dark:text-[var(--light)] opacity-80 text-lg max-w-sm mx-auto">
                  Thanks for reaching out. Your message is safely in my inbox, and I&apos;ll be in touch shortly.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg" role="alert" aria-live="assertive">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p className="text-red-400 font-medium">Failed to send message</p>
                  </div>
                  <p className="text-red-300 text-sm mt-1">{errors.form || 'Please try again or contact me directly at hello@swapnilsanap7.com'}</p>
                </div>
              )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-busy={isSubmitting}>
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
                  maxLength={FIELD_LIMITS.name}
                  required
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-300 text-[var(--dark)] dark:text-white backdrop-blur-sm ${
                    errors.name 
                      ? 'border-red-500 focus:ring-red-400 focus:shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                      : 'border-gray-300/50 dark:border-gray-600/50 hover:border-gray-400 dark:hover:border-gray-500 focus:border-blue-500 focus:ring-blue-500/30 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  }`}
                  placeholder="Your name"
                />
                {errors.name && <p id="name-error" className="text-red-400 text-sm mt-1" role="alert">{errors.name}</p>}
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
                  maxLength={FIELD_LIMITS.email}
                  required
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-300 text-[var(--dark)] dark:text-white backdrop-blur-sm ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-400 focus:shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                      : 'border-gray-300/50 dark:border-gray-600/50 hover:border-gray-400 dark:hover:border-gray-500 focus:border-blue-500 focus:ring-blue-500/30 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p id="email-error" className="text-red-400 text-sm mt-1" role="alert">{errors.email}</p>}
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
                maxLength={FIELD_LIMITS.subject}
                required
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                className={`w-full px-4 py-3 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-300 text-[var(--dark)] dark:text-white backdrop-blur-sm ${
                  errors.subject 
                    ? 'border-red-500 focus:ring-red-400 focus:shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                    : 'border-gray-300/50 dark:border-gray-600/50 hover:border-gray-400 dark:hover:border-gray-500 focus:border-blue-500 focus:ring-blue-500/30 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                }`}
                placeholder="What&apos;s this about?"
              />
              {errors.subject && <p id="subject-error" className="text-red-400 text-sm mt-1" role="alert">{errors.subject}</p>}
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[var(--dark)] dark:text-[var(--light)] mb-2">
                Message <span className="text-red-500">*</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">({formData.message.length}/{FIELD_LIMITS.message} characters)</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                maxLength={FIELD_LIMITS.message}
                required
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                rows="6"
                className={`w-full px-4 py-3 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-300 text-[var(--dark)] dark:text-white backdrop-blur-sm resize-none ${
                  errors.message 
                    ? 'border-red-500 focus:ring-red-400 focus:shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                    : 'border-gray-300/50 dark:border-gray-600/50 hover:border-gray-400 dark:hover:border-gray-500 focus:border-blue-500 focus:ring-blue-500/30 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                }`}
                placeholder="Your message… (minimum 10 characters)"
              ></textarea>
              {errors.message && <p id="message-error" className="text-red-400 text-sm mt-1" role="alert">{errors.message}</p>}
            </div>

            {TURNSTILE_SITE_KEY && (
              <div ref={turnstileRef} className="min-h-[65px]" />
            )}
            
            <Magnetic>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-3 rounded-lg font-medium transition-all duration-300 disabled:cursor-not-allowed shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] group ${
                  isSubmitting 
                    ? 'bg-blue-400 text-white cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="inline-block min-w-[170px] text-left" aria-live="polite">{LOADING_TEXTS[loadingTextIndex]}</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Message
                  </span>
                )}
              </button>
            </Magnetic>
            </form>
            </>
          )}
        </div>

        {/* Right Side - Contact Info */}
        <div ref={infoRef} className="flex-1 w-full max-w-md pt-4 lg:pt-0">
          <div className="p-4 lg:pl-12">
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
                <Magnetic>
                  <a 
                  href="https://github.com/Swapnilsanap7/"
                  target="_blank"
                  rel="noopener noreferrer" 
                  aria-label="GitHub profile"
                  onClick={() => trackGithubClick('contact')}
                  className="w-10 h-10 bg-blue-500/20 hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] rounded-full flex items-center justify-center transition-all duration-300 group">
                    <svg className="w-5 h-5 text-blue-500 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </Magnetic>
                <Magnetic>
                  <a 
                  href="https://www.linkedin.com/in/swapnilsanap7/"
                  target="_blank"
                  rel="noopener noreferrer" 
                  aria-label="LinkedIn profile"
                  onClick={() => trackLinkedinClick('contact')}
                  className="w-10 h-10 bg-blue-500/20 hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] rounded-full flex items-center justify-center transition-all duration-300 group">
                    <svg className="w-5 h-5 text-blue-500 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </Magnetic>
                <Magnetic>
                  <a 
                  href="https://x.com/swapnilsanap7"
                  target="_blank"
                  rel="noopener noreferrer" 
                  aria-label="X profile"
                  className="w-10 h-10 bg-blue-500/20 hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] rounded-full flex items-center justify-center transition-all duration-300 group">
                    <svg className="w-5 h-5 text-blue-500 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </Magnetic>
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
