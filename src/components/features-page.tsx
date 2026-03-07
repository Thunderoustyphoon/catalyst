import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { 
  ArrowLeft, BookOpen, Briefcase, Users, Target, Code, Database,
  Palette, BarChart3, Shield, Clock, Globe, Award, Star, Zap
} from "lucide-react";
import { CatalystLogo } from "./catalyst-logo";
import { useNavigate } from "react-router";

interface FeaturesPageProps {
  onNavigate?: (screen: string) => void;
}

export function FeaturesPage({ onNavigate }: FeaturesPageProps) {
  const navigate = useNavigate();
  const go = (path: string) => navigate(path);
  const goBack = () => navigate("/");

  const mainFeatures = [
    {
      icon: BookOpen,
      title: "Adaptive Learning Paths",
      description: "AI-powered personalized learning experiences that adapt to your skill level, learning pace, and career goals.",
      highlights: ["Personalized curriculum", "Real-time difficulty adjustment", "Progress tracking"]
    },
    {
      icon: Briefcase,
      title: "Real Client Projects",
      description: "Work on actual projects from MSMEs and startups to build a professional portfolio while earning.",
      highlights: ["Live project experience", "Industry exposure", "Portfolio building"]
    },
    {
      icon: Users,
      title: "Expert Mentorship",
      description: "Get guidance from industry professionals who have successfully navigated their careers.",
      highlights: ["1-on-1 mentoring", "Career guidance", "Technical reviews"]
    },
    {
      icon: Target,
      title: "Job Placement Support",
      description: "Direct placement opportunities with partner companies and job readiness preparation.",
      highlights: ["Interview preparation", "Resume building", "Company partnerships"]
    }
  ];

  const technicalFeatures = [
    {
      icon: Code,
      title: "Interactive Code Sandboxes",
      description: "Practice coding in real browser environments with instant feedback and debugging support."
    },
    {
      icon: Database,
      title: "Skill Assessment Engine",
      description: "Comprehensive testing system that evaluates your progress and identifies areas for improvement."
    },
    {
      icon: Palette,
      title: "Design Thinking Workshops",
      description: "Learn user experience design and product thinking through hands-on workshops."
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Detailed insights into your learning progress, skill development, and earning potential."
    },
    {
      icon: Shield,
      title: "Secure Escrow System",
      description: "Protected milestone-based payments ensuring both clients and freelancers are secure."
    },
    {
      icon: Clock,
      title: "Time Management Tools",
      description: "Built-in productivity features to help you balance learning and earning effectively."
    }
  ];

  const platformFeatures = [
    {
      icon: Globe,
      title: "Aadhaar Integration",
      description: "Secure identity verification for trusted interactions between all platform users."
    },
    {
      icon: Award,
      title: "Skill Certifications",
      description: "Industry-recognized certificates that validate your expertise to potential employers."
    },
    {
      icon: Star,
      title: "Rating & Reviews System",
      description: "Build your reputation through client feedback and peer reviews on completed projects."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 bg-card/90 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => go("/")}
                className="transition-smooth"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center">
              <CatalystLogo size="sm" showTagline={false} />
            </div>
            <div>
              <Button 
                onClick={() => go("/login")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground transition-smooth hover-scale"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-medium text-foreground mb-6">
              Platform Features
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover all the tools, resources, and support systems that make Catalyst 
              the most comprehensive education-to-employment platform in India.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-6">
              Core Learning Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to transform from a learner to a professional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mainFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="modern-card hover-lift animate-fade-in border-border bg-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-medium text-card-foreground mb-3">{feature.title}</h3>
                        <p className="text-muted-foreground mb-4">{feature.description}</p>
                        <ul className="space-y-2">
                          {feature.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-center text-sm text-muted-foreground">
                              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-6">
              Technical Capabilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced tools and systems designed for optimal learning and earning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technicalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="text-center modern-card hover-lift animate-fade-in border-border bg-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-card-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-6">
              Platform Security & Trust
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built with Indian standards and regulations in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {platformFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="text-center modern-card hover-lift animate-fade-in border-border bg-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-medium text-card-foreground mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            Ready to Explore All Features?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto">
            Join Catalyst today and experience the complete platform designed 
            to transform your career from learning to earning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => go("/login")}
              size="lg" 
              variant="secondary"
            >
              Start Your Journey
            </Button>
            <Button 
              onClick={() => go("/")}
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 transition-smooth hover-lift border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}