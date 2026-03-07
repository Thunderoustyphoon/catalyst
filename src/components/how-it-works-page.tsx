import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { 
  ArrowLeft, ArrowRight, CheckCircle, BookOpen, Briefcase, 
  Trophy, Users, Target, Star, Zap, Play, Clock, BarChart3,
  Award, Globe, Shield
} from "lucide-react";
import { CatalystLogo } from "./catalyst-logo";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigate } from "react-router";

interface HowItWorksPageProps {
  onNavigate?: (screen: string) => void;
}

export function HowItWorksPage({ onNavigate }: HowItWorksPageProps) {
  const navigate = useNavigate();
  const go = (path: string) => navigate(path);
  const goBack = () => navigate("/");

  const mainSteps = [
    {
      step: "01",
      title: "Learn",
      subtitle: "Master In-Demand Skills",
      description: "Start with our adaptive learning system that personalizes your education journey based on your current skill level and career goals.",
      features: [
        "Take a comprehensive skill assessment",
        "Get a personalized learning path",
        "Access interactive courses and materials",
        "Practice with real-world exercises",
        "Receive continuous feedback and support"
      ],
      icon: BookOpen,
      imageUrl: "https://images.unsplash.com/photo-1629360021730-3d258452c425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBvbmxpbmUlMjBlZHVjYXRpb258ZW58MXx8fHwxNzU4NjA5Nzc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      step: "02",
      title: "Build",
      subtitle: "Create Your Professional Portfolio",
      description: "Work on real client projects while learning, building a portfolio that showcases your abilities to potential employers.",
      features: [
        "Apply for beginner-friendly projects",
        "Work with experienced mentors",
        "Collaborate with other learners",
        "Receive client feedback and ratings",
        "Build a diverse project portfolio"
      ],
      icon: Briefcase,
      imageUrl: "https://images.unsplash.com/photo-1618410325698-018bb3eb2318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0Zm9saW8lMjBsYXB0b3AlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU4NjQ2MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      step: "03",
      title: "Earn",
      subtitle: "Launch Your Career",
      description: "Transition into full-time employment or freelancing with the skills, portfolio, and network you've built on our platform.",
      features: [
        "Access job placement opportunities",
        "Connect with hiring partners",
        "Continue freelancing on the platform",
        "Receive ongoing career support",
        "Join our alumni network"
      ],
      icon: Trophy,
      imageUrl: "https://images.unsplash.com/photo-1758599543110-f9cf3903a2ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJlZXIlMjBzdWNjZXNzJTIwcHJvZmVzc2lvbmFsJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzU4NjQ2MzQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  const detailedProcess = [
    {
      phase: "Onboarding & Assessment",
      duration: "Week 1",
      activities: [
        "Complete profile setup with Aadhaar verification",
        "Take comprehensive skill assessment tests",
        "Define career goals and learning objectives",
        "Get matched with a suitable mentor",
        "Receive personalized learning roadmap"
      ]
    },
    {
      phase: "Foundation Learning",
      duration: "Weeks 2-8",
      activities: [
        "Complete core curriculum modules",
        "Practice with interactive coding exercises",
        "Participate in peer learning sessions",
        "Work on mini-projects and assignments",
        "Regular skill assessment and feedback"
      ]
    },
    {
      phase: "Real Project Experience",
      duration: "Weeks 9-16",
      activities: [
        "Apply for entry-level client projects",
        "Work under mentor supervision",
        "Collaborate with other team members",
        "Deliver project milestones on time",
        "Receive client ratings and testimonials"
      ]
    },
    {
      phase: "Portfolio Development",
      duration: "Weeks 17-20",
      activities: [
        "Curate best projects for portfolio",
        "Create professional case studies",
        "Optimize LinkedIn and professional profiles",
        "Prepare for job interviews",
        "Complete advanced skill certifications"
      ]
    },
    {
      phase: "Career Transition",
      duration: "Weeks 21-24",
      activities: [
        "Apply to partner company positions",
        "Interview preparation and practice",
        "Negotiate job offers and freelance rates",
        "Transition planning and support",
        "Ongoing career development resources"
      ]
    }
  ];

  const supportSystems = [
    {
      icon: Users,
      title: "Mentorship Program",
      description: "Expert guidance throughout your journey",
      imageUrl: "https://images.unsplash.com/photo-1758522276267-b3472583e954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50b3IlMjB0ZWFjaGluZyUyMGd1aWRhbmNlJTIwc3R1ZGVudHxlbnwxfHx8fDE3NTg2NDYzNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      icon: Target,
      title: "Skill Assessment",
      description: "Regular evaluation and personalized feedback",
      imageUrl: "https://images.unsplash.com/photo-1731834453355-df041245e7d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2lsbCUyMGFzc2Vzc21lbnQlMjB0ZXN0aW5nJTIwY29tcHV0ZXJ8ZW58MXx8fHwxNzU4NjQ2MzU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      icon: Star,
      title: "Quality Assurance",
      description: "Rigorous project review and client satisfaction",
      imageUrl: "https://images.unsplash.com/photo-1748256622734-92241ae7b43f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZSUyMG9mZmljZXxlbnwxfHx8fDE3NTg2MzcwNjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Learn and work at your own pace"
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Detailed analytics on your development"
    },
    {
      icon: Award,
      title: "Certifications",
      description: "Industry-recognized skill validation"
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
                onClick={goBack}
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How Catalyst Works
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Our proven 3-step methodology has helped thousands of students 
              successfully transition from learning to earning in just 24 weeks.
            </p>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 transition-smooth hover-lift"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Process Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Main Steps Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {mainSteps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={index}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mr-4">
                        {step.step}
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">{step.title}</h2>
                        <p className="text-lg text-gray-600">{step.subtitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-xl text-gray-700 mb-6">{step.description}</p>
                    
                    <div className="space-y-3">
                      {step.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-black mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className={`${isEven ? "lg:order-2" : "lg:order-1"} flex justify-center`}>
                    <div className="relative w-80 h-80 rounded-2xl overflow-hidden shadow-2xl animate-float modern-card">
                      <ImageWithFallback
                        src={step.imageUrl}
                        alt={`${step.title} - ${step.subtitle}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-6 left-6 flex items-center">
                        <div className="w-12 h-12 bg-white/90 text-black rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                          <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold shadow-lg">
                            {step.step}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Timeline */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              24-Week Journey Breakdown
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A detailed timeline of your transformation from student to professional
            </p>
          </div>

          <div className="space-y-8">
            {detailedProcess.map((phase, index) => (
              <Card 
                key={index} 
                className="transition-smooth hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{phase.phase}</h3>
                      <p className="text-lg text-gray-600">{phase.duration}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center text-xl font-bold">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {phase.activities.map((activity, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-black rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{activity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Systems */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Support Systems
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive support throughout your learning and earning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportSystems.map((support, index) => {
              const Icon = support.icon;
              return (
                <Card 
                  key={index} 
                  className="transition-smooth hover-lift animate-fade-in bg-white overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    {support.imageUrl ? (
                      <div className="relative">
                        <div className="h-48 overflow-hidden">
                          <ImageWithFallback
                            src={support.imageUrl}
                            alt={support.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                        <div className="absolute top-4 right-4 w-12 h-12 bg-white/95 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                          <Icon className="w-6 h-6 text-black" />
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-semibold mb-3 text-left">{support.title}</h3>
                          <p className="text-gray-600 text-left">{support.description}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 text-center">
                        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold mb-3">{support.title}</h3>
                        <p className="text-gray-600">{support.description}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of students who have successfully transformed their 
            careers with our proven methodology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => go("/login")}
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-4 transition-smooth hover-lift bg-white text-black"
            >
              Begin Your Transformation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              onClick={goBack}
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 transition-smooth hover-lift border-white/50 text-white bg-transparent hover:bg-white hover:text-black font-medium"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}