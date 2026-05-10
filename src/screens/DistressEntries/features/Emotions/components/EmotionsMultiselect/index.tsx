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
import { useEmotionsOptions } from "../../hooks/useEmotionsOptions";
import { Loader } from "@/components/ui/Loader";

type EmotionsMultiselectProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

export function EmotionsMultiselect({
  value,
  onChange,
}: EmotionsMultiselectProps) {
  const { data, isLoading, isError } = useEmotionsOptions();

  const [open, setOpen] = React.useState(false);
  const onClearButtonClick = (v: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((item) => item !== v));
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
          options={data}
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
            onChange={onChange}
            options={data}
            commandEmpty={
              isError ? (
                "Error while getting options"
              ) : isLoading ? (
                <Loader label="Loading emotions list" />
              ) : (
                "No emotion found."
              )
            }
          />
        </Command>
      </PopoverContent>
    </Popover>
  );
}
