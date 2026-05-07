import * as React from "react";
import { X } from "lucide-react";

import { Command, CommandInput } from "@/components/shadcn/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import { EmotionsMultiselectTrigger } from "./EmotionsMultiselectTrigger";
import { EmotionsOptionsList } from "./EmotionsOptionsList";

export function EmotionsMultiselect() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string[]>([]);
  const onClearButtonClick = (v: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setValue((prev) => prev.filter((item) => item !== v));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <EmotionsMultiselectTrigger
          open={open}
          value={value}
          clearButton={(v) => (
            <span
              role="button"
              aria-label={`Remove ${v}`}
              onClick={onClearButtonClick(v)}
              className="cursor-pointer opacity-60 hover:opacity-100"
            >
              <X className="size-3" />
            </span>
          )}
        />
      </PopoverTrigger>
      <PopoverContent
        className="p-0 min-w-[clamp(12.5rem,2.484rem+40.064vw,28.125rem)]"
        align="start"
        side="bottom"
      >
        <Command>
          <CommandInput placeholder="Search emotions..." />
          <EmotionsOptionsList
            value={value}
            onChange={(value) => {
              setValue(value);
              setOpen(false);
            }}
          />
          {/* <CommandList>
            <CommandEmpty>No emotion found.</CommandEmpty>
            {allNuancedEmotions.map(([baseEmotion, nuancedEmotions]) => (
              <CommandGroup key={baseEmotion} heading={baseEmotion}>
                {nuancedEmotions.map((emotion) => (
                  <CommandItem
                    key={emotion.id}
                    value={emotion.label}
                    onSelect={(currentValue) =>
                      setValue((prev) =>
                        prev.includes(currentValue)
                          ? prev.filter((v) => v !== currentValue)
                          : [...prev, currentValue],
                      )
                    }
                    className="flex items-center gap-2 [&>svg:last-child]:hidden"
                  >
                    <span className="grid grid-cols-[auto_1fr] gap-2 items-center">
                      <Check
                        className={cn(
                          "size-4 shrink-0",
                          value.includes(emotion.label)
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      <span className="font-semibold">{emotion.label}</span>
                      <span className="col-start-2">{emotion.description}</span>
                    </span>
                    <EmotionDescriptionPopover
                      {...emotion}
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
                ))}
              </CommandGroup>
            ))}
          </CommandList> */}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
