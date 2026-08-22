import { PROJECTS_LIST } from '../constants/projects';

const ACCESS_OVERRIDES = {
  'safe-spend': {
    accent: '#22c55e',
    accessDurationDays: 7,
    provisioning: { type: 'webhook', envPrefix: 'SAFE_SPEND' },
  },
  splitxpense: {
    accent: '#8b5cf6',
    accessDurationDays: 7,
    provisioning: { type: 'webhook', envPrefix: 'SPLITXPENSE' },
  },
};

export const ACCESS_PROJECTS = PROJECTS_LIST.map((project) => ({
  slug: project.slug,
  name: project.title,
  description: project.description,
  techStack: project.techStack,
  liveUrl: project.liveDemoLink,
  accessDurationDays: 7,
  accent: '#0066FF',
  provisioning: { type: 'direct-link' },
  ...ACCESS_OVERRIDES[project.slug],
}));

export function getAccessProject(slug) {
  return ACCESS_PROJECTS.find((project) => project.slug === slug) || null;
}

