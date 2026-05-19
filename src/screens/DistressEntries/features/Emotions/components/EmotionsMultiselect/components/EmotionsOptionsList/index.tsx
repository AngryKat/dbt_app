import * as React from "react";
import {
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxList,
} from "@/components/shadcn/combobox";
import { OptionItem } from "./components/OptionItem";
import { BaseEmotionsTabs } from "@/components/ui/BaseEmotionsTabs";
import type { EmotionsOptions } from "../../types";
import { useTabsWithScroll } from "@/screens/DistressEntries/features/hooks/useTabsWithScroll";

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
  const {
    activeTab,
    groupRefs,
    listRef,
    handleTabChange,
    handleUserScroll,
    handleScroll,
  } = useTabsWithScroll(Object.keys(options ?? {}));

  return (
    <>
      {!hasOptions && <ComboboxEmpty>{commandEmpty}</ComboboxEmpty>}
      {hasOptions && (
        <div className="flex flex-col gap-2">
          <BaseEmotionsTabs
            options={options}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            groupRefs={groupRefs}
          />
          <ComboboxList
            ref={listRef}
            onScroll={handleScroll}
            onWheel={handleUserScroll}
            onTouchStart={handleUserScroll}
            className="overflow-y-auto"
          >
            {Object.entries(options).map(
              ([baseEmotion, { baseEmotionLabel, options: emotions }]) => (
                <div
                  key={baseEmotion}
                  ref={(el) => {
                    if (el) groupRefs.current[baseEmotion] = el;
                  }}
                >
                  <ComboboxGroup>
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
                </div>
              ),
            )}
          </ComboboxList>
        </div>
      )}
    </>
  );
}
