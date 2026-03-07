import { useNavigate } from "react-router";
import { RoadmapDisplay } from "../roadmap-display";
import { CatalystLogo } from "../catalyst-logo";

export function RoadmapPage() {
  const navigate = useNavigate();

  // Read roadmap from sessionStorage
  const raw = sessionStorage.getItem("catalyst-roadmap");
  const roadmap = raw ? JSON.parse(raw) : null;

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <CatalystLogo size="md" className="mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">No roadmap data found.</p>
          <button
            onClick={() => navigate("/diagnostic")}
            className="text-sm text-foreground font-medium hover:underline"
          >
            Take the Diagnostic Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <RoadmapDisplay
      roadmap={roadmap}
      onStartLearning={() => navigate("/student/dashboard")}
      onRetakeTest={() => navigate("/diagnostic")}
    />
  );
}
