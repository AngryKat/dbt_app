import { emotions } from "@/data";
import type { PromptingEventsOptions } from "../types";
import type { BaseEmotionEnum } from "@/types/base-emotions";

export function getPromptingEvents(): PromptingEventsOptions {
  return Object.fromEntries(
    emotions.map(({ emotion, promptingEvents }) => [
      emotion as BaseEmotionEnum,
      {
        baseEmotionLabel:
          emotion.charAt(0).toUpperCase() + emotion.slice(1),
        events: promptingEvents.events.map((description) => ({
          id: `${emotion}:${description}`,
          description,
        })),
      },
    ]),
  ) as PromptingEventsOptions;
}
