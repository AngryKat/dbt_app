import { useQuery } from "@tanstack/react-query";
import { getPromptingEvents } from "../api/getPromptingEvents";
import type { BaseEmotionEnum } from "@/types/base-emotions";
import type { PromptingEventsOptions } from "../types";

export const usePromptingEventsOptions = () => {
  return useQuery({
    queryKey: ["prompting-events"],
    queryFn: getPromptingEvents,
    select: ({ data }: Awaited<ReturnType<typeof getPromptingEvents>>) => (data ?? []).reduce((acc, promptingEvent) => {
      const baseEmotionKey = promptingEvent.base_emotions?.key as BaseEmotionEnum;
      if (!baseEmotionKey) return acc
      if (!acc[baseEmotionKey]) acc[baseEmotionKey] = { baseEmotionLabel: promptingEvent.base_emotions?.label || "", options: [] }
      acc[baseEmotionKey].options.push({
        id: promptingEvent.id,
        description: promptingEvent.description,
      })
      return acc
    }, {} as PromptingEventsOptions)
  });
};
