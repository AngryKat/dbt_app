import { useQuery } from "@tanstack/react-query"
import { getNuancedEmotionById } from "../api/getNuancedEmotionById"

export const useNuancedEmotion = (id: string) => {
  return useQuery({
    queryKey: ['nuancedEmotion', id],
    queryFn: () => getNuancedEmotionById(id),
    enabled: !!id,
  })
}