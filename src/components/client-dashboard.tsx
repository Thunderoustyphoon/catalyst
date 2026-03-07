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
import { Separator } from "./ui/separator";
import { 
  Search, Filter, Star, MapPin, Clock, DollarSign, Briefcase, Plus,
  Users, TrendingUp, FileText, MessageSquare, Eye, CheckCircle, XCircle,
  AlertCircle, Calendar, BarChart3, Settings, Bell, ChevronDown, Download,
  Target, Activity, Timer, Award, ChevronRight, PlayCircle, PlusCircle
} from "lucide-react";

interface ClientDashboardProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function ClientDashboard({ onNavigate, onLogout }: ClientDashboardProps) {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);

  // Mock data
  const client = {
    name: "Rajesh Gupta",
    email: "rajesh.gupta@company.com",
    company: "Tech Solutions Ltd."
  };

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
      description: "Building a modern e-commerce platform with payment integration",
      milestones: [
        { name: "Project Setup", progress: 100, payment: 8750 },
        { name: "Frontend Development", progress: 80, payment: 17500 },
        { name: "Backend Integration", progress: 30, payment: 8750 },
        { name: "Testing & Deployment", progress: 0, payment: 0 }
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
      description: "Complete UI/UX design for fitness tracking mobile application"
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
      description: "Interactive dashboard for sales and customer analytics"
    }
  ];

  const applications = [
    {
      id: 1,
      projectId: 3,
      studentName: "Ankit Verma",
      rating: 4.8,
      experience: "2 years",
      proposal: "I have extensive experience in data visualization and can deliver this project within timeline.",
      budget: 23000,
      timeline: "4 weeks",
      portfolio: ["Weather App", "Todo Manager", "Analytics Tool"],
      skills: ["Python", "React", "D3.js", "SQL"],
      appliedDate: "2024-01-10"
    },
    {
      id: 2,
      projectId: 3,
      studentName: "Sneha Patel",
      rating: 4.9,
      experience: "3 years",
      proposal: "Expert in Python data science stack with proven track record in dashboard development.",
      budget: 25000,
      timeline: "3.5 weeks",
      portfolio: ["Sales Dashboard", "Customer Analytics", "Report Generator"],
      skills: ["Python", "React", "D3.js", "Pandas", "SQL"],
      appliedDate: "2024-01-11"
    }
  ];

  const messages = [
    {
      id: 1,
      from: "Rahul Kumar",
      project: "E-commerce Website",
      message: "Frontend components are ready for review. Please check the latest deployment.",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      from: "Priya Sharma",
      project: "Mobile App Design",
      message: "Final designs have been uploaded to Figma. Ready for final approval.",
      time: "1 day ago",
      unread: false
    }
  ];

  const quickActions = [
    { 
      title: "Post New Project", 
      subtitle: "Find talented developers", 
      icon: Plus, 
      action: () => setShowNewProjectDialog(true),
      color: "bg-black"
    },
    { 
      title: "Review Applications", 
      subtitle: `${applications.length} pending`, 
      icon: Eye, 
      action: () => onNavigate('client-projects'),
      color: "bg-gray-800"
    },
    { 
      title: "Find Talent", 
      subtitle: "Browse student profiles", 
      icon: Users, 
      action: () => onNavigate('talent-discovery'),
      color: "bg-gray-700"
    },
    { 
      title: "Manage Payments", 
      subtitle: "Escrow & milestones", 
      icon: DollarSign, 
      action: () => onNavigate('client-payments'),
      color: "bg-gray-600"
    }
  ];

  const stats = [
    { label: "Active Projects", value: "3", change: "+1", trend: "up", icon: Briefcase },
    { label: "Total Applications", value: "46", change: "+12", trend: "up", icon: Users },
    { label: "Success Rate", value: "95%", change: "+2%", trend: "up", icon: Target },
    { label: "Avg. Rating", value: "4.8", change: "+0.2", trend: "up", icon: Star }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
        {/* Welcome Section */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-card-foreground mb-2">
                Welcome back, {client.name.split(' ')[0]}! 👋
              </h2>
              <p className="text-muted-foreground">{client.company} • Client Dashboard</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button onClick={() => onNavigate('talent-discovery')} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Users className="w-4 h-4 mr-2" />
                Find Talent
              </Button>
              <Button onClick={() => setShowNewProjectDialog(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon className="w-8 h-8 text-card-foreground" />
                  </div>
                  <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                  <div className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'} flex items-center justify-center mt-1`}>
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card 
                key={index} 
                className="hover-lift cursor-pointer border-border hover:border-primary transition-smooth group"
                onClick={action.action}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-smooth`}>
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-smooth" />
                  </div>
                  <h3 className="font-medium text-card-foreground mb-1">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.subtitle}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Projects */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-card-foreground" />
                    My Projects
                    <Badge variant="outline" className="ml-2">{projects.length} total</Badge>
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => onNavigate('client-projects')}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {projects.map((project) => (
                  <div 
                    key={project.id} 
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary transition-smooth cursor-pointer group"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-card-foreground group-hover:text-muted-foreground">{project.title}</h4>
                        <Badge 
                          variant={
                            project.status === 'Completed' ? 'default' :
                            project.status === 'In Progress' ? 'secondary' : 'outline'
                          }
                          className="text-xs"
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          ₹{project.budget.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {project.deadline}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {project.applications} applied
                        </span>
                      </div>
                      {project.progress > 0 && (
                        <div className="mt-2">
                          <Progress value={project.progress} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">{project.progress}% complete</p>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('client-projects');
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Applications */}
            <Card className="border-border">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-card-foreground" />
                    Recent Applications
                    <Badge variant="outline" className="ml-2">{applications.length} new</Badge>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => onNavigate('client-projects')}>
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {applications.slice(0, 2).map((application) => {
                  const project = projects.find(p => p.id === application.projectId);
                  return (
                    <div 
                      key={application.id} 
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary transition-smooth cursor-pointer group"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-muted text-card-foreground">
                            {application.studentName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-card-foreground group-hover:text-muted-foreground">{application.studentName}</h4>
                          <p className="text-sm text-muted-foreground">{project?.title}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs">{application.rating}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{application.experience}</span>
                            <Badge variant="outline" className="text-xs">₹{application.budget.toLocaleString()}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Hire
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            {/* Messages */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-card-foreground" />
                  Messages
                  <Badge variant="outline" className="ml-auto">{messages.filter(m => m.unread).length} new</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {messages.map((message) => (
                  <div key={message.id} className={`p-3 border rounded-lg hover:border-primary transition-smooth cursor-pointer ${message.unread ? 'bg-muted/50' : ''}`}>
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="font-medium text-sm text-card-foreground">{message.from}</h5>
                      {message.unread && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{message.project}</p>
                    <p className="text-sm text-card-foreground mb-2">{message.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{message.time}</span>
                      <Button size="sm" variant="ghost" className="text-xs px-2 py-1 h-6">
                        Reply
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Messages
                </Button>
              </CardContent>
            </Card>

            {/* Analytics */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-card-foreground" />
                  Project Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Success Rate</span>
                    <span className="font-bold text-lg text-black">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Budget Utilization</span>
                    <span className="font-bold text-lg text-black">69%</span>
                  </div>
                  <Progress value={69} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg. Project Time</span>
                    <span className="font-bold text-lg text-black">4.2w</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-black" />
                  Tips for Success
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-black">Write clear project descriptions</p>
                  <p className="text-xs text-gray-600">Detailed requirements help attract the right talent</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-black">Set realistic budgets</p>
                  <p className="text-xs text-gray-600">Fair pricing leads to better proposals</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-black">Communicate regularly</p>
                  <p className="text-xs text-gray-600">Stay in touch with your hired developers</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Project Details Dialog */}
        {selectedProject && (
          <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{selectedProject.title}</DialogTitle>
                <DialogDescription>
                  View detailed information about this project including budget, timeline, and milestones.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">{selectedProject.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Budget: </span>
                    <span>₹{selectedProject.budget.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="font-medium">Deadline: </span>
                    <span>{selectedProject.deadline}</span>
                  </div>
                  <div>
                    <span className="font-medium">Applications: </span>
                    <span>{selectedProject.applications}</span>
                  </div>
                  <div>
                    <span className="font-medium">Status: </span>
                    <Badge>{selectedProject.status}</Badge>
                  </div>
                </div>

                {selectedProject.milestones && (
                  <div>
                    <h4 className="font-medium mb-3">Project Milestones</h4>
                    <div className="space-y-3">
                      {selectedProject.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <h5 className="font-medium text-sm">{milestone.name}</h5>
                            <div className="flex items-center gap-2 mt-1">
                              <Progress value={milestone.progress} className="h-2 flex-1" />
                              <span className="text-xs text-gray-500">{milestone.progress}%</span>
                            </div>
                          </div>
                          <div className="ml-4 text-sm">
                            ₹{milestone.payment.toLocaleString()}
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

        {/* New Project Dialog */}
        <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Post New Project</DialogTitle>
              <DialogDescription>
                Create a new project posting to attract talented students and freelancers.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Title</label>
                <Input placeholder="e.g., Build a React E-commerce Website" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Description</label>
                <Textarea placeholder="Describe your project requirements in detail..." rows={4} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Budget (₹)</label>
                  <Input type="number" placeholder="25000" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Deadline</label>
                  <Input type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Required Skills</label>
                <Input placeholder="React, Node.js, MongoDB (comma separated)" />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowNewProjectDialog(false)}>
                  Cancel
                </Button>
                <Button className="bg-black hover:bg-gray-800">
                  Post Project
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
}