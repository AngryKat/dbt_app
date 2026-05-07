import { Check, ExternalLink } from "lucide-react";

import { Button } from "@/components/shadcn/button";
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/shadcn/command";
import { cn } from "@/lib/utils";
import { EmotionDescriptionPopover } from "../../EmotionDescriptionPopover";
import { useEmotionsOptions } from "../../../hooks/useEmotionsOptions";
import { Spinner } from "@/components/shadcn/spinner";
import { Loader } from "@/components/ui/Loader";

export function EmotionsOptionsList({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const { data, isLoading, isError } = useEmotionsOptions();
  return (
    <CommandList>
      <CommandEmpty>
        {isError ? (
          "Error while getting options"
        ) : isLoading ? (
          <Loader label="Loading emotions list" />
        ) : (
          "No emotion found."
        )}
      </CommandEmpty>
      {Object.entries(data || []).map(
        ([baseEmotion, { baseEmotionLabel, emotions }]) => (
          <CommandGroup key={baseEmotion} heading={baseEmotionLabel}>
            {emotions.map((emotion) => (
              <CommandItem
                key={emotion.id}
                value={emotion.id}
                onSelect={() => {}}
                className="flex items-center gap-2 [&>svg:last-child]:hidden"
              >
                <span className="grid grid-cols-[auto_1fr] gap-y-1 gap-x-2 items-center">
                  <Check
                    className={cn(
                      "size-4 shrink-0",
                      value.includes(emotion.id) ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <span className="font-semibold">{emotion.label}</span>
                  <span className="col-start-2">{emotion.description}</span>
                </span>
                <EmotionDescriptionPopover
                  id={emotion.id}
                  label={emotion.label || ""}
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
        ),
      )}
    </CommandList>
  );
}
