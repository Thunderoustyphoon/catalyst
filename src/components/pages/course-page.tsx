import { useOutletContext, useParams, useNavigate } from "react-router";
import { LearningModule } from "../learning-module";

export function CoursePage() {
  const ctx: any = useOutletContext();
  const { courseId } = useParams();
  const navigate = useNavigate();
  return (
    <LearningModule
      onNavigate={ctx.onNavigate}
      onLogout={ctx.onLogout}
      onOpenChat={ctx.onOpenChat}
      courseId={courseId}
      onBackToCourses={() => navigate("/student/learning")}
      onBack={ctx.onBack}
    />
  );
}
