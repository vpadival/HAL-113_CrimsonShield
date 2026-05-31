/*  ============================================
    Crimson Shield · Auth Helpers
    ============================================ */

/* Wait for supabaseClient to be ready before running any auth */
function onSupabaseReady(fn) {
  if (window.supabaseClient) {
    fn();
  } else {
    document.addEventListener("supabaseReady", fn, { once: true });
  }
}

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

function requireDonorAuth(callback, basePath) {
  basePath = basePath || "";
  onSupabaseReady(async function() {
    const session = await getSession();
    if (!session) {
      window.location.href = basePath + "user-login.html";
      return;
    }
    const profile = await getDonorProfile(session.user.id);
    callback(session, profile);
  });
}

function requireAdminAuth(basePath) {
  basePath = basePath || "";
  onSupabaseReady(function() {
    if (sessionStorage.getItem("crimson_admin_auth") !== "true") {
      window.location.href = basePath + "admin-login.html";
    }
  });
}

/* ---------- logout ---------- */

async function performLogout(redirectPath) {
  redirectPath = redirectPath || "../index.html";
  await supabaseClient.auth.signOut();
  sessionStorage.removeItem("crimson_admin_auth");
  window.location.href = redirectPath;
}