/*  ============================================
    Crimson Shield · Auth Helpers
    ============================================
    Provides:
      - getSession()      → current Supabase session or null
      - getDonorProfile() → donor row from `donors` table
      - requireDonorAuth(callback) → guard: redirects to login if not authed
      - requireAdminAuth()         → guard: checks admin flag in localStorage
      - logout()          → signs out + clears storage + redirects
    ============================================ */

/* ---------- session helpers ---------- */

async function getSession() {
  const { data: { session }, error } = await supabaseClient.auth.getSession();
  if (error) { console.error("Session error:", error); return null; }
  return session;
}

async function getDonorProfile(userId) {
  const { data, error } = await supabaseClient
    .from("donors")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (error) { console.error("Profile fetch error:", error); return null; }
  return data;
}

/* ---------- route guards ---------- */

/**
 * Donor-side auth guard.
 * If user is authenticated, calls `callback(session, profile)`.
 * Otherwise redirects to donor login.
 * `basePath` is used when the page lives in a sub-folder.
 */
async function requireDonorAuth(callback, basePath) {
  basePath = basePath || "";
  const session = await getSession();
  if (!session) {
    window.location.href = basePath + "user-login.html";
    return;
  }
  const profile = await getDonorProfile(session.user.id);
  callback(session, profile);
}

/**
 * Admin-side auth guard.
 * Admin authentication is stored as a flag in sessionStorage
 * after successful Supabase sign-in on admin-login.
 * If missing, redirect to admin login.
 */
function requireAdminAuth(basePath) {
  basePath = basePath || "";
  if (sessionStorage.getItem("crimson_admin_auth") !== "true") {
    window.location.href = basePath + "admin-login.html";
  }
}

/* ---------- logout ---------- */

async function performLogout(redirectPath) {
  redirectPath = redirectPath || "../index.html";
  await supabaseClient.auth.signOut();
  sessionStorage.removeItem("crimson_admin_auth");
  window.location.href = redirectPath;
}
