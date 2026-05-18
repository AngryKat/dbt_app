import { ExternalLink } from "lucide-react";

import { Button } from "@/components/shadcn/button";
import { ComboboxItem } from "@/components/shadcn/combobox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";
import { EmotionDescriptionPopover } from "../../../../EmotionDescriptionPopover";

type OptionItemProps = {
  id: string;
  label: string;
  description: string;
};

export function OptionItem({ id, label, description }: OptionItemProps) {
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
            trigger={
              <TooltipTrigger asChild>
                <Button
                  className="size-6 shrink-0 ml-auto"
                  size="icon"
                  variant="ghost"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => {
                    if (e.key === " ") e.stopPropagation();
                  }}
                >
                  <ExternalLink className="size-4" />
                </Button>
              </TooltipTrigger>
            }
          />
          <TooltipContent side="top">
            Open details <kbd data-slot="kbd">Space</kbd>
          </TooltipContent>
        </Tooltip>
    </ComboboxItem>
  );
}
