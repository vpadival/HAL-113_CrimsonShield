/*  ============================================
    Crimson Shield · Supabase Configuration
    ============================================
    Single source of truth for Supabase client.
    Every page imports this instead of duplicating
    the URL / key inline.
    ============================================ */

const SUPABASE_URL = "https://lkflnzxcbwlmxounerex.supabase.co";
const SUPABASE_KEY = "sb_publishable_SqucPk5SOnBhLL6goXwxIQ_jDVlIy3x";

// supabase-js must be loaded before this file
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
