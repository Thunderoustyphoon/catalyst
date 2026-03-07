import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import {
  getSession,
  signIn,
  signUp,
  signOut,
  updateProfile,
  seedNotifications,
  type CatalystUser,
  type UserType,
} from "../utils/supabase-auth";

interface AuthContextType {
  user: CatalystUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: { email: string; password: string; name: string; userType: UserType; phone?: string; organization?: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUser: (updates: { name?: string; phone?: string; organization?: string; profile?: Record<string, any> }) => Promise<{ success: boolean; error?: string }>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CatalystUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Check existing session on mount
  useEffect(() => {
    (async () => {
      try {
        const session = await getSession();
        if (session) {
          setUser(session);
          // Seed notifications in background
          seedNotifications(session.accessToken).catch(() => {});
        }
      } catch (err) {
        console.error("Session check error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const result = await signIn(email, password);
    if (result.success && result.user) {
      setUser(result.user);
      seedNotifications(result.user.accessToken).catch(() => {});
      return { success: true };
    }
    return { success: false, error: result.error };
  }, []);

  const register = useCallback(async (data: Parameters<typeof signUp>[0]) => {
    const result = await signUp(data);
    if (result.success && result.user) {
      setUser(result.user);
      seedNotifications(result.user.accessToken).catch(() => {});
      return { success: true };
    }
    return { success: false, error: result.error };
  }, []);

  const logout = useCallback(async () => {
    await signOut();
    setUser(null);
  }, []);

  const updateUser = useCallback(async (updates: Parameters<typeof updateProfile>[1]) => {
    if (!user) return { success: false, error: "Not authenticated" };
    const result = await updateProfile(user.accessToken, updates);
    if (result.success && result.user) {
      setUser(result.user);
      return { success: true };
    }
    return { success: false, error: result.error };
  }, [user]);

  const refreshSession = useCallback(async () => {
    const session = await getSession();
    if (session) setUser(session);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
