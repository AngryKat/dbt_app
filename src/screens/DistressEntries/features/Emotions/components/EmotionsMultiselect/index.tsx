import * as React from "react";
import { Check, ChevronsUpDown, ExternalLink, X } from "lucide-react";

import { Button } from "@/components/shadcn/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcn/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import { cn } from "@/lib/utils";
import { emotions } from "@/data";

export function EmotionsMultiselect() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string[]>([]);

  const emotionGroups = React.useMemo(
    () =>
      emotions.map((group) => ({
        emotion: group.emotion,
        words: group.words,
      })),
    [],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-auto min-h-9 w-full justify-between pl-3 pr-2 py-1.5"
        >
          <span className="flex flex-wrap gap-1">
            {value.length === 0 ? (
              <span className="text-muted-foreground font-normal">
                Select emotions...
              </span>
            ) : (
              value.map((v) => (
                <span
                  key={v}
                  className="inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium"
                >
                  {v}
                  <span
                    role="button"
                    aria-label={`Remove ${v}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setValue((prev) => prev.filter((item) => item !== v));
                    }}
                    className="cursor-pointer opacity-60 hover:opacity-100"
                  >
                    <X className="size-3" />
                  </span>
                </span>
              ))
            )}
          </span>
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Search emotions..." />
          <CommandList>
            <CommandEmpty>No emotion found.</CommandEmpty>
            {emotionGroups.map((group) => (
              <CommandGroup key={group.emotion} heading={group.emotion}>
                {group.words.map((word) => (
                  <CommandItem
                    key={word}
                    value={word}
                    onSelect={(currentValue) =>
                      setValue((prev) =>
                        prev.includes(currentValue)
                          ? prev.filter((v) => v !== currentValue)
                          : [...prev, currentValue],
                      )
                    }
                    className="flex items-center gap-2 [&>svg:last-child]:hidden"
                  >
                    <span className="flex items-center gap-2">
                      <Check
                        className={cn(
                          "size-4 shrink-0",
                          value.includes(word) ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {word}
                    </span>
                    <Button
                      className="size-6 shrink-0 ml-auto"
                      size="icon"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("action:", word);
                      }}
                    >
                      <ExternalLink className="size-4" />
                    </Button>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
