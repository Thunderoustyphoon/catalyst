import { useNavigate } from "react-router";
import { AdaptiveDiagnosticTest } from "../adaptive-diagnostic-test";
import { useAuth } from "../../hooks/use-auth";
import { generatePersonalizedRoadmap } from "../../utils/roadmap-generator";

export function DiagnosticPage() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const handleComplete = async (results: any) => {
    const roadmap = generatePersonalizedRoadmap(results);

    // Save results to profile
    if (user) {
      await updateUser({
        profile: {
          ...user.profile,
          diagnosticResults: { ...results, completedAt: new Date().toISOString() },
          recommendedTrack: {
            trackId: roadmap.track.id,
            trackName: roadmap.track.name,
            adaptations: roadmap.adaptations,
            timelineWeeks: roadmap.timelineWeeks,
            generatedAt: new Date().toISOString(),
          },
        },
      });
    }

    // Store roadmap in sessionStorage for roadmap page
    sessionStorage.setItem("catalyst-roadmap", JSON.stringify(roadmap));
    navigate("/roadmap");
  };

  const handleBack = () => {
    if (user?.userType === "student") {
      navigate("/student/dashboard");
    } else {
      navigate("/");
    }
  };

  return <AdaptiveDiagnosticTest onComplete={handleComplete} onBack={handleBack} />;
}
