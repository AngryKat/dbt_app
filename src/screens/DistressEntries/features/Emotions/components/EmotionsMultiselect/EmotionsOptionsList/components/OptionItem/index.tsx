import { Check, ExternalLink } from "lucide-react";

import { Button } from "@/components/shadcn/button";
import { ComboboxItem } from "@/components/shadcn/combobox";
import { cn } from "@/lib/utils";
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
      hideIndicator
      className="group flex items-center gap-2"
    >
      <span className="grid grid-cols-[auto_1fr] gap-y-1 gap-x-2 items-center">
        <Check
          className={cn(
            "size-4 shrink-0 opacity-0 group-data-[checked=true]:opacity-100",
          )}
        />
        <span className="font-semibold">{label}</span>
        <span className="col-start-2">{description}</span>
      </span>
      <EmotionDescriptionPopover
        id={id}
        label={label || ""}
        trigger={
          <Button
            className="size-6 shrink-0 ml-auto"
            size="icon"
            variant="ghost"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="size-4" />
          </Button>
        }
      />
    </ComboboxItem>
  );
}
