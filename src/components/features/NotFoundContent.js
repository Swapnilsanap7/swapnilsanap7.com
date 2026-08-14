'use client';

import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import CodeSnippet from '../ui/CodeSnippet';

export default function NotFoundContent() {
  const bugRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        bugRef.current,
        { y: 0 },
        { y: -10, duration: 1, yoyo: true, repeat: -1, ease: 'power1.inOut' }
      );

      gsap.from(textRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power2.out',
        delay: 0.3,
      });
    });

    return () => context.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--light)] dark:bg-[var(--dark)] text-[var(--dark)] dark:text-green-400 font-mono flex flex-col items-center justify-center px-4 py-10 text-center">
      <div ref={bugRef}>
        <Image
          src="/assets/images/error.gif"
          alt=""
          width={80}
          height={80}
          className="mb-4"
          unoptimized
        />
      </div>

      <div ref={textRef}>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-[var(--dark)] dark:text-green-400">
          🐛 404 - Page Not Found
        </h1>

        <p className="text-lg text-[var(--dark)]/70 dark:text-emerald-300 mb-6">
          That&apos;s a bug... or maybe a feature?
        </p>

        <CodeSnippet className="max-w-md mx-auto mt-6">
          <code>
            <span className="text-purple-400">throw</span>{' '}
            <span className="text-yellow-300">new</span>{' '}
            <span className="text-blue-400">Error</span>
            <span className="text-white">(&quot;</span>
            <span className="text-red-400">PageNotFoundError</span>
            <span className="text-white">&quot;);</span>
            {'\n'}
            <span className="text-pink-400">console</span>
            <span className="text-white">.</span>
            <span className="text-green-400">log</span>
            <span className="text-white">(</span>
            <span className="text-yellow-300">
              &quot;At least you found this easter egg!&quot;
            </span>
            <span className="text-white">);</span>
          </code>
        </CodeSnippet>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition"
            aria-label="Return to Swapnil Sanap portfolio homepage"
          >
            Debug your way back home
          </Link>

          <Link
            href="/#project"
            className="text-emerald-700 dark:text-green-400 hover:text-emerald-800 dark:hover:text-green-300 transition-colors font-medium"
          >
            View Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
