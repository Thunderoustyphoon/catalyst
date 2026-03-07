import { createClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "./supabase/info";

const SUPABASE_URL = `https://${projectId}.supabase.co`;
const SERVER_BASE = `${SUPABASE_URL}/functions/v1/make-server-0bb1b3e6`;

// Singleton Supabase client
let _client: ReturnType<typeof createClient> | null = null;
function getSupabase() {
  if (!_client) {
    _client = createClient(SUPABASE_URL, publicAnonKey);
  }
  return _client;
}

export type UserType = "student" | "client";

export interface CatalystUser {
  id: string;
  email: string;
  name: string;
  userType: UserType;
  phone?: string;
  organization?: string;
  profile: {
    diagnosticResults?: any;
    recommendedTrack?: any;
    [key: string]: any;
  };
  accessToken: string;
}

// ========= SIGNUP =========
export async function signUp(data: {
  email: string;
  password: string;
  name: string;
  userType: UserType;
  phone?: string;
  organization?: string;
}): Promise<{ success: boolean; user?: CatalystUser; error?: string }> {
  try {
    // Create user via server (uses service role key)
    const resp = await fetch(`${SERVER_BASE}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await resp.json();
    if (!resp.ok || !result.success) {
      console.error("Signup server error:", result.error);
      return { success: false, error: result.error || "Signup failed" };
    }

    // Now sign in to get a session
    const loginResult = await signIn(data.email, data.password);
    if (!loginResult.success) {
      return {
        success: false,
        error: loginResult.error || "Account created but login failed. Please try signing in.",
      };
    }

    return loginResult;
  } catch (err) {
    console.error("Signup error:", err);
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { success: false, error: `Network error during signup: ${errorMsg}. The server endpoint may not be deployed.` };
  }
}

// ========= SIGN IN =========
export async function signIn(
  email: string,
  password: string
): Promise<{ success: boolean; user?: CatalystUser; error?: string }> {
  try {
    const sb = getSupabase();
    const { data, error } = await sb.auth.signInWithPassword({ email, password });

    if (error) {
      console.error("SignIn error:", error.message);
      return { success: false, error: error.message === "Invalid login credentials" ? "Invalid email or password" : error.message };
    }

    if (!data.session) {
      return { success: false, error: "No session returned" };
    }

    const meta = data.user?.user_metadata || {};
    const user: CatalystUser = {
      id: data.user!.id,
      email: data.user!.email!,
      name: meta.name || "",
      userType: meta.userType || "student",
      phone: meta.phone || "",
      organization: meta.organization || "",
      profile: meta.profile || {},
      accessToken: data.session.access_token,
    };

    return { success: true, user };
  } catch (err) {
    console.error("SignIn error:", err);
    return { success: false, error: `Network error during sign in: ${err}` };
  }
}

// ========= GET SESSION =========
export async function getSession(): Promise<CatalystUser | null> {
  try {
    const sb = getSupabase();
    const { data, error } = await sb.auth.getSession();

    if (error || !data.session) return null;

    const meta = data.session.user?.user_metadata || {};
    return {
      id: data.session.user.id,
      email: data.session.user.email!,
      name: meta.name || "",
      userType: meta.userType || "student",
      phone: meta.phone || "",
      organization: meta.organization || "",
      profile: meta.profile || {},
      accessToken: data.session.access_token,
    };
  } catch {
    return null;
  }
}

// ========= SIGN OUT =========
export async function signOut(): Promise<void> {
  try {
    const sb = getSupabase();
    await sb.auth.signOut();
  } catch (err) {
    console.error("SignOut error:", err);
  }
}

// ========= UPDATE PROFILE =========
export async function updateProfile(
  accessToken: string,
  updates: {
    name?: string;
    phone?: string;
    organization?: string;
    profile?: Record<string, any>;
  }
): Promise<{ success: boolean; user?: CatalystUser; error?: string }> {
  try {
    const resp = await fetch(`${SERVER_BASE}/auth/update-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updates),
    });

    const result = await resp.json();
    if (!resp.ok || !result.success) {
      console.error("Update profile error:", result.error);
      return { success: false, error: result.error || "Update failed" };
    }

    return {
      success: true,
      user: { ...result.user, accessToken, profile: result.user.profile || {} },
    };
  } catch (err) {
    console.error("Update profile error:", err);
    return { success: false, error: `Network error: ${err}` };
  }
}

// ========= SEED NOTIFICATIONS =========
export async function seedNotifications(accessToken: string) {
  try {
    await fetch(`${SERVER_BASE}/notifications/seed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (err) {
    console.error("Seed notifications error:", err);
  }
}

// ========= FETCH NOTIFICATIONS =========
export async function fetchNotifications(
  accessToken: string
): Promise<any[]> {
  try {
    const resp = await fetch(`${SERVER_BASE}/notifications`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const result = await resp.json();
    return result.notifications || [];
  } catch (err) {
    console.error("Fetch notifications error:", err);
    return [];
  }
}

// ========= MARK NOTIFICATIONS READ =========
export async function markNotificationsRead(
  accessToken: string,
  notificationIds: string[]
): Promise<void> {
  try {
    await fetch(`${SERVER_BASE}/notifications/mark-read`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ notificationIds }),
    });
  } catch (err) {
    console.error("Mark read error:", err);
  }
}
