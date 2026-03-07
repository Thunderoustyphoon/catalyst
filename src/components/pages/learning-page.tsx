import { useOutletContext, useNavigate } from "react-router";
import { CourseSelection } from "../course-selection";

export function LearningPage() {
  const ctx: any = useOutletContext();
  const navigate = useNavigate();
  return (
    <CourseSelection
      onNavigate={ctx.onNavigate}
      onLogout={ctx.onLogout}
      onOpenChat={ctx.onOpenChat}
      onBack={ctx.onBack}
      onSelectCourse={(courseId: string) => navigate(`/student/learning/${courseId}`)}
    />
  );
}
