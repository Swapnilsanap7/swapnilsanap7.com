# Section Components

This directory contains the main page sections that make up the portfolio homepage.

## Components

### About
The about section showcasing personal information and 3D models.

**Props:**
- No props required

**Features:**
- Personal introduction and bio
- 3D model viewer integration
- Technology cloud animation
- Responsive design

### Contact
The contact section with a functional contact form.

**Props:**
- No props required

**Features:**
- Formspree integration for form handling
- Real-time form validation
- Success/error state management
- Honeypot spam protection

### Experience
The experience and education timeline section.

**Props:**
- No props required

**Features:**
- Interactive expandable timeline items
- Alternating left/right layout on desktop
- Mobile-optimized vertical layout
- Smooth animations and transitions

### Hero
The main hero section at the top of the homepage.

**Props:**
- No props required

**Features:**
- Animated text and elements
- Profile image display
- Call-to-action buttons
- Background animations

### Project
The projects showcase section.

**Props:**
- No props required

**Features:**
- Project grid layout
- ProjectCard component integration
- Filter and search capabilities
- Responsive grid system

### Skills
The skills and expertise section.

**Props:**
- No props required

**Features:**
- Top skills with progress indicators
- Additional skills grouped by category
- Interactive animations
- Technology icons and badges

## Sub-components

### TechCloud (About section)
An animated cloud of floating technology icons.

**Props:**
- No props required

**Features:**
- Floating animation with GSAP
- Technology icons
- Interactive hover effects
- Responsive positioning

## Section Structure

Each section follows a consistent structure:
1. **SectionWrapper** - Provides consistent spacing and ID
2. **Section Title** - Standardized heading styles
3. **Section Content** - Feature-specific content
4. **Animations** - GSAP-powered scroll animations

## Usage

```jsx
import { 
  Hero, 
  About, 
  Skills, 
  Experience, 
  Project, 
  Contact 
} from '@/components/sections';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Project />
      <Contact />
    </>
  );
}
```

## Design Principles

- **Section-based Architecture**: Each major page area is its own component
- **Scroll Animations**: Smooth GSAP animations triggered by scroll
- **Responsive Design**: Mobile-first responsive implementations
- **Performance**: Optimized animations and lazy loading
- **Accessibility**: Proper heading hierarchy and semantic markup

## Adding New Sections

1. Create the section component in its own folder
2. Include proper section wrapper and animations
3. Add the component to the barrel export
4. Update the main page to include the new section
5. Document the section in this README