import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import type { OptionsWithBaseEmotions } from "@/types/base-emotions";
import { cn } from "@/lib/utils";

export function BaseEmotionsTabs<OptionsType>({
  options,
  activeTab,
  onTabChange,
  groupRefs,
  showAllTab,
  className,
}: {
  options: Partial<OptionsWithBaseEmotions<OptionsType>>;
  activeTab: string | undefined;
  onTabChange: (tabValue: string) => void;
  groupRefs?: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  showAllTab?: boolean;
  className?: string;
}) {
  const handleTabChange = (tabValue: string) => {
    onTabChange(tabValue);
    if (groupRefs) {
      const element = groupRefs.current[tabValue];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <Tabs
      value={activeTab || ""}
      onValueChange={handleTabChange}
      className={cn("w-full overflow-x-auto", className)}
    >
      <TabsList className="flex flex-nowrap gap-1 p-1">
        {showAllTab && (
          <TabsTrigger value="all" className="text-xs">
            All
          </TabsTrigger>
        )}
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
