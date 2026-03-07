import { useOutletContext } from "react-router";
import { Marketplace } from "../marketplace";

export function MarketplacePage() {
  const ctx: any = useOutletContext();
  return <Marketplace onNavigate={ctx.onNavigate} onLogout={ctx.onLogout} onOpenChat={ctx.onOpenChat} onBack={ctx.onBack} />;
}
