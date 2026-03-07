import { useOutletContext, useLocation, useNavigate } from "react-router";
import { Settings } from "../settings-fixed";
import { useAuth } from "../../hooks/use-auth";

export function SettingsPage() {
  const ctx: any = useOutletContext();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isStudent = location.pathname.startsWith("/student");

  return (
    <Settings
      userType={isStudent ? "student" : "client"}
      userName={user?.name || "User"}
      userEmail={user?.email || ""}
      onNavigate={ctx.onNavigate}
      onLogout={ctx.onLogout}
      onBack={ctx.onBack}
      onRetakeDiagnostic={isStudent ? () => navigate("/diagnostic") : undefined}
    />
  );
}
