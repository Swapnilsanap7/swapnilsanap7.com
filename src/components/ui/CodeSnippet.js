'use client';

export default function CodeSnippet({ children, className = '' }) {
  return (
    <div
      className={`relative rounded-lg overflow-hidden backdrop-blur-sm bg-black/40 shadow-lg border border-white/10 ${className}`}
    >
      {/* Fake window header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-black/50 border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-red-500"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
        <span className="w-3 h-3 rounded-full bg-green-500"></span>
      </div>

      {/* Code content */}
      <div className="p-4 font-mono text-sm leading-relaxed text-left whitespace-pre-wrap">
        {children}
      </div>
    </div>
  );
}
