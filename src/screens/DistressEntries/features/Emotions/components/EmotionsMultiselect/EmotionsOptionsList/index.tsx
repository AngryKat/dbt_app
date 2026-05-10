import {
  CommandEmpty,
  CommandGroup,
  CommandList,
} from "@/components/shadcn/command";
import { OptionItem } from "./components/OptionItem";
import type { EmotionsOptions } from "../../../types";

export function EmotionsOptionsList({
  value,
  onChange,
  options,
  commandEmpty = "No emotion found.",
}: {
  value: string[];
  onChange: (value: string[]) => void;
  options: EmotionsOptions | undefined;
  commandEmpty?: React.ReactNode;
}) {
  return (
    <CommandList>
      <CommandEmpty>{commandEmpty}</CommandEmpty>
      {Object.entries(options || []).map(
        ([baseEmotion, { baseEmotionLabel, emotions }]) => (
          <CommandGroup key={baseEmotion} heading={baseEmotionLabel}>
            {emotions.map((emotion) => (
              <OptionItem
                key={emotion.id}
                onSelect={(id) => {
                  if (value.includes(id)) {
                    onChange(value.filter((item) => item !== id));
                  } else {
                    onChange([...value, id]);
                  }
                }}
                checked={value.includes(emotion.id)}
                id={emotion.id}
                label={emotion.label || ""}
                description={emotion.description || ""}
              />
            ))}
          </CommandGroup>
        ),
      )}
    </CommandList>
  );
}
