"use client";

import { Select } from "@/components/ui/Select";
import { emotions as emotionsData } from "@/data";

const allEmotionsData = Object.values(emotionsData);

type BodilyFeelingsSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export function BodilyFeelingsSelect({
  value,
  onChange,
}: BodilyFeelingsSelectProps) {
  return (
    <Select
      value={value}
      onChange={onChange}
      label="How does your body feel?"
      id="bodilyFeelings"
      items={[
        { value: "Other", label: "Other" },
        ...allEmotionsData.map(({ emotion, biologicalChanges }) => ({
          label: emotion,
          items: biologicalChanges.changes.map((change) => ({
            value: `${emotion}:${change}`,
            label: change,
          })),
        })),
      ]}
    />
  );
}
