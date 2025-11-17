# Components Directory

This directory contains all React components organized by purpose and functionality.

## Directory Structure

```
components/
├── ui/                    # Reusable UI components
│   ├── CodeSnippet.js
│   ├── ResumeButton.js
│   ├── StlViewer.js
│   ├── TechBubble.js
│   ├── index.js          # Barrel exports
│   └── README.md         # UI components documentation
├── layout/                # Layout and wrapper components
│   ├── Footer.js
│   ├── Navbar.js
│   ├── SectionWrapper.js
│   ├── SmoothScrollWrapper.js
│   ├── index.js          # Barrel exports
│   └── README.md         # Layout components documentation
├── features/              # Feature-specific components
│   ├── ProjectCard.js
│   ├── ProjectDetail.js
│   ├── index.js          # Barrel exports
│   └── README.md         # Feature components documentation
├── sections/              # Main page sections
│   ├── About/
│   │   ├── About.js
│   │   └── TechCloud.js
│   ├── Contact/
│   │   └── Contact.js
│   ├── Experience/
│   │   └── Experience.js
│   ├── Hero/
│   │   └── Hero.js
│   ├── Project/
│   │   └── Project.js
│   ├── Skills/
│   │   └── Skills.js
│   ├── index.js          # Barrel exports
│   └── README.md         # Section components documentation
├── index.js               # Main barrel export
└── README.md             # This file
```

## Import Patterns

### Using Barrel Exports (Recommended)
```jsx
// Import multiple components from the same category
import { CodeSnippet, ResumeButton, StlViewer } from '@/components/ui';

// Import layout components
import { Navbar, Footer, SectionWrapper } from '@/components/layout';

// Import section components
import { Hero, About, Skills } from '@/components/sections';

// Import everything from main barrel
import { Navbar, ProjectCard, Hero } from '@/components';
```

### Direct Imports (When needed for optimization)
```jsx
// Direct import for specific components
import CodeSnippet from '@/components/ui/CodeSnippet';
import Hero from '@/components/sections/Hero/Hero';
```

## Component Categories

### 1. UI Components (`/ui`)
- **Purpose**: Reusable interface elements
- **Examples**: Buttons, modals, form elements, displays
- **Characteristics**: Generic, configurable, no business logic

### 2. Layout Components (`/layout`) 
- **Purpose**: Page structure and layout
- **Examples**: Headers, footers, wrappers, containers
- **Characteristics**: Structural, responsive, consistent spacing

### 3. Feature Components (`/features`)
- **Purpose**: Complete feature implementations
- **Examples**: Project cards, user profiles, data displays
- **Characteristics**: Business logic, data integration, complex interactions

### 4. Section Components (`/sections`)
- **Purpose**: Major page sections
- **Examples**: Hero, About, Contact, Portfolio sections
- **Characteristics**: Page-specific, full-width, scroll animations

## Coding Standards

### Component Structure
```jsx
'use client'; // If using client-side features

import { useState, useEffect } from 'react';
import { ExternalLibrary } from 'external-library';

/**
 * Component description
 * @param {Object} props - Component props
 * @param {string} props.title - Prop description
 */
export default function ComponentName({ title, ...props }) {
  // Component logic
  
  return (
    <div className="component-wrapper">
      {/* Component JSX */}
    </div>
  );
}
```

### Naming Conventions
- **Components**: PascalCase (e.g., `ProjectCard.js`)
- **Files**: PascalCase for components, camelCase for utilities
- **Props**: camelCase
- **CSS Classes**: kebab-case or utility classes

### Animation Guidelines
- Use GSAP for complex animations
- Implement scroll-triggered animations with ScrollTrigger
- Follow the animation constants in `/lib/constants`
- Ensure animations are accessible and respectable of user preferences

## Performance Considerations

### Code Splitting
```jsx
// Lazy load heavy components
const StlViewer = lazy(() => import('./StlViewer'));

// Use Suspense for loading states
<Suspense fallback={<LoadingSpinner />}>
  <StlViewer />
</Suspense>
```

### Optimization Tips
- Use React.memo for expensive re-renders
- Implement proper dependency arrays in useEffect
- Optimize images with Next.js Image component
- Use barrel exports judiciously (they can increase bundle size)

## Testing

### Component Testing Structure
```jsx
import { render, screen } from '@testing-library/react';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  test('renders with required props', () => {
    render(<ComponentName title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

## Contributing

When adding new components:

1. **Choose the Right Category**: UI, Layout, Features, or Sections
2. **Follow Naming Conventions**: PascalCase for components
3. **Add Proper Documentation**: JSDoc comments and README updates
4. **Include in Barrel Exports**: Add to appropriate `index.js`
5. **Write Tests**: Include unit tests for complex logic
6. **Update Documentation**: Keep README files current

## Resources

- [React Documentation](https://react.dev/)
- [Next.js Components](https://nextjs.org/docs/app/building-your-application/optimizing/components)
- [GSAP Animation Library](https://gsap.com/docs/v3/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)