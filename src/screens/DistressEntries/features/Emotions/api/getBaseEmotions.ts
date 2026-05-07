import { supabase } from "@/api/supabase-client";

export function getBaseEmotions() {
  return supabase.from("base_emotions").select("*");
}