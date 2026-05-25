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

  const filteredEvents = React.useMemo(() => {
    if (!searchQuery.trim()) return data;

    const query = searchQuery.toLowerCase();
    const filtered = {} as NonNullable<typeof data>;

    Object.entries(data || {}).forEach(([key, group]) => {
      const matchedEvents = group.options.filter((event) =>
        event.description.toLowerCase().includes(query),
      );

      if (matchedEvents.length > 0) {
        filtered[key as BaseEmotionEnum] = {
          ...group,
          events: matchedEvents,
        };
      }
    });

    return Object.keys(filtered).length > 0 ? filtered : undefined;
  }, [data, searchQuery]);

  return (
    <Combobox
      multiple
      autoHighlight
      // items={allEvents}
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