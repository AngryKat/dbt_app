"use client";

import * as React from "react";
import { XIcon } from "lucide-react";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
  ComboboxGroup,
  ComboboxLabel,
} from "@/components/ui/combobox";
import angerData from "@/data/anger.json";

interface Emotion {
  id: string;
  label: string;
  category: string;
}

// Create emotions data from anger.json words
const EMOTIONS_DATA: Emotion[] = angerData.words.map((word) => ({
  id: word.toLowerCase(),
  label: word.charAt(0).toUpperCase() + word.slice(1),
  category: "Anger",
}));

const CATEGORIES = ["Anger"];

const getEmotionLabel = (id: string) => {
  return EMOTIONS_DATA.find((e) => e.id === id)?.label || id;
};

type EmotionsPickProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

export function EmotionsPick({ value, onChange }: EmotionsPickProps) {
  const anchor = useComboboxAnchor();
  const [internalValue, setInternalValue] = React.useState(value);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleValueChange = (newValue: string[]) => {
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  // Flexible search with multiple strategies
  const matchesSearch = (emotion: Emotion, searchTerm: string): boolean => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;

    const label = emotion.label.toLowerCase();
    const category = emotion.category.toLowerCase();
    const searchText = `${label} ${category}`;

    // Split search term by spaces to support multiple keywords
    const keywords = term.split(/\s+/).filter(Boolean);

    // Strategy 1: Substring match (e.g., "py" matches "happy")
    if (keywords.some((kw) => label.includes(kw) || category.includes(kw))) {
      return true;
    }

    // Strategy 2: Start of word match (e.g., "ha" matches "happy")
    if (
      keywords.some((kw) =>
        searchText.split(/\s+/).some((word) => word.startsWith(kw)),
      )
    ) {
      return true;
    }

    // Strategy 3: Fuzzy match - all characters in order (e.g., "hpy" matches "happy")
    const fuzzyMatch = (text: string, pattern: string): boolean => {
      let patternIdx = 0;
      for (let i = 0; i < text.length && patternIdx < pattern.length; i++) {
        if (text[i] === pattern[patternIdx]) {
          patternIdx++;
        }
      }
      return patternIdx === pattern.length;
    };

    if (keywords.some((kw) => fuzzyMatch(searchText, kw))) {
      return true;
    }

    return false;
  };

  // Filter emotions based on search term
  const filteredEmotions = React.useMemo(() => {
    return EMOTIONS_DATA.filter((emotion) =>
      matchesSearch(emotion, searchTerm),
    );
  }, [searchTerm]);

  const filteredEmotionIds = filteredEmotions.map((e) => e.id);

  return (
    <Combobox
      multiple
      autoHighlight
      items={filteredEmotionIds}
      value={internalValue}
      onValueChange={handleValueChange}
      onInputValueChange={setSearchTerm}
    >
      <ComboboxChips ref={anchor} className="relative w-full">
        <ComboboxValue>
          {(values) => (
            <React.Fragment>
              {values.length > 0 && (
                <button
                  onClick={() => handleValueChange([])}
                  aria-label="Clear all emotions"
                  className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <XIcon className="size-4" />
                </button>
              )}
              {values.map((value: string) => (
                <ComboboxChip key={value} className="bg-red-200 text-red-900">
                  {getEmotionLabel(value)}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder="Search emotions..." />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No emotions found.</ComboboxEmpty>
        <ComboboxList>
          {CATEGORIES.map((category) => {
            const categoryEmotions = filteredEmotions.filter(
              (e) => e.category === category,
            );
            if (categoryEmotions.length === 0) return null;
            return (
              <ComboboxGroup key={category}>
                <ComboboxLabel>{category}</ComboboxLabel>
                {categoryEmotions.map((emotion) => (
                  <ComboboxItem key={emotion.id} value={emotion.id}>
                    {emotion.label}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
            );
          })}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
