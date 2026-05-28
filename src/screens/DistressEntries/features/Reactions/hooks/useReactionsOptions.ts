import { useQuery } from "@tanstack/react-query";
import { getReactions } from "../api/getReactions";
import type { BaseEmotionEnum } from "@/types/base-emotions";
import type { ReactionsOptions } from "../types";

export const useReactionsOptions = () => {
  return useQuery({
    queryKey: ["reactions"],
    queryFn: getReactions,
    select: ({ data }: Awaited<ReturnType<typeof getReactions>>) => (data ?? []).reduce((acc, reaction) => {
      const baseEmotionKey = reaction.base_emotions?.key as BaseEmotionEnum;
      if (!baseEmotionKey) return acc;
      if (!acc[baseEmotionKey]) acc[baseEmotionKey] = { baseEmotionLabel: reaction.base_emotions?.label || "", options: [] };
      acc[baseEmotionKey].options.push({
        id: reaction.id,
        description: reaction.description,
      });
      return acc;
    }, {} as ReactionsOptions)
  });
};
