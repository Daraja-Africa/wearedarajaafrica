import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://ojsvkxgzizucvzbhfwph.supabase.co";
const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "sb_publishable_1R58vbwPdZ5YQ_b-ees9Ug_qV85PTd3";

export const supabase = createClient(supabaseUrl, supabaseKey);
