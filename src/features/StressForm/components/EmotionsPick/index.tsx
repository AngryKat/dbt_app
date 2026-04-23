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
import { emotions as emotionsData } from "@/data";

interface Emotion {
  id: string;
  label: string;
  category: string;
}

// Create emotions data from all emotion categories
const emotionCategoryMap: Record<string, string> = {
  anger: "Anger",
  disgust: "Disgust",
  envy: "Envy",
  fear: "Fear",
  guilt: "Guilt",
  happiness: "Happiness",
  jealousy: "Jealousy",
  love: "Love",
  sadness: "Sadness",
  shame: "Shame",
};

const EMOTIONS_DATA: Emotion[] = Object.values(emotionsData).flatMap(
  (emotionData, index) => {
    const categoryKey = Object.keys(emotionCategoryMap)[index];
    const category = emotionCategoryMap[categoryKey];
    return emotionData.words.map((word) => ({
      id: `${categoryKey}-${word.toLowerCase()}`,
      label: word.charAt(0).toUpperCase() + word.slice(1),
      category,
    }));
  },
);

const CATEGORIES = Object.values(emotionCategoryMap);

// Color map for emotions - maps category name to bg and text classes
const EMOTION_COLOR_MAP: Record<string, { bg: string; text: string }> = {
  Anger: { bg: "bg-red-100", text: "text-red-800" },
  Disgust: { bg: "bg-green-100", text: "text-green-800" },
  Envy: { bg: "bg-cyan-100", text: "text-cyan-800" },
  Fear: { bg: "bg-purple-100", text: "text-purple-800" },
  Guilt: { bg: "bg-orange-100", text: "text-orange-800" },
  Happiness: { bg: "bg-yellow-100", text: "text-yellow-800" },
  Jealousy: { bg: "bg-pink-100", text: "text-pink-800" },
  Love: { bg: "bg-rose-100", text: "text-rose-800" },
  Sadness: { bg: "bg-blue-100", text: "text-blue-800" },
  Shame: { bg: "bg-slate-100", text: "text-slate-800" },
};

const getEmotionLabel = (id: string) => {
  return EMOTIONS_DATA.find((e) => e.id === id)?.label || id;
};

const getEmotionCategory = (id: string) => {
  return EMOTIONS_DATA.find((e) => e.id === id)?.category || "";
};

type EmotionsPickProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

export function EmotionsPick({ value, onChange }: EmotionsPickProps) {
  const anchor = useComboboxAnchor();
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleValueChange = (newValue: string[]) => {
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
      value={value}
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
              {values.map((value: string) => {
                const category = getEmotionCategory(value);
                const colors = EMOTION_COLOR_MAP[category];
                return (
                  <ComboboxChip
                    key={value}
                    className={`${colors.bg} ${colors.text}`}
                  >
                    {getEmotionLabel(value)}
                  </ComboboxChip>
                );
              })}
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
            const colors = EMOTION_COLOR_MAP[category];
            return (
              <ComboboxGroup key={category}>
                <ComboboxLabel className={`${colors.bg} ${colors.text}`}>
                  {category}
                </ComboboxLabel>
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
