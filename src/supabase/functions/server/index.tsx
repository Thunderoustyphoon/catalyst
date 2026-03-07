import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

// ===== INLINED KV_STORE (Supabase bundler-compatible) =====
const kvClient = () => createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const kv = {
  set: async (key: string, value: any): Promise<void> => {
    const supabase = kvClient();
    const { error } = await supabase.from("kv_store_0bb1b3e6").upsert({
      key,
      value
    });
    if (error) throw new Error(error.message);
  },
  get: async (key: string): Promise<any> => {
    const supabase = kvClient();
    const { data, error } = await supabase.from("kv_store_0bb1b3e6").select("value").eq("key", key).maybeSingle();
    if (error) throw new Error(error.message);
    return data?.value;
  },
  del: async (key: string): Promise<void> => {
    const supabase = kvClient();
    const { error } = await supabase.from("kv_store_0bb1b3e6").delete().eq("key", key);
    if (error) throw new Error(error.message);
  },
  mset: async (keys: string[], values: any[]): Promise<void> => {
    const supabase = kvClient();
    const { error } = await supabase.from("kv_store_0bb1b3e6").upsert(keys.map((k, i) => ({ key: k, value: values[i] })));
    if (error) throw new Error(error.message);
  },
  mget: async (keys: string[]): Promise<any[]> => {
    const supabase = kvClient();
    const { data, error } = await supabase.from("kv_store_0bb1b3e6").select("value").in("key", keys);
    if (error) throw new Error(error.message);
    return data?.map((d) => d.value) ?? [];
  },
  mdel: async (keys: string[]): Promise<void> => {
    const supabase = kvClient();
    const { error } = await supabase.from("kv_store_0bb1b3e6").delete().in("key", keys);
    if (error) throw new Error(error.message);
  },
  getByPrefix: async (prefix: string): Promise<any[]> => {
    const supabase = kvClient();
    const { data, error } = await supabase.from("kv_store_0bb1b3e6").select("key, value").like("key", prefix + "%");
    if (error) throw new Error(error.message);
    return data?.map((d) => d.value) ?? [];
  }
};
// ===== END INLINED KV_STORE =====

const app = new Hono();

app.use("*", logger(console.log));

app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  })
);

// Supabase admin client (service role - for server-side only)
const supabaseAdmin = () =>
  createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

// Supabase anon client (for verifying user tokens)
const supabaseAnon = () =>
  createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

// Helper to get authenticated user from request
async function getAuthUser(c: any) {
  const accessToken = c.req.header("Authorization")?.split(" ")[1];
  if (!accessToken) return null;
  const sb = supabaseAdmin();
  const { data, error } = await sb.auth.getUser(accessToken);
  if (error || !data?.user) return null;
  return data.user;
}

// Health check
app.get("/make-server-0bb1b3e6/health", (c) => {
  return c.json({ status: "ok" });
});

// ============ AUTH ROUTES ============

// POST /auth/signup - Create a new user
app.post("/make-server-0bb1b3e6/auth/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name, userType, phone, organization } = body;

    if (!email || !password || !name || !userType) {
      return c.json(
        { error: "Missing required fields: email, password, name, userType" },
        400
      );
    }

    if (!["student", "client"].includes(userType)) {
      return c.json({ error: "userType must be 'student' or 'client'" }, 400);
    }

    if (password.length < 8) {
      return c.json(
        { error: "Password must be at least 8 characters long" },
        400
      );
    }

    const sb = supabaseAdmin();
    const { data, error } = await sb.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        name,
        userType,
        phone: phone || "",
        organization: organization || "",
        profile: {},
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true,
    });

    if (error) {
      console.log("Signup error:", error.message);
      if (error.message.includes("already")) {
        return c.json(
          { error: "An account with this email already exists" },
          409
        );
      }
      return c.json(
        { error: `Signup failed: ${error.message}` },
        400
      );
    }

    console.log("User created successfully:", data.user?.id);
    return c.json({
      success: true,
      user: {
        id: data.user?.id,
        email: data.user?.email,
        name,
        userType,
      },
    });
  } catch (err) {
    console.log("Unexpected signup error:", err);
    return c.json({ error: `Server error during signup: ${err}` }, 500);
  }
});

// POST /auth/update-profile - Update user metadata (requires auth)
app.post("/make-server-0bb1b3e6/auth/update-profile", async (c) => {
  try {
    const user = await getAuthUser(c);
    if (!user) {
      return c.json({ error: "Unauthorized - invalid or missing token" }, 401);
    }

    const body = await c.req.json();
    const { name, phone, organization, profile } = body;

    const sb = supabaseAdmin();
    const updatedMeta: Record<string, any> = { ...user.user_metadata };
    if (name !== undefined) updatedMeta.name = name;
    if (phone !== undefined) updatedMeta.phone = phone;
    if (organization !== undefined) updatedMeta.organization = organization;
    if (profile !== undefined)
      updatedMeta.profile = { ...updatedMeta.profile, ...profile };

    const { data, error } = await sb.auth.admin.updateUserById(user.id, {
      user_metadata: updatedMeta,
    });

    if (error) {
      console.log("Profile update error:", error.message);
      return c.json(
        { error: `Profile update failed: ${error.message}` },
        400
      );
    }

    return c.json({
      success: true,
      user: {
        id: data.user?.id,
        email: data.user?.email,
        name: updatedMeta.name,
        userType: updatedMeta.userType,
        phone: updatedMeta.phone,
        organization: updatedMeta.organization,
        profile: updatedMeta.profile,
      },
    });
  } catch (err) {
    console.log("Unexpected profile update error:", err);
    return c.json({ error: `Server error during profile update: ${err}` }, 500);
  }
});

// GET /auth/me - Get current user (requires auth)
app.get("/make-server-0bb1b3e6/auth/me", async (c) => {
  try {
    const user = await getAuthUser(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const meta = user.user_metadata || {};
    return c.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: meta.name || "",
        userType: meta.userType || "student",
        phone: meta.phone || "",
        organization: meta.organization || "",
        profile: meta.profile || {},
      },
    });
  } catch (err) {
    console.log("Unexpected /auth/me error:", err);
    return c.json({ error: `Server error: ${err}` }, 500);
  }
});

// ============ NOTIFICATIONS ROUTES ============

// GET /notifications - Get notifications for current user
app.get("/make-server-0bb1b3e6/notifications", async (c) => {
  try {
    const user = await getAuthUser(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const key = `notifications:${user.id}`;
    const existing = await kv.get(key);
    const notifications = existing || [];

    return c.json({ success: true, notifications });
  } catch (err) {
    console.log("Error fetching notifications:", err);
    return c.json({ error: `Failed to fetch notifications: ${err}` }, 500);
  }
});

// POST /notifications/mark-read - Mark notifications as read
app.post("/make-server-0bb1b3e6/notifications/mark-read", async (c) => {
  try {
    const user = await getAuthUser(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = await c.req.json();
    const { notificationIds } = body;

    const key = `notifications:${user.id}`;
    const existing = await kv.get(key);
    const notifications: any[] = existing || [];

    const updated = notifications.map((n: any) =>
      notificationIds?.includes(n.id) ? { ...n, read: true } : n
    );

    await kv.set(key, updated);
    return c.json({ success: true });
  } catch (err) {
    console.log("Error marking notifications:", err);
    return c.json({ error: `Failed to mark notifications: ${err}` }, 500);
  }
});

// POST /notifications/seed - Seed default notifications for new user
app.post("/make-server-0bb1b3e6/notifications/seed", async (c) => {
  try {
    const user = await getAuthUser(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const key = `notifications:${user.id}`;
    const existing = await kv.get(key);

    if (!existing || (Array.isArray(existing) && existing.length === 0)) {
      const userType = user.user_metadata?.userType || "student";
      const seedNotifications =
        userType === "student"
          ? [
              { id: "n1", type: "welcome", title: "Welcome to Catalyst!", message: "Start your learning journey today. Take the diagnostic test to get a personalized roadmap.", read: false, time: new Date().toISOString() },
              { id: "n2", type: "course", title: "New Course Available", message: "Advanced React Patterns has been added to your track.", read: false, time: new Date(Date.now() - 3600000).toISOString() },
              { id: "n3", type: "achievement", title: "First Login", message: "You've earned the First Login badge. Keep going!", read: false, time: new Date(Date.now() - 7200000).toISOString() },
            ]
          : [
              { id: "n1", type: "welcome", title: "Welcome to Catalyst!", message: "Post your first project to connect with talented freelancers.", read: false, time: new Date().toISOString() },
              { id: "n2", type: "talent", title: "Talent Match", message: "3 new freelancers match your project requirements.", read: false, time: new Date(Date.now() - 3600000).toISOString() },
            ];

      await kv.set(key, seedNotifications);
      return c.json({ success: true, notifications: seedNotifications });
    }

    return c.json({ success: true, notifications: existing });
  } catch (err) {
    console.log("Error seeding notifications:", err);
    return c.json({ error: `Failed to seed notifications: ${err}` }, 500);
  }
});

Deno.serve(app.fetch);
