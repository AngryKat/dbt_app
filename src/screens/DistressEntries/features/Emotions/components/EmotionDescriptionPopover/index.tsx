import type { ReactNode } from "react";
import type { NuancedEmotion } from "../../types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import { useNuancedEmotionDetails } from "../../hooks/useNuancedEmotionDetails";
import { Alert } from "@/components/ui/Alert";
import { EmotionDescriptionPopoverContent } from "./components/EmotionDescriptionPopoverContent";
import { Loader } from "@/components/ui/Loader";

type OptionalProps = Partial<{
  icon: string;
  children: ReactNode;
  selected: boolean;
  onSelect: (id: NuancedEmotion) => void;
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
}: EmotionDescriptionPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent>
        <article>
          <h3 className="text-lg font-semibold mb-2">{label}</h3>
          <EmotionDescriptionPopoverContent id={id} />
        </article>
      </PopoverContent>
    </Popover>
  );
}
