import type { ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import { EmotionDescriptionPopoverContent } from "./components/EmotionDescriptionPopoverContent";
import type { NuancedEmotion } from "../../../../types";

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
          <h3 className="text-lg font-semibold mb-2">{label}</h3>
          <EmotionDescriptionPopoverContent id={id} />
        </article>
      </PopoverContent>
    </Popover>
  );
}
