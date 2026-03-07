import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { 
  DollarSign, Clock, CheckCircle, AlertCircle, Eye, Download,
  CreditCard, Calendar, User, ArrowLeft, Shield, Wallet,
  TrendingUp, Receipt, Send, FileText, Star, History,
  ArrowUpRight, ArrowDownRight, Filter, Search, Timer
} from "lucide-react";

interface ClientPaymentsProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function ClientPayments({ onNavigate, onLogout }: ClientPaymentsProps) {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const projectsWithPayments = [
    {
      id: 1,
      title: "E-commerce Website Development",
      freelancer: "Rahul Kumar",
      totalBudget: 35000,
      paidAmount: 26250,
      pendingAmount: 8750,
      progress: 75,
      status: "In Progress",
      startDate: "2024-01-05",
      milestones: [
        {
          id: 1,
          name: "Project Setup & Planning",
          amount: 8750,
          dueDate: "2024-01-10",
          status: "completed",
          paymentDate: "2024-01-10",
          paymentMethod: "UPI",
          transactionId: "TXN123456789"
        },
        {
          id: 2,
          name: "Frontend Development",
          amount: 17500,
          dueDate: "2024-01-25",
          status: "completed",
          paymentDate: "2024-01-25",
          paymentMethod: "Bank Transfer",
          transactionId: "TXN123456790"
        },
        {
          id: 3,
          name: "Backend Integration",
          amount: 8750,
          dueDate: "2024-02-05",
          status: "submitted",
          submittedDate: "2024-02-03",
          paymentMethod: null,
          transactionId: null
        },
        {
          id: 4,
          name: "Testing & Deployment",
          amount: 8750,
          dueDate: "2024-02-15",
          status: "pending",
          paymentMethod: null,
          transactionId: null
        }
      ]
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design",
      freelancer: "Priya Sharma",
      totalBudget: 20000,
      paidAmount: 20000,
      pendingAmount: 0,
      progress: 100,
      status: "Completed",
      startDate: "2023-12-15",
      completedDate: "2024-01-28",
      rating: 4.9,
      milestones: [
        {
          id: 1,
          name: "Wireframes & User Flow",
          amount: 8000,
          dueDate: "2023-12-25",
          status: "completed",
          paymentDate: "2023-12-25",
          paymentMethod: "UPI",
          transactionId: "TXN123456791"
        },
        {
          id: 2,
          name: "High-Fidelity Designs",
          amount: 12000,
          dueDate: "2024-01-15",
          status: "completed",
          paymentDate: "2024-01-15",
          paymentMethod: "Bank Transfer",
          transactionId: "TXN123456792"
        }
      ]
    }
  ];

  const paymentHistory = [
    {
      id: 1,
      projectTitle: "E-commerce Website Development",
      freelancer: "Rahul Kumar",
      amount: 17500,
      date: "2024-01-25",
      method: "Bank Transfer",
      status: "Completed",
      transactionId: "TXN123456790",
      milestone: "Frontend Development"
    },
    {
      id: 2,
      projectTitle: "Mobile App UI/UX Design",
      freelancer: "Priya Sharma",
      amount: 12000,
      date: "2024-01-15",
      method: "Bank Transfer",
      status: "Completed",
      transactionId: "TXN123456792",
      milestone: "High-Fidelity Designs"
    },
    {
      id: 3,
      projectTitle: "E-commerce Website Development",
      freelancer: "Rahul Kumar",
      amount: 8750,
      date: "2024-01-10",
      method: "UPI",
      status: "Completed",
      transactionId: "TXN123456789",
      milestone: "Project Setup & Planning"
    },
    {
      id: 4,
      projectTitle: "Mobile App UI/UX Design",
      freelancer: "Priya Sharma",
      amount: 8000,
      date: "2023-12-25",
      method: "UPI",
      status: "Completed",
      transactionId: "TXN123456791",
      milestone: "Wireframes & User Flow"
    }
  ];

  const totalStats = {
    totalPaid: paymentHistory.reduce((sum, payment) => sum + payment.amount, 0),
    thisMonth: 0,
    pendingPayments: projectsWithPayments.reduce((sum, project) => sum + project.pendingAmount, 0),
    activeProjects: projectsWithPayments.filter(p => p.status === "In Progress").length
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handlePayMilestone = (milestone: any) => {
    setSelectedMilestone(milestone);
    setShowPaymentDialog(true);
  };

  const processPayment = () => {
    alert(`Payment of ${formatCurrency(selectedMilestone.amount)} processed successfully!`);
    setShowPaymentDialog(false);
    setSelectedMilestone(null);
  };

  const getMilestoneActionButton = (milestone: any) => {
    switch (milestone.status) {
      case "completed":
        return (
          <Badge variant="outline" className="border-black text-black">
            <CheckCircle className="w-3 h-3 mr-1" />
            Paid
          </Badge>
        );
      case "submitted":
        return (
          <Button 
            size="sm" 
            className="bg-black hover:bg-gray-800 text-white h-8 px-3"
            onClick={() => handlePayMilestone(milestone)}
          >
            <DollarSign className="w-3 h-3 mr-1" />
            Pay Now
          </Button>
        );
      case "pending":
        return (
          <Badge variant="outline" className="border-muted-foreground text-muted-foreground">
            <Clock className="w-3 h-3 mr-1" />
            Awaiting Work
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('client-dashboard')}
              className="text-black hover:bg-muted p-2 -ml-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <p className="text-muted-foreground">
            Manage payments, track milestones, and view transaction history
          </p>
        </div>

        {/* Payment Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    TOTAL PAID
                  </p>
                  <p className="text-2xl font-medium text-card-foreground">
                    {formatCurrency(totalStats.totalPaid)}
                  </p>
                </div>
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    THIS MONTH
                  </p>
                  <p className="text-2xl font-medium text-card-foreground">
                    {formatCurrency(totalStats.thisMonth)}
                  </p>
                </div>
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    PENDING
                  </p>
                  <p className="text-2xl font-medium text-card-foreground">
                    {formatCurrency(totalStats.pendingPayments)}
                  </p>
                </div>
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Timer className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    ACTIVE PROJECTS
                  </p>
                  <p className="text-2xl font-medium text-card-foreground">
                    {totalStats.activeProjects}
                  </p>
                </div>
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-muted">
            <TabsTrigger value="overview" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
              Payment Overview
            </TabsTrigger>
            <TabsTrigger value="milestones" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
              Milestones
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
              Payment History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="space-y-6">
              {projectsWithPayments.map((project) => (
                <Card key={project.id} className="border-border bg-card">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg font-medium text-card-foreground mb-2">
                          {project.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {project.freelancer}
                        </p>
                      </div>
                      <Badge 
                        variant="outline"
                        className={project.status === "Completed" 
                          ? "border-black bg-black text-white" 
                          : "border-black text-black bg-background"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total Budget</p>
                        <p className="text-base font-medium text-card-foreground">
                          {formatCurrency(project.totalBudget)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Paid Amount</p>
                        <p className="text-base font-medium text-card-foreground">
                          {formatCurrency(project.paidAmount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Pending</p>
                        <p className="text-base font-medium text-card-foreground">
                          {formatCurrency(project.pendingAmount)}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Payment Progress</span>
                        <span className="text-card-foreground font-medium">
                          {Math.round((project.paidAmount / project.totalBudget) * 100)}%
                        </span>
                      </div>
                      <Progress 
                        value={(project.paidAmount / project.totalBudget) * 100} 
                        className="h-2 bg-muted"
                      />
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-muted-foreground">
                        Started: {new Date(project.startDate).toLocaleDateString()}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedProject(project)}
                        className="border-black text-black hover:bg-black hover:text-white"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Milestones
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="milestones" className="mt-6">
            <div className="space-y-6">
              {projectsWithPayments.map((project) => (
                <Card key={project.id} className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium text-card-foreground flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      {project.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Freelancer: {project.freelancer}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {project.milestones.map((milestone, index) => (
                        <div key={milestone.id} className="relative">
                          {index < project.milestones.length - 1 && (
                            <div className="absolute left-6 top-12 w-0.5 h-8 bg-border" />
                          )}
                          
                          <div className="flex gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                              milestone.status === 'completed' ? 'bg-black border-black' : 
                              milestone.status === 'submitted' ? 'bg-background border-black' :
                              'bg-background border-muted-foreground'
                            }`}>
                              {milestone.status === 'completed' && <CheckCircle className="w-6 h-6 text-white" />}
                              {milestone.status === 'submitted' && <AlertCircle className="w-6 h-6 text-black" />}
                              {milestone.status === 'pending' && <Clock className="w-6 h-6 text-muted-foreground" />}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h4 className="font-medium text-card-foreground mb-2">
                                    {milestone.name}
                                  </h4>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {formatCurrency(milestone.amount)} • Due: {new Date(milestone.dueDate).toLocaleDateString()}
                                  </p>
                                  {milestone.submittedDate && (
                                    <p className="text-xs text-card-foreground mb-1">
                                      Submitted: {new Date(milestone.submittedDate).toLocaleDateString()}
                                    </p>
                                  )}
                                  {milestone.paymentDate && (
                                    <p className="text-xs text-muted-foreground">
                                      Paid: {new Date(milestone.paymentDate).toLocaleDateString()} via {milestone.paymentMethod}
                                    </p>
                                  )}
                                </div>
                                
                                <div className="flex flex-col gap-2 items-end ml-4">
                                  {getMilestoneActionButton(milestone)}
                                  {milestone.transactionId && (
                                    <span className="text-xs text-muted-foreground">
                                      ID: {milestone.transactionId}
                                    </span>
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
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium text-card-foreground flex items-center gap-2">
                    <History className="w-5 h-5" />
                    Payment History
                  </CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-black text-black hover:bg-black hover:text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentHistory.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
                      <div className="flex-1">
                        <h4 className="font-medium text-card-foreground mb-1">{payment.projectTitle}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{payment.milestone}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Freelancer: {payment.freelancer}</span>
                          <span>Method: {payment.method}</span>
                          <span>ID: {payment.transactionId}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-medium text-card-foreground mb-1">
                          {formatCurrency(payment.amount)}
                        </p>
                        <p className="text-sm text-muted-foreground mb-2">
                          {new Date(payment.date).toLocaleDateString()}
                        </p>
                        <Badge variant="outline" className="border-black bg-black text-white text-xs">
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Payment Dialog */}
        {showPaymentDialog && selectedMilestone && (
          <Dialog open={showPaymentDialog} onOpenChange={() => setShowPaymentDialog(false)}>
            <DialogContent className="max-w-md bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-card-foreground">Process Payment</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Confirm payment for the submitted milestone.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2 text-card-foreground">{selectedMilestone.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Work submitted on {new Date(selectedMilestone.submittedDate).toLocaleDateString()}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Payment Amount:</span>
                    <span className="text-xl font-medium text-card-foreground">
                      {formatCurrency(selectedMilestone.amount)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-medium text-card-foreground">Payment Method</h5>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted">
                      <input type="radio" name="payment-method" defaultChecked className="text-black" />
                      <CreditCard className="w-5 h-5 text-card-foreground" />
                      <span className="text-card-foreground">UPI Payment</span>
                    </label>
                    <label className="flex items-center space-x-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted">
                      <input type="radio" name="payment-method" className="text-black" />
                      <Wallet className="w-5 h-5 text-card-foreground" />
                      <span className="text-card-foreground">Bank Transfer</span>
                    </label>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg border border-border">
                  <p className="text-sm text-card-foreground">
                    <Shield className="w-4 h-4 inline mr-1" />
                    Payments are secured through our escrow system. Funds will be released to the freelancer upon confirmation.
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowPaymentDialog(false)} 
                    className="flex-1 border-border"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={processPayment} 
                    className="bg-black hover:bg-gray-800 text-white flex-1"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Pay Now
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Project Milestones Detail Dialog */}
        {selectedProject && !showPaymentDialog && (
          <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-card-foreground">
                  {selectedProject.title} - Payment Details
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  View detailed payment information and milestone status for this project.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Budget</p>
                    <p className="text-lg font-medium text-card-foreground">
                      {formatCurrency(selectedProject.totalBudget)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Amount Paid</p>
                    <p className="text-lg font-medium text-card-foreground">
                      {formatCurrency(selectedProject.paidAmount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Pending</p>
                    <p className="text-lg font-medium text-card-foreground">
                      {formatCurrency(selectedProject.pendingAmount)}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4 text-card-foreground">Milestone Progress</h4>
                  <div className="space-y-4">
                    {selectedProject.milestones.map((milestone, index) => (
                      <div key={milestone.id} className="relative">
                        {index < selectedProject.milestones.length - 1 && (
                          <div className="absolute left-6 top-12 w-0.5 h-8 bg-border" />
                        )}
                        
                        <div className="flex gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                            milestone.status === 'completed' ? 'bg-black border-black' : 
                            milestone.status === 'submitted' ? 'bg-background border-black' :
                            'bg-background border-muted-foreground'
                          }`}>
                            {milestone.status === 'completed' && <CheckCircle className="w-6 h-6 text-white" />}
                            {milestone.status === 'submitted' && <AlertCircle className="w-6 h-6 text-black" />}
                            {milestone.status === 'pending' && <Clock className="w-6 h-6 text-muted-foreground" />}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h5 className="font-medium text-card-foreground mb-2">{milestone.name}</h5>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {formatCurrency(milestone.amount)} • Due: {new Date(milestone.dueDate).toLocaleDateString()}
                                </p>
                                {milestone.submittedDate && (
                                  <p className="text-xs text-card-foreground mb-1">
                                    Submitted: {new Date(milestone.submittedDate).toLocaleDateString()}
                                  </p>
                                )}
                                {milestone.paymentDate && (
                                  <p className="text-xs text-muted-foreground">
                                    Paid: {new Date(milestone.paymentDate).toLocaleDateString()} via {milestone.paymentMethod}
                                  </p>
                                )}
                              </div>
                              
                              <div className="flex flex-col gap-2 items-end ml-4">
                                {getMilestoneActionButton(milestone)}
                                {milestone.transactionId && (
                                  <span className="text-xs text-muted-foreground">
                                    ID: {milestone.transactionId}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}