/**
 * Experience & Education Data Constants
 * Shared details for professional experience and academic timeline
 */

export const EXPERIENCE_DATA = [
  {
    id: 'dxc',
    title: 'Analyst I Software Engineering',
    company: 'DXC Technology',
    duration: 'June 2026 – Present',
    logoSrc: '/logo/DXC/DXC-Veritcal-Tagline-Full-Color-Dark.png',
    themeColor: 'indigo',
    tags: [
      'Python Development',
      'AI & Machine Learning',
      'Software Engineering'
    ],
    sections: [
      {
        title: 'Key Focus Areas',
        type: 'list',
        items: [
          'Designing and implementing scalable Python-based microservices and AI pipelines.',
          'Developing and deploying Machine Learning algorithms and LLM (Large Language Model) integrations.',
          'Optimizing data processing workflows, pipeline efficiency, and model inference performance.'
        ]
      },
      {
        title: 'Technologies & Tools',
        type: 'grid',
        items: [
          'Python',
          'PyTorch / TensorFlow',
          'FastAPI / Flask',
          'OpenAI / Hugging Face',
          'Docker',
          'Git & CI/CD'
        ]
      }
    ]
  },
  {
    id: 'internship',
    title: 'Junior Web Specialist Intern',
    company: 'University of Illinois Springfield',
    duration: '2023 – 2024',
    logoSrc: {
      light: '/logo/UIS Dome Logo/UISLegacyDome_UISBlue.png',
      dark: '/logo/UIS Dome Logo/UISLegacyDome_White.png'
    },
    themeColor: 'purple',
    tags: [
      'React',
      'Node.js',
      'React Native'
    ],
    sections: [
      {
        title: 'Key Responsibilities',
        type: 'list',
        items: [
          'Built interactive front-end components using React.js',
          'Improved accessibility and mobile responsiveness',
          'Developed backend modules with Node.js + Express',
          'Enhanced UIS Mobile App using React Native',
          'Integrated REST APIs for dynamic content',
          'Implemented automated tests with Selenium and Jest'
        ]
      },
      {
        title: 'Key Projects',
        type: 'cards',
        items: [
          {
            name: 'UIS Mobile App Optimization',
            description: 'Enhanced performance and user experience using React Native'
          },
          {
            name: 'University Website Components',
            description: 'Interactive React.js components for university web platform'
          }
        ]
      },
      {
        title: 'Achievements & Impact',
        type: 'impact',
        items: [
          { highlight: '20% increase', text: ' in data availability through API integration' },
          { highlight: '30% reduction', text: ' in post-deployment bugs through testing' }
        ]
      }
    ]
  },
  {
    id: 'mscs',
    title: 'Master of Science in Computer Science',
    company: 'University of Illinois Springfield',
    duration: '2022 – 2024',
    logoSrc: {
      light: '/logo/UIS Dome Logo/UISLegacyDome_UISBlue.png',
      dark: '/logo/UIS Dome Logo/UISLegacyDome_White.png'
    },
    themeColor: 'blue',
    tags: [
      'Web Development',
      'Machine Learning',
      'Data Visualization'
    ],
    sections: [
      {
        title: 'Notable Projects',
        type: 'cards',
        items: [
          {
            name: 'SentinelVision - Real-Time Face Recognition',
            description: 'React dashboard with real-time feeds and efficient rendering'
          },
          {
            name: 'SplitExpense - Expense Sharing App',
            description: 'Full-stack web & mobile app with React/React Native, Redux, PostgreSQL'
          },
          {
            name: 'Smart-Restaurant Project',
            description: 'Next.js, Socket.io, JWT authentication, MongoDB + PostgreSQL'
          }
        ]
      },
      {
        title: 'Technologies Mastered',
        type: 'grid',
        items: [
          'React.js',
          'Next.js',
          'PostgreSQL',
          'TensorFlow',
          'OpenCV',
          'REST APIs'
        ]
      }
    ]
  },
  {
    id: 'bscs',
    title: 'Bachelor of Science in Computer Science',
    company: 'Prestige Institute of Engineering, Management and Research, Indore',
    duration: '2018 – 2022',
    logoSrc: '/logo/piemr.svg',
    themeColor: 'green',
    tags: [
      'Programming Fundamentals',
      'Software Engineering',
      'Database Systems'
    ],
    sections: [
      {
        title: 'Foundation Skills',
        type: 'text_box',
        text: 'Built strong foundation in computer science principles, algorithms, and software development practices.'
      },
      {
        title: 'Technologies Learned',
        type: 'grid',
        items: [
          'JavaScript',
          'HTML/CSS',
          'Python',
          'MySQL',
          'Node.js',
          'PostgreSQL'
        ]
      },
      {
        title: 'Academic Excellence',
        type: 'text_box_alt',
        text: 'RGPV University affiliated program focusing on theoretical foundations and practical applications in computer science.'
      }
    ]
  }
];
