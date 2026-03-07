import { useOutletContext } from "react-router";
import { StudentDashboard } from "../student-dashboard";
import { useAuth } from "../../hooks/use-auth";

export function StudentDashboardPage() {
  const ctx: any = useOutletContext();
  const { user } = useAuth();
  return (
    <StudentDashboard
      onNavigate={ctx.onNavigate}
      onLogout={ctx.onLogout}
      onOpenChat={ctx.onOpenChat}
      userName={user?.name}
      userEmail={user?.email}
    />
  );
}
