import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ArrowLeft, TrendingUp, DollarSign, CreditCard, Smartphone, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface EarningsDashboardProps {
  onNavigate: (screen: string) => void;
}

export function EarningsDashboard({ onNavigate }: EarningsDashboardProps) {
  const earningsData = {
    totalEarnings: 125000,
    thisMonth: 18500,
    lastMonth: 22000,
    pendingPayments: 15000,
    availableBalance: 8500
  };

  const recentPayments = [
    {
      id: 1,
      project: "E-commerce Dashboard",
      client: "TechCorp Solutions",
      amount: 35000,
      date: "2023-12-15",
      status: "completed",
      milestone: "Final Delivery"
    },
    {
      id: 2,
      project: "Fitness Mobile App",
      client: "FitLife Startup",
      amount: 12500,
      date: "2023-12-10",
      status: "completed",
      milestone: "Milestone 2"
    },
    {
      id: 3,
      project: "Restaurant Website",
      client: "Spice Garden",
      amount: 8000,
      date: "2023-12-05",
      status: "completed",
      milestone: "Final Delivery"
    },
    {
      id: 4,
      project: "Data Dashboard",
      client: "Analytics Pro",
      amount: 15000,
      date: "2023-12-20",
      status: "pending",
      milestone: "Milestone 3"
    }
  ];

  const financialTips = [
    {
      title: "Tax Planning",
      description: "Set aside 30% of your earnings for tax obligations. Consider opening a separate savings account for taxes.",
      category: "Tax"
    },
    {
      title: "Emergency Fund",
      description: "Build an emergency fund covering 6 months of expenses. This provides security during lean periods.",
      category: "Savings"
    },
    {
      title: "Invoice Management",
      description: "Send invoices promptly and follow up on overdue payments. Use milestone-based payments for larger projects.",
      category: "Business"
    },
    {
      title: "Investment Basics",
      description: "Consider investing a portion of your earnings in mutual funds or SIPs for long-term wealth building.",
      category: "Investment"
    }
  ];

  const monthlyGrowth = ((earningsData.thisMonth - earningsData.lastMonth) / earningsData.lastMonth) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
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
              <h1 className="text-2xl font-medium text-card-foreground">Earnings</h1>
              <p className="text-muted-foreground">
                Track your income, manage finances, and plan for the future
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => onNavigate('escrow')} variant="outline" className="border-border hover:bg-muted/50">
              View Escrow
            </Button>
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Earnings Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover-lift border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Total Earnings</p>
                      <p className="text-3xl font-medium text-card-foreground mt-2">
                        {formatCurrency(earningsData.totalEarnings)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">This Month</p>
                      <p className="text-3xl font-medium text-card-foreground mt-2">
                        {formatCurrency(earningsData.thisMonth)}
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        {monthlyGrowth >= 0 ? (
                          <ArrowUpRight className="w-4 h-4 text-green-600" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-600" />
                        )}
                        <span className={`text-sm font-medium ${monthlyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {Math.abs(monthlyGrowth).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Pending</p>
                      <p className="text-3xl font-medium text-orange-600 mt-2">
                        {formatCurrency(earningsData.pendingPayments)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Available</p>
                      <p className="text-3xl font-medium text-green-600 mt-2">
                        {formatCurrency(earningsData.availableBalance)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Payments */}
            <Card className="hover-lift border-border bg-card">
              <CardHeader className="px-6 py-6">
                <CardTitle className="text-xl font-medium text-card-foreground">Recent Payments</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="space-y-4">
                  {recentPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border hover:bg-muted/40 transition-smooth">
                      <div className="flex-1 space-y-1">
                        <h4 className="font-medium text-card-foreground">{payment.project}</h4>
                        <p className="text-sm text-muted-foreground">{payment.client} • {payment.milestone}</p>
                        <p className="text-xs text-muted-foreground">{new Date(payment.date).toLocaleDateString('en-IN')}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-medium text-lg text-card-foreground">{formatCurrency(payment.amount)}</p>
                        <Badge 
                          variant={payment.status === 'completed' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {payment.status === 'completed' ? 'Paid' : 'Pending'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Withdrawal Section */}
            <Card className="hover-lift">
              <CardHeader className="px-6 py-6">
                <CardTitle className="text-xl font-medium">Withdraw Funds</CardTitle>
                <p className="text-sm text-gray-600 mt-2">
                  Available for withdrawal: <span className="font-medium text-green-600">{formatCurrency(earningsData.availableBalance)}</span>
                </p>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button className="h-20 flex-col gap-2 hover-scale">
                      <Smartphone className="w-6 h-6" />
                      <span className="font-medium">Withdraw to UPI</span>
                      <span className="text-xs opacity-80">Instant • 0% fee</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2 hover-scale">
                      <CreditCard className="w-6 h-6" />
                      <span className="font-medium">Bank Transfer</span>
                      <span className="text-xs opacity-80">1-2 days • 0% fee</span>
                    </Button>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-600">
                      * Funds are typically processed within the timeframe mentioned above.
                      Ensure your payment details are up to date.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Progress */}
            <Card className="hover-lift">
              <CardHeader className="px-6 py-6">
                <CardTitle className="text-xl font-medium">Monthly Progress</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="space-y-6">
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Target: <span className="font-medium text-gray-900">₹25,000</span></span>
                    <span className="text-gray-900 font-medium">Current: {formatCurrency(earningsData.thisMonth)}</span>
                  </div>
                  <Progress value={(earningsData.thisMonth / 25000) * 100} className="h-3" />
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600">
                      🎯 You're <span className="font-medium text-primary">{((earningsData.thisMonth / 25000) * 100).toFixed(0)}%</span> towards your monthly goal! Keep up the great work.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Financial Tips */}
            <Card className="hover-lift">
              <CardHeader className="px-6 py-6">
                <CardTitle className="text-xl font-medium">Financial Tips</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="space-y-4">
                  {financialTips.map((tip, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-smooth">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-sm">{tip.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {tip.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">{tip.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="hover-lift">
              <CardHeader className="px-6 py-6">
                <CardTitle className="text-xl font-medium">This Month</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Projects Completed</span>
                    <span className="font-medium text-lg">3</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Hours Worked</span>
                    <span className="font-medium text-lg">84h</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Avg. Hourly Rate</span>
                    <span className="font-medium text-lg">₹220</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-gray-600">Client Rating</span>
                    <span className="font-medium text-lg">4.8/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="hover-lift">
              <CardHeader className="px-6 py-6">
                <CardTitle className="text-xl font-medium">Payment Methods</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">UPI</p>
                        <p className="text-xs text-gray-600">priya@paytm</p>
                      </div>
                    </div>
                    <Badge className="bg-black text-xs">Primary</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">HDFC Bank</p>
                        <p className="text-xs text-gray-600">****1234</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">Backup</Badge>
                  </div>
                  <Button variant="outline" className="w-full mt-4 hover-scale" size="sm">
                    Add Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}