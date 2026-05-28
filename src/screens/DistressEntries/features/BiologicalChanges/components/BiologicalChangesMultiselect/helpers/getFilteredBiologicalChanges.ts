import type { BiologicalChangesOptions } from "../../../types";

export function getFilteredBiologicalChanges(searchQuery: string, data?: BiologicalChangesOptions): Partial<BiologicalChangesOptions> {
  const q = searchQuery.trim().toLowerCase();

  const entries = (Object.entries(data || {}) as [keyof BiologicalChangesOptions, BiologicalChangesOptions[keyof BiologicalChangesOptions]][]);

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
  ) as Partial<BiologicalChangesOptions>;
}
