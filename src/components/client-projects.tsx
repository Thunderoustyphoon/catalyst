import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Search, Filter, Star, MapPin, Clock, DollarSign, Briefcase, Plus,
  Users, TrendingUp, FileText, MessageSquare, Eye, CheckCircle, XCircle,
  AlertCircle, Calendar, BarChart3, Settings, Bell, ChevronDown, Download,
  Target, Activity, Timer, Award, ChevronRight, PlayCircle, PlusCircle,
  Edit, Trash2, Send, User, ArrowLeft
} from "lucide-react";

interface ClientProjectsProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function ClientProjects({ onNavigate, onLogout }: ClientProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [showApplicationsDialog, setShowApplicationsDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const projects = [
    {
      id: 1,
      title: "E-commerce Website Development",
      status: "In Progress",
      budget: 35000,
      deadline: "2024-02-15",
      applications: 23,
      hired: "Rahul Kumar",
      progress: 65,
      skills: ["React", "Node.js", "MongoDB"],
      description: "Building a modern e-commerce platform with payment integration and admin dashboard.",
      category: "Web Development",
      posted: "2024-01-05",
      milestones: [
        { name: "Project Setup & Planning", progress: 100, payment: 8750, status: "completed", dueDate: "2024-01-10" },
        { name: "Frontend Development", progress: 80, payment: 17500, status: "in-progress", dueDate: "2024-01-25" },
        { name: "Backend Integration", progress: 30, payment: 8750, status: "pending", dueDate: "2024-02-05" },
        { name: "Testing & Deployment", progress: 0, payment: 8750, status: "pending", dueDate: "2024-02-15" }
      ],
      applicationsData: [
        {
          id: 1,
          studentName: "Rahul Kumar",
          rating: 4.8,
          experience: "3 years",
          proposal: "I have extensive experience in React and Node.js development. I can deliver this project with high quality and within the timeline.",
          budget: 35000,
          timeline: "6 weeks",
          portfolio: ["E-commerce Store", "Social Media App", "Task Manager"],
          skills: ["React", "Node.js", "MongoDB", "Payment Integration"],
          appliedDate: "2024-01-05",
          status: "hired"
        }
      ]
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design",
      status: "Completed",
      budget: 20000,
      deadline: "2024-01-30",
      applications: 15,
      hired: "Priya Sharma",
      progress: 100,
      skills: ["UI/UX", "Figma", "Prototyping"],
      description: "Complete UI/UX design for fitness tracking mobile application with user-friendly interface.",
      category: "Design",
      posted: "2023-12-15",
      completedDate: "2024-01-28",
      rating: 4.9
    },
    {
      id: 3,
      title: "Data Analytics Dashboard",
      status: "Open",
      budget: 25000,
      deadline: "2024-03-01",
      applications: 8,
      hired: null,
      progress: 0,
      skills: ["Python", "React", "D3.js"],
      description: "Interactive dashboard for sales and customer analytics with real-time data visualization.",
      category: "Data Science",
      posted: "2024-01-08",
      applicationsData: [
        {
          id: 2,
          studentName: "Ankit Verma",
          rating: 4.8,
          experience: "2 years",
          proposal: "I have extensive experience in data visualization and can deliver this project within timeline.",
          budget: 23000,
          timeline: "4 weeks",
          portfolio: ["Weather App", "Todo Manager", "Analytics Tool"],
          skills: ["Python", "React", "D3.js", "SQL"],
          appliedDate: "2024-01-10",
          status: "pending"
        },
        {
          id: 3,
          studentName: "Sneha Patel",
          rating: 4.9,
          experience: "3 years",
          proposal: "Expert in Python data science stack with proven track record in dashboard development.",
          budget: 25000,
          timeline: "3.5 weeks",
          portfolio: ["Sales Dashboard", "Customer Analytics", "Report Generator"],
          skills: ["Python", "React", "D3.js", "Pandas", "SQL"],
          appliedDate: "2024-01-11",
          status: "pending"
        }
      ]
    },
    {
      id: 4,
      title: "WordPress Website Redesign",
      status: "Draft",
      budget: 15000,
      deadline: "2024-02-20",
      applications: 0,
      hired: null,
      progress: 0,
      skills: ["WordPress", "PHP", "CSS"],
      description: "Redesign existing WordPress website with modern design and responsive layout.",
      category: "Web Development",
      posted: null,
      isDraft: true
    }
  ];

  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    skills: "",
    category: ""
  });

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (activeTab) {
      case "active":
        return matchesSearch && (project.status === "In Progress" || project.status === "Open");
      case "completed":
        return matchesSearch && project.status === "Completed";
      case "drafts":
        return matchesSearch && project.status === "Draft";
      default:
        return matchesSearch;
    }
  });

  const handleCreateProject = () => {
    // Simulate project creation
    alert("Project created successfully! It will be reviewed and published shortly.");
    setProjectForm({
      title: "",
      description: "",
      budget: "",
      deadline: "",
      skills: "",
      category: ""
    });
    setShowNewProjectDialog(false);
  };

  const handleHireApplicant = (projectId: number, applicantId: number) => {
    alert("Applicant hired successfully! They will be notified and the project will begin.");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-black text-white border-black">{status}</Badge>;
      case "In Progress":
        return <Badge variant="outline" className="border-black text-black bg-background">{status}</Badge>;
      case "Open":
        return <Badge variant="outline" className="border-muted-foreground text-muted-foreground">{status}</Badge>;
      case "Draft":
        return <Badge variant="outline" className="border-muted-foreground text-muted-foreground">{status}</Badge>;
      default:
        return <Badge variant="outline" className="border-muted-foreground text-muted-foreground">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center mb-2">
              <Button 
                variant="outline" 
                onClick={() => onNavigate('client-dashboard')}
                className="w-10 h-10 p-0 border-border hover:bg-card hover:border-primary"
              >
                <ArrowLeft className="w-5 h-5 text-card-foreground" />
              </Button>
            </div>
            <p className="text-muted-foreground">
              Manage your projects, review applications, and track progress
            </p>
          </div>
          <Button 
            onClick={() => setShowNewProjectDialog(true)} 
            className="bg-black hover:bg-gray-800 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="border-border bg-card mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-border bg-background"
                />
              </div>
              <Button variant="outline" className="border-border">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Project Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-muted mb-6">
            <TabsTrigger value="all" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
              All Projects
            </TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
              Active
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
              Completed
            </TabsTrigger>
            <TabsTrigger value="drafts" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
              Drafts
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="space-y-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="border-border bg-card hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <CardTitle className="text-lg font-medium text-card-foreground">
                            {project.title}
                          </CardTitle>
                          {getStatusBadge(project.status)}
                          {project.isDraft && (
                            <Badge variant="outline" className="border-muted-foreground text-muted-foreground">
                              Draft
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="bg-muted text-muted-foreground text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="text-card-foreground">₹{project.budget.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-card-foreground">{project.deadline}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-card-foreground">{project.applications} applications</span>
                      </div>
                      {project.hired && (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-card-foreground">{project.hired}</span>
                        </div>
                      )}
                    </div>

                    {project.progress > 0 && (
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-card-foreground font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2 bg-muted" />
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-4 border-t border-border">
                      <div className="flex gap-2">
                        {project.status === "Open" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedProject(project);
                              setShowApplicationsDialog(true);
                            }}
                            className="border-black text-black hover:bg-black hover:text-white"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Applications ({project.applications})
                          </Button>
                        )}
                        {project.status === "Draft" && (
                          <Button variant="outline" size="sm" className="border-border">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Draft
                          </Button>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedProject(project)}
                          className="border-border text-card-foreground hover:bg-muted"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        {project.status === "In Progress" && (
                          <Button 
                            size="sm"
                            onClick={() => onNavigate('client-payments')}
                            className="bg-black hover:bg-gray-800 text-white"
                          >
                            <DollarSign className="w-4 h-4 mr-2" />
                            Manage Payments
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredProjects.length === 0 && (
                <Card className="border-border bg-card">
                  <CardContent className="p-12 text-center">
                    <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-card-foreground mb-2">No projects found</h3>
                    <p className="text-muted-foreground mb-6">
                      {activeTab === "drafts" 
                        ? "You don't have any draft projects yet."
                        : "Create your first project to start finding talented developers."
                      }
                    </p>
                    <Button 
                      onClick={() => setShowNewProjectDialog(true)} 
                      className="bg-black hover:bg-gray-800 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Project
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Project Details Dialog */}
        {selectedProject && !showApplicationsDialog && (
          <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-card-foreground">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  View detailed information about this project including budget, timeline, and milestones.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedProject.status)}
                  <span className="text-sm text-muted-foreground">
                    Posted {selectedProject.posted}
                  </span>
                </div>

                <p className="text-muted-foreground">{selectedProject.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-card-foreground">Budget: </span>
                    <span className="text-card-foreground">₹{selectedProject.budget.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="font-medium text-card-foreground">Deadline: </span>
                    <span className="text-card-foreground">{selectedProject.deadline}</span>
                  </div>
                  <div>
                    <span className="font-medium text-card-foreground">Applications: </span>
                    <span className="text-card-foreground">{selectedProject.applications}</span>
                  </div>
                  <div>
                    <span className="font-medium text-card-foreground">Category: </span>
                    <span className="text-card-foreground">{selectedProject.category}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-card-foreground">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-muted text-muted-foreground">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedProject.milestones && (
                  <div>
                    <h4 className="font-medium mb-3 text-card-foreground">Project Milestones</h4>
                    <div className="space-y-3">
                      {selectedProject.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
                          <div className="flex-1">
                            <h5 className="font-medium text-sm mb-1 text-card-foreground">{milestone.name}</h5>
                            <div className="flex items-center gap-2">
                              <Progress value={milestone.progress} className="h-2 flex-1 max-w-32 bg-muted" />
                              <span className="text-xs text-muted-foreground">{milestone.progress}%</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Due: {milestone.dueDate}</p>
                          </div>
                          <div className="ml-4 text-right">
                            <div className="text-sm font-medium text-card-foreground">₹{milestone.payment.toLocaleString()}</div>
                            <Badge variant="outline" className="border-muted-foreground text-muted-foreground text-xs mt-1">
                              {milestone.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Applications Dialog */}
        {showApplicationsDialog && selectedProject && (
          <Dialog open={showApplicationsDialog} onOpenChange={() => setShowApplicationsDialog(false)}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-card-foreground">
                  Applications for {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Review and manage applications from talented students and freelancers.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {selectedProject.applicationsData?.map((application) => (
                  <Card key={application.id} className="border-border bg-background">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-muted text-card-foreground">
                              {application.studentName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium text-lg text-card-foreground">{application.studentName}</h4>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-black fill-current" />
                                <span className="text-sm text-card-foreground">{application.rating}</span>
                              </div>
                              <Badge variant="outline" className="border-border text-muted-foreground">
                                {application.experience}
                              </Badge>
                            </div>
                            
                            <p className="text-muted-foreground mb-3">{application.proposal}</p>
                            
                            <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                              <div>
                                <span className="font-medium text-card-foreground">Proposed Budget: </span>
                                <span className="text-card-foreground">₹{application.budget.toLocaleString()}</span>
                              </div>
                              <div>
                                <span className="font-medium text-card-foreground">Timeline: </span>
                                <span className="text-card-foreground">{application.timeline}</span>
                              </div>
                            </div>

                            <div className="mb-3">
                              <h5 className="font-medium text-sm mb-2 text-card-foreground">Skills:</h5>
                              <div className="flex flex-wrap gap-1">
                                {application.skills.map((skill, index) => (
                                  <Badge key={index} variant="secondary" className="bg-muted text-muted-foreground text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h5 className="font-medium text-sm mb-2 text-card-foreground">Portfolio:</h5>
                              <div className="flex flex-wrap gap-2">
                                {application.portfolio.map((project, index) => (
                                  <span key={index} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                                    {project}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 ml-4">
                          {application.status === "hired" ? (
                            <Badge className="bg-black text-white border-black">Hired</Badge>
                          ) : (
                            <>
                              <Button 
                                size="sm" 
                                className="bg-black hover:bg-gray-800 text-white"
                                onClick={() => handleHireApplicant(selectedProject.id, application.id)}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Hire
                              </Button>
                              <Button variant="outline" size="sm" className="border-border">
                                <MessageSquare className="w-4 h-4 mr-1" />
                                Message
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )) || (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No applications yet for this project.</p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* New Project Dialog */}
        <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
          <DialogContent className="max-w-2xl bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-card-foreground">Post New Project</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Create a new project posting to attract talented students and freelancers.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Project Title</label>
                <Input 
                  placeholder="e.g., Build a React E-commerce Website"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                  className="border-border bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Category</label>
                <Select value={projectForm.category} onValueChange={(value) => setProjectForm({...projectForm, category: value})}>
                  <SelectTrigger className="border-border bg-background">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="web">Web Development</SelectItem>
                    <SelectItem value="mobile">Mobile Development</SelectItem>
                    <SelectItem value="design">UI/UX Design</SelectItem>
                    <SelectItem value="data">Data Science</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Project Description</label>
                <Textarea 
                  placeholder="Describe your project requirements in detail..."
                  rows={4}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                  className="border-border bg-background"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Budget (₹)</label>
                  <Input 
                    type="number" 
                    placeholder="25000"
                    value={projectForm.budget}
                    onChange={(e) => setProjectForm({...projectForm, budget: e.target.value})}
                    className="border-border bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Deadline</label>
                  <Input 
                    type="date"
                    value={projectForm.deadline}
                    onChange={(e) => setProjectForm({...projectForm, deadline: e.target.value})}
                    className="border-border bg-background"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Required Skills</label>
                <Input 
                  placeholder="React, Node.js, MongoDB (comma separated)"
                  value={projectForm.skills}
                  onChange={(e) => setProjectForm({...projectForm, skills: e.target.value})}
                  className="border-border bg-background"
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowNewProjectDialog(false)}
                  className="border-border"
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-black hover:bg-gray-800 text-white"
                  onClick={handleCreateProject}
                  disabled={!projectForm.title || !projectForm.description || !projectForm.budget}
                >
                  Post Project
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}