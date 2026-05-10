import { Check, ExternalLink } from "lucide-react";

import { Button } from "@/components/shadcn/button";
import { CommandItem } from "@/components/shadcn/command";
import { cn } from "@/lib/utils";
import { EmotionDescriptionPopover } from "../../../../EmotionDescriptionPopover";

type OptionItemProps = {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onSelect: (id: string) => void;
};

export function OptionItem({
  id,
  label,
  checked,
  description,
  onSelect,
}: OptionItemProps) {
  return (
    <CommandItem
      key={id}
      value={id}
      onSelect={onSelect}
      className="flex items-center gap-2 [&>svg:last-child]:hidden"
    >
      <span className="grid grid-cols-[auto_1fr] gap-y-1 gap-x-2 items-center">
        <Check
          className={cn(
            "size-4 shrink-0",
            checked ? "opacity-100" : "opacity-0",
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
    </CommandItem>
  );
}
