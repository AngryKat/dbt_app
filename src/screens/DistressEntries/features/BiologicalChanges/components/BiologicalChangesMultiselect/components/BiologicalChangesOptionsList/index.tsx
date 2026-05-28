import * as React from "react";
import {
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxList,
} from "@/components/shadcn/combobox";
import { BiologicalChangeOptionItem } from "./components/BiologicalChangeOptionItem";
import type { BiologicalChangesOptions } from "../../../../types";
import { BaseEmotionsTabs } from "@/components/ui/BaseEmotionsTabs";
import { useTabsWithScroll } from "@/screens/DistressEntries/features/hooks/useTabsWithScroll";

export function BiologicalChangesOptionsList({
  options,
  commandEmpty = "No biological change found.",
}: {
  options: Partial<BiologicalChangesOptions> | undefined;
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
              ([baseEmotion, { baseEmotionLabel, options: changes }]) => {
                if (changes.length === 0) return null;
                return (
                  <div
                    key={baseEmotion}
                    ref={(el) => {
                      if (el) groupRefs.current[baseEmotion] = el;
                    }}
                  >
                    <ComboboxGroup>
                      <ComboboxLabel>{baseEmotionLabel}</ComboboxLabel>
                      {changes.map((change) => (
                        <BiologicalChangeOptionItem
                          key={change.id}
                          id={change.id}
                          description={change.description}
                        />
                      ))}
                    </ComboboxGroup>
                  </div>
                );
              },
            )}
          </ComboboxList>
        </div>
      )}
    </>
  );
}
