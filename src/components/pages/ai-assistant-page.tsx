import { useOutletContext } from "react-router";
import { AIAssistantGeminiLevel } from "../ai-assistant-gemini-level";

export function AIAssistantPage() {
  const ctx: any = useOutletContext();
  return <AIAssistantGeminiLevel onNavigate={ctx.onNavigate} onLogout={ctx.onLogout} onOpenChat={ctx.onOpenChat} onBack={ctx.onBack} />;
}
