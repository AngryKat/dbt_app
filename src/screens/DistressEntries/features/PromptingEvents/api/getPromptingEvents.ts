import { supabase } from "@/api/supabase-client";

export async function getPromptingEvents() {
  return await supabase
    .from('prompting_events')
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
