import { useOutletContext } from "react-router";
import { EarningsDashboard } from "../earnings-dashboard";

export function EarningsPage() {
  const ctx: any = useOutletContext();
  return <EarningsDashboard onNavigate={ctx.onNavigate} onLogout={ctx.onLogout} onOpenChat={ctx.onOpenChat} onBack={ctx.onBack} />;
}
