import * as React from "react";
import {
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxList,
} from "@/components/shadcn/combobox";
import { OptionItem } from "./components/OptionItem";
import type { EmotionsOptions } from "../../../types";

export function EmotionsOptionsList({
  options,
  commandEmpty = "No emotion found.",
  openDetailForId,
  onDetailOpenChange,
}: {
  options: EmotionsOptions | undefined;
  commandEmpty?: React.ReactNode;
  openDetailForId?: string;
  onDetailOpenChange?: (id: string | undefined) => void;
}) {
  const hasOptions = options && Object.keys(options).length > 0;

  return (
    <>
      {!hasOptions && <ComboboxEmpty>{commandEmpty}</ComboboxEmpty>}
      {hasOptions && (
        <ComboboxList>
          {Object.entries(options).map(
            ([baseEmotion, { baseEmotionLabel, emotions }]) => (
              <ComboboxGroup key={baseEmotion}>
                <ComboboxLabel>{baseEmotionLabel}</ComboboxLabel>
                {emotions.map((emotion) => (
                  <OptionItem
                    key={emotion.id}
                    id={emotion.id}
                    label={emotion.label || ""}
                    description={emotion.description || ""}
                    isDetailOpen={openDetailForId === emotion.id}
                    onDetailOpenChange={(open) =>
                      onDetailOpenChange?.(open ? emotion.id : undefined)
                    }
                  />
                ))}
              </ComboboxGroup>
            ),
          )}
        </ComboboxList>
      )}
    </>
  );
}
