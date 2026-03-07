import { Outlet, useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { DashboardLayout } from "../dashboard-layout";
import { OnboardingTour } from "../onboarding-tour";
import { useAuth } from "../../hooks/use-auth";
import { useTheme } from "../../hooks/use-theme";
import { PageSkeleton } from "../page-skeleton";

const pathToPage: Record<string, string> = {
  dashboard: "client-dashboard",
  projects: "client-projects",
  payments: "client-payments",
  talent: "talent-discovery",
  settings: "settings",
};

export function ClientLayout() {
  const { user, logout } = useAuth();
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const segments = location.pathname.split("/").filter(Boolean);
  const currentSegment = segments[1] || "dashboard";
  const currentPage = pathToPage[currentSegment] || currentSegment;

  useEffect(() => {
    const done = localStorage.getItem("catalyst-onboarding-done");
    if (!done && user) setShowOnboarding(true);
  }, [user]);

  const handleNavigate = (screen: string) => {
    const routeMap: Record<string, string> = {
      "client-dashboard": "/client/dashboard",
      dashboard: "/client/dashboard",
      "client-projects": "/client/projects",
      "client-payments": "/client/payments",
      "talent-discovery": "/client/talent",
      settings: "/client/settings",
      "back-to-dashboard": "/client/dashboard",
      main: "/",
      back: "/",
      getStarted: "/login",
    };
    const target = routeMap[screen] || `/${screen}`;
    setTransitioning(true);
    setTimeout(() => setTransitioning(false), 150);
    navigate(target);
  };

  const handleLogout = async () => {
    setTheme("light");
    await logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <>
      <DashboardLayout
        userType="client"
        userName={user.name}
        userEmail={user.email}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      >
        {transitioning ? <PageSkeleton variant="dashboard" /> : <Outlet context={{ onNavigate: handleNavigate, onLogout: handleLogout, onBack: () => handleNavigate("back-to-dashboard"), user }} />}
      </DashboardLayout>

      {showOnboarding && (
        <OnboardingTour
          userType="client"
          onComplete={() => setShowOnboarding(false)}
          onNavigate={(path) => { setShowOnboarding(false); navigate(path); }}
        />
      )}
    </>
  );
}
