import { useOutletContext } from "react-router";
import { ClientDashboard } from "../client-dashboard";

export function ClientDashboardPage() {
  const ctx: any = useOutletContext();
  return <ClientDashboard onNavigate={ctx.onNavigate} onLogout={ctx.onLogout} onBack={ctx.onBack} />;
}
