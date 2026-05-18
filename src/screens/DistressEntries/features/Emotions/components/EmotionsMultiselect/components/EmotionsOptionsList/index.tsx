import * as React from "react";
import {
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxList,
} from "@/components/shadcn/combobox";
import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { OptionItem } from "./components/OptionItem";
import type { EmotionsOptions } from "../../../../types";

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
  const [activeTab, setActiveTab] = React.useState<string | undefined>(() => Object.keys(options || {})[0]);
  const groupRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
  const listRef = React.useRef<HTMLDivElement | null>(null);

  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
    const element = groupRefs.current[tabValue];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScroll = () => {
    if (!listRef.current) return;

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

      // Calculate how much of this element is visible in the viewport
      const visibleTop = Math.max(elementTop, scrollTop);
      const visibleBottom = Math.min(elementBottom, scrollTop + containerHeight);
      const visibility = Math.max(0, visibleBottom - visibleTop);

      if (visibility > maxVisibility) {
        maxVisibility = visibility;
        visibleGroup = groupId;
      }
    });

    if (visibleGroup) {
      setActiveTab(visibleGroup);
    }
  };

  return (
    <>
      {!hasOptions && <ComboboxEmpty>{commandEmpty}</ComboboxEmpty>}
      {hasOptions && (
        <div className="flex flex-col gap-2">
          <Tabs value={activeTab || ""} onValueChange={handleTabChange} className="px-2 py-1.5">
            <TabsList className="grid w-full gap-1 p-1" style={{
              gridTemplateColumns: `repeat(auto-fit, minmax(60px, 1fr))`
            }}>
              {Object.entries(options).map(([baseEmotion, { baseEmotionLabel }]) => (
                <TabsTrigger key={baseEmotion} value={baseEmotion} className="text-xs">
                  {baseEmotionLabel}
                </TabsTrigger>
              ))}
            </TabsList>
            <ComboboxList
              ref={listRef}
              onScroll={handleScroll}
              className="overflow-y-auto"
            >
              {Object.entries(options).map(
                ([baseEmotion, { baseEmotionLabel, emotions }]) => (
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
          </Tabs>
        </div>
      )}
    </>
  );
}
