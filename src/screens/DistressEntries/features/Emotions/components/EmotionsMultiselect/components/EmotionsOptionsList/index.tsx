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
  const baseEmotionsKeys = Object.keys(options ?? {});
  const hasOptions = options && Object.keys(options).length > 0;
  const [activeTabState, setActiveTabState] = React.useState<string>("");
  const activeTab = baseEmotionsKeys.includes(activeTabState) ? activeTabState : baseEmotionsKeys[0];
  const groupRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
  const listRef = React.useRef<HTMLDivElement | null>(null);
  // When true, the user explicitly clicked a tab — scroll should not override it.
  const tabClickedRef = React.useRef(false);

  const handleTabChange = (tabValue: string) => {
    tabClickedRef.current = true;
    setActiveTabState(tabValue);
  };

  const handleUserScroll = () => {
    // Any manual scroll gesture clears the click lock so tabs follow scroll again.
    tabClickedRef.current = false;
  };

  const handleScroll = () => {
    if (!listRef.current) return;
    // If the scroll was triggered by a tab click, ignore it.
    if (tabClickedRef.current) return;

    const scrollContainer = listRef.current;
    const scrollTop = scrollContainer.scrollTop;
    const containerHeight = scrollContainer.clientHeight;

    let visibleGroup: string | undefined;
    let maxVisibility = 0;

    Object.entries(groupRefs.current).forEach(([groupId, element]) => {
      if (!element) return;

      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const elementBottom = elementTop + elementHeight;

      const visibleTop = Math.max(elementTop, scrollTop);
      const visibleBottom = Math.min(elementBottom, scrollTop + containerHeight);
      const visibility = Math.max(0, visibleBottom - visibleTop);

      if (visibility > maxVisibility) {
        maxVisibility = visibility;
        visibleGroup = groupId;
      }
    });

    if (visibleGroup) {
      setActiveTabState(visibleGroup);
    }
  };

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
