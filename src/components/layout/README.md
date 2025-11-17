# Layout Components

This directory contains layout and wrapper components that provide structure to the application.

## Components

### Footer
The main footer component with social links and copyright information.

**Props:**
- `className` (string): Additional CSS classes

**Usage:**
```jsx
import { Footer } from '@/components/layout';

<Footer />
```

### Navbar
The main navigation bar component with responsive menu and theme toggle.

**Props:**
- `className` (string): Additional CSS classes
- `fixed` (boolean): Whether to use fixed positioning

**Usage:**
```jsx
import { Navbar } from '@/components/layout';

<Navbar fixed={true} />
```

### SectionWrapper
A wrapper component that provides consistent section styling and animations.

**Props:**
- `id` (string): Section ID for navigation anchors
- `className` (string): Additional CSS classes
- `children` (ReactNode): Section content

**Usage:**
```jsx
import { SectionWrapper } from '@/components/layout';

<SectionWrapper id="about" className="py-20">
  <h2>About Section</h2>
  {/* Section content */}
</SectionWrapper>
```

### SmoothScrollWrapper
A wrapper that enables smooth scrolling behavior throughout the application.

**Props:**
- `children` (ReactNode): App content to wrap

**Usage:**
```jsx
import { SmoothScrollWrapper } from '@/components/layout';

<SmoothScrollWrapper>
  <App />
</SmoothScrollWrapper>
```

## Design Principles

- **Consistency**: Provides consistent layout patterns throughout the application
- **Responsiveness**: All layout components are fully responsive
- **Accessibility**: Proper semantic markup and navigation support
- **Performance**: Optimized for smooth scrolling and animations

## Layout Structure

```
App
├── SmoothScrollWrapper
│   ├── Navbar
│   ├── Main Content
│   │   └── SectionWrapper (multiple)
│   └── Footer
```