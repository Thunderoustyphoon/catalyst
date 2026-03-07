import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  Play, Users, BookOpen, MessageCircle, Bookmark, Star
} from "lucide-react";

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    instructor: string;
    thumbnail: string;
    progress?: number;
    totalTasks: number;
    completedTasks?: number;
    isWatching: number;
    category: string;
    premium?: boolean;
    duration?: string;
    rating?: number;
    students?: number;
    description?: string;
  };
  onPlay?: () => void;
  onMessage?: () => void;
  showProgress?: boolean;
  variant?: "default" | "compact" | "featured";
}

export function CourseCard({
  course,
  onPlay,
  onMessage,
  showProgress = false,
  variant = "default",
}: CourseCardProps) {
  const [bookmarked, setBookmarked] = useState(false);

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-4 p-3 rounded-lg border border-border hover:border-foreground/15 transition-colors group cursor-pointer">
        <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-foreground truncate">{course.title}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">by {course.instructor}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1.5">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              {course.completedTasks || 0}/{course.totalTasks}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {course.isWatching}
            </span>
          </div>
          {showProgress && course.progress && (
            <Progress value={course.progress} className="h-1.5 mt-2" />
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onPlay}
          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Play className="w-3.5 h-3.5" />
        </Button>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <Card className="overflow-hidden border-border hover:shadow-md transition-shadow group cursor-pointer">
        <div className="relative">
          <div className="aspect-video overflow-hidden">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button size="lg" onClick={onPlay} className="bg-foreground text-background">
              <Play className="w-5 h-5 mr-2" />
              Continue Learning
            </Button>
          </div>
          <div className="absolute top-3 right-3 flex gap-1.5">
            {course.premium && (
              <Badge className="bg-foreground text-background border-0 text-xs">Premium</Badge>
            )}
            <Badge variant="outline" className="bg-white/90 text-foreground text-xs">{course.category}</Badge>
          </div>
        </div>
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground mb-1 line-clamp-2">{course.title}</h3>
              <p className="text-sm text-muted-foreground">by {course.instructor}</p>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-2" onClick={() => setBookmarked(!bookmarked)}>
              <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current text-foreground" : "text-muted-foreground"}`} />
            </Button>
          </div>
          {showProgress && course.progress && (
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          )}
          <div className="flex gap-2">
            <Button onClick={onPlay} className="flex-1 bg-foreground text-background hover:bg-foreground/90" size="sm">
              <Play className="w-3.5 h-3.5 mr-1.5" />
              {showProgress ? "Continue" : "Start"}
            </Button>
            {onMessage && (
              <Button variant="outline" size="sm" onClick={onMessage} className="h-9 w-9 p-0">
                <MessageCircle className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default
  return (
    <Card className="overflow-hidden border-border hover:shadow-md transition-shadow group cursor-pointer">
      <div className="relative">
        <div className="aspect-video overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        </div>
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button size="sm" onClick={onPlay} className="bg-foreground text-background">
            <Play className="w-3.5 h-3.5 mr-1.5" />
            Play
          </Button>
        </div>
        <div className="absolute top-3 right-3 flex gap-1.5">
          {course.premium && <Badge className="bg-foreground text-background border-0 text-xs">Premium</Badge>}
          <Badge variant="outline" className="bg-white/90 text-foreground text-xs">{course.category}</Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-sm font-medium text-foreground mb-1 line-clamp-2">{course.title}</h3>
        <p className="text-xs text-muted-foreground mb-2">by {course.instructor}</p>
        <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{course.completedTasks || 0}/{course.totalTasks}</span>
          <span className="flex items-center gap-1"><Users className="w-3 h-3" />{course.isWatching}</span>
          {course.rating && (
            <span className="flex items-center gap-0.5 ml-auto"><Star className="w-3 h-3 fill-current text-foreground" />{course.rating}</span>
          )}
        </div>
        {showProgress && course.progress && (
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-1.5" />
          </div>
        )}
        <div className="flex gap-2">
          <Button onClick={onPlay} size="sm" className="flex-1 bg-foreground text-background hover:bg-foreground/90">
            <Play className="w-3 h-3 mr-1.5" />
            {showProgress ? "Continue" : "Start"}
          </Button>
          {onMessage && (
            <Button variant="outline" size="sm" onClick={onMessage} className="h-8 w-8 p-0">
              <MessageCircle className="w-3 h-3" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
