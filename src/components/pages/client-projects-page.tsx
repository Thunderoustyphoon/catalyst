import { useOutletContext } from "react-router";
import { ClientProjects } from "../client-projects";

export function ClientProjectsPage() {
  const ctx: any = useOutletContext();
  return <ClientProjects onNavigate={ctx.onNavigate} onLogout={ctx.onLogout} onBack={ctx.onBack} />;
}
