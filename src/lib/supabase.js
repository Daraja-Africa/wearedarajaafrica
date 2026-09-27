import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ojsvkxgzizucvzbhfwph.supabase.co";
const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseKey) {
  throw new Error(
    "Missing VITE_SUPABASE_ANON_KEY or VITE_SUPABASE_PUBLISHABLE_KEY. Add the Supabase key to the Vercel project environment variables."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
