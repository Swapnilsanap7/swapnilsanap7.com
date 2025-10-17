import About from '../components/sections/About/About';
import Hero from '../components/sections/Hero/Hero';
import Project from '../components/sections/Project/Project';

export default function Home() {
  return (
    <main className="relative w-full min-h-screen px-4 sm:px-6 lg:px-8">
      {/* Page Sections */}
      <Hero />
      <About />
      <Project />
      {/* Later: <Projects />, etc. */}
    </main>
  );
}
