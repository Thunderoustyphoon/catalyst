import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  ArrowLeft, Star, ArrowRight, Quote, TrendingUp, 
  Briefcase, GraduationCap, Zap, MapPin, Calendar
} from "lucide-react";
import { CatalystLogo } from "./catalyst-logo";
import { useNavigate } from "react-router";

interface TestimonialsPageProps {
  onNavigate?: (screen: string) => void;
}

export function TestimonialsPage({ onNavigate }: TestimonialsPageProps) {
  const navigate = useNavigate();
  const go = (path: string) => navigate(path);
  const goBack = () => navigate("/");

  const featuredTestimonials = [
    {
      name: "Priya Sharma",
      role: "Full Stack Developer",
      company: "Tech Innovations Pvt Ltd",
      location: "Bangalore",
      beforeRole: "Commerce Graduate",
      timeframe: "6 months",
      salaryIncrease: "₹5.2 LPA",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODA5MjgxM3ww&ixlib=rb-4.1.0&q=80&w=300",
      content: "Catalyst completely transformed my career. I went from having no technical skills to landing my dream job as a Full Stack Developer. The real-world projects gave me the confidence and portfolio I needed. The mentorship was invaluable.",
      rating: 5,
      projectsCompleted: 12,
      skillsLearned: ["React", "Node.js", "MongoDB", "UI/UX Design"]
    },
    {
      name: "Rahul Kumar",
      role: "UI/UX Designer",
      company: "Creative Studios",
      location: "Mumbai",
      beforeRole: "Freelance Graphic Designer",
      timeframe: "4 months",
      salaryIncrease: "₹4.8 LPA",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTgwOTI4MTN8MA&ixlib=rb-4.1.0&q=80&w=300",
      content: "The design thinking workshops and real client projects on Catalyst took my skills to the next level. Working with mentors helped me understand industry standards and best practices. Now I'm designing for major brands!",
      rating: 5,
      projectsCompleted: 15,
      skillsLearned: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"]
    },
    {
      name: "Anjali Patel",
      role: "Data Scientist",
      company: "Analytics Pro",
      location: "Pune",
      beforeRole: "Math Teacher",
      timeframe: "8 months",
      salaryIncrease: "₹7.1 LPA",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGdsYXNzZXN8ZW58MXx8fHwxNzU4MDkyODE0fDA&ixlib=rb-4.1.0&q=80&w=300",
      content: "Coming from a teaching background, I was nervous about transitioning to tech. The adaptive learning system helped me progress at my own pace, and the data science projects gave me real experience with industry tools and methodologies.",
      rating: 5,
      projectsCompleted: 10,
      skillsLearned: ["Python", "Machine Learning", "SQL", "Tableau"]
    }
  ];

  const moreTestimonials = [
    {
      name: "Arjun Singh",
      role: "Mobile App Developer",
      company: "StartupTech",
      content: "The mobile development track was comprehensive. From React Native to publishing apps on stores, I learned everything I needed to become a professional developer.",
      rating: 5,
      timeframe: "5 months"
    },
    {
      name: "Sneha Reddy",
      role: "Digital Marketing Specialist",
      company: "Growth Agency",
      content: "The combination of theory and practical projects in digital marketing was perfect. I now handle campaigns for multiple clients and have tripled my income.",
      rating: 5,
      timeframe: "3 months"
    },
    {
      name: "Vikram Gupta",
      role: "DevOps Engineer",
      company: "CloudTech Solutions",
      content: "The DevOps curriculum was cutting-edge. Learning AWS, Docker, and Kubernetes through real projects prepared me for enterprise-level challenges.",
      rating: 5,
      timeframe: "7 months"
    },
    {
      name: "Meera Joshi",
      role: "Product Manager",
      company: "InnovateCorp",
      content: "Transitioning from operations to product management seemed impossible until I found Catalyst. The product strategy courses and mentorship were game-changers.",
      rating: 5,
      timeframe: "6 months"
    },
    {
      name: "Karan Mehta",
      role: "Cybersecurity Analyst",
      company: "SecureNet",
      content: "The cybersecurity track covered everything from ethical hacking to incident response. The hands-on labs and real-world scenarios prepared me for industry challenges.",
      rating: 5,
      timeframe: "9 months"
    },
    {
      name: "Pooja Sharma",
      role: "AI/ML Engineer",
      company: "AI Innovations",
      content: "The AI/ML curriculum was exceptional. Working on real machine learning projects with industry datasets gave me the experience employers look for.",
      rating: 5,
      timeframe: "10 months"
    }
  ];

  const stats = [
    { label: "Success Rate", value: "96%", description: "Students who complete the program successfully transition to new careers" },
    { label: "Average Salary Increase", value: "₹5.8 LPA", description: "Average salary increase after program completion" },
    { label: "Job Placement Rate", value: "89%", description: "Students who find employment within 3 months of graduation" },
    { label: "Student Satisfaction", value: "4.9/5", description: "Average rating from program graduates" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success Stories
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Real stories from students who transformed their careers with Catalyst. 
              See how our platform has helped thousands transition from learning to earning.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                className="text-center transition-smooth hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="text-2xl md:text-3xl font-bold text-black mb-2">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-900 mb-2">{stat.label}</div>
                  <div className="text-xs text-gray-600">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Success Stories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Featured Transformations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Detailed success stories showcasing the complete career transformation journey
            </p>
          </div>

          <div className="space-y-12">
            {featuredTestimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="transition-smooth hover-lift animate-fade-in bg-white overflow-hidden"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                    {/* Image Section */}
                    <div className="relative h-64 lg:h-auto">
                      <img 
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="lg:col-span-2 p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{testimonial.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Briefcase className="w-4 h-4 text-gray-500" />
                            <span className="text-lg text-gray-700">{testimonial.role}</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600">{testimonial.company}, {testimonial.location}</span>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-black fill-current" />
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-black">{testimonial.timeframe}</div>
                          <div className="text-sm text-gray-600">Program Duration</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-black">{testimonial.salaryIncrease}</div>
                          <div className="text-sm text-gray-600">Salary Package</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-black">{testimonial.projectsCompleted}</div>
                          <div className="text-sm text-gray-600">Projects Completed</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-black">{testimonial.skillsLearned.length}</div>
                          <div className="text-sm text-gray-600">Skills Mastered</div>
                        </div>
                      </div>

                      <div className="relative mb-6">
                        <Quote className="w-8 h-8 text-gray-300 absolute -top-2 -left-2" />
                        <p className="text-lg text-gray-700 italic pl-6">"{testimonial.content}"</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Skills Learned:</h4>
                        <div className="flex flex-wrap gap-2">
                          {testimonial.skillsLearned.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="border-black text-black">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <GraduationCap className="w-4 h-4 mr-2" />
                          <span>Before: {testimonial.beforeRole}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* More Testimonials Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              More Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join hundreds of students who have successfully transformed their careers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {moreTestimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="transition-smooth hover-lift animate-fade-in bg-white"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-black fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</div>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Completed in {testimonial.timeframe}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of students who have transformed their careers with Catalyst. 
            Your journey from learning to earning starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => go("/login")}
              size="lg" 
              variant="secondary"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              onClick={() => go("/")}
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