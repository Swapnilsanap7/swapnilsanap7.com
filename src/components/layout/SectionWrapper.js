// src/components/SectionWrapper.js
export default function SectionWrapper({ id, children, className = "" }) {
  return (
    <section
      id={id}
      className={`px-4 sm:px-6 lg:px-16 py-16 max-w-screen-xl mx-auto ${className}`}
    >
      {children}
    </section>
  );
}
