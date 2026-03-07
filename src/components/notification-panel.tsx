import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Bell, Check, CheckCheck, BookOpen, Trophy, Users,
  Briefcase, X, MessageSquare
} from "lucide-react";
import { useAuth } from "../hooks/use-auth";
import { fetchNotifications, markNotificationsRead } from "../utils/supabase-auth";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  time: string;
}

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  welcome: Bell,
  course: BookOpen,
  achievement: Trophy,
  talent: Users,
  project: Briefcase,
  message: MessageSquare,
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export function NotificationPanel() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Fetch notifications when panel opens
  useEffect(() => {
    if (open && user?.accessToken) {
      setLoading(true);
      fetchNotifications(user.accessToken)
        .then(setNotifications)
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [open, user?.accessToken]);

  const handleMarkAllRead = async () => {
    if (!user?.accessToken) return;
    const ids = notifications.filter((n) => !n.read).map((n) => n.id);
    if (ids.length === 0) return;
    await markNotificationsRead(user.accessToken, ids);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleMarkRead = async (id: string) => {
    if (!user?.accessToken) return;
    await markNotificationsRead(user.accessToken, [id]);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div ref={ref} className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="relative p-1.5"
        onClick={() => setOpen(!open)}
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
      >
        <Bell className="w-[18px] h-[18px] text-muted-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-foreground text-background text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-muted-foreground hover:text-foreground"
                  onClick={handleMarkAllRead}
                >
                  <CheckCheck className="w-3.5 h-3.5 mr-1" />
                  Mark all read
                </Button>
              )}
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setOpen(false)}>
                <X className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto">
            {loading ? (
              <div className="p-6 text-center">
                <div className="w-5 h-5 border-2 border-foreground border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Loading...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-6 text-center">
                <Bell className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No notifications yet</p>
              </div>
            ) : (
              notifications.map((n) => {
                const Icon = typeIcons[n.type] || Bell;
                return (
                  <button
                    key={n.id}
                    className={`w-full text-left px-4 py-3 border-b border-border last:border-0 hover:bg-muted/50 transition-colors flex gap-3 ${
                      !n.read ? "bg-muted/20" : ""
                    }`}
                    onClick={() => handleMarkRead(n.id)}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      !n.read ? "bg-foreground" : "bg-muted"
                    }`}>
                      <Icon className={`w-4 h-4 ${!n.read ? "text-background" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-sm leading-snug ${!n.read ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                          {n.title}
                        </p>
                        {!n.read && <div className="w-1.5 h-1.5 bg-foreground rounded-full flex-shrink-0 mt-1.5" />}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                      <p className="text-[10px] text-muted-foreground/70 mt-1">{timeAgo(n.time)}</p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
