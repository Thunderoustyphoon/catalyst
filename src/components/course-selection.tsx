import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Play, 
  ArrowRight,
  Code2,
  Database,
  Globe,
  Smartphone,
  Palette,
  Server,
  Search
} from "lucide-react";
import { Input } from "./ui/input";

interface CourseSelectionProps {
  onNavigate: (screen: string) => void;
  onSelectCourse: (courseId: string) => void;
  onLogout: () => void;
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  lessons: number;
  enrolled: number;
  rating: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  progress?: number;
  thumbnail: string;
  category: string;
  skills: string[];
  isPopular?: boolean;
  isNew?: boolean;
}

export function CourseSelection({ onNavigate, onSelectCourse, onLogout }: CourseSelectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const courses: Course[] = [
    {
      id: "react-fundamentals",
      title: "Complete React Development Course",
      description: "Master React from basics to advanced concepts. Build real-world projects and learn modern React patterns.",
      instructor: "Dr. Sarah Johnson",
      duration: "4h 23min",
      lessons: 25,
      enrolled: 1250,
      rating: 4.8,
      level: "Beginner",
      progress: 12,
      thumbnail: "https://images.unsplash.com/photo-1653387319597-84bde7e5368e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFjdCUyMHByb2dyYW1taW5nJTIwY29kaW5nfGVufDF8fHx8MTc1ODQ1MzIyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Frontend",
      skills: ["React", "JSX", "Hooks", "State Management"],
      isPopular: true
    },
    {
      id: "javascript-mastery",
      title: "JavaScript Mastery: ES6+ & Beyond",
      description: "Deep dive into modern JavaScript concepts, async programming, and advanced techniques.",
      instructor: "Alex Thompson",
      duration: "6h 15min",
      lessons: 42,
      enrolled: 2100,
      rating: 4.9,
      level: "Intermediate",
      thumbnail: "https://images.unsplash.com/photo-1569693799105-4eb645d89aea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXZhc2NyaXB0JTIwcHJvZ3JhbW1pbmclMjBsYXB0b3B8ZW58MXx8fHwxNzU4NDUzMjMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Programming",
      skills: ["JavaScript", "ES6+", "Async/Await", "DOM"],
      isPopular: true
    },
    {
      id: "python-data-science",
      title: "Python for Data Science & AI",
      description: "Learn Python programming with focus on data analysis, machine learning, and artificial intelligence.",
      instructor: "Dr. Maria Rodriguez",
      duration: "8h 30min",
      lessons: 56,
      enrolled: 1800,
      rating: 4.7,
      level: "Beginner",
      thumbnail: "https://images.unsplash.com/photo-1660616246653-e2c57d1077b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxweXRob24lMjBkYXRhJTIwc2NpZW5jZXxlbnwxfHx8fDE3NTg0NTMyMzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Data Science",
      skills: ["Python", "Pandas", "NumPy", "Machine Learning"],
      isNew: true
    },
    {
      id: "node-backend",
      title: "Node.js Backend Development",
      description: "Build scalable backend applications with Node.js, Express, and database integration.",
      instructor: "James Wilson",
      duration: "5h 45min",
      lessons: 38,
      enrolled: 950,
      rating: 4.6,
      level: "Intermediate",
      thumbnail: "https://images.unsplash.com/photo-1650234083180-4b965afac328?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub2RlanMlMjBiYWNrZW5kJTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzU4NDUzMjM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Backend",
      skills: ["Node.js", "Express", "MongoDB", "APIs"]
    },
    {
      id: "ui-ux-design",
      title: "UI/UX Design Fundamentals",
      description: "Learn design thinking, user research, prototyping, and modern design tools.",
      instructor: "Emma Chen",
      duration: "3h 20min",
      lessons: 22,
      enrolled: 1400,
      rating: 4.8,
      level: "Beginner",
      thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMHV4JTIwZGVzaWdufGVufDF8fHx8MTc1ODQxNDEwNHww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Design",
      skills: ["Figma", "Design Thinking", "Prototyping", "User Research"]
    },
    {
      id: "mobile-development",
      title: "React Native Mobile Apps",
      description: "Build cross-platform mobile applications using React Native and modern development tools.",
      instructor: "David Park",
      duration: "7h 10min",
      lessons: 48,
      enrolled: 720,
      rating: 4.5,
      level: "Advanced",
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTgzNzU2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Mobile",
      skills: ["React Native", "Mobile Dev", "iOS", "Android"]
    }
  ];

  const categories = ["All", "Frontend", "Backend", "Mobile", "Data Science", "Design", "Programming"];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend": return Code2;
      case "Backend": return Server;
      case "Mobile": return Smartphone;
      case "Data Science": return Database;
      case "Design": return Palette;
      case "Programming": return Code2;
      default: return BookOpen;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
        <div>
          <h1 className="text-2xl font-semibold text-card-foreground">Choose Your Learning Path</h1>
          <p className="text-muted-foreground mt-2">
            Explore our comprehensive courses designed to advance your career in technology
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search courses, skills, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const CategoryIcon = getCategoryIcon(course.category);
          
          return (
            <Card key={course.id} className="hover-lift cursor-pointer group modern-card">
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <CategoryIcon className="w-5 h-5 text-primary" />
                    <Badge variant="outline" className="text-xs">
                      {course.category}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    {course.isPopular && (
                      <Badge className="bg-primary text-primary-foreground text-xs">
                        Popular
                      </Badge>
                    )}
                    {course.isNew && (
                      <Badge variant="secondary" className="text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                </div>
                
                <CardTitle className="text-lg leading-snug">
                  {course.title}
                </CardTitle>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>by {course.instructor}</span>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                {/* Course Thumbnail */}
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Level Badge on Image */}
                  <div className="absolute top-3 left-3">
                    <Badge className={`text-xs font-medium ${getLevelColor(course.level)} border-0`}>
                      {course.level}
                    </Badge>
                  </div>
                  
                  {/* Duration on Image */}
                  <div className="absolute bottom-3 right-3">
                    <div className="bg-black/80 text-white text-xs px-2 py-1 rounded-md font-medium">
                      {course.duration}
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  {/* Minimal Course Info */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {course.lessons} lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        {course.rating}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {course.enrolled.toLocaleString()} students
                    </span>
                  </div>
                  
                  {/* Essential Skills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.skills.slice(0, 2).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs font-normal bg-muted/50 text-muted-foreground border-0">
                        {skill}
                      </Badge>
                    ))}
                    {course.skills.length > 2 && (
                      <Badge variant="secondary" className="text-xs font-normal bg-muted/50 text-muted-foreground border-0">
                        +{course.skills.length - 2}
                      </Badge>
                    )}
                  </div>
                  
                  {/* Progress (if enrolled) */}
                  {course.progress !== undefined && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground font-medium">Progress</span>
                        <span className="font-semibold text-foreground">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2 bg-muted" />
                    </div>
                  )}
                  
                  {/* Clean Action Button */}
                  <Button 
                    onClick={() => onSelectCourse(course.id)}
                    className={`w-full font-medium transition-all duration-300 ${
                      course.progress !== undefined 
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                        : 'bg-card text-foreground border border-border hover:bg-muted hover:border-primary'
                    }`}
                    variant={course.progress !== undefined ? "default" : "outline"}
                  >
                    {course.progress !== undefined ? (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Continue Learning
                      </>
                    ) : (
                      <>
                        Start Course
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium text-foreground mb-2">No courses found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </div>
  );
}