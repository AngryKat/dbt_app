import { supabase } from "@/api/supabase-client";

export async function getNuancedEmotionDetailsById(id: string) {
  return await supabase
    .from('nuanced_emotions')
    .select(`
    id,
    label,
    feels_like,
    thinking,
    check
  `)
    .eq('id', id)
    .single();
}