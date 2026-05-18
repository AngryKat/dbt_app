import type { ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import { Button } from "@/components/shadcn/button";
import { EmotionDescriptionPopoverContent } from "./components/EmotionDescriptionPopoverContent";
import type { NuancedEmotion } from "@/screens/DistressEntries/features/Emotions/types";
import { X } from "lucide-react";

type OptionalProps = Partial<{
  icon: string;
  children: ReactNode;
  selected: boolean;
  onSelect: (id: NuancedEmotion) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>;

type EmotionDescriptionPopoverProps = {
  id: string;
  label: string;
  trigger: ReactNode;
} & OptionalProps;

export function EmotionDescriptionPopover({
  id,
  label,
  trigger,
  open,
  onOpenChange,
}: EmotionDescriptionPopoverProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <article>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">{label}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => { e.stopPropagation(); onOpenChange?.(false) }}
              className="h-6 w-6 p-0"
              aria-label={`Close ${label} description`}
            >
              <X />
            </Button>
          </div>
          <EmotionDescriptionPopoverContent id={id} />
        </article>
      </PopoverContent>
    </Popover>
  );
}
