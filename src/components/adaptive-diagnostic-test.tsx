import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle, Brain, Code, Smartphone, Database, Palette } from "lucide-react";
import { CatalystLogo } from "./catalyst-logo";

interface DiagnosticQuestion {
  id: string;
  question: string;
  description?: string;
  options: {
    value: string;
    label: string;
    description?: string;
  }[];
  multiSelect?: boolean;
  nextQuestionLogic?: (answer: string | string[], allAnswers: Record<string, string | string[]>) => string | null;
}

interface AdaptiveDiagnosticTestProps {
  onComplete: (results: DiagnosticResults) => void;
  onBack?: () => void;
}

export interface DiagnosticResults {
  experience: string;
  technologies: string[];
  projectType: string;
  learningStyle: string;
  careerGoal: string;
  timeCommitment: string;
  programmingLanguages: string[];
  environment: string;
  problemSolving: string;
  industry: string;
}

// Adaptive question system
const createAdaptiveQuestions = (): Record<string, DiagnosticQuestion> => ({
  // Always start with experience - this is foundational
  start: {
    id: "experience",
    question: "What's your current programming experience level?",
    description: "This helps us understand your starting point and tailor the next questions",
    options: [
      { value: "beginner", label: "Complete Beginner", description: "New to programming" },
      { value: "some-basics", label: "Some Basics", description: "Know basic concepts, written simple programs" },
      { value: "intermediate", label: "Intermediate", description: "Built several projects, comfortable with frameworks" },
      { value: "advanced", label: "Advanced", description: "Professional experience, complex applications" }
    ],
    nextQuestionLogic: (answer) => {
      // Beginners get simpler technology options
      if (answer === "beginner") return "tech-beginner";
      if (answer === "some-basics") return "tech-basic";
      // Intermediate/Advanced get full tech options
      return "tech-advanced";
    }
  },

  // Beginner technology path
  "tech-beginner": {
    id: "technologies",
    question: "Which area of technology excites you most as a beginner?",
    description: "Since you're new to programming, we'll focus on beginner-friendly paths",
    options: [
      { value: "web-frontend", label: "Website Building", description: "Create visual websites and user interfaces" },
      { value: "web-backend", label: "Behind-the-Scenes Logic", description: "Work with data and server functionality" },
      { value: "mobile-apps", label: "Mobile Apps", description: "Build apps for phones and tablets" },
      { value: "ai-ml", label: "Artificial Intelligence", description: "Create smart applications (requires math)" }
    ],
    multiSelect: true,
    nextQuestionLogic: (answer, allAnswers) => {
      const techs = Array.isArray(answer) ? answer : [answer];
      // For beginners, go to learning style first to set expectations
      return "learning-style-beginner";
    }
  },

  // Basic experience technology path
  "tech-basic": {
    id: "technologies",
    question: "Which technologies would you like to explore further?",
    description: "Based on your basic experience, these paths will help you advance",
    options: [
      { value: "web-frontend", label: "Frontend Development", description: "React, JavaScript, modern UI frameworks" },
      { value: "web-backend", label: "Backend Development", description: "APIs, databases, server architecture" },
      { value: "mobile-apps", label: "Mobile Development", description: "React Native, iOS/Android apps" },
      { value: "ai-ml", label: "AI & Machine Learning", description: "Python, data science, intelligent systems" },
      { value: "ui-ux", label: "UI/UX Design", description: "User experience and interface design" }
    ],
    multiSelect: true,
    nextQuestionLogic: (answer) => "career-goals-basic"
  },

  // Advanced experience technology path
  "tech-advanced": {
    id: "technologies",
    question: "Which advanced technology areas align with your interests?",
    description: "Given your experience, you can tackle more complex technology stacks",
    options: [
      { value: "web-frontend", label: "Advanced Frontend", description: "Complex React apps, TypeScript, performance" },
      { value: "web-backend", label: "Backend Architecture", description: "Microservices, cloud, scalable systems" },
      { value: "mobile-apps", label: "Mobile Engineering", description: "Native development, cross-platform solutions" },
      { value: "ai-ml", label: "AI Engineering", description: "Machine learning, deep learning, MLOps" },
      { value: "devops", label: "DevOps & Cloud", description: "Infrastructure, CI/CD, cloud architecture" },
      { value: "ui-ux", label: "Advanced UI/UX", description: "Design systems, research, prototyping" }
    ],
    multiSelect: true,
    nextQuestionLogic: (answer) => "career-goals-advanced"
  },

  // Beginner learning style
  "learning-style-beginner": {
    id: "learningStyle",
    question: "How would you prefer to start learning programming?",
    description: "As a beginner, choosing the right learning approach is crucial for success",
    options: [
      { value: "hands-on", label: "Learning by Doing", description: "Jump into building simple projects immediately" },
      { value: "structured", label: "Step-by-Step Courses", description: "Follow a clear, guided curriculum" },
      { value: "video-tutorials", label: "Video Learning", description: "Watch tutorials and code along" },
      { value: "peer-learning", label: "Learn with Others", description: "Join study groups or coding communities" }
    ],
    nextQuestionLogic: (answer, allAnswers) => {
      const techs = allAnswers.technologies as string[] || [];
      if (techs.includes("web-frontend")) return "career-frontend-focus";
      if (techs.includes("mobile-apps")) return "career-mobile-focus";
      if (techs.includes("ai-ml")) return "career-ai-focus";
      return "career-goals-beginner";
    }
  },

  // Frontend-focused career question
  "career-frontend-focus": {
    id: "careerGoal",
    question: "What specific frontend career path interests you most?",
    description: "Since you're interested in frontend, let's narrow down your career focus",
    options: [
      { value: "frontend-dev", label: "Frontend Developer", description: "Specialize in user interfaces and experiences" },
      { value: "ui-ux", label: "UI/UX Designer", description: "Focus on design and user experience" },
      { value: "fullstack-dev", label: "Full-Stack Developer", description: "Frontend + backend development" },
      { value: "freelancer", label: "Freelance Web Developer", description: "Work independently on web projects" }
    ],
    nextQuestionLogic: () => "project-type-web"
  },

  // Mobile-focused career question
  "career-mobile-focus": {
    id: "careerGoal",
    question: "What's your mobile development career goal?",
    description: "Mobile development offers various specialization paths",
    options: [
      { value: "mobile-dev", label: "Mobile App Developer", description: "Build native or cross-platform apps" },
      { value: "fullstack-dev", label: "Full-Stack Mobile Dev", description: "Mobile apps + backend services" },
      { value: "ui-ux", label: "Mobile UX Designer", description: "Focus on mobile user experience" },
      { value: "freelancer", label: "Freelance App Developer", description: "Independent mobile app projects" }
    ],
    nextQuestionLogic: () => "project-type-mobile"
  },

  // AI-focused career question
  "career-ai-focus": {
    id: "careerGoal",
    question: "Which AI career path appeals to you?",
    description: "AI offers exciting but challenging career opportunities",
    options: [
      { value: "ai-engineer", label: "AI Engineer", description: "Build AI-powered applications" },
      { value: "data-scientist", label: "Data Scientist", description: "Analyze data and create insights" },
      { value: "ml-engineer", label: "ML Engineer", description: "Deploy and maintain ML systems" },
      { value: "ai-researcher", label: "AI Researcher", description: "Advance AI technology and methods" }
    ],
    nextQuestionLogic: () => "project-type-ai"
  },

  // Basic experience career goals
  "career-goals-basic": {
    id: "careerGoal",
    question: "What's your primary career goal?",
    description: "With your basic experience, these paths are well within reach",
    options: [
      { value: "frontend-dev", label: "Frontend Developer", description: "Specialize in user interfaces" },
      { value: "backend-dev", label: "Backend Developer", description: "Work with servers and databases" },
      { value: "fullstack-dev", label: "Full-Stack Developer", description: "Both frontend and backend" },
      { value: "mobile-dev", label: "Mobile Developer", description: "Create mobile applications" },
      { value: "freelancer", label: "Freelance Developer", description: "Work independently on projects" }
    ],
    nextQuestionLogic: (answer) => {
      if (answer === "frontend-dev") return "project-type-web";
      if (answer === "mobile-dev") return "project-type-mobile";
      return "project-type-general";
    }
  },

  // Advanced experience career goals
  "career-goals-advanced": {
    id: "careerGoal",
    question: "What's your advanced career objective?",
    description: "With your experience, you can target senior and specialized roles",
    options: [
      { value: "senior-dev", label: "Senior Developer", description: "Technical leadership and complex projects" },
      { value: "tech-lead", label: "Tech Lead", description: "Lead development teams and architecture" },
      { value: "ai-engineer", label: "AI/ML Engineer", description: "Advanced AI and machine learning" },
      { value: "architect", label: "Software Architect", description: "Design large-scale systems" },
      { value: "freelancer", label: "Freelance Specialist", description: "High-value independent consulting" }
    ],
    nextQuestionLogic: () => "time-commitment-advanced"
  },

  // Beginner career goals
  "career-goals-beginner": {
    id: "careerGoal",
    question: "What's your long-term career vision?",
    description: "Even as a beginner, it's good to have a career destination in mind",
    options: [
      { value: "frontend-dev", label: "Frontend Developer", description: "Create user-friendly websites and apps" },
      { value: "fullstack-dev", label: "Full-Stack Developer", description: "Handle both frontend and backend" },
      { value: "mobile-dev", label: "Mobile App Developer", description: "Build apps for smartphones" },
      { value: "freelancer", label: "Freelance Developer", description: "Work for yourself on various projects" }
    ],
    nextQuestionLogic: () => "time-commitment-beginner"
  },

  // Web-focused project types
  "project-type-web": {
    id: "projectType",
    question: "What type of web projects excite you most?",
    description: "Understanding your project interests helps us suggest relevant learning materials",
    options: [
      { value: "web-apps", label: "Interactive Web Apps", description: "Dynamic applications with user interaction" },
      { value: "ecommerce", label: "E-commerce Sites", description: "Online stores and shopping platforms" },
      { value: "business-tools", label: "Business Applications", description: "Productivity and enterprise tools" },
      { value: "portfolios", label: "Portfolio & Marketing Sites", description: "Showcase and promotional websites" }
    ],
    nextQuestionLogic: () => "programming-languages-web"
  },

  // Mobile-focused project types
  "project-type-mobile": {
    id: "projectType",
    question: "What kind of mobile apps interest you?",
    description: "Mobile apps span many categories - let's find your niche",
    options: [
      { value: "mobile-apps", label: "Consumer Apps", description: "Apps for everyday users and consumers" },
      { value: "business-apps", label: "Business Apps", description: "Enterprise and productivity applications" },
      { value: "games", label: "Mobile Games", description: "Entertainment and gaming applications" },
      { value: "social-apps", label: "Social Apps", description: "Communication and social networking" }
    ],
    nextQuestionLogic: () => "programming-languages-mobile"
  },

  // AI-focused project types
  "project-type-ai": {
    id: "projectType",
    question: "What AI applications interest you most?",
    description: "AI has many applications - let's identify your focus area",
    options: [
      { value: "ai-projects", label: "AI Chatbots", description: "Conversational AI and virtual assistants" },
      { value: "data-analysis", label: "Data Analysis", description: "Insights and predictions from data" },
      { value: "computer-vision", label: "Computer Vision", description: "Image and video processing applications" },
      { value: "automation", label: "Automation Tools", description: "AI-powered workflow automation" }
    ],
    nextQuestionLogic: () => "programming-languages-ai"
  },

  // General project types
  "project-type-general": {
    id: "projectType",
    question: "What type of projects would you enjoy building?",
    description: "This helps us understand what motivates you to code",
    options: [
      { value: "web-apps", label: "Web Applications", description: "Interactive websites and platforms" },
      { value: "mobile-apps", label: "Mobile Applications", description: "Smartphone and tablet apps" },
      { value: "business-tools", label: "Business Tools", description: "Productivity and workflow applications" },
      { value: "creative-projects", label: "Creative Projects", description: "Art, music, or entertainment applications" }
    ],
    nextQuestionLogic: () => "programming-languages-general"
  },

  // Web programming languages
  "programming-languages-web": {
    id: "programmingLanguages",
    question: "Which web technologies would you like to master?",
    description: "Select the programming languages and frameworks that align with your web development goals",
    options: [
      { value: "javascript", label: "JavaScript", description: "Essential for all web development" },
      { value: "typescript", label: "TypeScript", description: "Typed JavaScript for larger applications" },
      { value: "react", label: "React", description: "Popular frontend framework" },
      { value: "nodejs", label: "Node.js", description: "JavaScript for backend development" },
      { value: "html-css", label: "HTML & CSS", description: "Web fundamentals and styling" }
    ],
    multiSelect: true,
    nextQuestionLogic: () => "time-commitment-general"
  },

  // Mobile programming languages
  "programming-languages-mobile": {
    id: "programmingLanguages",
    question: "Which mobile development technologies interest you?",
    description: "Mobile development has several technology options",
    options: [
      { value: "react-native", label: "React Native", description: "Cross-platform mobile development" },
      { value: "javascript", label: "JavaScript", description: "Core language for React Native" },
      { value: "swift", label: "Swift", description: "Native iOS development" },
      { value: "kotlin", label: "Kotlin", description: "Native Android development" },
      { value: "flutter", label: "Flutter", description: "Google's cross-platform framework" }
    ],
    multiSelect: true,
    nextQuestionLogic: () => "time-commitment-general"
  },

  // AI programming languages
  "programming-languages-ai": {
    id: "programmingLanguages",
    question: "Which AI/ML technologies would you like to learn?",
    description: "AI development requires specific programming languages and tools",
    options: [
      { value: "python", label: "Python", description: "Primary language for AI/ML development" },
      { value: "tensorflow", label: "TensorFlow", description: "Google's machine learning framework" },
      { value: "pytorch", label: "PyTorch", description: "Facebook's deep learning framework" },
      { value: "pandas", label: "Pandas", description: "Data manipulation and analysis" },
      { value: "numpy", label: "NumPy", description: "Numerical computing library" }
    ],
    multiSelect: true,
    nextQuestionLogic: () => "time-commitment-general"
  },

  // General programming languages
  "programming-languages-general": {
    id: "programmingLanguages",
    question: "Which programming languages interest you?",
    description: "Select languages that match your project interests",
    options: [
      { value: "javascript", label: "JavaScript", description: "Web development, versatile language" },
      { value: "python", label: "Python", description: "AI/ML, data science, backend development" },
      { value: "typescript", label: "TypeScript", description: "Typed JavaScript for larger applications" },
      { value: "java", label: "Java", description: "Enterprise applications, Android development" },
      { value: "react", label: "React", description: "Frontend framework for building UIs" }
    ],
    multiSelect: true,
    nextQuestionLogic: () => "time-commitment-general"
  },

  // Time commitment - beginner
  "time-commitment-beginner": {
    id: "timeCommitment",
    question: "How much time can you dedicate to learning each week?",
    description: "As a beginner, consistency is more important than intensity",
    options: [
      { value: "1-5-hours", label: "1-5 hours", description: "Start slow and build habits" },
      { value: "5-10-hours", label: "5-10 hours", description: "Steady progress with manageable commitment" },
      { value: "10-20-hours", label: "10-20 hours", description: "Serious commitment to fast progress" },
      { value: "20-plus-hours", label: "20+ hours", description: "Intensive learning (consider bootcamps)" }
    ],
    nextQuestionLogic: () => "environment-beginner"
  },

  // Time commitment - advanced
  "time-commitment-advanced": {
    id: "timeCommitment",
    question: "How much time can you invest in advancing your skills?",
    description: "With your experience, you can handle more intensive learning",
    options: [
      { value: "5-10-hours", label: "5-10 hours", description: "Steady skill advancement" },
      { value: "10-20-hours", label: "10-20 hours", description: "Accelerated skill development" },
      { value: "20-plus-hours", label: "20+ hours", description: "Intensive upskilling or career transition" }
    ],
    nextQuestionLogic: () => "problem-solving-advanced"
  },

  // Time commitment - general
  "time-commitment-general": {
    id: "timeCommitment",
    question: "How much time can you dedicate to learning weekly?",
    description: "This helps us pace your learning journey appropriately",
    options: [
      { value: "1-5-hours", label: "1-5 hours", description: "Casual learning, taking it slow" },
      { value: "5-10-hours", label: "5-10 hours", description: "Consistent part-time learning" },
      { value: "10-20-hours", label: "10-20 hours", description: "Serious commitment to learning" },
      { value: "20-plus-hours", label: "20+ hours", description: "Intensive, career-focused learning" }
    ],
    nextQuestionLogic: (answer, allAnswers) => {
      const experience = allAnswers.experience;
      if (experience === "beginner") return "environment-beginner";
      if (experience === "advanced") return "problem-solving-advanced";
      return "environment-general";
    }
  },

  // Environment - beginner
  "environment-beginner": {
    id: "environment",
    question: "Where would you prefer to start coding?",
    description: "The right development environment can make learning easier",
    options: [
      { value: "web-browser", label: "Online Code Editors", description: "Start coding immediately in your browser" },
      { value: "simple-editor", label: "Simple Code Editor", description: "Lightweight editor like VS Code" },
      { value: "guided-platform", label: "Learning Platforms", description: "Interactive coding platforms with guidance" }
    ],
    nextQuestionLogic: () => "learning-style-final"
  },

  // Environment - general
  "environment-general": {
    id: "environment",
    question: "What development environment appeals to you?",
    description: "This helps us suggest appropriate tools and setups",
    options: [
      { value: "web-browser", label: "Web Browser", description: "Frontend development, immediate visual feedback" },
      { value: "ide-desktop", label: "Desktop IDE", description: "Full-featured development environment" },
      { value: "cloud-based", label: "Cloud-Based", description: "Online development environments" },
      { value: "command-line", label: "Command Line", description: "Terminal-based development workflow" }
    ],
    nextQuestionLogic: (answer, allAnswers) => {
      const experience = allAnswers.experience;
      if (experience === "beginner") return "learning-style-final";
      return "problem-solving-general";
    }
  },

  // Problem solving - advanced
  "problem-solving-advanced": {
    id: "problemSolving",
    question: "How do you approach complex technical problems?",
    description: "Understanding your problem-solving style helps us match you with suitable methodologies",
    options: [
      { value: "systematic", label: "Systematic Analysis", description: "Break down problems methodically" },
      { value: "research-first", label: "Research-Driven", description: "Study existing solutions and best practices" },
      { value: "prototype-fast", label: "Rapid Prototyping", description: "Build quick solutions and iterate" },
      { value: "collaborative", label: "Team Collaboration", description: "Work with others to solve complex problems" }
    ],
    nextQuestionLogic: () => "industry-advanced"
  },

  // Problem solving - general
  "problem-solving-general": {
    id: "problemSolving",
    question: "How do you prefer to approach problems?",
    description: "Your problem-solving style influences the best learning approach",
    options: [
      { value: "systematic", label: "Step by Step", description: "Break down problems systematically" },
      { value: "creative", label: "Creative Solutions", description: "Think outside the box" },
      { value: "research-first", label: "Research First", description: "Study before implementing" },
      { value: "trial-error", label: "Learn by Doing", description: "Experiment and learn from mistakes" },
      { value: "collaborative", label: "Work with Others", description: "Solve problems through collaboration" }
    ],
    nextQuestionLogic: (answer, allAnswers) => {
      const experience = allAnswers.experience;
      if (experience === "advanced") return "industry-advanced";
      return "industry-general";
    }
  },

  // Learning style - final for beginners
  "learning-style-final": {
    id: "learningStyle",
    question: "What learning approach works best for you?",
    description: "This helps us customize your learning experience",
    options: [
      { value: "hands-on", label: "Learn by Building", description: "Jump into projects and learn as you go" },
      { value: "structured", label: "Structured Learning", description: "Follow step-by-step courses and tutorials" },
      { value: "video-tutorials", label: "Video Learning", description: "Watch and code along with video tutorials" },
      { value: "peer-learning", label: "Community Learning", description: "Learn with others in study groups" }
    ],
    nextQuestionLogic: () => "industry-general"
  },

  // Industry - advanced
  "industry-advanced": {
    id: "industry",
    question: "Which industry sector interests you for advanced technical work?",
    description: "Industry focus helps us suggest relevant advanced projects and skills",
    options: [
      { value: "fintech", label: "Financial Technology", description: "Advanced trading, blockchain, payments" },
      { value: "healthtech", label: "Healthcare Technology", description: "Medical devices, health data, telemedicine" },
      { value: "enterprise", label: "Enterprise Software", description: "Large-scale business systems" },
      { value: "startup", label: "Startup Technology", description: "Innovative, fast-paced technology solutions" },
      { value: "research", label: "Research & Development", description: "Cutting-edge technology and innovation" }
    ],
    nextQuestionLogic: () => "complete"
  },

  // Industry - general
  "industry-general": {
    id: "industry",
    question: "Which industry interests you most for tech work?",
    description: "This helps us suggest relevant project types and skills",
    options: [
      { value: "fintech", label: "Fintech", description: "Financial technology and payments" },
      { value: "healthtech", label: "HealthTech", description: "Healthcare and medical applications" },
      { value: "edtech", label: "EdTech", description: "Educational technology and learning platforms" },
      { value: "ecommerce", label: "E-commerce", description: "Online retail and marketplaces" },
      { value: "social-media", label: "Social Media", description: "Social platforms and community building" },
      { value: "general", label: "Open to All", description: "Interested in various industries" }
    ],
    nextQuestionLogic: () => "complete"
  }
});

export function AdaptiveDiagnosticTest({ onComplete, onBack }: AdaptiveDiagnosticTestProps) {
  const [currentQuestionId, setCurrentQuestionId] = useState("start");
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [questionHistory, setQuestionHistory] = useState<string[]>(["start"]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = createAdaptiveQuestions();
  const currentQuestion = questions[currentQuestionId];
  const questionIndex = questionHistory.length;
  const totalEstimatedQuestions = 8; // Approximate total questions
  const progress = (questionIndex / totalEstimatedQuestions) * 100;
  const isFirstQuestion = questionIndex === 1;

  const handleAnswer = (questionId: string, value: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (!currentQuestion.nextQuestionLogic || currentQuestionId === "complete") {
      handleSubmit();
      return;
    }

    const currentAnswer = answers[currentQuestion.id];
    const nextQuestionId = currentQuestion.nextQuestionLogic(currentAnswer, answers);
    
    if (!nextQuestionId || nextQuestionId === "complete") {
      handleSubmit();
      return;
    }

    setCurrentQuestionId(nextQuestionId);
    setQuestionHistory(prev => [...prev, nextQuestionId]);
  };

  const handlePrevious = () => {
    if (questionHistory.length > 1) {
      const newHistory = questionHistory.slice(0, -1);
      const prevQuestionId = newHistory[newHistory.length - 1];
      setQuestionHistory(newHistory);
      setCurrentQuestionId(prevQuestionId);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Convert answers to expected format
    const results: DiagnosticResults = {
      experience: answers.experience as string || 'beginner',
      technologies: Array.isArray(answers.technologies) ? answers.technologies : [answers.technologies as string || 'web-frontend'],
      projectType: answers.projectType as string || 'web-apps',
      learningStyle: answers.learningStyle as string || 'hands-on',
      careerGoal: answers.careerGoal as string || 'fullstack-dev',
      timeCommitment: answers.timeCommitment as string || '5-10-hours',
      programmingLanguages: Array.isArray(answers.programmingLanguages) ? answers.programmingLanguages : [answers.programmingLanguages as string || 'javascript'],
      environment: answers.environment as string || 'web-browser',
      problemSolving: answers.problemSolving as string || 'systematic',
      industry: answers.industry as string || 'general'
    };

    // Simulate processing delay
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete(results);
    }, 1500);
  };

  const canProceed = () => {
    const currentAnswer = answers[currentQuestion.id];
    return currentAnswer && (Array.isArray(currentAnswer) ? currentAnswer.length > 0 : currentAnswer.length > 0);
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center animate-fade-in">
          <CardContent className="pt-8 pb-8 space-y-6">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Analyzing Your Responses</h3>
              <p className="text-muted-foreground text-sm">
                Creating your personalized learning roadmap based on your adaptive responses...
              </p>
            </div>
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {onBack && isFirstQuestion && (
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="absolute top-4 left-4 transition-smooth hover-scale"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      )}
      
      <Card className="w-full max-w-2xl shadow-lg border animate-fade-in">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="flex items-center justify-center">
            <CatalystLogo size="md" />
          </div>
          <div>
            <h2 className="text-xl font-medium text-foreground mb-2">Adaptive Tech Career Assessment</h2>
            <p className="text-muted-foreground">
              Question {questionIndex} - Personalized based on your answers
            </p>
          </div>
          <Progress value={Math.min(progress, 100)} className="w-full h-2" />
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
              {currentQuestion.description && (
                <p className="text-sm text-muted-foreground">{currentQuestion.description}</p>
              )}
            </div>

            {/* Multi-select questions */}
            {currentQuestion.multiSelect ? (
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground mb-4">
                  Select all that apply:
                </div>
                {currentQuestion.options.map((option) => {
                  const isSelected = Array.isArray(answers[currentQuestion.id]) 
                    ? (answers[currentQuestion.id] as string[]).includes(option.value)
                    : answers[currentQuestion.id] === option.value;
                  
                  return (
                    <div 
                      key={option.value}
                      onClick={() => {
                        const currentAnswer = answers[currentQuestion.id] || [];
                        const currentArray = Array.isArray(currentAnswer) ? currentAnswer : [];
                        
                        if (isSelected) {
                          handleAnswer(currentQuestion.id, currentArray.filter(v => v !== option.value));
                        } else {
                          handleAnswer(currentQuestion.id, [...currentArray, option.value]);
                        }
                      }}
                      className={`p-4 rounded-lg border cursor-pointer transition-smooth hover-lift ${
                        isSelected 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-4 h-4 mt-0.5 rounded border-2 flex items-center justify-center ${
                          isSelected ? 'border-primary bg-primary' : 'border-border'
                        }`}>
                          {isSelected && <CheckCircle className="w-3 h-3 text-primary-foreground" />}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{option.label}</div>
                          {option.description && (
                            <div className="text-sm text-muted-foreground mt-1">{option.description}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Single-select questions */
              <RadioGroup 
                value={answers[currentQuestion.id] as string || ""} 
                onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
                className="space-y-3"
              >
                {currentQuestion.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-3">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label 
                      htmlFor={option.value} 
                      className="flex items-start space-x-3 cursor-pointer flex-1 p-3 rounded-lg border border-border hover:border-primary/50 transition-smooth"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{option.label}</div>
                        {option.description && (
                          <div className="text-sm text-muted-foreground mt-1">{option.description}</div>
                        )}
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>

          <div className="flex justify-between pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstQuestion}
              className="transition-smooth"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="transition-smooth hover-lift bg-primary hover:bg-primary/90"
            >
              {!currentQuestion.nextQuestionLogic || currentQuestionId === "complete" ? 'Complete Assessment' : 'Next'}
              {currentQuestion.nextQuestionLogic && currentQuestionId !== "complete" && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}