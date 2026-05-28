import { useQuery } from "@tanstack/react-query";
import { getInterpretations } from "../api/getInterpretations";
import type { BaseEmotionEnum } from "@/types/base-emotions";
import type { InterpretationsOptions } from "../types";

export const useInterpretationsOptions = () => {
  return useQuery({
    queryKey: ["interpretations"],
    queryFn: getInterpretations,
    select: ({ data }: Awaited<ReturnType<typeof getInterpretations>>) => (data ?? []).reduce((acc, interpretation) => {
      const baseEmotionKey = interpretation.base_emotions?.key as BaseEmotionEnum;
      if (!baseEmotionKey) return acc
      if (!acc[baseEmotionKey]) acc[baseEmotionKey] = { baseEmotionLabel: interpretation.base_emotions?.label || "", options: [] }
      acc[baseEmotionKey].options.push({
        id: interpretation.id,
        description: interpretation.description,
      })
      return acc
    }, {} as InterpretationsOptions)
  });
};
