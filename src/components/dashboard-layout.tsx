import { ReactNode, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { NavTooltip } from "./nav-tooltip";
import {
  Home, BookOpen, MessageSquare, Bell, Settings, LogOut,
  Search, ChevronLeft, ChevronRight, Wallet2, Code2, Briefcase,
  Users, Calendar, Target, Menu, X, BrainCircuit
} from "lucide-react";
import { CatalystLogo } from "./catalyst-logo";
import { NotificationPanel } from "./notification-panel";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
  action: () => void;
  active?: boolean;
}

interface DashboardLayoutProps {
  children: ReactNode;
  userType: "student" | "client";
  userName: string;
  userEmail: string;
  currentPage: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  onOpenChat?: () => void;
}

export function DashboardLayout({
  children,
  userType,
  userName,
  userEmail,
  currentPage,
  onNavigate,
  onLogout,
  onOpenChat,
}: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(false);
        setMobileOpen(false);
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const navItems: NavigationItem[] =
    userType === "student"
      ? [
          { id: "dashboard", label: "Dashboard", icon: Home, action: () => onNavigate("student"), active: currentPage === "student" },
          { id: "learning", label: "Learning", icon: BookOpen, action: () => onNavigate("learning"), active: currentPage === "learning" },
          { id: "quiz", label: "Assessments", icon: Target, action: () => onNavigate("quiz"), active: currentPage === "quiz" },
          { id: "portfolio", label: "Portfolio", icon: Code2, action: () => onNavigate("portfolio"), active: currentPage === "portfolio" },
          { id: "marketplace", label: "Marketplace", icon: Briefcase, action: () => onNavigate("marketplace"), active: currentPage === "marketplace" },
          { id: "earnings", label: "Earnings", icon: Wallet2, action: () => onNavigate("earnings"), active: currentPage === "earnings" },
          { id: "ai-assistant", label: "AI Assistant", icon: BrainCircuit, action: () => onNavigate("ai-assistant"), active: ["ai-assistant", "enhanced-ai", "ai-chatbot"].includes(currentPage) },
          { id: "messages", label: "Messages", icon: MessageSquare, count: 3, action: () => {}, active: false },
        ]
      : [
          { id: "dashboard", label: "Dashboard", icon: Home, action: () => onNavigate("client-dashboard"), active: currentPage === "client-dashboard" },
          { id: "projects", label: "Projects", icon: Briefcase, action: () => onNavigate("client-projects"), active: currentPage === "client-projects" },
          { id: "payments", label: "Payments", icon: Wallet2, action: () => onNavigate("client-payments"), active: currentPage === "client-payments" },
          { id: "talent", label: "Find Talent", icon: Users, action: () => onNavigate("talent-discovery"), active: currentPage === "talent-discovery" },
          { id: "calendar", label: "Calendar", icon: Calendar, action: () => {}, active: false },
          { id: "messages", label: "Messages", icon: MessageSquare, count: 2, action: () => {}, active: false },
        ];

  const pageTitles: Record<string, string> = {
    student: "Dashboard",
    "client-dashboard": "Dashboard",
    learning: "Learning Path",
    quiz: "Assessments",
    portfolio: "Portfolio",
    marketplace: "Marketplace",
    earnings: "Earnings",
    "ai-assistant": "AI Assistant",
    settings: "Settings",
    "client-projects": "Projects",
    "client-payments": "Payments",
    "talent-discovery": "Find Talent",
  };

  const renderNavButton = (item: NavigationItem) => {
    const Icon = item.icon;
    return (
      <button
        key={item.id}
        onClick={() => {
          item.action();
          if (isMobile) setMobileOpen(false);
        }}
        className={`w-full flex items-center gap-3 rounded-lg text-left transition-colors duration-150 ${
          collapsed && !isMobile ? "px-2.5 py-2.5 justify-center" : "px-3 py-2.5"
        } ${
          item.active
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        <Icon className="w-[18px] h-[18px] flex-shrink-0" />
        {(!collapsed || isMobile) && (
          <>
            <span className="text-sm font-medium flex-1">{item.label}</span>
            {item.count && (
              <span className="text-xs bg-muted text-muted-foreground rounded-md px-1.5 py-0.5 font-medium">
                {item.count}
              </span>
            )}
          </>
        )}
      </button>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`border-b border-border ${collapsed && !isMobile ? "p-3" : "px-5 py-4"}`}>
        <div className="flex items-center justify-between">
          {collapsed && !isMobile ? (
            <button
              onClick={() => setCollapsed(false)}
              className="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center mx-auto hover:bg-foreground/90 transition-colors"
            >
              <span className="text-background font-bold text-sm">C</span>
            </button>
          ) : (
            <>
              <CatalystLogo size="sm" showTagline={false} />
              {isMobile ? (
                <Button variant="ghost" size="sm" onClick={() => setMobileOpen(false)} className="p-1.5">
                  <X className="w-5 h-5" />
                </Button>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="p-1.5 text-muted-foreground hover:text-foreground">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {/* User profile */}
      {(!collapsed || isMobile) && (
        <div className="px-5 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Avatar className="w-9 h-9">
              <AvatarFallback className="bg-foreground text-background text-xs font-semibold">
                {userName.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{userName}</p>
              <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`flex-1 overflow-y-auto ${collapsed && !isMobile ? "p-2" : "px-3 py-3"}`}>
        <div className="space-y-1">
          {navItems.map((item) => {
            if (collapsed && !isMobile) {
              return (
                <NavTooltip key={item.id} content={item.label} delay={800} position="right">
                  {renderNavButton(item)}
                </NavTooltip>
              );
            }
            return renderNavButton(item);
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className={`border-t border-border mt-auto ${collapsed && !isMobile ? "p-2" : "px-3 py-3"}`}>
        <div className="space-y-1">
          {(() => {
            const btn = (
              <button
                onClick={() => {
                  onNavigate("settings");
                  if (isMobile) setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 rounded-lg transition-colors duration-150 ${
                  collapsed && !isMobile ? "px-2.5 py-2.5 justify-center" : "px-3 py-2.5"
                } ${
                  currentPage === "settings"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Settings className="w-[18px] h-[18px] flex-shrink-0" />
                {(!collapsed || isMobile) && <span className="text-sm font-medium">Settings</span>}
              </button>
            );
            return collapsed && !isMobile ? (
              <NavTooltip key="settings" content="Settings" delay={800} position="right">{btn}</NavTooltip>
            ) : btn;
          })()}
          {(() => {
            const btn = (
              <button
                onClick={onLogout}
                className={`w-full flex items-center gap-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors duration-150 ${
                  collapsed && !isMobile ? "px-2.5 py-2.5 justify-center" : "px-3 py-2.5"
                }`}
              >
                <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
                {(!collapsed || isMobile) && <span className="text-sm font-medium">Logout</span>}
              </button>
            );
            return collapsed && !isMobile ? (
              <NavTooltip key="logout" content="Logout" delay={800} position="right">{btn}</NavTooltip>
            ) : btn;
          })()}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-card border-r border-border flex flex-col transition-all duration-200 ease-in-out ${
          isMobile
            ? `fixed left-0 top-0 z-50 w-64 h-screen ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`
            : `${collapsed ? "w-[60px] min-w-[60px]" : "w-60 min-w-60"} relative flex-shrink-0 h-screen`
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border flex-shrink-0 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isMobile && (
              <Button variant="ghost" size="sm" onClick={() => setMobileOpen(true)} className="p-1.5 lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            )}
            {collapsed && !isMobile && (
              <Button variant="ghost" size="sm" onClick={() => setCollapsed(false)} className="p-1.5 text-muted-foreground">
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
            <h1 className="text-base font-semibold text-foreground">
              {pageTitles[currentPage] || currentPage.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5 border border-border/50">
              <Search className="w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm w-36 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <NotificationPanel />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 bg-background overflow-y-auto">
          <div className="p-5 lg:p-6 animate-fade-in min-h-full">
            {children}
          </div>
        </main>
      </div>

      {/* Chat FAB */}
      {onOpenChat && (
        <button
          className="fixed bottom-5 right-5 w-12 h-12 bg-foreground text-background rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center justify-center z-40"
          onClick={onOpenChat}
          aria-label="Open AI Assistant"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}