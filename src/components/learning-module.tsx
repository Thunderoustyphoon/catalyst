import { useState, useCallback } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import {
  Play,
  Pause,
  RotateCcw,
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronRight,
  Volume2,
  Maximize,
  Minimize,
  Settings,
  PlayCircle,
  FileText,
  Code,
  X
} from "lucide-react";

interface LearningModuleProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  onOpenChat?: (partner?: { name: string; role: string; isOnline: boolean }) => void;
  courseId?: string | null;
  onBackToCourses?: () => void;
  onBack?: () => void;
}

interface CourseSection {
  id: string;
  title: string;
  duration: string;
  completed: number;
  total: number;
  expanded: boolean;
  lessons: {
    id: string;
    title: string;
    duration: string;
    type: "video" | "reading" | "quiz" | "assignment";
    completed: boolean;
    current?: boolean;
  }[];
}

export function LearningModule({
  onNavigate,
  onBackToCourses,
}: LearningModuleProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoProgress] = useState(35);
  const [currentTime] = useState("8:42");
  const [totalTime] = useState("24:15");
  const [showCourseContent, setShowCourseContent] = useState(true);
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);

  const [courseSections, setCourseSections] = useState<CourseSection[]>([
    {
      id: "section-1",
      title: "React Fundamentals (Getting Started)",
      duration: "45min",
      completed: 2,
      total: 6,
      expanded: true,
      lessons: [
        { id: "lesson-1-1", title: "Introduction to React", duration: "8:30", type: "video", completed: true },
        { id: "lesson-1-2", title: "Setting Up Development Environment", duration: "12:45", type: "video", completed: true },
        { id: "lesson-1-3", title: "Your First React Component", duration: "15:20", type: "video", completed: false, current: true },
        { id: "lesson-1-4", title: "Understanding JSX", duration: "10:30", type: "video", completed: false },
        { id: "lesson-1-5", title: "Component Props", duration: "14:15", type: "video", completed: false },
        { id: "lesson-1-6", title: "Practice Exercise", duration: "20min", type: "assignment", completed: false },
      ],
    },
    {
      id: "section-2",
      title: "State Management & Event Handling",
      duration: "1hr 25min",
      completed: 0,
      total: 8,
      expanded: false,
      lessons: [
        { id: "lesson-2-1", title: "Understanding State", duration: "12:30", type: "video", completed: false },
        { id: "lesson-2-2", title: "useState Hook", duration: "18:45", type: "video", completed: false },
        { id: "lesson-2-3", title: "Event Handling", duration: "15:20", type: "video", completed: false },
        { id: "lesson-2-4", title: "Controlled Components", duration: "16:40", type: "video", completed: false },
        { id: "lesson-2-5", title: "State Best Practices", duration: "10:15", type: "reading", completed: false },
        { id: "lesson-2-6", title: "Building a Counter App", duration: "22:30", type: "video", completed: false },
        { id: "lesson-2-7", title: "Interactive Quiz", duration: "15min", type: "quiz", completed: false },
        { id: "lesson-2-8", title: "Project: Todo List", duration: "45min", type: "assignment", completed: false },
      ],
    },
    {
      id: "section-3",
      title: "Component Lifecycle & Effects",
      duration: "58min",
      completed: 0,
      total: 5,
      expanded: false,
      lessons: [
        { id: "lesson-3-1", title: "useEffect Hook", duration: "20:15", type: "video", completed: false },
        { id: "lesson-3-2", title: "Cleanup and Dependencies", duration: "16:30", type: "video", completed: false },
        { id: "lesson-3-3", title: "Data Fetching", duration: "18:45", type: "video", completed: false },
        { id: "lesson-3-4", title: "Common Patterns", duration: "12:20", type: "reading", completed: false },
        { id: "lesson-3-5", title: "Build a Weather App", duration: "35min", type: "assignment", completed: false },
      ],
    },
    {
      id: "section-4",
      title: "Advanced React Patterns",
      duration: "1hr 15min",
      completed: 0,
      total: 6,
      expanded: false,
      lessons: [
        { id: "lesson-4-1", title: "Context API", duration: "22:30", type: "video", completed: false },
        { id: "lesson-4-2", title: "Custom Hooks", duration: "18:15", type: "video", completed: false },
        { id: "lesson-4-3", title: "Higher-Order Components", duration: "16:45", type: "video", completed: false },
        { id: "lesson-4-4", title: "Render Props Pattern", duration: "14:20", type: "video", completed: false },
        { id: "lesson-4-5", title: "Performance Optimization", duration: "20:30", type: "reading", completed: false },
        { id: "lesson-4-6", title: "Final Project", duration: "1hr", type: "assignment", completed: false },
      ],
    },
  ]);

  const courseInfo = {
    title: "Complete React Development Course",
    instructor: "Dr. Sarah Johnson",
    totalDuration: "4h 23min",
    totalLessons: 25,
    completedLessons: 2,
  };

  const toggleSection = useCallback((sectionId: string) => {
    setCourseSections((sections) =>
      sections.map((section) =>
        section.id === sectionId
          ? { ...section, expanded: !section.expanded }
          : section
      )
    );
  }, []);

  const handleVideoToggle = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  const getLessonIcon = (type: string, completed: boolean) => {
    if (completed) {
      return <CheckCircle className="w-4 h-4 text-primary" />;
    }
    switch (type) {
      case "video":
        return <PlayCircle className="w-4 h-4 text-muted-foreground" />;
      case "reading":
        return <FileText className="w-4 h-4 text-muted-foreground" />;
      case "assignment":
        return <Code className="w-4 h-4 text-muted-foreground" />;
      default:
        return <BookOpen className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const currentLesson = courseSections
    .flatMap((section) => section.lessons)
    .find((lesson) => lesson.current);

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Fixed */}
      <div className="bg-card border-b border-border px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToCourses || (() => onNavigate("dashboard"))}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {onBackToCourses ? "Back to Courses" : "Back to Dashboard"}
            </Button>
            <div>
              <h1
                className="text-foreground"
                style={{ fontSize: "var(--text-base)", fontWeight: 500 }}
              >
                {courseInfo.title}
              </h1>
              <p
                className="text-muted-foreground"
                style={{ fontSize: "var(--text-sm)", fontWeight: 400 }}
              >
                by {courseInfo.instructor}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="text-muted-foreground hidden sm:block"
              style={{ fontSize: "var(--text-sm)" }}
            >
              {courseInfo.completedLessons} of {courseInfo.totalLessons} lessons completed
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCourseContent(!showCourseContent)}
              className="lg:hidden"
              aria-label="Toggle course content sidebar"
            >
              Course Content
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Video Player Section - Scrollable */}
        <div className="flex-1 overflow-y-auto" style={{ height: "calc(100vh - 65px)" }}>
          {/* Video Container - 4:3 Aspect Ratio with Resize Toggle */}
          <div
            className="bg-black relative w-full"
            style={{
              aspectRatio: isVideoExpanded ? "16 / 9" : "4 / 3",
              maxHeight: isVideoExpanded ? "80vh" : "65vh",
              transition: "aspect-ratio 0.3s ease, max-height 0.3s ease",
            }}
          >
            {/* Video Player Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h2
                  className="mb-2 text-white"
                  style={{ fontSize: "var(--text-2xl)", fontWeight: 500 }}
                >
                  {currentLesson?.title || "Your First React Component"}
                </h2>
                <p
                  className="opacity-80 mb-6 text-white"
                  style={{ fontSize: "var(--text-sm)", fontWeight: 400 }}
                >
                  Learn how to create and structure React components effectively
                </p>
                <Button
                  size="lg"
                  onClick={handleVideoToggle}
                  className="bg-white text-black hover:bg-white/90"
                  aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                >
                  {isVideoPlaying ? (
                    <>
                      <Pause className="w-5 h-5 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Play
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="space-y-2">
                <Progress value={videoProgress} className="h-1" />
                <div className="flex items-center justify-between text-white" style={{ fontSize: "var(--text-sm)" }}>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleVideoToggle}
                      className="text-white hover:bg-white/20"
                      aria-label={isVideoPlaying ? "Pause" : "Play"}
                    >
                      {isVideoPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4" />
                      <span>
                        {currentTime} / {totalTime}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" aria-label="Settings">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                      onClick={() => setIsVideoExpanded(!isVideoExpanded)}
                      aria-label={isVideoExpanded ? "Minimize video" : "Maximize video"}
                    >
                      {isVideoExpanded ? (
                        <Minimize className="w-4 h-4" />
                      ) : (
                        <Maximize className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Info and Controls */}
          <div className="p-6 border-b border-border bg-card">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h3
                  className="text-foreground mb-2"
                  style={{ fontSize: "var(--text-base)", fontWeight: 500 }}
                >
                  {currentLesson?.title || "Your First React Component"}
                </h3>
                <div className="flex items-center gap-4" style={{ fontSize: "var(--text-sm)" }}>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {currentLesson?.duration || "15:20"}
                  </span>
                  <Badge variant="outline">Video Lesson</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Replay
                </Button>
                <Button variant="outline" size="sm">
                  Speed: 1x
                </Button>
              </div>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="p-6 bg-background">
            <div className="max-w-4xl space-y-8">
              {/* Lesson Description */}
              <div>
                <h4
                  className="mb-4 text-foreground"
                  style={{ fontSize: "var(--text-base)", fontWeight: 500 }}
                >
                  About this lesson
                </h4>
                <div className="text-muted-foreground space-y-4" style={{ fontSize: "var(--text-sm)", fontWeight: 400 }}>
                  <p>
                    In this lesson, you'll learn the fundamental concepts of
                    React components and how to structure them effectively. We'll
                    cover JSX syntax, component props, and best practices for
                    organizing your code.
                  </p>
                  <p>
                    By the end of this lesson, you'll be able to create your own
                    React components and understand how they fit into the larger
                    React ecosystem. This comprehensive guide will take you
                    through practical examples and real-world applications.
                  </p>
                </div>
              </div>

              {/* Key Topics */}
              <div>
                <h5
                  className="text-foreground mb-3"
                  style={{ fontSize: "var(--text-base)", fontWeight: 500 }}
                >
                  Key Topics Covered
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Component structure and organization",
                    "JSX syntax and best practices",
                    "Props and data flow",
                    "Component naming conventions",
                    "Common patterns and anti-patterns",
                    "Performance considerations",
                    "Testing React components",
                    "Component composition patterns",
                  ].map((topic) => (
                    <div
                      key={topic}
                      className="flex items-center gap-2"
                      style={{ fontSize: "var(--text-sm)" }}
                    >
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Resources */}
              <div>
                <h5
                  className="text-foreground mb-3"
                  style={{ fontSize: "var(--text-base)", fontWeight: 500 }}
                >
                  Additional Resources
                </h5>
                <div className="space-y-3">
                  {[
                    {
                      icon: FileText,
                      title: "Lesson Notes",
                      desc: "Downloadable PDF with key concepts and code examples",
                    },
                    {
                      icon: Code,
                      title: "Code Examples",
                      desc: "Interactive code sandbox with all lesson examples",
                    },
                    {
                      icon: BookOpen,
                      title: "Exercise Workbook",
                      desc: "Practice exercises to reinforce your learning",
                    },
                  ].map((resource) => {
                    const Icon = resource.icon;
                    return (
                      <Card key={resource.title} className="p-4">
                        <div className="flex items-start gap-3">
                          <Icon className="w-5 h-5 text-muted-foreground mt-0.5" />
                          <div>
                            <h6
                              className="text-foreground"
                              style={{ fontSize: "var(--text-sm)", fontWeight: 500 }}
                            >
                              {resource.title}
                            </h6>
                            <p
                              className="text-muted-foreground"
                              style={{ fontSize: "var(--text-sm)", fontWeight: 400 }}
                            >
                              {resource.desc}
                            </p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Discussion */}
              <div>
                <h5
                  className="text-foreground mb-4"
                  style={{ fontSize: "var(--text-base)", fontWeight: 500 }}
                >
                  Discussion
                </h5>
                <div className="space-y-4">
                  {[
                    {
                      initials: "JD",
                      name: "John Doe",
                      time: "2 hours ago",
                      text: "Great explanation of React components! The JSX examples really helped clarify the concepts.",
                      bg: "bg-primary",
                      textColor: "text-primary-foreground",
                    },
                    {
                      initials: "SM",
                      name: "Sarah Miller",
                      time: "1 day ago",
                      text: "Could you provide more examples of component composition patterns? I'm still a bit confused about when to use props vs state.",
                      bg: "bg-secondary",
                      textColor: "text-secondary-foreground",
                    },
                  ].map((comment) => (
                    <Card key={comment.initials} className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 ${comment.bg} rounded-full flex items-center justify-center ${comment.textColor} flex-shrink-0`}
                          style={{ fontSize: "var(--text-sm)", fontWeight: 500 }}
                        >
                          {comment.initials}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="text-foreground"
                              style={{ fontSize: "var(--text-sm)", fontWeight: 500 }}
                            >
                              {comment.name}
                            </span>
                            <span
                              className="text-muted-foreground"
                              style={{ fontSize: "var(--text-xs)", fontWeight: 400 }}
                            >
                              {comment.time}
                            </span>
                          </div>
                          <p
                            className="text-muted-foreground"
                            style={{ fontSize: "var(--text-sm)", fontWeight: 400 }}
                          >
                            {comment.text}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Bottom padding for scroll */}
              <div className="h-20" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Course Content Sidebar - Fixed Height with Internal Scroll */}
        <div
          className={`w-80 bg-card border-l border-border flex-shrink-0 ${
            showCourseContent ? "block" : "hidden lg:block"
          }`}
          style={{ height: "calc(100vh - 65px)", position: "sticky", top: "65px" }}
        >
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3
                className="text-foreground"
                style={{ fontSize: "var(--text-base)", fontWeight: 500 }}
              >
                Course content
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCourseContent(false)}
                className="lg:hidden"
                aria-label="Close sidebar"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div
              className="text-muted-foreground mt-1"
              style={{ fontSize: "var(--text-sm)", fontWeight: 400 }}
            >
              {courseInfo.totalLessons} lectures &bull; {courseInfo.totalDuration}
            </div>
          </div>

          <div className="overflow-y-auto" style={{ height: "calc(100vh - 185px)" }}>
            {courseSections.map((section) => (
              <Collapsible
                key={section.id}
                open={section.expanded}
                onOpenChange={() => toggleSection(section.id)}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      {section.expanded ? (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      )}
                      <div className="text-left">
                        <div
                          className="text-foreground"
                          style={{ fontSize: "var(--text-sm)", fontWeight: 500 }}
                        >
                          {section.title}
                        </div>
                        <div
                          className="text-muted-foreground"
                          style={{ fontSize: "var(--text-xs)", fontWeight: 400 }}
                        >
                          {section.completed}/{section.total} | {section.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="border-l border-border ml-6">
                    {section.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className={`flex items-center gap-3 p-3 hover:bg-muted/30 transition-colors cursor-pointer ${
                          lesson.current
                            ? "bg-primary/10 border-r-2 border-r-primary"
                            : ""
                        }`}
                        role="button"
                        tabIndex={0}
                        aria-label={`${lesson.title} - ${lesson.duration}${lesson.completed ? " (completed)" : ""}`}
                      >
                        {getLessonIcon(lesson.type, lesson.completed)}
                        <div className="flex-1 min-w-0">
                          <div
                            className={
                              lesson.current
                                ? "text-foreground"
                                : lesson.completed
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }
                            style={{
                              fontSize: "var(--text-sm)",
                              fontWeight: lesson.current ? 500 : 400,
                            }}
                          >
                            {lesson.title}
                          </div>
                          <div
                            className="text-muted-foreground"
                            style={{ fontSize: "var(--text-xs)", fontWeight: 400 }}
                          >
                            {lesson.duration}
                          </div>
                        </div>
                        {lesson.completed && (
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
