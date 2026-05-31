/*  ============================================
    Crimson Shield · Supabase Configuration
    ============================================ */

const SUPABASE_URL = "https://uvoiroyonzqqtegfekyu.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2b2lyb3lvbnpxcXRlZ2Zla3l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNjk3MDYsImV4cCI6MjA5NTY0NTcwNn0.lejcUqNttB5jKT0-rwL6GuFEkazZWQhkY7BeqVQZKUI";

(function() {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js";
    script.onload = function() {
        window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        document.dispatchEvent(new Event("supabaseReady"));
    };
    document.head.appendChild(script);
})();