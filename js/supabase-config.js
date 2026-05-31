/*  ============================================
    Crimson Shield · Supabase Configuration
    ============================================
    Single source of truth for Supabase client.
    Every page imports this instead of duplicating
    the URL / key inline.
    ============================================ */

const SUPABASE_URL = "https://uvoiroyonzqqtegfekyu.supabase.co";
const SUPABASE_KEY = "sb_publishable_dgK8z3sBV9OOHShP9Fceww_HG4QlJpf";

// supabase-js must be loaded before this file
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
