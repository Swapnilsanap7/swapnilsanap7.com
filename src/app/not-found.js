'use client';

import CodeSnippet from '@/components/CodeSnippet';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

export default function NotFound() {
  const bugRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
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
  }, []);

  return (
    <div className="min-h-screen text-green-400 font-mono flex flex-col items-center justify-center px-4 py-10 text-center">
      <img
        ref={bugRef}
        src="/error.gif"
        alt="error gif"
        className="w-20 h-20 mb-4"
      />

      <div ref={textRef}>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">🐛 404 - Page Not Found</h1>
        <p className="text-lg text-emerald-300 mb-6">That’s a bug... or maybe a feature?</p>

        <CodeSnippet className="max-w-md mx-auto mt-6">
          <code>
            <span className="text-purple-400">throw</span>{' '}
            <span className="text-yellow-300">new</span>{' '}
            <span className="text-blue-400">Error</span>
            <span className="text-white">("</span>
            <span className="text-red-400">PageNotFoundError</span>
            <span className="text-white">");</span>
            {'\n'}
            <span className="text-pink-400">console</span>
            <span className="text-white">.</span>
            <span className="text-green-400">log</span>
            <span className="text-white">(</span>
            <span className="text-yellow-300">
              "At least you found this easter egg!"
            </span>
            <span className="text-white">);</span>
          </code>
        </CodeSnippet>

        <a
          href="/"
          className="inline-block mt-8 px-6 py-3 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition"
        >
          Debug your way back home
        </a>
      </div>
    </div>
  );
}
