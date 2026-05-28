import { supabase } from "@/api/supabase-client";

export async function getReactions() {
  return await supabase
    .from('reactions')
    .select(`
    id,
    description,
    base_emotions (
      id,
      key,
      label
    )
  `).order('base_emotions(key)', { ascending: true })
}
