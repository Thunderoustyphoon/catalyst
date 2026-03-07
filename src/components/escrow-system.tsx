import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ArrowLeft, Shield, Clock, CheckCircle, AlertCircle, DollarSign, User, Calendar } from "lucide-react";

interface EscrowSystemProps {
  onNavigate: (screen: string) => void;
}

export function EscrowSystem({ onNavigate }: EscrowSystemProps) {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const activeProjects = [
    {
      id: 1,
      title: "E-commerce Dashboard Development",
      client: "TechCorp Solutions",
      totalAmount: 40000,
      milestones: [
        { id: 1, title: "Project Setup & Planning", amount: 10000, status: "completed", submittedDate: "2023-12-01", approvedDate: "2023-12-02" },
        { id: 2, title: "Core Features Development", amount: 20000, status: "completed", submittedDate: "2023-12-10", approvedDate: "2023-12-12" },
        { id: 3, title: "Testing & Bug Fixes", amount: 7000, status: "submitted", submittedDate: "2023-12-20", approvedDate: null },
        { id: 4, title: "Final Delivery & Documentation", amount: 3000, status: "pending", submittedDate: null, approvedDate: null }
      ],
      startDate: "2023-11-15",
      dueDate: "2023-12-30"
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design",
      client: "FitLife Startup",
      totalAmount: 25000,
      milestones: [
        { id: 1, title: "Wireframes & User Flow", amount: 8000, status: "completed", submittedDate: "2023-12-05", approvedDate: "2023-12-06" },
        { id: 2, title: "High-Fidelity Designs", amount: 12000, status: "submitted", submittedDate: "2023-12-18", approvedDate: null },
        { id: 3, title: "Prototype & Handoff", amount: 5000, status: "pending", submittedDate: null, approvedDate: null }
      ],
      startDate: "2023-12-01",
      dueDate: "2023-12-25"
    }
  ];

  const completedProjects = [
    {
      id: 3,
      title: "Restaurant Website Development",
      client: "Spice Garden Restaurant",
      totalAmount: 18000,
      completedDate: "2023-11-30",
      totalMilestones: 3,
      rating: 4.8
    },
    {
      id: 4,
      title: "Portfolio Website",
      client: "Personal Project",
      totalAmount: 12000,
      completedDate: "2023-11-15",
      totalMilestones: 2,
      rating: 5.0
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-secondary';
      case 'submitted':
        return 'bg-warning';
      case 'pending':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'submitted':
        return <Clock className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleMilestoneAction = (projectId: number, milestoneId: number, action: 'submit' | 'request') => {
    if (action === 'submit') {
      alert('Milestone submitted for client approval!');
    } else {
      alert('Approval requested from client!');
    }
  };

  const calculateProjectProgress = (milestones: any[]) => {
    const completedMilestones = milestones.filter(m => m.status === 'completed').length;
    return (completedMilestones / milestones.length) * 100;
  };

  const getTotalEscrowBalance = () => {
    return activeProjects.reduce((total, project) => {
      const pendingAmount = project.milestones
        .filter(m => m.status === 'pending' || m.status === 'submitted')
        .reduce((sum, m) => sum + m.amount, 0);
      return total + pendingAmount;
    }, 0);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      {/* Header with Back Button */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => onNavigate('student')}
              className="border-border hover:bg-muted/50"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-medium text-card-foreground">Escrow System</h1>
              <p className="text-muted-foreground">
                Secure milestone-based payments with client approval system
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Escrow Balance</p>
            <p className="text-2xl font-medium text-card-foreground">
              {formatCurrency(getTotalEscrowBalance())}
            </p>
          </div>
        </div>
      </div>

      <div>
        <Tabs defaultValue="active">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="active">Active Projects</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Project List */}
              <div className="space-y-6">
                {activeProjects.map((project) => (
                  <Card 
                    key={project.id} 
                    className={`cursor-pointer transition-all border-border bg-card ${
                      selectedProject === project.id ? 'ring-2 ring-primary' : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg text-card-foreground">{project.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">{project.client}</p>
                        </div>
                        <Badge className="bg-primary text-primary-foreground">{formatCurrency(project.totalAmount)}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Progress</span>
                          <span>{calculateProjectProgress(project.milestones).toFixed(0)}%</span>
                        </div>
                        <Progress value={calculateProjectProgress(project.milestones)} />
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            {project.milestones.filter(m => m.status === 'completed').length} of {project.milestones.length} milestones completed
                          </span>
                          <div className="flex gap-2">
                            {project.milestones.map((milestone) => (
                              <div
                                key={milestone.id}
                                className={`w-3 h-3 rounded-full ${getStatusColor(milestone.status)}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Milestone Details */}
              <div className="space-y-6">
                {selectedProject && (
                  <>
                    {(() => {
                      const project = activeProjects.find(p => p.id === selectedProject);
                      if (!project) return null;

                      return (
                        <Card className="border-border bg-card">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-card-foreground">
                              <Shield className="w-5 h-5 text-primary" />
                              Milestones & Payments
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">{project.title}</p>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {project.milestones.map((milestone, index) => (
                                <div key={milestone.id} className="relative">
                                  {index < project.milestones.length - 1 && (
                                    <div className="absolute left-6 top-12 w-0.5 h-8 bg-border" />
                                  )}
                                  
                                  <div className="flex gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(milestone.status)} text-white`}>
                                      {getStatusIcon(milestone.status)}
                                    </div>
                                    
                                    <div className="flex-1">
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <h4 className="font-medium text-card-foreground">{milestone.title}</h4>
                                          <p className="text-sm text-muted-foreground mt-1">
                                            {formatCurrency(milestone.amount)}
                                          </p>
                                          {milestone.submittedDate && (
                                            <p className="text-xs text-muted-foreground mt-1">
                                              Submitted: {new Date(milestone.submittedDate).toLocaleDateString()}
                                            </p>
                                          )}
                                          {milestone.approvedDate && (
                                            <p className="text-xs text-green-600 mt-1">
                                              Approved: {new Date(milestone.approvedDate).toLocaleDateString()}
                                            </p>
                                          )}
                                        </div>
                                        
                                        <div className="flex flex-col gap-2">
                                          <Badge 
                                            variant="outline"
                                            className={`text-xs ${
                                              milestone.status === 'completed' ? 'bg-green-50 text-green-700' :
                                              milestone.status === 'submitted' ? 'bg-yellow-50 text-yellow-700' :
                                              'bg-gray-50 text-gray-700'
                                            }`}
                                          >
                                            {milestone.status === 'completed' ? 'Paid' :
                                             milestone.status === 'submitted' ? 'Under Review' : 'Pending'}
                                          </Badge>
                                          
                                          {milestone.status === 'pending' && (
                                            <Button 
                                              size="sm" 
                                              onClick={() => handleMilestoneAction(project.id, milestone.id, 'submit')}
                                            >
                                              Submit Work
                                            </Button>
                                          )}
                                          
                                          {milestone.status === 'submitted' && (
                                            <Button 
                                              variant="outline" 
                                              size="sm"
                                              onClick={() => handleMilestoneAction(project.id, milestone.id, 'request')}
                                            >
                                              Request Approval
                                            </Button>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })()}

                    {/* Escrow Balance */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Escrow Balance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Project Value</span>
                            <span className="font-semibold">
                              {formatCurrency(activeProjects.find(p => p.id === selectedProject)?.totalAmount || 0)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Amount Released</span>
                            <span className="font-semibold text-secondary">
                              {formatCurrency(
                                activeProjects.find(p => p.id === selectedProject)?.milestones
                                  .filter(m => m.status === 'completed')
                                  .reduce((sum, m) => sum + m.amount, 0) || 0
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">In Escrow</span>
                            <span className="font-semibold" style={{ color: 'var(--warning)' }}>
                              {formatCurrency(
                                activeProjects.find(p => p.id === selectedProject)?.milestones
                                  .filter(m => m.status === 'pending' || m.status === 'submitted')
                                  .reduce((sum, m) => sum + m.amount, 0) || 0
                              )}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}

                {!selectedProject && (
                  <Card className="flex items-center justify-center h-64">
                    <div className="text-center text-gray-500">
                      <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Select a project to view milestone details</p>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <p className="text-sm text-gray-600">{project.client}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Earned</span>
                        <span className="font-semibold text-secondary">
                          {formatCurrency(project.totalAmount)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Completed</span>
                        <span className="text-sm">
                          {new Date(project.completedDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Milestones</span>
                        <span className="text-sm">{project.totalMilestones}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Rating</span>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">{project.rating}</span>
                          <div className="text-yellow-400">★</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}