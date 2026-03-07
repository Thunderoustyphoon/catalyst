import { useOutletContext } from "react-router";
import { EscrowSystem } from "../escrow-system";

export function EscrowPage() {
  const ctx: any = useOutletContext();
  return <EscrowSystem onNavigate={ctx.onNavigate} onLogout={ctx.onLogout} onOpenChat={ctx.onOpenChat} onBack={ctx.onBack} />;
}
