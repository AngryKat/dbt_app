import { supabase } from "@/api/supabase-client";

export async function getBaseAndNuancedEmotions() {
  return await supabase
    .from('nuanced_emotions')
    .select(`
    id,
    label,
    description,
    base_emotions (
      id,
      key,
      label
    )
  `).order('label')
}