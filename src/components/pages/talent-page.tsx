import { useOutletContext } from "react-router";
import { TalentDiscovery } from "../talent-discovery";

export function TalentPage() {
  const ctx: any = useOutletContext();
  return <TalentDiscovery onNavigate={ctx.onNavigate} onLogout={ctx.onLogout} onBack={ctx.onBack} />;
}
