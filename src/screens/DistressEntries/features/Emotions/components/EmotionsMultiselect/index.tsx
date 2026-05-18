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
import { EmotionsOptionsList } from "./EmotionsOptionsList";
import { useEmotionsOptions } from "../../hooks/useEmotionsOptions";
import { Loader } from "@/components/ui/Loader";

type EmotionsMultiselectProps = {
  value: string[];
  onChange: (value: string[]) => void;
  id?: string;
};

export function EmotionsMultiselect({
  value,
  onChange,
  id,
}: EmotionsMultiselectProps) {
  const { data, isLoading, isError } = useEmotionsOptions();
  const anchorRef = useComboboxAnchor();

  const allEmotions = React.useMemo(
    () => Object.values(data || {}).flatMap(({ emotions }) => emotions),
    [data],
  );

  const allEmotionIds = React.useMemo(
    () => allEmotions.map((e) => e.id),
    [allEmotions],
  );

  return (
    <Combobox
      multiple
      autoHighlight
      items={allEmotionIds}
      value={value}
      onValueChange={onChange}
    >
      <ComboboxChips ref={anchorRef} className="w-full">
        <ComboboxValue>
          {(values: string[]) => (
            <React.Fragment>
              {values.map((id) => (
                <ComboboxChip key={id}>
                  {allEmotions.find((e) => e.id === id)?.label ?? id}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput id={id} placeholder="Select emotions" />
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
        <EmotionsOptionsList
          options={data}
          commandEmpty={
            isError ? (
              "Error while getting options"
            ) : isLoading ? (
              <Loader label="Loading emotions list" />
            ) : (
              "No emotion found."
            )
          }
        />
      </ComboboxContent>
    </Combobox>
  );
}
