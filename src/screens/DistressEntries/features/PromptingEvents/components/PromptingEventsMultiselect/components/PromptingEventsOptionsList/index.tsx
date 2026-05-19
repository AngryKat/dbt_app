import * as React from "react";
import {
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxList,
} from "@/components/shadcn/combobox";
import { PromptingEventOptionItem } from "./components/PromptingEventOptionItem";
import type { PromptingEventsOptions } from "../../../../types";
import { BaseEmotionsTabs } from "@/components/ui/BaseEmotionsTabs";
import { useTabsWithScroll } from "@/screens/DistressEntries/features/hooks/useTabsWithScroll";

export function PromptingEventsOptionsList({
  options,
  commandEmpty = "No prompting event found.",
}: {
  options: PromptingEventsOptions | undefined;
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
  // const baseEmotionsKeys = Object.keys(options ?? {});
  const hasOptions = options && Object.keys(options).length > 0;
  // const [activeTabState, setActiveTabState] = React.useState<string>("");
  // const activeTab = baseEmotionsKeys.includes(activeTabState)
  //   ? activeTabState
  //   : baseEmotionsKeys[0];
  // const groupRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
  // const listRef = React.useRef<HTMLDivElement | null>(null);
  // const tabClickedRef = React.useRef(false);

  // const handleTabChange = (tabValue: string) => {
  //   tabClickedRef.current = true;
  //   setActiveTabState(tabValue);
  // };

  // const handleUserScroll = () => {
  //   tabClickedRef.current = false;
  // };

  // const handleScroll = () => {
  //   if (!listRef.current) return;
  //   if (tabClickedRef.current) return;

  //   const scrollContainer = listRef.current;
  //   const scrollTop = scrollContainer.scrollTop;
  //   const containerHeight = scrollContainer.clientHeight;

  //   let visibleGroup: string | undefined;
  //   let maxVisibility = 0;

  //   Object.entries(groupRefs.current).forEach(([groupId, element]) => {
  //     if (!element) return;

  //     const elementTop = element.offsetTop;
  //     const elementHeight = element.offsetHeight;
  //     const elementBottom = elementTop + elementHeight;

  //     const visibleTop = Math.max(elementTop, scrollTop);
  //     const visibleBottom = Math.min(
  //       elementBottom,
  //       scrollTop + containerHeight,
  //     );
  //     const visibility = Math.max(0, visibleBottom - visibleTop);

  //     if (visibility > maxVisibility) {
  //       maxVisibility = visibility;
  //       visibleGroup = groupId;
  //     }
  //   });

  //   if (visibleGroup) {
  //     setActiveTabState(visibleGroup);
  //   }
  // };

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
              ([baseEmotion, { baseEmotionLabel, options: events }]) => (
                <div
                  key={baseEmotion}
                  ref={(el) => {
                    if (el) groupRefs.current[baseEmotion] = el;
                  }}
                >
                  <ComboboxGroup>
                    <ComboboxLabel>{baseEmotionLabel}</ComboboxLabel>
                    {events.map((event) => (
                      <PromptingEventOptionItem
                        key={event.id}
                        id={event.id}
                        description={event.description}
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
