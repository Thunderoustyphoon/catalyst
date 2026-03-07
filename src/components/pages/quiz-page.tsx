import { useOutletContext } from "react-router";
import { AdaptiveQuiz } from "../adaptive-quiz";

export function QuizPage() {
  const ctx: any = useOutletContext();
  return <AdaptiveQuiz onNavigate={ctx.onNavigate} onLogout={ctx.onLogout} onOpenChat={ctx.onOpenChat} onBack={ctx.onBack} />;
}
