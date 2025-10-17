'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function ResumeButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/resume"
      target="_blank"
      rel="noopener noreferrer"
      className="w-full max-w-xs"
    >
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{ width: hovered ? 320 : 180 }}
        initial={{ width: 180 }}
        className="bg-white/10 border border-blue-500 text-blue-400 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer backdrop-blur-md shadow-md "
      >
        <div className="px-6 py-2 rounded-x1 transition text-center font-medium md:w-auto">
          Resume
        </div>

        {/* Image preview instead of iframe */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 160 }}
            transition={{ duration: 0.3 }}
            className="bg-black bg-opacity-60"
          >
            <Image
              src="/resume-preview.png"
              alt="Resume preview"
              width={320}
              height={160}
              className="object-cover w-full h-full"
            />
          </motion.div>
        )}
      </motion.div>
    </Link>
  );
}
