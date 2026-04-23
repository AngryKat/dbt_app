"use client";

import { Select } from "@/components/ui/Select";
import { emotions as emotionsData } from "@/data";

const allEmotionsData = Object.values(emotionsData);

type ThoughtsSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ThoughtsSelect({ value, onChange }: ThoughtsSelectProps) {
  return (
    <Select
      id="thoughts"
      value={value}
      onChange={onChange}
      items={[
        { value: "Other", label: "Other" },
        ...allEmotionsData.map(({ emotion, interpretations }) => ({
          label: emotion,
          items: interpretations.interpretations.map((interpretation) => ({
            value: `${emotion}:${interpretation}`,
            label: interpretation,
          })),
        })),
      ]}
      label="What are your thoughts?"
    />
  );
}
