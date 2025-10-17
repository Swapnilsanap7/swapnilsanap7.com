export default function TechBubble({ tech }) {
    return (
      <span
        className="rounded-full px-4 py-2 text-sm font-medium bg-zinc-200 dark:bg-zinc-700 shadow-md hover:scale-105 transition-transform duration-200"
        title={tech}
      >
        {tech}
      </span>
    );
  }
  