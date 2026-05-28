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
import { BiologicalChangesOptionsList } from "./components/BiologicalChangesOptionsList";
import { useBiologicalChangesOptions } from "../../hooks/useBiologicalChangesOptions";
import { getFilteredBiologicalChanges } from "./helpers/getFilteredBiologicalChanges";
import { getCommandEmpty } from "./helpers/getCommandEmpty";

type BiologicalChangesMultiselectProps = {
  value: string[];
  onChange: (value: string[]) => void;
  id?: string;
};

export function BiologicalChangesMultiselect({
  value,
  onChange,
  id,
}: BiologicalChangesMultiselectProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { data, isLoading, isError } = useBiologicalChangesOptions();
  const anchorRef = useComboboxAnchor();

  const allChanges = React.useMemo(
    () => data ? Object.values(data).flatMap(({ options }) => options) : [],
    [data],
  );

  const filteredChanges = React.useMemo(() => getFilteredBiologicalChanges(searchQuery, data), [data, searchQuery]);

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
              {values.map((changeId) => {
                const content = allChanges.find((c) => c.id === changeId)?.description ?? changeId;
                return (
                  <ComboboxChip key={changeId}>
                    <p className="max-w-[55ch] truncate">
                      {content}
                    </p>
                  </ComboboxChip>
                );
              })}
              <ComboboxChipsInput
                id={id}
                className="min-w-fit"
                placeholder="Search biological changes..."
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
        <BiologicalChangesOptionsList
          options={filteredChanges}
          commandEmpty={
            getCommandEmpty({
              isError,
              isLoading,
              isSearchWithNoData: !!searchQuery.trim() && !Object.values(filteredChanges).length,
            })
          }
        />
      </ComboboxContent>
    </Combobox>
  );
}
