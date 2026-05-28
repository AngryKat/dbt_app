import { supabase } from "@/api/supabase-client";

export async function getBiologicalChanges() {
  return await supabase
    .from('biological_changes')
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
