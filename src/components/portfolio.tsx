import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ArrowLeft, ExternalLink, Github, Share2, Star, Verified, Download, Eye } from "lucide-react";

interface PortfolioProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  onOpenChat?: (partner?: { name: string; role: string; isOnline: boolean }) => void;
}

export function Portfolio({ onNavigate, onLogout, onOpenChat }: PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const studentProfile = {
    name: "Priya Sharma",
    bio: "Passionate full-stack developer with expertise in React, Node.js, and modern web technologies. Love creating user-friendly applications that solve real-world problems.",
    location: "Mumbai, India",
    joinedDate: "September 2023",
    completedProjects: 8,
    rating: 4.8,
    skillBadges: [
      { name: "React Developer", level: "Advanced", verified: true },
      { name: "JavaScript Expert", level: "Intermediate", verified: true },
      { name: "UI/UX Designer", level: "Beginner", verified: false },
      { name: "Node.js Developer", level: "Intermediate", verified: true }
    ]
  };

  const projects = [
    {
      id: 1,
      title: "E-commerce Dashboard",
      description: "A comprehensive admin dashboard for managing online store operations with real-time analytics and inventory management.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Node.js", "MongoDB", "Chart.js"],
      status: "verified",
      rating: 4.9,
      client: "TechCorp Solutions",
      completedDate: "November 2023",
      githubUrl: "https://github.com/priya/ecommerce-dashboard",
      liveUrl: "https://demo.ecommerce-dashboard.com",
      category: "web"
    },
    {
      id: 2,
      title: "Fitness Tracking Mobile App",
      description: "Cross-platform mobile application for tracking workouts, nutrition, and health metrics with social features.",
      image: "/api/placeholder/400/250",
      technologies: ["React Native", "Firebase", "Redux", "Chart.js"],
      status: "verified",
      rating: 4.7,
      client: "FitLife Startup",
      completedDate: "October 2023",
      githubUrl: "https://github.com/priya/fitness-app",
      liveUrl: null,
      category: "mobile"
    },
    {
      id: 3,
      title: "Restaurant Landing Page",
      description: "Modern, responsive landing page for a local restaurant with online menu and reservation system.",
      image: "/api/placeholder/400/250",
      technologies: ["HTML", "CSS", "JavaScript", "PHP"],
      status: "verified",
      rating: 4.6,
      client: "Spice Garden Restaurant",
      completedDate: "September 2023",
      githubUrl: "https://github.com/priya/restaurant-landing",
      liveUrl: "https://spicegarden.com",
      category: "web"
    },
    {
      id: 4,
      title: "Data Visualization Dashboard",
      description: "Interactive dashboard for visualizing sales and customer data with advanced filtering and export capabilities.",
      image: "/api/placeholder/400/250",
      technologies: ["Python", "Streamlit", "Pandas", "Plotly"],
      status: "pending",
      rating: null,
      client: "Analytics Pro",
      completedDate: "December 2023",
      githubUrl: "https://github.com/priya/data-dashboard",
      liveUrl: "https://demo.analytics-dashboard.com",
      category: "data"
    },
    {
      id: 5,
      title: "Personal Portfolio Website",
      description: "My personal portfolio website showcasing projects, skills, and professional journey.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      status: "verified",
      rating: 4.8,
      client: "Personal Project",
      completedDate: "August 2023",
      githubUrl: "https://github.com/priya/portfolio",
      liveUrl: "https://priyasharma.dev",
      category: "web"
    }
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const handleSharePortfolio = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Portfolio link copied to clipboard!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => onNavigate('dashboard')}
            className="border-black text-black hover:bg-black hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSharePortfolio} className="border-black text-black hover:bg-black hover:text-white">
              <Share2 className="w-4 h-4 mr-2" />
              Share Portfolio
            </Button>
            <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="/api/placeholder/150/150" alt={studentProfile.name} />
                  <AvatarFallback>PS</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{studentProfile.name}</h2>
                <p className="text-gray-600 text-sm">{studentProfile.location}</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{studentProfile.rating}</span>
                  <span className="text-sm text-gray-600">({studentProfile.completedProjects} projects)</span>
                </div>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p>Joined: {studentProfile.joinedDate}</p>
                  <p>Projects Completed: {studentProfile.completedProjects}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{studentProfile.bio}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skill Badges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {studentProfile.skillBadges.map((badge, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{badge.name}</span>
                        {badge.verified && (
                          <Verified className="w-4 h-4 text-black" />
                        )}
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs mt-1 ${
                          badge.level === 'Advanced' ? 'bg-green-50 text-green-700' :
                          badge.level === 'Intermediate' ? 'bg-blue-50 text-blue-700' :
                          'bg-gray-50 text-gray-700'
                        }`}
                      >
                        {badge.level}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Project Portfolio</CardTitle>
                <p className="text-gray-600">Verified projects showcasing skills and achievements</p>
              </CardHeader>
              <CardContent>
                <Tabs value={activeFilter} onValueChange={setActiveFilter}>
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="web">Web</TabsTrigger>
                    <TabsTrigger value="mobile">Mobile</TabsTrigger>
                    <TabsTrigger value="data">Data</TabsTrigger>
                    <TabsTrigger value="design">Design</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value={activeFilter} className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredProjects.map((project) => (
                        <Card key={project.id} className="group hover:shadow-lg transition-shadow">
                          <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                            {/* Project preview placeholder */}
                            <div className="text-center text-gray-600">
                              <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
                              <p className="text-sm">{project.title}</p>
                            </div>
                            <div className="absolute top-2 right-2">
                              {project.status === 'verified' ? (
                                <Badge className="bg-black text-white">
                                  <Verified className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              ) : (
                                <Badge variant="outline">Pending Review</Badge>
                              )}
                            </div>
                          </div>
                          
                          <CardContent className="p-4">
                            <h3 className="font-semibold mb-2">{project.title}</h3>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {project.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-1 mb-3">
                              {project.technologies.map((tech, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                              <span>{project.client}</span>
                              {project.rating && (
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                  <span>{project.rating}</span>
                                </div>
                              )}
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-500">{project.completedDate}</span>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" asChild>
                                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                    <Github className="w-3 h-3" />
                                  </a>
                                </Button>
                                {project.liveUrl && (
                                  <Button variant="outline" size="sm" asChild>
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">8</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-black mb-2 opacity-90">4.8</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold" style={{ color: 'var(--warning)' }}>
                    ₹1.2L
                  </div>
                  <div className="text-sm text-gray-600">Total Earnings</div>
                </CardContent>
              </Card>
            </div>
          </div>
      </div>
    </div>
  );
}