import * as React from "react";
import {
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxList,
} from "@/components/shadcn/combobox";
import { InterpretationOptionItem } from "./components/InterpretationOptionItem";
import type { InterpretationsOptions } from "../../../../types";
import { BaseEmotionsTabs } from "@/components/ui/BaseEmotionsTabs";
import { useTabsWithScroll } from "@/screens/DistressEntries/features/hooks/useTabsWithScroll";

export function InterpretationsOptionsList({
  options,
  commandEmpty = "No interpretation found.",
}: {
  options: Partial<InterpretationsOptions> | undefined;
  commandEmpty?: React.ReactNode;
}) {
  const {
    activeTab,
    groupRefs,
    listRef,
    handleTabChange,
    handleUserScroll,
    handleScroll,
  } = useTabsWithScroll(Object.keys(options ?? {}));
  const hasOptions = options && Object.keys(options).length > 0;

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
              ([baseEmotion, { baseEmotionLabel, options: interpretations }]) => {
                if (interpretations.length === 0) return null;
                return (
                  <div
                    key={baseEmotion}
                    ref={(el) => {
                      if (el) groupRefs.current[baseEmotion] = el;
                    }}
                  >
                    <ComboboxGroup>
                      <ComboboxLabel>{baseEmotionLabel}</ComboboxLabel>
                      {interpretations.map((interpretation) => (
                        <InterpretationOptionItem
                          key={interpretation.id}
                          id={interpretation.id}
                          description={interpretation.description}
                        />
                      ))}
                    </ComboboxGroup>
                  </div>
                )
              },
            )}
          </ComboboxList>
        </div>
      )}
    </>
  );
}
