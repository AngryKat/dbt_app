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
  ref?: React.Ref<HTMLLIElement>;
};

export function OptionItem({ id, label, ref, description, isDetailOpen, onDetailOpenChange }: OptionItemProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <li
      ref={ref}
      className="group grid"
      style={{
        gridTemplateColumns: "minmax(0, 1fr) auto",
      }}
    >
      <span className="font-semibold block">{label}</span>

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
                className="size-6 shrink-0"
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
      <span className="block">{description}</span>

    </li>
  );
}
