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
import { getFilteredEvents } from "./helpers/getFilteredEvents";
import { getCommandEmpty } from "./helpers/getCommandEmpty";

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

  const filteredEvents = React.useMemo(() => getFilteredEvents(searchQuery, data), [data, searchQuery]);
  console.log({ filteredEvents, data, searchQuery });
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
                    <p className="max-w-[55ch] truncate">
                      {content}
                    </p>
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
            getCommandEmpty({
              isError,
              isLoading,
              isSearchWithNoData: !!searchQuery.trim() && !Object.values(filteredEvents).length,
            })
          }
        />
      </ComboboxContent>
    </Combobox>
  );
}