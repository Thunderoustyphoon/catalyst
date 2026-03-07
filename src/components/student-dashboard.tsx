import { CourseCard } from "./course-card";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import {
  BookOpen, Trophy, Play, Target, TrendingUp, BrainCircuit,
  Briefcase, Timer, BarChart3, Plus, ChevronRight, Clock,
  Award, Shield, CheckCircle, AlertCircle, Upload, Download,
  GraduationCap, Globe, FileText, Code2
} from "lucide-react";

interface StudentDashboardProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  onOpenChat?: (partner?: { name: string; role: string; isOnline: boolean }) => void;
  userName?: string;
  userEmail?: string;
}

export function StudentDashboard({
  onNavigate,
  onOpenChat,
  userName = "Student",
}: StudentDashboardProps) {
  const student = {
    name: userName,
    level: "Intermediate Developer",
    streak: 12,
  };

  const weeklyStats = [
    { label: "Learning Hours", value: "18.5h", change: "+12%" },
    { label: "Projects Done", value: "3", change: "+1" },
    { label: "Quiz Score", value: "92%", change: "+5%" },
    { label: "Streak", value: "12d", change: "+2" },
  ];

  const quickActions = [
    { title: "Continue Learning", subtitle: "Web Development Path", icon: BookOpen, action: () => onNavigate("learning"), progress: 68 },
    { title: "Take Assessment", subtitle: "Test your skills", icon: BrainCircuit, action: () => onNavigate("quiz") },
    { title: "Browse Projects", subtitle: "Find freelance work", icon: Briefcase, action: () => onNavigate("marketplace") },
  ];

  const currentCourses = [
    {
      id: 1, title: "Advanced React Patterns", instructor: "Sarah Johnson",
      progress: 72, totalTasks: 12, completedTasks: 8, isWatching: 89,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      category: "Development", premium: false,
    },
    {
      id: 2, title: "UI/UX Design Fundamentals", instructor: "Alex Chen",
      progress: 45, totalTasks: 10, completedTasks: 4, isWatching: 156,
      thumbnail: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=250&fit=crop",
      category: "Design", premium: true,
    },
  ];

  const todayTasks = [
    { id: 1, title: "Complete React Hooks Module", type: "Learning", time: "45 min", urgent: true },
    { id: 2, title: "JavaScript Arrays Quiz", type: "Assessment", time: "20 min", urgent: true },
    { id: 3, title: "Build Todo Component", type: "Project", time: "2 hours", urgent: false },
  ];

  const skills = [
    { skill: "JavaScript", progress: 85, level: "Advanced" },
    { skill: "React", progress: 72, level: "Intermediate" },
    { skill: "TypeScript", progress: 45, level: "Beginner" },
  ];

  const govIntegrations = [
    { name: "Digital Locker", icon: Shield, color: "bg-foreground", status: "Verified", statusColor: "text-green-600" },
    { name: "SWAYAM/NPTEL", icon: GraduationCap, color: "bg-foreground", status: "5 Courses", statusColor: "text-foreground" },
    { name: "Skill India", icon: Award, color: "bg-foreground", status: "Level 4", statusColor: "text-foreground" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome + Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-1">
            Welcome back, {student.name.split(" ")[0]}
          </h1>
          <p className="text-sm text-muted-foreground">
            {student.level} &middot; {student.streak} day streak
          </p>
        </div>
        <div className="flex gap-6">
          {weeklyStats.map((stat) => (
            <div key={stat.label} className="text-center min-w-[60px]">
              <div className="text-lg font-semibold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
              <div className="text-xs text-green-600 flex items-center justify-center gap-0.5 mt-0.5">
                <TrendingUp className="w-3 h-3" />
                {stat.change}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Card
              key={action.title}
              className="group cursor-pointer border-border hover:border-foreground/20 transition-colors duration-150"
              onClick={action.action}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-150">
                    <Icon className="w-5 h-5 text-background" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{action.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{action.subtitle}</p>
                {action.progress && (
                  <div className="space-y-1.5">
                    <Progress value={action.progress} className="h-1.5" />
                    <p className="text-xs text-muted-foreground">{action.progress}% complete</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: Courses + Tasks */}
        <div className="xl:col-span-2 space-y-6">
          {/* Active Courses */}
          <Card className="border-border">
            <CardHeader className="pb-4 px-5 pt-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Active Courses
                  <Badge variant="outline" className="text-xs font-normal ml-1">
                    {currentCourses.length}
                  </Badge>
                </CardTitle>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-3">
              {currentCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  variant="compact"
                  showProgress={true}
                  onPlay={() => onNavigate("learning")}
                  onMessage={() => {
                    onOpenChat?.({ name: course.instructor, role: "Instructor", isOnline: true });
                  }}
                />
              ))}
            </CardContent>
          </Card>

          {/* Today's Tasks */}
          <Card className="border-border">
            <CardHeader className="pb-4 px-5 pt-5">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Timer className="w-4 h-4" />
                Today's Focus
                <Badge variant="outline" className="text-xs font-normal ml-1">
                  {todayTasks.length} tasks
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-2">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-foreground/20 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                    <div>
                      <h4 className="text-sm font-medium text-foreground group-hover:text-foreground/80 transition-colors">
                        {task.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">{task.type}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                          <Clock className="w-3 h-3" />
                          {task.time}
                        </span>
                        {task.urgent && (
                          <span className="text-xs text-red-600 font-medium">Urgent</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Government Integration - Compact row */}
          <Card className="border-border">
            <CardHeader className="pb-3 px-5 pt-5">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Government Integrations
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {govIntegrations.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.name} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                      <div className={`w-9 h-9 ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-4 h-4 text-background" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-foreground">{item.name}</div>
                        <div className={`text-xs ${item.statusColor}`}>{item.status}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Progress, Skills, Achievements */}
        <div className="space-y-6">
          {/* Progress */}
          <Card className="border-border">
            <CardHeader className="pb-4 px-5 pt-5">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="text-center mb-4">
                <div className="text-3xl font-semibold text-foreground mb-1">68%</div>
                <p className="text-xs text-muted-foreground mb-3">Overall Progress</p>
                <Progress value={68} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                <div className="text-center">
                  <div className="text-lg font-semibold text-foreground">8</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-muted-foreground">4</div>
                  <div className="text-xs text-muted-foreground">Remaining</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="border-border">
            <CardHeader className="pb-4 px-5 pt-5">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Target className="w-4 h-4" />
                Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-4">
              {skills.map((s) => (
                <div key={s.skill} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{s.skill}</span>
                      <span className="text-xs text-muted-foreground">{s.level}</span>
                    </div>
                    <span className="text-xs font-medium text-foreground">{s.progress}%</span>
                  </div>
                  <Progress value={s.progress} className="h-1.5" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="border-border">
            <CardHeader className="pb-4 px-5 pt-5">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-3">
              {[
                { title: "First Project", date: "2 days ago", unlocked: true },
                { title: "Quiz Master", date: "1 week ago", unlocked: true },
                { title: "Code Reviewer", progress: 60, unlocked: false },
              ].map((a) => (
                <div key={a.title} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${a.unlocked ? "bg-foreground" : "bg-muted"}`}>
                    <Award className={`w-4 h-4 ${a.unlocked ? "text-background" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${a.unlocked ? "text-foreground" : "text-muted-foreground"}`}>
                      {a.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {a.unlocked ? a.date : `${a.progress}% progress`}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Assistant CTA */}
          <Card
            className="border-border cursor-pointer hover:border-foreground/20 transition-colors duration-150"
            onClick={() => onNavigate("ai-assistant")}
          >
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center">
                  <BrainCircuit className="w-5 h-5 text-background" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">AI Assistant</h3>
                  <p className="text-xs text-muted-foreground">Code help, career guidance</p>
                </div>
              </div>
              <Button className="w-full bg-foreground text-background hover:bg-foreground/90 h-9 text-sm">
                Start AI Session
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
