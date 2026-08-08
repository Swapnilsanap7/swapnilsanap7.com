# 🌌 Swapnil Sanap — Professional Portfolio

[![Live Demo](https://img.shields.io/badge/Live_Demo-swapnilsanap7.com-blueviolet?style=for-the-badge&logo=google-chrome&logoColor=white)](https://swapnilsanap7.com)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

Welcome to the official repository of my personal developer portfolio. This web application is a high-performance, visually engaging space designed to showcase my experience, skills, and projects as a Full Stack Software Engineer.

---

## ✨ Key Features

*   **🎨 Premium Glassmorphism UI**: A highly polished user interface with smooth transitions, customized color palettes, and full dark/light mode integration.
*   **🌀 Interactive 3D Visuals**: Fully immersive 3D scene elements powered by **Three.js** and **React Three Fiber (R3F)**.
*   **🚀 GSAP & ScrollSmoother Animations**: Implemented using GSAP's scroll tracking and animation timelines, ensuring ultra-smooth scrolling, parallax effects, and micro-interactions.
*   **📊 Advanced Performance & Event Analytics**: Integrated custom **Google Analytics (gtag)** to monitor user retention metrics including:
    *   *Section Scroll Funnel*: Tracking when visitors view different sections of the page.
    *   *Interaction Analytics*: Capturing external code link clicks (GitHub), live project demo clicks, and light/dark mode changes.
*   **📱 Universal Responsive Layout**: Clean mobile-first design system that scales seamlessly from small viewports up to large displays.

---

## 🛠️ Technology Stack

| Category | Technologies Used |
| :--- | :--- |
| **Frontend & Core** | Next.js (App Router), React, JavaScript (ES6+), HTML5 |
| **Animations & Scrolling** | GSAP, ScrollTrigger, ScrollSmoother |
| **3D Graphics** | Three.js, React Three Fiber (R3F), `@react-three/drei` |
| **Styling** | Tailwind CSS, CSS Variables |
| **Analytics & Metrics**| Google Analytics 4 (GA4 / gtag) |
| **Deployment & Hosting**| Vercel |

---

## 📂 Project Structure

```text
portfolio/
├── public/                 # Static assets (3D models, images, manifest)
├── src/
│   ├── app/                # Next.js App Router (pages & global layouts)
│   ├── components/         # React Components
│   │   ├── features/       # Specialized features (ProjectCard, ScrollTracker)
│   │   ├── layout/         # Core layouts (Navbar, Footer, SectionWrapper)
│   │   ├── sections/       # Section containers (About, Experience, Projects)
│   │   └── ui/             # Reusable UI controls (GoogleAnalytics component)
│   ├── lib/
│   │   └── config/         # App constants, configuration, and analytics helper utilities
│   └── styles/             # Global CSS variables and styling sheets
└── package.json            # Configuration and script manager
```

---

## 🚀 Getting Started Locally

Follow these steps to run a development instance of the portfolio on your local machine:

### 1. Prerequisites
Ensure you have **Node.js** (v18.0.0 or higher) and **npm** installed.

### 2. Clone the Repository
```bash
git clone https://github.com/swapnilsanap7/swapnilsanap7.com.git
cd swapnilsanap7.com
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Set Up Environment Variables
Copy `.env.example` to `.env.local`, then provide the services you want to enable. The site URL and mail settings are required for the contact form. Turnstile and Upstash Redis are recommended for spam protection and durable serverless rate limiting.
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=G-YOUR_MEASUREMENT_ID
APPLE_SMTP_USER=your-apple-id@example.com
APPLE_SMTP_PASS=your-app-specific-password
MAIL_FROM=hello@example.com
```

### 5. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the project.

---

## ☁️ Deployment

Production deployment is automated via **Vercel** with continuous deployment integrated directly into the `main` branch. 

Visit the live site here:  
👉 **[swapnilsanap7.com](https://swapnilsanap7.com)**
