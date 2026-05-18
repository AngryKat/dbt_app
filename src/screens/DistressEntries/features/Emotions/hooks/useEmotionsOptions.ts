import { useQuery } from "@tanstack/react-query";
import { getBaseAndNuancedEmotions } from "../api/getBaseAndNuancedEmotions";
import type { BaseEmotionEnum, EmotionsOptions } from "../types";

export const useEmotionsOptions = () => {
  return useQuery({
    queryKey: ['emotions'],
    queryFn: getBaseAndNuancedEmotions,
    select: ({ data }: Awaited<ReturnType<typeof getBaseAndNuancedEmotions>>) => (data ?? []).reduce((acc, nuanced) => {
      const baseEmotionKey = nuanced.base_emotions?.key as BaseEmotionEnum;
      if (!baseEmotionKey) return acc
      if (!acc[baseEmotionKey]) acc[baseEmotionKey] = { baseEmotionLabel: nuanced.base_emotions?.label || "", emotions: [] }
      acc[baseEmotionKey].emotions.push({
        id: nuanced.id,
        label: nuanced.label,
        description: nuanced.description,
      })
      return acc
    }, {} as EmotionsOptions)
  })
}