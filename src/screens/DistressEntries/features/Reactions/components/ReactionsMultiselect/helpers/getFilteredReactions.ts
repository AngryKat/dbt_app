import type { ReactionsOptions } from "../../../types";

export function getFilteredReactions(searchQuery: string, data?: ReactionsOptions): Partial<ReactionsOptions> {
  const q = searchQuery.trim().toLowerCase();

  const entries = (Object.entries(data || {}) as [keyof ReactionsOptions, ReactionsOptions[keyof ReactionsOptions]][]);

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
  ) as Partial<ReactionsOptions>;
}
