"use client";

import { Select } from "@/components/ui/Select";
import { emotions as emotionsData } from "@/data";

const allEmotionsData = Object.values(emotionsData);

type BehaviorSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export function BehaviorSelect({ value, onChange }: BehaviorSelectProps) {
  return (
    <Select
      id="behavior"
      value={value}
      onChange={onChange}
      items={[
        { value: "Other", label: "Other" },
        ...allEmotionsData.map(({ emotion, expressionsAndActions }) => ({
          label: emotion,
          items: expressionsAndActions.behaviors.map((behavior) => ({
            value: `${emotion}:${behavior}`,
            label: behavior,
          })),
        })),
      ]}
      label="What are you doing or how are you acting?"
    />
  );
}
