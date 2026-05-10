import { ChevronsUpDown, X } from "lucide-react";

import { Button } from "@/components/shadcn/button";
import type { EmotionsOptions } from "../../../types";
import React from "react";

type EmotionsMultiselectTriggerProps = {
  open: boolean;
  value: string[];
  options: EmotionsOptions | undefined;
  onClear: (e: React.MouseEvent, id: string) => void;
} & React.ComponentPropsWithoutRef<typeof Button>;

export function EmotionsMultiselectTrigger({
  value,
  onClear,
  options,
  ...props
}: EmotionsMultiselectTriggerProps) {
  const selectedOptions = React.useMemo(() => {
    const allEmotions = Object.values(options || {}).flatMap(
      ({ emotions }) => emotions,
    );
    return value
      .map((selectedValue) =>
        allEmotions.find((emotion) => emotion.id === selectedValue),
      )
      .filter(
        (emotion): emotion is NonNullable<typeof emotion> =>
          emotion !== null && emotion !== undefined,
      );
  }, [value, options]);

  return (
    <Button
      {...props}
      variant="outline"
      className="h-auto w-full justify-between pl-3 pr-2 py-1.5 hover:bg-transparent hover:text-current hover:opacity-100 data-[state=open]:bg-transparent data-[state=open]:text-current data-[state=open]:opacity-80"
    >
      <span className="flex flex-wrap gap-1">
        {selectedOptions.length === 0 ? (
          <span className="text-muted-foreground font-normal">
            Select emotions...
          </span>
        ) : (
          selectedOptions.map((selectedOption) => (
            <span
              key={selectedOption.id}
              className="inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium"
            >
              {selectedOption.label}
              <span
                role="button"
                aria-label={`Remove ${selectedOption.label}`}
                onClick={(e) => onClear(e, selectedOption.id)}
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
  );
}
