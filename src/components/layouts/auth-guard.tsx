import { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../hooks/use-auth";
import type { UserType } from "../../utils/supabase-auth";

interface AuthGuardProps {
  children: ReactNode;
  requiredType?: UserType;
}

export function AuthGuard({ children, requiredType }: AuthGuardProps) {
  const { user, loading } = useAuth();

  if (loading) return null; // IntroGate handles the loading spinner

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredType && user.userType !== requiredType) {
    const redirect = user.userType === "student" ? "/student/dashboard" : "/client/dashboard";
    return <Navigate to={redirect} replace />;
  }

  return <>{children}</>;
}
