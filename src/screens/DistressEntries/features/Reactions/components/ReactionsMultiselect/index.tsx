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
import { ReactionsOptionsList } from "./components/ReactionsOptionsList";
import { useReactionsOptions } from "../../hooks/useReactionsOptions";
import { getFilteredReactions } from "./helpers/getFilteredReactions";
import { getCommandEmpty } from "./helpers/getCommandEmpty";

type ReactionsMultiselectProps = {
  value: string[];
  onChange: (value: string[]) => void;
  id?: string;
};

export function ReactionsMultiselect({
  value,
  onChange,
  id,
}: ReactionsMultiselectProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { data, isLoading, isError } = useReactionsOptions();
  const anchorRef = useComboboxAnchor();

  const allReactions = React.useMemo(
    () => data ? Object.values(data).flatMap(({ options }) => options) : [],
    [data],
  );

  const filteredReactions = React.useMemo(() => getFilteredReactions(searchQuery, data), [data, searchQuery]);

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
              {values.map((reactionId) => {
                const content = allReactions.find((r) => r.id === reactionId)?.description ?? reactionId;
                return (
                  <ComboboxChip key={reactionId}>
                    <p className="max-w-[55ch] truncate">
                      {content}
                    </p>
                  </ComboboxChip>
                );
              })}
              <ComboboxChipsInput
                id={id}
                className="min-w-fit"
                placeholder="Search reactions..."
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
        <ReactionsOptionsList
          options={filteredReactions}
          commandEmpty={
            getCommandEmpty({
              isError,
              isLoading,
              isSearchWithNoData: !!searchQuery.trim() && !Object.values(filteredReactions).length,
            })
          }
        />
      </ComboboxContent>
    </Combobox>
  );
}
