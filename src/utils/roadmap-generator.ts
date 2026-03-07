import { DiagnosticResults } from "../components/diagnostic-test";

export interface LearningTrack {
  id: string;
  name: string;
  description: string;
  icon: string;
  duration: string;
  skillLevel: string;
  primarySkills: string[];
  secondarySkills: string[];
  milestones: Milestone[];
  projects: ProjectSuggestion[];
  careerPaths: string[];
  averageSalary: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  estimatedWeeks: number;
  skills: string[];
  projects: string[];
}

export interface ProjectSuggestion {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  technologies: string[];
  skills: string[];
}

export interface PersonalizedRoadmap {
  track: LearningTrack;
  adaptations: {
    pacing: string;
    focus: string[];
    recommendations: string[];
  };
  nextSteps: string[];
  timelineWeeks: number;
}

// Define learning tracks
const LEARNING_TRACKS: Record<string, LearningTrack> = {
  frontend: {
    id: 'frontend',
    name: 'Frontend Development',
    description: 'Master user interface design and development with modern frameworks',
    icon: 'palette',
    duration: '12-16 weeks',
    skillLevel: 'Beginner to Advanced',
    primarySkills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript'],
    secondarySkills: ['UI/UX Design', 'Responsive Design', 'Web Performance', 'Accessibility'],
    milestones: [
      {
        id: 'frontend-basics',
        title: 'Web Fundamentals',
        description: 'Learn HTML, CSS, and JavaScript basics',
        estimatedWeeks: 4,
        skills: ['HTML', 'CSS', 'JavaScript'],
        projects: ['Personal Portfolio', 'Landing Page']
      },
      {
        id: 'frontend-frameworks',
        title: 'React Development',
        description: 'Build interactive applications with React',
        estimatedWeeks: 6,
        skills: ['React', 'Components', 'State Management'],
        projects: ['Todo App', 'Weather Dashboard']
      },
      {
        id: 'frontend-advanced',
        title: 'Advanced Frontend',
        description: 'TypeScript, testing, and performance optimization',
        estimatedWeeks: 4,
        skills: ['TypeScript', 'Testing', 'Performance'],
        projects: ['E-commerce Frontend', 'Real-time Chat App']
      }
    ],
    projects: [
      {
        id: 'portfolio-site',
        title: 'Personal Portfolio Website',
        description: 'Showcase your skills with a responsive portfolio',
        difficulty: 'Beginner',
        estimatedHours: 20,
        technologies: ['HTML', 'CSS', 'JavaScript'],
        skills: ['Responsive Design', 'CSS Grid', 'JavaScript DOM']
      },
      {
        id: 'react-todo',
        title: 'React Todo Application',
        description: 'Build a feature-rich todo app with React hooks',
        difficulty: 'Intermediate',
        estimatedHours: 30,
        technologies: ['React', 'JavaScript', 'CSS'],
        skills: ['React Hooks', 'State Management', 'Component Design']
      }
    ],
    careerPaths: ['Frontend Developer', 'UI Developer', 'React Developer'],
    averageSalary: '$70,000 - $120,000'
  },
  backend: {
    id: 'backend',
    name: 'Backend Development',
    description: 'Build robust server-side applications and APIs',
    icon: 'database',
    duration: '14-18 weeks',
    skillLevel: 'Beginner to Advanced',
    primarySkills: ['Node.js', 'Express', 'Databases', 'APIs', 'Authentication'],
    secondarySkills: ['Cloud Deployment', 'Security', 'Testing', 'DevOps'],
    milestones: [
      {
        id: 'backend-basics',
        title: 'Server Fundamentals',
        description: 'Learn Node.js and basic server concepts',
        estimatedWeeks: 5,
        skills: ['Node.js', 'Express', 'HTTP'],
        projects: ['REST API', 'Basic Server']
      },
      {
        id: 'backend-database',
        title: 'Database Integration',
        description: 'Work with databases and data modeling',
        estimatedWeeks: 5,
        skills: ['MongoDB', 'SQL', 'Data Modeling'],
        projects: ['Blog API', 'User Management System']
      },
      {
        id: 'backend-advanced',
        title: 'Production Systems',
        description: 'Authentication, security, and deployment',
        estimatedWeeks: 6,
        skills: ['Authentication', 'Security', 'Deployment'],
        projects: ['E-commerce API', 'Real-time Chat Backend']
      }
    ],
    projects: [
      {
        id: 'rest-api',
        title: 'RESTful API Server',
        description: 'Build a complete REST API with CRUD operations',
        difficulty: 'Beginner',
        estimatedHours: 25,
        technologies: ['Node.js', 'Express', 'MongoDB'],
        skills: ['REST API', 'Database Design', 'HTTP Methods']
      },
      {
        id: 'auth-system',
        title: 'User Authentication System',
        description: 'Implement secure user registration and login',
        difficulty: 'Intermediate',
        estimatedHours: 35,
        technologies: ['Node.js', 'JWT', 'bcrypt', 'MongoDB'],
        skills: ['Authentication', 'Security', 'Session Management']
      }
    ],
    careerPaths: ['Backend Developer', 'API Developer', 'DevOps Engineer'],
    averageSalary: '$75,000 - $130,000'
  },
  fullstack: {
    id: 'fullstack',
    name: 'Full-Stack Development',
    description: 'Master both frontend and backend development',
    icon: 'code',
    duration: '20-24 weeks',
    skillLevel: 'Intermediate to Advanced',
    primarySkills: ['React', 'Node.js', 'Databases', 'APIs', 'DevOps'],
    secondarySkills: ['System Design', 'Performance', 'Testing', 'Cloud Services'],
    milestones: [
      {
        id: 'fullstack-frontend',
        title: 'Frontend Mastery',
        description: 'Advanced React and frontend development',
        estimatedWeeks: 8,
        skills: ['React', 'TypeScript', 'State Management'],
        projects: ['React Dashboard', 'SPA Application']
      },
      {
        id: 'fullstack-backend',
        title: 'Backend Development',
        description: 'Server-side development and databases',
        estimatedWeeks: 8,
        skills: ['Node.js', 'APIs', 'Databases'],
        projects: ['Full-stack API', 'Database Design']
      },
      {
        id: 'fullstack-integration',
        title: 'Full-Stack Integration',
        description: 'Connect frontend and backend, deployment',
        estimatedWeeks: 6,
        skills: ['Integration', 'Deployment', 'Testing'],
        projects: ['Complete Web App', 'Production Deployment']
      }
    ],
    projects: [
      {
        id: 'social-platform',
        title: 'Social Media Platform',
        description: 'Build a complete social platform with real-time features',
        difficulty: 'Advanced',
        estimatedHours: 80,
        technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
        skills: ['Full-Stack Development', 'Real-time Features', 'User Management']
      },
      {
        id: 'ecommerce-app',
        title: 'E-commerce Application',
        description: 'Complete online store with payment integration',
        difficulty: 'Advanced',
        estimatedHours: 100,
        technologies: ['React', 'Node.js', 'Stripe', 'PostgreSQL'],
        skills: ['Payment Processing', 'Shopping Cart', 'Order Management']
      }
    ],
    careerPaths: ['Full-Stack Developer', 'Tech Lead', 'Software Engineer'],
    averageSalary: '$80,000 - $150,000'
  },
  mobile: {
    id: 'mobile',
    name: 'Mobile Development',
    description: 'Create native and cross-platform mobile applications',
    icon: 'smartphone',
    duration: '16-20 weeks',
    skillLevel: 'Beginner to Advanced',
    primarySkills: ['React Native', 'JavaScript', 'Mobile UI/UX', 'APIs'],
    secondarySkills: ['Native Development', 'App Store', 'Push Notifications', 'Performance'],
    milestones: [
      {
        id: 'mobile-basics',
        title: 'Mobile Fundamentals',
        description: 'Learn mobile development basics and React Native',
        estimatedWeeks: 6,
        skills: ['React Native', 'Mobile UI', 'Navigation'],
        projects: ['Simple App', 'Navigation Demo']
      },
      {
        id: 'mobile-features',
        title: 'Advanced Features',
        description: 'APIs, state management, and native features',
        estimatedWeeks: 8,
        skills: ['API Integration', 'State Management', 'Native Features'],
        projects: ['Weather App', 'Social Media App']
      },
      {
        id: 'mobile-publishing',
        title: 'App Publishing',
        description: 'Testing, optimization, and app store deployment',
        estimatedWeeks: 4,
        skills: ['Testing', 'Optimization', 'App Store'],
        projects: ['Production App', 'App Store Submission']
      }
    ],
    projects: [
      {
        id: 'fitness-tracker',
        title: 'Fitness Tracking App',
        description: 'Track workouts and progress with data visualization',
        difficulty: 'Intermediate',
        estimatedHours: 60,
        technologies: ['React Native', 'AsyncStorage', 'Charts'],
        skills: ['Data Persistence', 'Charts', 'Mobile UI']
      },
      {
        id: 'social-mobile',
        title: 'Social Mobile App',
        description: 'Social networking app with real-time messaging',
        difficulty: 'Advanced',
        estimatedHours: 90,
        technologies: ['React Native', 'Firebase', 'Push Notifications'],
        skills: ['Real-time Features', 'Push Notifications', 'User Authentication']
      }
    ],
    careerPaths: ['Mobile Developer', 'React Native Developer', 'iOS/Android Developer'],
    averageSalary: '$75,000 - $140,000'
  },
  ai: {
    id: 'ai',
    name: 'AI & Machine Learning',
    description: 'Build intelligent applications with AI and machine learning',
    icon: 'brain',
    duration: '18-22 weeks',
    skillLevel: 'Intermediate to Advanced',
    primarySkills: ['Python', 'Machine Learning', 'Data Science', 'TensorFlow'],
    secondarySkills: ['Deep Learning', 'NLP', 'Computer Vision', 'AI Ethics'],
    milestones: [
      {
        id: 'ai-foundations',
        title: 'AI Foundations',
        description: 'Python programming and data science basics',
        estimatedWeeks: 6,
        skills: ['Python', 'Data Analysis', 'Statistics'],
        projects: ['Data Analysis', 'Python Scripts']
      },
      {
        id: 'ai-ml',
        title: 'Machine Learning',
        description: 'ML algorithms and model training',
        estimatedWeeks: 8,
        skills: ['Machine Learning', 'Model Training', 'TensorFlow'],
        projects: ['Prediction Model', 'Classification App']
      },
      {
        id: 'ai-advanced',
        title: 'Advanced AI',
        description: 'Deep learning and specialized AI applications',
        estimatedWeeks: 6,
        skills: ['Deep Learning', 'NLP', 'Computer Vision'],
        projects: ['AI Chatbot', 'Image Recognition']
      }
    ],
    projects: [
      {
        id: 'chatbot-ai',
        title: 'Intelligent Chatbot',
        description: 'Build an AI-powered chatbot with natural language processing',
        difficulty: 'Advanced',
        estimatedHours: 70,
        technologies: ['Python', 'TensorFlow', 'NLP', 'Flask'],
        skills: ['Natural Language Processing', 'Model Training', 'API Development']
      },
      {
        id: 'recommendation-system',
        title: 'Recommendation Engine',
        description: 'Create a recommendation system for e-commerce',
        difficulty: 'Advanced',
        estimatedHours: 85,
        technologies: ['Python', 'Pandas', 'Scikit-learn', 'Flask'],
        skills: ['Collaborative Filtering', 'Data Processing', 'Machine Learning']
      }
    ],
    careerPaths: ['AI Engineer', 'Data Scientist', 'ML Engineer'],
    averageSalary: '$90,000 - $180,000'
  }
};

// Rule-based track determination
export function generatePersonalizedRoadmap(results: DiagnosticResults): PersonalizedRoadmap {
  const trackScores: Record<string, number> = {
    frontend: 0,
    backend: 0,
    fullstack: 0,
    mobile: 0,
    ai: 0
  };

  // Career goal heavily influences track selection (40% weight)
  const careerGoalWeights: Record<string, Record<string, number>> = {
    'frontend-dev': { frontend: 40, fullstack: 20 },
    'backend-dev': { backend: 40, fullstack: 25 },
    'fullstack-dev': { fullstack: 40, frontend: 15, backend: 15 },
    'mobile-dev': { mobile: 40, fullstack: 10 },
    'ai-engineer': { ai: 40, backend: 10 },
    'freelancer': { fullstack: 25, frontend: 20, backend: 15, mobile: 15, ai: 10 }
  };

  if (careerGoalWeights[results.careerGoal]) {
    Object.entries(careerGoalWeights[results.careerGoal]).forEach(([track, weight]) => {
      trackScores[track] += weight;
    });
  }

  // Technology interests (25% weight)
  const techWeights: Record<string, Record<string, number>> = {
    'web-frontend': { frontend: 25, fullstack: 15 },
    'web-backend': { backend: 25, fullstack: 15 },
    'mobile-apps': { mobile: 25, fullstack: 10 },
    'ai-ml': { ai: 25, backend: 5 },
    'ui-ux': { frontend: 20, mobile: 10 },
    'devops': { backend: 15, fullstack: 10 }
  };

  results.technologies.forEach(tech => {
    if (techWeights[tech]) {
      Object.entries(techWeights[tech]).forEach(([track, weight]) => {
        trackScores[track] += weight;
      });
    }
  });

  // Programming languages (20% weight)
  const langWeights: Record<string, Record<string, number>> = {
    'javascript': { frontend: 15, fullstack: 10, backend: 5 },
    'typescript': { frontend: 10, fullstack: 15, backend: 5 },
    'python': { ai: 20, backend: 10 },
    'react': { frontend: 15, fullstack: 10, mobile: 5 },
    'nodejs': { backend: 15, fullstack: 10 },
    'java': { backend: 10, mobile: 5 }
  };

  results.programmingLanguages.forEach(lang => {
    if (langWeights[lang]) {
      Object.entries(langWeights[lang]).forEach(([track, weight]) => {
        trackScores[track] += weight;
      });
    }
  });

  // Project type preferences (10% weight)
  const projectWeights: Record<string, Record<string, number>> = {
    'web-apps': { frontend: 8, fullstack: 10 },
    'mobile-apps': { mobile: 10, fullstack: 5 },
    'ai-projects': { ai: 10, backend: 3 },
    'ecommerce': { fullstack: 8, frontend: 5, backend: 5 },
    'business-tools': { fullstack: 6, backend: 6 }
  };

  if (projectWeights[results.projectType]) {
    Object.entries(projectWeights[results.projectType]).forEach(([track, weight]) => {
      trackScores[track] += weight;
    });
  }

  // Experience level adjustments (5% weight)
  const experienceAdjustments: Record<string, Record<string, number>> = {
    'beginner': { frontend: 5, mobile: 3 },
    'some-basics': { frontend: 3, fullstack: 3 },
    'intermediate': { fullstack: 5, ai: 3 },
    'advanced': { ai: 5, fullstack: 3, backend: 3 }
  };

  if (experienceAdjustments[results.experience]) {
    Object.entries(experienceAdjustments[results.experience]).forEach(([track, weight]) => {
      trackScores[track] += weight;
    });
  }

  // Determine the best track
  const bestTrack = Object.entries(trackScores).reduce((best, [track, score]) => 
    score > best.score ? { track, score } : best, 
    { track: 'fullstack', score: 0 }
  );

  const selectedTrack = LEARNING_TRACKS[bestTrack.track];

  // Generate adaptations based on user preferences
  const adaptations = generateAdaptations(results, selectedTrack);

  // Calculate timeline based on time commitment
  const timelineMultipliers: Record<string, number> = {
    '1-5-hours': 2.5,
    '5-10-hours': 1.5,
    '10-20-hours': 1.0,
    '20-plus-hours': 0.7
  };

  const baseWeeks = parseInt(selectedTrack.duration.split('-')[0]);
  const timelineWeeks = Math.ceil(baseWeeks * (timelineMultipliers[results.timeCommitment] || 1.5));

  return {
    track: selectedTrack,
    adaptations,
    nextSteps: generateNextSteps(results, selectedTrack),
    timelineWeeks
  };
}

function generateAdaptations(results: DiagnosticResults, track: LearningTrack) {
  const adaptations = {
    pacing: '',
    focus: [] as string[],
    recommendations: [] as string[]
  };

  // Pacing based on time commitment and experience
  const pacingMap: Record<string, string> = {
    '1-5-hours': 'Relaxed pacing with focus on fundamentals',
    '5-10-hours': 'Steady progress with balanced theory and practice',
    '10-20-hours': 'Accelerated learning with intensive practice',
    '20-plus-hours': 'Intensive bootcamp-style learning'
  };

  adaptations.pacing = pacingMap[results.timeCommitment] || pacingMap['5-10-hours'];

  // Focus areas based on learning style and interests
  if (results.learningStyle === 'hands-on') {
    adaptations.focus.push('Project-based learning');
    adaptations.recommendations.push('Build projects from day one');
  }

  if (results.learningStyle === 'structured') {
    adaptations.focus.push('Step-by-step curriculum');
    adaptations.recommendations.push('Follow structured learning paths');
  }

  if (results.environment === 'web-browser') {
    adaptations.recommendations.push('Use online coding platforms');
  }

  if (results.problemSolving === 'collaborative') {
    adaptations.recommendations.push('Join study groups and coding communities');
  }

  // Industry-specific focuses
  if (results.industry !== 'general') {
    adaptations.focus.push(`${results.industry} applications`);
    adaptations.recommendations.push(`Focus on ${results.industry} use cases and projects`);
  }

  return adaptations;
}

function generateNextSteps(results: DiagnosticResults, track: LearningTrack): string[] {
  const steps: string[] = [];

  if (results.experience === 'beginner') {
    steps.push('Start with programming fundamentals');
    steps.push('Set up your development environment');
  }

  steps.push(`Begin with ${track.milestones[0].title}`);
  steps.push('Join relevant developer communities');

  if (results.timeCommitment === '20-plus-hours') {
    steps.push('Consider coding bootcamps or intensive courses');
  }

  steps.push('Build your first project within 2 weeks');
  steps.push('Create a GitHub profile to showcase your work');

  return steps;
}

// Get recommended courses based on track
export function getRecommendedCourses(trackId: string) {
  const courseMap: Record<string, string[]> = {
    frontend: [
      'HTML & CSS Fundamentals',
      'JavaScript Essentials',
      'React Development',
      'Advanced CSS & Animations',
      'TypeScript for React'
    ],
    backend: [
      'Node.js Fundamentals',
      'Express.js Framework',
      'Database Design',
      'API Development',
      'Authentication & Security'
    ],
    fullstack: [
      'Full-Stack JavaScript',
      'MERN Stack Development',
      'Database Management',
      'DevOps Basics',
      'System Design'
    ],
    mobile: [
      'React Native Basics',
      'Mobile UI/UX Design',
      'Native Device Features',
      'App Store Deployment',
      'Mobile Performance'
    ],
    ai: [
      'Python for AI',
      'Machine Learning Basics',
      'Deep Learning with TensorFlow',
      'Natural Language Processing',
      'Computer Vision'
    ]
  };

  return courseMap[trackId] || courseMap.fullstack;
}