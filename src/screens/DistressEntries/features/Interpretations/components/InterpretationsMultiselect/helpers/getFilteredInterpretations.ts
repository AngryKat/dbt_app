import type { InterpretationsOptions } from "../../../types";

export function getFilteredInterpretations(searchQuery: string, data?: InterpretationsOptions): Partial<InterpretationsOptions> {
  const q = searchQuery.trim().toLowerCase();

  const entries = (Object.entries(data || {}) as [keyof InterpretationsOptions, InterpretationsOptions[keyof InterpretationsOptions]][]);

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
  ) as Partial<InterpretationsOptions>;
}
