import { supabase } from "@/api/supabase-client";

export async function getInterpretations() {
  return await supabase
    .from('interpretations')
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
