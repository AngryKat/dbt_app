import { supabase } from "@/api/supabase-client";

export function getNuancedEmotionById(id: string) {
  return supabase
    .from('nuanced_emotions')
    .select(`
    id,
    label,
    description,
  `)
    .eq('id', id)
    .single();
}