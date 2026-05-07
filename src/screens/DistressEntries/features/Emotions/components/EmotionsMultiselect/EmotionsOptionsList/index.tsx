import {
  CommandEmpty,
  CommandGroup,
  CommandList,
} from "@/components/shadcn/command";
import { useEmotionsOptions } from "../../../hooks/useEmotionsOptions";
import { Loader } from "@/components/ui/Loader";
import { OptionItem } from "./components/OptionItem";

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
              <OptionItem
                checked={false}
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
