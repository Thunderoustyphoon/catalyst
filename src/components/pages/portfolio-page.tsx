import { useOutletContext } from "react-router";
import { Portfolio } from "../portfolio";

export function PortfolioPage() {
  const ctx: any = useOutletContext();
  return <Portfolio onNavigate={ctx.onNavigate} onLogout={ctx.onLogout} onOpenChat={ctx.onOpenChat} onBack={ctx.onBack} />;
}
