import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search, Filter, ArrowLeft, Star, MapPin, Clock, DollarSign, Briefcase, Plus, Zap, Trophy, BookOpen, Shield, Users, Target, PlayCircle, CheckCircle2, Award, TrendingUp } from "lucide-react";

interface MarketplaceProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function Marketplace({ onNavigate, onLogout }: MarketplaceProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("practice");

  // Practice Gigs - Safe simulation environment
  const practiceGigs = [
    {
      id: 1,
      title: "Build a Todo List App",
      description: "Create a simple todo list application using React and local storage. This is a safe practice environment to build your skills before taking on paid projects.",
      skills: ["React", "JavaScript", "CSS", "Local Storage"],
      difficulty: "Beginner",
      estimatedTime: "3-5 hours",
      mentorSupport: true,
      completedBy: 245,
      rating: 4.7,
      type: "Frontend Development",
      learningGoals: ["Component state management", "Event handling", "Data persistence"],
      isCompleted: false,
      resources: ["Video tutorial", "Code starter template", "Design mockup"]
    },
    {
      id: 2,
      title: "REST API for Library Management",
      description: "Build a complete REST API for a library management system. Practice CRUD operations, authentication, and database design in a risk-free environment.",
      skills: ["Node.js", "Express", "MongoDB", "JWT"],
      difficulty: "Intermediate",
      estimatedTime: "8-12 hours",
      mentorSupport: true,
      completedBy: 156,
      rating: 4.8,
      type: "Backend Development",
      learningGoals: ["API design", "Database modeling", "Authentication"],
      isCompleted: true,
      resources: ["API documentation template", "Database schema guide", "Testing guidelines"]
    },
    {
      id: 3,
      title: "E-commerce UI/UX Design Challenge",
      description: "Design a complete e-commerce mobile app interface. Practice user research, wireframing, and prototyping with real feedback from mentors.",
      skills: ["Figma", "UI/UX Design", "Prototyping", "User Research"],
      difficulty: "Intermediate",
      estimatedTime: "6-8 hours",
      mentorSupport: true,
      completedBy: 89,
      rating: 4.6,
      type: "Design",
      learningGoals: ["User flow design", "Mobile-first approach", "Design systems"],
      isCompleted: false,
      resources: ["Design brief", "User personas", "Style guide template"]
    },
    {
      id: 4,
      title: "Data Dashboard with Python",
      description: "Create an interactive dashboard using Python, Pandas, and Streamlit. Analyze real datasets and present insights through visualizations.",
      skills: ["Python", "Pandas", "Streamlit", "Data Visualization"],
      difficulty: "Advanced",
      estimatedTime: "10-15 hours",
      mentorSupport: true,
      completedBy: 67,
      rating: 4.9,
      type: "Data Science",
      learningGoals: ["Data cleaning", "Statistical analysis", "Dashboard design"],
      isCompleted: false,
      resources: ["Sample datasets", "Streamlit guide", "Visualization best practices"]
    }
  ];

  const projects = [
    {
      id: 1,
      title: "E-commerce Website Development",
      description: "Looking for a skilled developer to build a modern e-commerce platform with React and Node.js. Must include payment integration and admin dashboard.",
      budget: "₹25,000 - ₹40,000",
      timeline: "4-6 weeks",
      skills: ["React", "Node.js", "MongoDB", "Payment Gateway"],
      client: "TechCorp Solutions",
      location: "Mumbai, India",
      rating: 4.8,
      applications: 12,
      verified: true,
      difficulty: "Intermediate"
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design",
      description: "Need a creative designer to create modern and intuitive mobile app designs for a fitness tracking application.",
      budget: "₹15,000 - ₹25,000",
      timeline: "2-3 weeks",
      skills: ["UI/UX Design", "Figma", "Prototyping", "Mobile Design"],
      client: "FitLife Startup",
      location: "Bangalore, India",
      rating: 4.6,
      applications: 8,
      verified: true,
      difficulty: "Beginner"
    },
    {
      id: 3,
      title: "Data Analysis Dashboard",
      description: "Create an interactive dashboard for sales data visualization using Python and modern charting libraries.",
      budget: "₹20,000 - ₹35,000",
      timeline: "3-4 weeks",
      skills: ["Python", "Data Visualization", "Pandas", "Dashboard"],
      client: "Analytics Pro",
      location: "Delhi, India",
      rating: 4.9,
      applications: 15,
      verified: true,
      difficulty: "Advanced"
    },
    {
      id: 4,
      title: "WordPress Website Customization",
      description: "Customize existing WordPress theme for a local restaurant. Add online ordering functionality and responsive design.",
      budget: "₹10,000 - ₹18,000",
      timeline: "2-3 weeks",
      skills: ["WordPress", "PHP", "CSS", "Responsive Design"],
      client: "Spice Garden Restaurant",
      location: "Pune, India",
      rating: 4.4,
      applications: 6,
      verified: false,
      difficulty: "Beginner"
    }
  ];

  const PracticeGigsView = () => (
    <div className="space-y-6">
      {/* Practice Gigs Header */}
      <Card className="border-border modern-card bg-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-medium text-card-foreground">Practice Gig Environment</h2>
              <p className="text-muted-foreground">Safe simulation workspace to build skills before taking paid projects</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <Shield className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-card-foreground text-sm">Risk-Free Learning</p>
                <p className="text-xs text-muted-foreground">No client pressure</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-card-foreground text-sm">Mentor Support</p>
                <p className="text-xs text-muted-foreground">Expert guidance available</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <Trophy className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-card-foreground text-sm">Skill Verification</p>
                <p className="text-xs text-muted-foreground">Earn verified badges</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Practice Gigs Grid */}
      <div className="grid gap-6">
        {practiceGigs.map((gig) => (
          <Card key={gig.id} className="modern-card hover-lift border-border bg-card transition-smooth">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <CardTitle className="text-lg text-card-foreground font-medium">{gig.title}</CardTitle>
                    {gig.isCompleted && (
                      <Badge className="bg-primary text-primary-foreground text-xs font-medium">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="outline" className="text-xs bg-muted/50 text-primary border-border font-medium">
                      <PlayCircle className="w-3 h-3 mr-1" />
                      Practice Gig
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-primary fill-current" />
                      <span className="text-xs text-muted-foreground font-medium">{gig.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{gig.completedBy} students completed</span>
                  </div>
                </div>
                <Badge variant="outline" className="border-border text-muted-foreground font-medium">{gig.difficulty}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-muted-foreground leading-relaxed">{gig.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {gig.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-muted text-muted-foreground font-medium">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{gig.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Target className="w-4 h-4 text-primary" />
                  <span>{gig.type}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Mentor Support</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span>{gig.resources.length} Resources</span>
                </div>
              </div>

              {/* Learning Goals */}
              <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                <h4 className="font-medium text-card-foreground mb-3 text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  Learning Goals:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {gig.learningGoals.map((goal, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-background border-border font-medium">
                      {goal}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 gap-3">
                <Button variant="outline" size="sm" className="border-border hover:bg-muted/50 font-medium">
                  <BookOpen className="w-4 h-4 mr-2" />
                  View Resources
                </Button>
                <Button 
                  size="sm" 
                  className={gig.isCompleted 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 font-medium" 
                    : "modern-button-primary font-medium"
                  } 
                >
                  {gig.isCompleted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      View Solution
                    </>
                  ) : (
                    <>
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Start Practice
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const StudentView = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="border-border bg-card modern-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input border-border focus:ring-2 focus:ring-ring/20 font-medium"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 border-border bg-input font-medium">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="web">Web Development</SelectItem>
                <SelectItem value="mobile">Mobile Development</SelectItem>
                <SelectItem value="design">UI/UX Design</SelectItem>
                <SelectItem value="data">Data Science</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-border hover:bg-muted/50 font-medium">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Project Feed */}
      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="modern-card hover-lift border-border bg-card transition-smooth">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg text-card-foreground font-medium">{project.title}</CardTitle>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-sm text-muted-foreground font-medium">{project.client}</span>
                    {project.verified && (
                      <Badge className="bg-primary text-primary-foreground text-xs font-medium">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified Client
                      </Badge>
                    )}
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-primary fill-current" />
                      <span className="text-xs text-muted-foreground font-medium">{project.rating}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="border-border text-muted-foreground font-medium">{project.difficulty}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-muted-foreground leading-relaxed">{project.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-muted text-muted-foreground font-medium">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="font-medium">{project.budget}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{project.timeline}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span>{project.applications} applied</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 gap-3">
                <Button variant="outline" size="sm" className="border-border hover:bg-muted/50 font-medium">
                  <Target className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                <Button size="sm" className="modern-button-primary font-medium">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Apply Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const ClientView = () => {
    const [projectForm, setProjectForm] = useState({
      title: "",
      description: "",
      budget: "",
      timeline: "",
      skills: ""
    });

    const handleSubmit = () => {
      alert("Project posted successfully! Students will start applying soon.");
      setProjectForm({
        title: "",
        description: "",
        budget: "",
        timeline: "",
        skills: ""
      });
    };

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="modern-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-medium">
              <Plus className="w-5 h-5 text-primary" />
              Post a New Project
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <label htmlFor="title" className="text-sm font-medium text-card-foreground">Project Title</label>
              <Input
                id="title"
                value={projectForm.title}
                onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                placeholder="e.g., Build a React E-commerce Website"
                className="bg-input border-border focus:ring-2 focus:ring-ring/20 font-medium"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="description" className="text-sm font-medium text-card-foreground">Project Description</label>
              <Textarea
                id="description"
                value={projectForm.description}
                onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                placeholder="Describe your project requirements, features needed, and any specific preferences..."
                rows={4}
                className="bg-input border-border focus:ring-2 focus:ring-ring/20 font-medium resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label htmlFor="budget" className="text-sm font-medium text-card-foreground">Budget Range</label>
                <Input
                  id="budget"
                  value={projectForm.budget}
                  onChange={(e) => setProjectForm({...projectForm, budget: e.target.value})}
                  placeholder="e.g., ₹20,000 - ₹35,000"
                  className="bg-input border-border focus:ring-2 focus:ring-ring/20 font-medium"
                />
              </div>
              <div className="space-y-3">
                <label htmlFor="timeline" className="text-sm font-medium text-card-foreground">Timeline</label>
                <Input
                  id="timeline"
                  value={projectForm.timeline}
                  onChange={(e) => setProjectForm({...projectForm, timeline: e.target.value})}
                  placeholder="e.g., 4-6 weeks"
                  className="bg-input border-border focus:ring-2 focus:ring-ring/20 font-medium"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label htmlFor="skills" className="text-sm font-medium text-card-foreground">Required Skills</label>
              <Input
                id="skills"
                value={projectForm.skills}
                onChange={(e) => setProjectForm({...projectForm, skills: e.target.value})}
                placeholder="e.g., React, Node.js, MongoDB, Payment Gateway"
                className="bg-input border-border focus:ring-2 focus:ring-ring/20 font-medium"
              />
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-card-foreground flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Project Milestones
              </h4>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Input 
                    placeholder="Milestone 1: Project Setup" 
                    className="flex-1 bg-input border-border focus:ring-2 focus:ring-ring/20 font-medium" 
                  />
                  <Input 
                    placeholder="25%" 
                    className="w-20 bg-input border-border focus:ring-2 focus:ring-ring/20 font-medium" 
                  />
                </div>
                <div className="flex gap-3">
                  <Input 
                    placeholder="Milestone 2: Core Features" 
                    className="flex-1 bg-input border-border focus:ring-2 focus:ring-ring/20 font-medium" 
                  />
                  <Input 
                    placeholder="50%" 
                    className="w-20 bg-input border-border focus:ring-2 focus:ring-ring/20 font-medium" 
                  />
                </div>
                <div className="flex gap-3">
                  <Input 
                    placeholder="Milestone 3: Testing & Deployment" 
                    className="flex-1 bg-input border-border focus:ring-2 focus:ring-ring/20 font-medium" 
                  />
                  <Input 
                    placeholder="25%" 
                    className="w-20 bg-input border-border focus:ring-2 focus:ring-ring/20 font-medium" 
                  />
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-border hover:bg-muted/50 font-medium">
                <Plus className="w-4 h-4 mr-2" />
                Add Milestone
              </Button>
            </div>

            <Button 
              onClick={handleSubmit}
              className="w-full modern-button-primary font-medium"
              size="lg"
              disabled={!projectForm.title || !projectForm.description}
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Post Project
            </Button>
          </CardContent>
        </Card>

        {/* Posted Projects */}
        <Card className="modern-card border-border">
          <CardHeader>
            <CardTitle className="font-medium text-card-foreground flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Your Posted Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg bg-muted/30">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-card-foreground">Restaurant Website Development</h4>
                    <p className="text-sm text-muted-foreground mt-1">Posted 2 days ago</p>
                  </div>
                  <Badge className="bg-primary text-primary-foreground font-medium">Active</Badge>
                </div>
                <div className="mt-3 text-sm text-muted-foreground">
                  <span className="font-medium">15 applications • ₹18,000 budget</span>
                </div>
                <div className="flex gap-3 mt-4">
                  <Button variant="outline" size="sm" className="border-border hover:bg-muted/50 font-medium">
                    <Users className="w-4 h-4 mr-2" />
                    View Applications
                  </Button>
                  <Button variant="outline" size="sm" className="border-border hover:bg-muted/50 font-medium">
                    <Target className="w-4 h-4 mr-2" />
                    Edit Project
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      {/* Header with Back Button */}
      <div className="bg-card rounded-xl p-6 border border-border modern-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => onNavigate('student')}
              className="border-border hover:bg-muted/50 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-medium text-card-foreground">Marketplace</h1>
              <p className="text-muted-foreground">
                Practice your skills safely or find paid projects that match your expertise
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => onNavigate('earnings')} 
              variant="outline" 
              className="border-border hover:bg-muted/50 font-medium"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              View Earnings
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs for Practice vs Real Projects */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-card rounded-xl p-6 border border-border modern-card">
          <TabsList className="grid w-full grid-cols-2 bg-muted rounded-lg p-1 h-12">
            <TabsTrigger value="practice" className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm font-medium">
              <Zap className="w-4 h-4" />
              Practice Gigs
              <Badge variant="outline" className="ml-2 text-xs bg-muted/50 text-primary border-border font-medium">
                Safe Zone
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="real" className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm font-medium">
              <DollarSign className="w-4 h-4" />
              Paid Projects
              <Badge variant="outline" className="ml-2 text-xs bg-muted/50 text-primary border-border font-medium">
                Verified
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="practice" className="space-y-0 mt-6">
          <PracticeGigsView />
        </TabsContent>

        <TabsContent value="real" className="space-y-0 mt-6">
          <StudentView />
        </TabsContent>
      </Tabs>
    </div>
  );
}