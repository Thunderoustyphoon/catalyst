import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { X, ArrowRight, Target, BookOpen, BrainCircuit, Briefcase, CheckCircle } from "lucide-react";

interface TourStep {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  action?: string;
}

interface OnboardingTourProps {
  userType: "student" | "client";
  onComplete: () => void;
  onNavigate: (path: string) => void;
}

export function OnboardingTour({ userType, onComplete, onNavigate }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [visible, setVisible] = useState(true);

  const studentSteps: TourStep[] = [
    {
      title: "Welcome to Catalyst!",
      description: "You're about to start your journey from learning to earning. Let us guide you through the key features.",
      icon: CheckCircle,
    },
    {
      title: "Take the Diagnostic Test",
      description: "First, complete a quick diagnostic test. This helps us build a personalized learning roadmap based on your skills and goals.",
      icon: Target,
      action: "/student/diagnostic",
    },
    {
      title: "Follow Your Learning Path",
      description: "After the diagnostic, you'll get a customized roadmap with courses, quizzes, and projects tailored to your track.",
      icon: BookOpen,
    },
    {
      title: "Meet Your AI Assistant",
      description: "Get instant coding help, career guidance, and portfolio reviews from our AI assistant — available anytime.",
      icon: BrainCircuit,
    },
    {
      title: "Start Earning",
      description: "Once you've built your skills, browse the marketplace for real freelance projects and start your professional career.",
      icon: Briefcase,
    },
  ];

  const clientSteps: TourStep[] = [
    {
      title: "Welcome to Catalyst!",
      description: "You're now connected to India's largest pool of skilled student talent. Let's show you around.",
      icon: CheckCircle,
    },
    {
      title: "Post Your First Project",
      description: "Describe your project requirements and budget. Our matching system will connect you with the best talent.",
      icon: Briefcase,
      action: "/client/projects",
    },
    {
      title: "Discover Talent",
      description: "Browse verified student profiles, portfolios, and skill certifications to find the perfect match.",
      icon: Target,
    },
    {
      title: "Secure Payments",
      description: "Our escrow system ensures safe payments — funds are released only when you approve the work.",
      icon: CheckCircle,
    },
  ];

  const steps = userType === "student" ? studentSteps : clientSteps;
  const step = steps[currentStep];
  const Icon = step.icon;
  const isLast = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLast) {
      handleComplete();
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleComplete = () => {
    setVisible(false);
    localStorage.setItem("catalyst-onboarding-done", "true");
    onComplete();
  };

  const handleAction = () => {
    if (step.action) {
      onNavigate(step.action);
      handleComplete();
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleComplete} />

      {/* Card */}
      <div className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-md animate-scale-in">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-1.5 pt-5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-200 ${
                i === currentStep ? "w-6 bg-foreground" : i < currentStep ? "w-1.5 bg-foreground/60" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>

        {/* Close */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
          onClick={handleComplete}
        >
          <X className="w-4 h-4" />
        </Button>

        {/* Content */}
        <div className="p-6 pt-5 text-center">
          <div className="w-14 h-14 bg-foreground rounded-xl flex items-center justify-center mx-auto mb-5">
            <Icon className="w-7 h-7 text-background" />
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{step.description}</p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 h-10 border-border text-sm"
              onClick={handleComplete}
            >
              Skip Tour
            </Button>
            {step.action ? (
              <Button
                className="flex-1 h-10 bg-foreground text-background hover:bg-foreground/90 text-sm"
                onClick={handleAction}
              >
                Go There Now
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                className="flex-1 h-10 bg-foreground text-background hover:bg-foreground/90 text-sm"
                onClick={handleNext}
              >
                {isLast ? "Get Started" : "Next"}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>

          <p className="text-[10px] text-muted-foreground/60 mt-3">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>
      </div>
    </div>
  );
}
