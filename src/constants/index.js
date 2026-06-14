  export const NAV_LINKS = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
  ];

  export const SKILLS = [
    {
      category: 'Languages',
      color: '#06b6d4',
      items: ['Python', 'Java', 'TypeScript', 'JavaScript', 'SQL', 'C', 'C++', 'Kotlin'],
    },
    {
      category: 'AI / ML',
      color: '#00f5ff',
      items: ['TensorFlow', 'Scikit-Learn', 'XGBoost', 'LightGBM', 'GloVe', 'GRU', 'SHAP', 'YOLOv8', 'OpenCV'],
    },
    {
      category: 'Backend',
      color: '#7c3aed',
      items: ['FastAPI', 'Flask', 'Spring Boot', 'Node.js', 'Express.js', 'NestJS', 'REST APIs', 'JWT', 'Microservices', 'Kafka'],
    },
    {
      category: 'Frontend',
      color: '#f59e0b',
      items: ['React.js', 'Next.js', 'TypeScript', 'TailwindCSS', 'React Native', 'Expo SDK'],
    },
    {
      category: 'Databases',
      color: '#10b981',
      items: ['PostgreSQL', 'MongoDB', 'SQLite', 'Prisma ORM', 'SQLAlchemy', 'Mongoose'],
    },
    {
      category: 'Cloud & Tools',
      color: '#ef4444',
      items: ['GCP', 'Docker', 'Git', 'Postman', 'Vercel', 'Render', 'BigQuery', 'Vertex AI'],
    },
  ];

  export const PROJECTS = [
    {
      title: 'NoteFlow',
      subtitle: 'React Native + Expo',
      description:
        'Offline-first notes app built with React Native and Expo SDK 54. Supports category tagging, real-time search, AsyncStorage persistence, and keyboard-aware editing — no internet required.',
      tags: ['React Native', 'Expo', 'AsyncStorage', 'Offline-First'],
      color: '#0ea5e9',
      github: 'https://github.com/ishant212/NoteFlow',
      apk: 'https://expo.dev/accounts/ishant212/projects/noteflow/builds/7130e929-0507-41a9-8a01-854b31f797b9',
      stat: 'Offline-first',
      image: '/screenshots/noteflow.webp',
    },
    {
      title: 'AI Research Assistant',
      subtitle: 'Chrome Extension + Spring Boot',
      description:
        'Chrome Extension with Spring Boot backend integrated with Google Gemini API for code debugging, summarization, and automated test case generation via reactive WebClient.',
      tags: ['Spring Boot', 'Gemini API', 'Java', 'Chrome Extension'],
      color: '#7c3aed',
      github: 'https://github.com/ishant212/Smart-Research-Assistant',
      stat: 'LLM-powered',
      image: '/screenshots/assistant.webp',
    },
    {
      title: 'Sign Language Detector',
      subtitle: 'Real-time ASL Recognition',
      description:
        'Real-time sign language detection using YOLOv8 and OpenCV, trained to recognize ASL hand gestures via webcam feed with frame-level classification and confidence scoring.',
      tags: ['YOLOv8', 'OpenCV', 'Python', 'Computer Vision'],
      color: '#00f5ff',
      github: 'https://github.com/ishant212/Enhanced-Sign-Language-Recognition-System',
      stat: 'Real-time',
      image: '/screenshots/sign-lang.webp',
    },
    {
      title: 'EduLoan Platform',
      subtitle: 'Education Loan Evaluation',
      description:
        'Full-stack education loan platform with Next.js + NestJS, explainable AI-style lead scoring, fraud detection, real-time application tracking, Prisma-managed PostgreSQL schema.',
      tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma'],
      color: '#f59e0b',
      github: 'https://github.com/ishant212/Edu-Loan',
      stat: 'Full-stack',
      image: '/screenshots/eduloan.webp',
    },
    {
      title: 'Secure Cloud',
      subtitle: 'End-to-End Encrypted Storage',
      description:
        'Secure cloud storage using AES-256-GCM encryption, FastAPI, React, and Google Drive API. Files are encrypted locally before upload with OAuth-based authentication and secure metadata retrieval.',
      tags: ['FastAPI', 'React', 'AES-GCM', 'Google Drive API', 'OAuth 2.0'],
      color: '#10b981',
      github: 'https://github.com/ishant212/Secure_Cloud_Storage',
      stat: 'AES-256-GCM',
      image: '/screenshots/secure-crypto.webp',
    },
    {
      title: 'ADAS Simulation',
      subtitle: 'Lane & Vehicle Detection',
      description:
        'Real-time ADAS simulation combining classical CV (Canny, Hough Transform, ROI masking) with YOLOv8 for simultaneous lane and vehicle detection with proximity-based warnings.',
      tags: ['YOLOv8', 'OpenCV', 'Python', 'Computer Vision'],
      color: '#ef4444',
      github: 'https://github.com/ishant212/Lane-vehicle-detection',
      stat: 'Real-time',
      image: '/screenshots/lane-detection.webp',
    },
  ];

  export const EXPERIENCE = [
    {
      role: 'Android Development Intern',
      company: 'Pincodedweb Technology',
      period: 'Jun 2026 – Present',
      type: 'Remote',
      points: [
        'Developing and testing Android applications using Android SDK, Kotlin, and Git.',
        'Handling API integration, debugging, and performance optimization across app modules.',
      ],
      color: '#00f5ff',
    },
    {
      role: 'Web Developer Intern',
      company: 'InAmigos Foundation (IAF)',
      period: 'May 2026',
      type: 'Remote',
      points: [
        'Built and maintained web features with AI/ML integrations.',
        'Followed collaborative development workflows.',
      ],
      color: '#7c3aed',
    },
    {
      role: 'Tech Member – GDSC',
      company: 'VIT Chennai',
      period: 'Aug 2024 – Aug 2025',
      type: 'Chennai, India',
      points: [
        'Organized technical workshops; completed a GenAI program on LLMs and prompt engineering.',
        'Built projects using Gemini API and Streamlit; drove student engagement and outreach.',
      ],
      color: '#f59e0b',
    },
  ];

  export const CERTIFICATIONS = [
    { name: 'GenAI Apps with Gemini & Streamlit', issuer: 'Google', year: '2024' },
    { name: 'Prompt Design in Vertex AI', issuer: 'Google', year: '2024' },
    { name: 'Cloud Vision API', issuer: 'Google', year: '2024' },
    { name: 'Blockchain Essentials', issuer: 'IBM', year: '2025' },
  ];

  export const SOCIALS = {
    leetcode: 'https://leetcode.com/u/Ishant_Shekhar/',
    github: 'https://github.com/ishant212',
    linkedin: 'https://www.linkedin.com/in/ishant-shekhar-eeshu/',
    email: 'ishantvats123@gmail.com',
  };