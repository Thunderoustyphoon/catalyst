import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  ArrowRight, Users, BookOpen, Briefcase, TrendingUp, CheckCircle,
  Star, Target, ArrowDown, Play, Building, User
} from "lucide-react";
import { CatalystLogo } from "./catalyst-logo";
import { useNavigate } from "react-router";

// onNavigate prop kept for backward compatibility but we use React Router
interface MainPageProps {
  onNavigate?: (screen: string) => void;
}

export function MainPage({ onNavigate }: MainPageProps) {
  const navigate = useNavigate();
  const go = (path: string) => navigate(path);

  const stats = [
    { label: "Active Students", value: "12,456", icon: Users },
    { label: "Projects Completed", value: "8,234", icon: CheckCircle },
    { label: "Companies Hiring", value: "1,456", icon: Building },
    { label: "Success Rate", value: "96%", icon: TrendingUp },
  ];

  const features = [
    { icon: BookOpen, title: "Adaptive Learning", description: "Personalized paths that adapt to your skill level and goals" },
    { icon: Briefcase, title: "Real Projects", description: "Work on actual client projects and build a professional portfolio" },
    { icon: Users, title: "Expert Mentorship", description: "Guidance from industry professionals throughout your journey" },
    { icon: Target, title: "Job Placement", description: "Direct placement opportunities with our partner companies" },
  ];

  const testimonials = [
    { name: "Priya Sharma", role: "Full Stack Developer", company: "Tech Corp", content: "Catalyst transformed my career. From learning to landing my dream job in just 6 months." },
    { name: "Rahul Kumar", role: "UI/UX Designer", company: "Design Studio", content: "The real-world projects gave me the confidence and portfolio I needed to succeed." },
    { name: "Anjali Patel", role: "Data Scientist", company: "Analytics Inc", content: "The mentorship and adaptive learning approach made all the difference for me." },
  ];

  const steps = [
    { step: "01", title: "Learn", description: "Master in-demand skills through adaptive courses and hands-on projects" },
    { step: "02", title: "Build", description: "Create a professional portfolio working on real client projects" },
    { step: "03", title: "Earn", description: "Get hired by our partner companies or work as a freelancer" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <CatalystLogo size="sm" showTagline={false} />
            <div className="flex items-center gap-8">
              <div className="hidden md:flex items-center gap-8">
                <button onClick={() => go("/features")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</button>
                <button onClick={() => go("/how-it-works")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it Works</button>
                <button onClick={() => go("/testimonials")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Testimonials</button>
              </div>
              <Button
                onClick={() => go("/login")}
                className="bg-foreground text-background hover:bg-foreground/90 rounded-lg px-5 h-9 text-sm font-medium"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-in">
              <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-4">
                Education to Employment Platform
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight mb-6">
                From Learning
                <br />
                to Earning
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                Master in-demand skills, work on real projects, and land your dream
                job. India's premier platform for the next generation of professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => go("/login")}
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90 rounded-lg px-8 h-12 text-base font-medium"
                >
                  Start Your Journey
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-lg px-8 h-12 text-base font-medium border-border hover:bg-muted"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
              <img
                src="https://images.unsplash.com/photo-1648747640168-610ecf118f66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc3R1ZGVudHMlMjBsYXB0b3AlMjBlZHVjYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3Mjg5NzA3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Students learning with technology"
                className="rounded-xl w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center py-5 px-3">
                  <Icon className="w-5 h-5 mx-auto mb-2.5 text-muted-foreground" />
                  <div className="text-2xl font-semibold text-foreground mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-14">
          <ArrowDown className="w-5 h-5 mx-auto text-muted-foreground/50 animate-bounce" />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive platform with the tools, resources, and support to transform your career.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="border-border bg-background hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-6 pt-8">
                    <div className="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-background" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How Catalyst Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A proven 3-step process that has helped thousands transition from learning to earning.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="grid grid-cols-1 gap-10">
              {steps.map((step) => (
                <div key={step.step} className="flex gap-5">
                  <div className="w-12 h-12 bg-foreground text-background rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1760611656007-f767a8082758?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG1vZGVybiUyMG9mZmljZXxlbnwxfHx8fDE3NzI4OTcwNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Professional team collaboration"
                className="rounded-xl w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from students who transformed their careers with Catalyst.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-border bg-background">
                <CardContent className="p-6 pt-8">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-foreground fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    "{t.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-muted rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role} at {t.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-foreground">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-background mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-base text-background/70 mb-8 max-w-xl mx-auto leading-relaxed">
            Join thousands of students who have successfully transitioned from learning to earning.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => go("/login")}
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 rounded-lg px-8 h-12 text-base font-medium"
            >
              Get Started Today
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-lg px-8 h-12 text-base font-medium border-background/30 text-background bg-transparent hover:bg-background/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <CatalystLogo size="sm" showTagline={false} />
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed max-w-xs">
                Transforming education into employment opportunities for the next generation.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Platform</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li className="hover:text-foreground transition-colors cursor-pointer">For Students</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">For Companies</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">For Mentors</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li className="hover:text-foreground transition-colors cursor-pointer">Help Center</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Community</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li className="hover:text-foreground transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Privacy Policy</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-10 pt-6 text-center">
            <p className="text-xs text-muted-foreground">
              &copy; 2026 Catalyst. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}