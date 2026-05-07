import { supabase } from "@/api/supabase-client";

export async function getNuancedEmotions() {
  return await supabase.from("nuanced_emotions").select("*");
}

