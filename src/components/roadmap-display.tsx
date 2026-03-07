import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  CheckCircle, 
  Clock, 
  Target, 
  BookOpen, 
  TrendingUp,
  Brain,
  Code,
  Smartphone,
  Database,
  Palette,
  ArrowRight,
  Star,
  Users
} from "lucide-react";
import { PersonalizedRoadmap } from "../utils/roadmap-generator";

interface RoadmapDisplayProps {
  roadmap: PersonalizedRoadmap;
  onStartLearning: () => void;
  onRetakeTest?: () => void;
}

export function RoadmapDisplay({ roadmap, onStartLearning, onRetakeTest }: RoadmapDisplayProps) {
  const { track, adaptations, nextSteps, timelineWeeks } = roadmap;

  const getTrackIcon = (iconName: string) => {
    const iconProps = { className: "w-8 h-8" };
    switch (iconName) {
      case 'palette': return <Palette {...iconProps} />;
      case 'database': return <Database {...iconProps} />;
      case 'smartphone': return <Smartphone {...iconProps} />;
      case 'brain': return <Brain {...iconProps} />;
      default: return <Code {...iconProps} />;
    }
  };

  const getTrackColor = (iconName: string) => {
    switch (iconName) {
      case 'palette': return 'bg-blue-500';
      case 'database': return 'bg-green-500';
      case 'smartphone': return 'bg-purple-500';
      case 'brain': return 'bg-orange-500';
      default: return 'bg-primary';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className={`w-16 h-16 mx-auto ${getTrackColor(track.icon)} rounded-full flex items-center justify-center text-white`}>
            {getTrackIcon(track.icon)}
          </div>
          <div>
            <h1 className="text-2xl font-medium mb-2">Your Personalized Learning Path</h1>
            <p className="text-muted-foreground">
              Based on your assessment, we've created a customized roadmap for your tech career
            </p>
          </div>
        </div>

        {/* Track Overview */}
        <Card className="animate-fade-in border-l-4" style={{ borderLeftColor: getTrackColor(track.icon).replace('bg-', '#') }}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 ${getTrackColor(track.icon)} rounded-lg text-white`}>
                    {getTrackIcon(track.icon)}
                  </div>
                  <div>
                    <h2 className="text-xl font-medium">{track.name}</h2>
                    <p className="text-muted-foreground">{track.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{timelineWeeks} weeks (personalized)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span>{track.skillLevel}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>{track.averageSalary}</span>
                  </div>
                </div>
              </div>
              
              {onRetakeTest && (
                <Button variant="outline" size="sm" onClick={onRetakeTest}>
                  Retake Assessment
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Skills */}
            <div>
              <h3 className="font-medium mb-3 flex items-center space-x-2">
                <Star className="w-4 h-4" />
                <span>Skills You'll Master</span>
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Primary Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {track.primarySkills.map(skill => (
                      <Badge key={skill} variant="default">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Secondary Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {track.secondarySkills.map(skill => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Career Paths */}
            <div>
              <h3 className="font-medium mb-3 flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Career Opportunities</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {track.careerPaths.map(path => (
                  <Badge key={path} variant="outline" className="border-primary text-primary">
                    {path}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personalized Adaptations */}
        <Card className="animate-fade-in">
          <CardHeader>
            <h3 className="font-medium flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>Personalized for You</span>
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Learning Pace</h4>
              <p className="text-sm text-muted-foreground">{adaptations.pacing}</p>
            </div>
            
            {adaptations.focus.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2">Focus Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {adaptations.focus.map(focus => (
                    <Badge key={focus} variant="secondary">{focus}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {adaptations.recommendations.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2">Recommendations</h4>
                <ul className="space-y-1">
                  {adaptations.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                      <CheckCircle className="w-3 h-3 mt-0.5 text-green-500 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Learning Milestones */}
        <Card className="animate-fade-in">
          <CardHeader>
            <h3 className="font-medium flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Learning Milestones</span>
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {track.milestones.map((milestone, index) => (
                <div key={milestone.id} className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div>
                      <h4 className="font-medium">{milestone.title}</h4>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{milestone.estimatedWeeks} weeks</span>
                      <div className="flex space-x-1">
                        {milestone.skills.slice(0, 3).map(skill => (
                          <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                        ))}
                        {milestone.skills.length > 3 && (
                          <span className="text-xs">+{milestone.skills.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="animate-fade-in">
          <CardHeader>
            <h3 className="font-medium flex items-center space-x-2">
              <ArrowRight className="w-5 h-5" />
              <span>Your Next Steps</span>
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {nextSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-sm">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 pt-6">
          <Button 
            onClick={onStartLearning}
            className="px-8 py-3 text-base hover-lift transition-smooth"
          >
            Start Learning Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}