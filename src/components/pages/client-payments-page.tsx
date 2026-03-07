import { useOutletContext } from "react-router";
import { ClientPayments } from "../client-payments";

export function ClientPaymentsPage() {
  const ctx: any = useOutletContext();
  return <ClientPayments onNavigate={ctx.onNavigate} onLogout={ctx.onLogout} onBack={ctx.onBack} />;
}
