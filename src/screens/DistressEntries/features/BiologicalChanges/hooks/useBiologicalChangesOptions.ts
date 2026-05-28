import { useQuery } from "@tanstack/react-query";
import { getBiologicalChanges } from "../api/getBiologicalChanges";
import type { BaseEmotionEnum } from "@/types/base-emotions";
import type { BiologicalChangesOptions } from "../types";

export const useBiologicalChangesOptions = () => {
  return useQuery({
    queryKey: ["biologicalChanges"],
    queryFn: getBiologicalChanges,
    select: ({ data }: Awaited<ReturnType<typeof getBiologicalChanges>>) => (data ?? []).reduce((acc, change) => {
      const baseEmotionKey = change.base_emotions?.key as BaseEmotionEnum;
      if (!baseEmotionKey) return acc;
      if (!acc[baseEmotionKey]) acc[baseEmotionKey] = { baseEmotionLabel: change.base_emotions?.label || "", options: [] };
      acc[baseEmotionKey].options.push({
        id: change.id,
        description: change.description,
      });
      return acc;
    }, {} as BiologicalChangesOptions)
  });
};
