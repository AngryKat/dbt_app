import type { PromptingEventsOptions } from "../../../types";

export function getFilteredEvents(searchQuery: string, data?: PromptingEventsOptions): Partial<PromptingEventsOptions> {
  const q = searchQuery.trim().toLowerCase();

  const entries = (Object.entries(data || {}) as [keyof PromptingEventsOptions, PromptingEventsOptions[keyof PromptingEventsOptions]][]);

  return Object.fromEntries(
    entries
      .map(([key, val]) => ({
        key,
        value: {
          baseEmotionLabel: val.baseEmotionLabel,
          options: q
            ? val.options.filter(opt => opt.description.toLowerCase().includes(q))
            : val.options,
        },
      }))
      .filter(({ value }) => value.options.length > 0)
      .map(({ key, value }) => [key, value])
  ) as Partial<PromptingEventsOptions>;
}