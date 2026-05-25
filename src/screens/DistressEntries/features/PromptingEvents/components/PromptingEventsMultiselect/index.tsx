import * as React from "react";

import {
  Combobox,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/shadcn/combobox";
import { PromptingEventsOptionsList } from "./components/PromptingEventsOptionsList";
import { usePromptingEventsOptions } from "../../hooks/usePromptingEventsOptions";
import { Loader } from "@/components/ui/Loader";
import { Tooltip } from "@/components/ui/Tooltip";
import type { PromptingEventsOptions } from "../../types";

type PromptingEventsMultiselectProps = {
  value: string[];
  onChange: (value: string[]) => void;
  id?: string;
};

export function PromptingEventsMultiselect({
  value,
  onChange,
  id,
}: PromptingEventsMultiselectProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { data, isLoading, isError } = usePromptingEventsOptions();
  const anchorRef = useComboboxAnchor();

  const allEvents = React.useMemo(
    () => data ? Object.values(data).flatMap(({ options }) => options) : [],
    [data],
  );

  const filteredEvents: Partial<PromptingEventsOptions> = React.useMemo(() => {
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
  }, [data, searchQuery]);

  return (
    <Combobox
      multiple
      autoHighlight
      value={value}
      onValueChange={onChange}
    >
      <ComboboxChips ref={anchorRef} className="w-full max-w-full">
        <ComboboxValue>
          {(values: string[]) => (
            <React.Fragment>
              {values.map((eventId) => {
                const content = allEvents.find((e) => e.id === eventId)?.description ?? eventId;
                return (
                  <ComboboxChip key={eventId}>
                    <Tooltip content={content}>
                      <p className="max-w-[55ch] truncate">
                        {content}
                      </p>
                    </Tooltip>
                  </ComboboxChip>
                )
              })}
              <ComboboxChipsInput
                id={id}
                className="min-w-fit"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent
        anchor={anchorRef}
        align="start"
        side="bottom"
        className="min-w-[clamp(12.5rem,2.484rem+40.064vw,28.125rem)]"
      >
        <PromptingEventsOptionsList
          options={filteredEvents}
          commandEmpty={
            isError ? (
              "Error while getting options"
            ) : isLoading ? (
              <Loader label="Loading prompting events" />
            ) : searchQuery.trim() && !data ? (
              "No prompting events match your search."
            ) : (
              "No prompting event found."
            )
          }
        />
      </ComboboxContent>
    </Combobox>
  );
}