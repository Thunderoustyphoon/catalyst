import { Outlet, useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { DashboardLayout } from "../dashboard-layout";
import { ChatInterface } from "../chat-interface";
import { OnboardingTour } from "../onboarding-tour";
import { useAuth } from "../../hooks/use-auth";
import { useTheme } from "../../hooks/use-theme";
import { PageSkeleton } from "../page-skeleton";

// Map URL segments to the page identifiers expected by DashboardLayout
const pathToPage: Record<string, string> = {
  dashboard: "student",
  learning: "learning",
  quiz: "quiz",
  portfolio: "portfolio",
  marketplace: "marketplace",
  earnings: "earnings",
  escrow: "escrow",
  "ai-assistant": "ai-assistant",
  settings: "settings",
};

export function StudentLayout() {
  const { user, logout } = useAuth();
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [chatPartner, setChatPartner] = useState<any>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  // Determine current page from URL
  const segments = location.pathname.split("/").filter(Boolean);
  const currentSegment = segments[1] || "dashboard";
  const currentPage = pathToPage[currentSegment] || currentSegment;

  // Check if onboarding needed
  useEffect(() => {
    const done = localStorage.getItem("catalyst-onboarding-done");
    if (!done && user) {
      setShowOnboarding(true);
    }
  }, [user]);

  const handleNavigate = (screen: string) => {
    // Map the old navigation strings to new route paths
    const routeMap: Record<string, string> = {
      student: "/student/dashboard",
      dashboard: "/student/dashboard",
      learning: "/student/learning",
      quiz: "/student/quiz",
      portfolio: "/student/portfolio",
      marketplace: "/student/marketplace",
      earnings: "/student/earnings",
      escrow: "/student/escrow",
      "ai-assistant": "/student/ai-assistant",
      "ai-chatbot": "/student/ai-assistant",
      "enhanced-ai": "/student/ai-assistant",
      settings: "/student/settings",
      "back-to-dashboard": "/student/dashboard",
      "back-to-courses": "/student/learning",
      "diagnostic-test": "/diagnostic",
      main: "/",
      back: "/",
      getStarted: "/login",
    };

    const target = routeMap[screen] || `/${screen}`;
    
    // Show skeleton briefly during transition
    setTransitioning(true);
    setTimeout(() => setTransitioning(false), 150);
    
    navigate(target);
  };

  const handleLogout = async () => {
    setTheme("light");
    await logout();
    navigate("/");
  };

  const openChat = (partner?: any) => {
    setChatPartner(partner || { name: "AI Assistant", role: "AI Helper", isOnline: true });
    setIsChatOpen(true);
    setIsChatMinimized(false);
  };

  if (!user) return null;

  return (
    <>
      <DashboardLayout
        userType="student"
        userName={user.name}
        userEmail={user.email}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        onOpenChat={() => openChat()}
      >
        {transitioning ? <PageSkeleton variant="dashboard" /> : <Outlet context={{ onNavigate: handleNavigate, onLogout: handleLogout, onOpenChat: openChat, onBack: () => handleNavigate("back-to-dashboard"), user }} />}
      </DashboardLayout>

      <ChatInterface
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onMinimize={() => setIsChatMinimized(!isChatMinimized)}
        isMinimized={isChatMinimized}
        chatType={chatPartner?.name === "AI Assistant" ? "ai" : "user"}
        chatPartner={chatPartner}
      />

      {showOnboarding && (
        <OnboardingTour
          userType="student"
          onComplete={() => setShowOnboarding(false)}
          onNavigate={(path) => { setShowOnboarding(false); navigate(path); }}
        />
      )}
    </>
  );
}
