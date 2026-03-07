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
}

interface DiagnosticTestProps {
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

const questions: DiagnosticQuestion[] = [
  {
    id: "experience",
    question: "What's your current programming experience level?",
    description: "This helps us understand your starting point",
    options: [
      { value: "beginner", label: "Complete Beginner", description: "New to programming" },
      { value: "some-basics", label: "Some Basics", description: "Know basic concepts, written simple programs" },
      { value: "intermediate", label: "Intermediate", description: "Built several projects, comfortable with frameworks" },
      { value: "advanced", label: "Advanced", description: "Professional experience, complex applications" }
    ]
  },
  {
    id: "technologies",
    question: "Which technologies interest you most?",
    description: "Select all that apply - this helps determine your learning path",
    options: [
      { value: "web-frontend", label: "Web Frontend", description: "React, HTML, CSS, JavaScript" },
      { value: "web-backend", label: "Web Backend", description: "APIs, Databases, Server Logic" },
      { value: "mobile-apps", label: "Mobile Apps", description: "iOS, Android, React Native" },
      { value: "ai-ml", label: "AI & Machine Learning", description: "Python, TensorFlow, Data Science" },
      { value: "ui-ux", label: "UI/UX Design", description: "User Interface & Experience Design" },
      { value: "devops", label: "DevOps & Cloud", description: "Deployment, AWS, Docker" }
    ]
  },
  {
    id: "projectType",
    question: "What type of projects excite you most?",
    description: "Understanding your interests helps us suggest relevant learning materials",
    options: [
      { value: "web-apps", label: "Web Applications", description: "Interactive websites and web platforms" },
      { value: "mobile-apps", label: "Mobile Applications", description: "iOS and Android apps" },
      { value: "ai-projects", label: "AI/ML Projects", description: "Chatbots, recommendation systems, data analysis" },
      { value: "games", label: "Games & Interactive Media", description: "Browser games, interactive experiences" },
      { value: "ecommerce", label: "E-commerce Platforms", description: "Online stores and marketplaces" },
      { value: "business-tools", label: "Business Tools", description: "Productivity apps and enterprise solutions" }
    ]
  },
  {
    id: "learningStyle",
    question: "How do you prefer to learn new technologies?",
    description: "This helps us customize your learning experience",
    options: [
      { value: "hands-on", label: "Hands-on Projects", description: "Learn by building real applications" },
      { value: "structured", label: "Structured Courses", description: "Step-by-step guided learning" },
      { value: "documentation", label: "Documentation & Reading", description: "Learn from official docs and articles" },
      { value: "video-tutorials", label: "Video Tutorials", description: "Visual learning with video content" },
      { value: "peer-learning", label: "Peer Learning", description: "Collaborative learning with others" }
    ]
  },
  {
    id: "careerGoal",
    question: "What's your primary career goal?",
    description: "Understanding your aspirations helps us tailor recommendations",
    options: [
      { value: "frontend-dev", label: "Frontend Developer", description: "Focus on user interfaces and experiences" },
      { value: "backend-dev", label: "Backend Developer", description: "Server-side logic and databases" },
      { value: "fullstack-dev", label: "Full-Stack Developer", description: "Both frontend and backend development" },
      { value: "mobile-dev", label: "Mobile Developer", description: "Native or cross-platform mobile apps" },
      { value: "ai-engineer", label: "AI/ML Engineer", description: "Machine learning and artificial intelligence" },
      { value: "freelancer", label: "Freelance Specialist", description: "Work independently on various projects" }
    ]
  },
  {
    id: "timeCommitment",
    question: "How much time can you dedicate to learning weekly?",
    description: "This helps us pace your learning journey appropriately",
    options: [
      { value: "1-5-hours", label: "1-5 hours", description: "Casual learning, taking it slow" },
      { value: "5-10-hours", label: "5-10 hours", description: "Consistent part-time learning" },
      { value: "10-20-hours", label: "10-20 hours", description: "Serious commitment to learning" },
      { value: "20-plus-hours", label: "20+ hours", description: "Intensive, career-focused learning" }
    ]
  },
  {
    id: "programmingLanguages",
    question: "Which programming languages interest you?",
    description: "Select the languages you'd like to learn or improve",
    options: [
      { value: "javascript", label: "JavaScript", description: "Web development, versatile language" },
      { value: "python", label: "Python", description: "AI/ML, data science, backend development" },
      { value: "typescript", label: "TypeScript", description: "Typed JavaScript for larger applications" },
      { value: "java", label: "Java", description: "Enterprise applications, Android development" },
      { value: "react", label: "React", description: "Frontend framework for building UIs" },
      { value: "nodejs", label: "Node.js", description: "Backend JavaScript development" }
    ]
  },
  {
    id: "environment",
    question: "What development environment appeals to you?",
    description: "This helps us suggest appropriate tools and setups",
    options: [
      { value: "web-browser", label: "Web Browser", description: "Frontend development, immediate visual feedback" },
      { value: "ide-desktop", label: "Desktop IDE", description: "Full-featured development environment" },
      { value: "cloud-based", label: "Cloud-Based", description: "Online development environments" },
      { value: "mobile-first", label: "Mobile-First", description: "Developing primarily for mobile devices" },
      { value: "command-line", label: "Command Line", description: "Terminal-based development workflow" }
    ]
  },
  {
    id: "problemSolving",
    question: "How do you approach problem-solving?",
    description: "Understanding your thinking style helps us match you with suitable methodologies",
    options: [
      { value: "systematic", label: "Systematic Approach", description: "Break down problems step by step" },
      { value: "creative", label: "Creative Solutions", description: "Think outside the box, innovative approaches" },
      { value: "research-first", label: "Research First", description: "Study existing solutions before implementing" },
      { value: "trial-error", label: "Trial and Error", description: "Learn through experimentation" },
      { value: "collaborative", label: "Collaborative", description: "Work with others to solve problems" }
    ]
  },
  {
    id: "industry",
    question: "Which industry interests you most for tech work?",
    description: "This helps us suggest relevant project types and skills",
    options: [
      { value: "fintech", label: "Fintech", description: "Financial technology and payments" },
      { value: "healthtech", label: "HealthTech", description: "Healthcare and medical applications" },
      { value: "edtech", label: "EdTech", description: "Educational technology and learning platforms" },
      { value: "ecommerce", label: "E-commerce", description: "Online retail and marketplaces" },
      { value: "social-media", label: "Social Media", description: "Social platforms and community building" },
      { value: "general", label: "General/Multiple", description: "Open to various industries" }
    ]
  }
];

export function DiagnosticTest({ onComplete, onBack }: DiagnosticTestProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleAnswer = (questionId: string, value: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Convert answers to proper format
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

  const getTrackIcon = (trackHint: string) => {
    switch (trackHint) {
      case 'frontend': return <Palette className="w-5 h-5" />;
      case 'backend': return <Database className="w-5 h-5" />;
      case 'mobile': return <Smartphone className="w-5 h-5" />;
      case 'ai': return <Brain className="w-5 h-5" />;
      default: return <Code className="w-5 h-5" />;
    }
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
                Creating your personalized learning roadmap...
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
            <h2 className="text-xl font-medium text-foreground mb-2">Tech Career Assessment</h2>
            <p className="text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
          <Progress value={progress} className="w-full h-2" />
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
            {(currentQuestion.id === 'technologies' || currentQuestion.id === 'programmingLanguages') ? (
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
              {isLastQuestion ? 'Complete Assessment' : 'Next'}
              {!isLastQuestion && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}