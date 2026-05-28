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
import { InterpretationsOptionsList } from "./components/InterpretationsOptionsList";
import { useInterpretationsOptions } from "../../hooks/useInterpretationsOptions";
import { getFilteredInterpretations } from "./helpers/getFilteredInterpretations";
import { getCommandEmpty } from "./helpers/getCommandEmpty";

type InterpretationsMultiselectProps = {
  value: string[];
  onChange: (value: string[]) => void;
  id?: string;
};

export function InterpretationsMultiselect({
  value,
  onChange,
  id,
}: InterpretationsMultiselectProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { data, isLoading, isError } = useInterpretationsOptions();
  const anchorRef = useComboboxAnchor();

  const allInterpretations = React.useMemo(
    () => data ? Object.values(data).flatMap(({ options }) => options) : [],
    [data],
  );

  const filteredInterpretations = React.useMemo(() => getFilteredInterpretations(searchQuery, data), [data, searchQuery]);

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
              {values.map((interpretationId) => {
                const content = allInterpretations.find((i) => i.id === interpretationId)?.description ?? interpretationId;
                return (
                  <ComboboxChip key={interpretationId}>
                    <p className="max-w-[55ch] truncate">
                      {content}
                    </p>
                  </ComboboxChip>
                )
              })}
              <ComboboxChipsInput
                id={id}
                className="min-w-fit"
                placeholder="Search interpretations..."
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
        <InterpretationsOptionsList
          options={filteredInterpretations}
          commandEmpty={
            getCommandEmpty({
              isError,
              isLoading,
              isSearchWithNoData: !!searchQuery.trim() && !Object.values(filteredInterpretations).length,
            })
          }
        />
      </ComboboxContent>
    </Combobox>
  );
}
