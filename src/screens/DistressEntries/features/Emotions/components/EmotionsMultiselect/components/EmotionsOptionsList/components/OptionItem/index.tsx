import * as React from "react";
import { ExternalLink } from "lucide-react";

import { Button } from "@/components/shadcn/button";
import { ComboboxItem } from "@/components/shadcn/combobox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";
import { EmotionDescriptionPopover } from "../../../EmotionDescriptionPopover";

type OptionItemProps = {
  id: string;
  label: string;
  description: string;
  isDetailOpen?: boolean;
  onDetailOpenChange?: (open: boolean) => void;
};

export function OptionItem({ id, label, description, isDetailOpen, onDetailOpenChange }: OptionItemProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <ComboboxItem
      value={id}
      indicatorPlacement="start"
      className="group flex items-center gap-2"
    >
      <span className="flex flex-col">
        <span className="font-semibold">{label}</span>
        <span>{description}</span>
      </span>
      <Tooltip>
        <EmotionDescriptionPopover
          id={id}
          label={label || ""}
          open={isDetailOpen}
          onOpenChange={onDetailOpenChange}
          trigger={(
            <TooltipTrigger asChild>
              <Button
                ref={buttonRef}
                className="size-6 shrink-0 ml-auto"
                size="icon"
                variant="ghost"
                aria-label={`Open details for ${label}`}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="size-4" />
              </Button>
            </TooltipTrigger>
          )}
        />
        <TooltipContent side="top">
          Open details (<kbd data-slot="kbd">⌘ Enter</kbd>)
        </TooltipContent>
      </Tooltip>
    </ComboboxItem>
  );
}
