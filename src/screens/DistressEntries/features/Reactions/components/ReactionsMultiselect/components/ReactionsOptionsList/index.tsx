import * as React from "react";
import {
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxList,
} from "@/components/shadcn/combobox";
import { ReactionOptionItem } from "./components/ReactionOptionItem";
import type { ReactionsOptions } from "../../../../types";
import { BaseEmotionsTabs } from "@/components/ui/BaseEmotionsTabs";
import { useTabsWithScroll } from "@/screens/DistressEntries/features/hooks/useTabsWithScroll";

export function ReactionsOptionsList({
  options,
  commandEmpty = "No reaction found.",
}: {
  options: Partial<ReactionsOptions> | undefined;
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
              ([baseEmotion, { baseEmotionLabel, options: reactions }]) => {
                if (reactions.length === 0) return null;
                return (
                  <div
                    key={baseEmotion}
                    ref={(el) => {
                      if (el) groupRefs.current[baseEmotion] = el;
                    }}
                  >
                    <ComboboxGroup>
                      <ComboboxLabel>{baseEmotionLabel}</ComboboxLabel>
                      {reactions.map((reaction) => (
                        <ReactionOptionItem
                          key={reaction.id}
                          id={reaction.id}
                          description={reaction.description}
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
