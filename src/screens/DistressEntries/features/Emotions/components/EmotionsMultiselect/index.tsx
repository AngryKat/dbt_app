import * as React from "react";

import {
  Combobox,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/shadcn/combobox";
import { EmotionsOptionsList } from "./components/EmotionsOptionsList";
import { useEmotionsOptions } from "./components/EmotionDescriptionPopover/components/EmotionDescriptionPopoverContent/hooks/useEmotionsOptions";
import { Loader } from "@/components/ui/Loader";

type EmotionsMultiselectProps = {
  value: string[];
  onChange: (value: string[]) => void;
  id?: string;
};

export function EmotionsMultiselect({
  value,
  onChange,
  id,
}: EmotionsMultiselectProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { data, isLoading, isError } = useEmotionsOptions();
  const anchorRef = useComboboxAnchor();
  const highlightedIdRef = React.useRef<string | undefined>(undefined);
  const [openDetailForId, setOpenDetailForId] = React.useState<string | undefined>(undefined);

  const allEmotions = React.useMemo(
    () => Object.values(data || {}).flatMap(({ emotions }) => emotions),
    [data],
  );

  const allEmotionIds = React.useMemo(
    () => allEmotions.map((e) => e.id),
    [allEmotions],
  );

  const filteredEmotions = React.useMemo(() => {
    if (!searchQuery.trim()) return data;

    const query = searchQuery.toLowerCase();
    const filtered: typeof data = {} as typeof data;

    Object.entries(data || {}).forEach(([key, group]) => {
      const matchedEmotions = group.emotions.filter((emotion) =>
        emotion.label?.toLowerCase().includes(query)
      );

      if (matchedEmotions.length > 0) {
        filtered[key] = {
          ...group,
          emotions: matchedEmotions,
        };
      }
    });

    return Object.keys(filtered).length > 0 ? filtered : undefined;
  }, [data, searchQuery]);

  return (
    <Combobox
      multiple
      autoHighlight
      items={allEmotionIds}
      value={value}
      onValueChange={onChange}
      onItemHighlighted={(itemValue) => {
        highlightedIdRef.current = itemValue as string | undefined;
      }}
    >
      <ComboboxChips ref={anchorRef} className="w-full">
        <ComboboxValue>
          {(values: string[]) => (
            <React.Fragment>
              {values.map((id) => (
                <ComboboxChip key={id}>
                  {allEmotions.find((e) => e.id === id)?.label ?? id}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput
                id={id}
                placeholder="Search emotions"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    if (highlightedIdRef.current) {
                      setOpenDetailForId(openDetailForId === highlightedIdRef.current ? undefined : highlightedIdRef.current);
                    }
                  }
                }}
              />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent
        anchor={anchorRef}
        align="start"
        side="bottom"
        className="min-w-[clamp(12.5rem,2.484rem+40.064vw,28.125rem)]"
      >
        <EmotionsOptionsList
          options={filteredEmotions}
          openDetailForId={openDetailForId}
          onDetailOpenChange={setOpenDetailForId}
          commandEmpty={
            isError ? (
              "Error while getting options"
            ) : isLoading ? (
              <Loader label="Loading emotions list" />
            ) : searchQuery.trim() && !filteredEmotions ? (
              "No emotions match your search."
            ) : (
              "No emotion found."
            )
          }
        />
      </ComboboxContent>
    </Combobox>
  );
}
