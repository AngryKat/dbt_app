import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import type { PromptingEventsOptions } from "@/screens/DistressEntries/features/PromptingEvents/types";

export function BaseEmotionsTabs({
  options,
  activeTab,
  onTabChange,
  groupRefs,
}: {
  options: PromptingEventsOptions;
  activeTab: string | undefined;
  onTabChange: (tabValue: string) => void;
  groupRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
}) {
  const handleTabChange = (tabValue: string) => {
    onTabChange(tabValue);
    const element = groupRefs.current[tabValue];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Tabs
      value={activeTab || ""}
      onValueChange={handleTabChange}
      className="px-2 py-1.5 w-full overflow-x-auto"
    >
      <TabsList className="flex flex-nowrap gap-1 p-1">
        {Object.entries(options).map(([baseEmotion, { baseEmotionLabel }]) => (
          <TabsTrigger
            key={baseEmotion}
            value={baseEmotion}
            className="text-xs"
          >
            {baseEmotionLabel}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
