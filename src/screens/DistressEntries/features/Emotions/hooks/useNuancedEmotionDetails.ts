import { useQuery } from "@tanstack/react-query"
import { getNuancedEmotionDetailsById } from "../api/getNuancedEmotionDetailsById"

export const useNuancedEmotionDetails = (id: string) => {
  return useQuery({
    queryKey: ['nuancedEmotion', id],
    queryFn: () => getNuancedEmotionDetailsById(id),
    enabled: !!id,
    select: ({ data }: Awaited<ReturnType<typeof getNuancedEmotionDetailsById>>) => ({
      feelsLike: data?.feels_like || "",
      thinking: data?.thinking || "",
      check: data?.check || "",
    })
  })
}