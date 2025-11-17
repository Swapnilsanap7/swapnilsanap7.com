# UI Components

This directory contains reusable UI components that can be used throughout the application.

## Components

### CodeSnippet
A component for displaying formatted code snippets with syntax highlighting.

**Props:**
- `code` (string): The code to display
- `language` (string): Programming language for syntax highlighting
- `showLineNumbers` (boolean): Whether to show line numbers

**Usage:**
```jsx
import { CodeSnippet } from '@/components/ui';

<CodeSnippet 
  code="console.log('Hello World');" 
  language="javascript" 
  showLineNumbers={true} 
/>
```

### ResumeButton
An animated button component for downloading or viewing the resume.

**Props:**
- `variant` (string): 'download' | 'preview' - Button style variant
- `className` (string): Additional CSS classes
- `children` (ReactNode): Button content

**Usage:**
```jsx
import { ResumeButton } from '@/components/ui';

<ResumeButton variant="download">
  Download Resume
</ResumeButton>
```

### StlViewer
A 3D model viewer component for displaying STL files.

**Props:**
- `modelPath` (string): Path to the STL file
- `width` (number): Viewer width in pixels
- `height` (number): Viewer height in pixels
- `autoRotate` (boolean): Enable automatic rotation

**Usage:**
```jsx
import { StlViewer } from '@/components/ui';

<StlViewer 
  modelPath="/models/sample.stl" 
  width={400} 
  height={300} 
  autoRotate={true} 
/>
```

### TechBubble
A floating bubble component for displaying technology icons with animations.

**Props:**
- `tech` (object): Technology object with name, icon, and color properties
- `delay` (number): Animation delay in seconds
- `size` (string): 'small' | 'medium' | 'large' - Bubble size

**Usage:**
```jsx
import { TechBubble } from '@/components/ui';

<TechBubble 
  tech={{ name: 'React', icon: '/icons/react.svg', color: '#61DAFB' }}
  delay={0.5}
  size="medium"
/>
```

## Design Principles

- **Reusability**: Components are designed to be reusable across different parts of the application
- **Accessibility**: All components follow WCAG guidelines and include proper ARIA attributes
- **Performance**: Components are optimized for performance with lazy loading and minimal re-renders
- **Consistency**: Consistent styling and behavior patterns across all UI components

## Adding New Components

1. Create the component file with proper JSDoc comments
2. Add the component to the barrel export in `index.js`
3. Update this README with component documentation
4. Include usage examples and prop documentation