"use client";

import { Select } from "@/components/ui/Select";
import { emotions as emotionsData } from "@/data";

const allEmotionsData = Object.values(emotionsData);

type SituationSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SituationSelect({ value, onChange }: SituationSelectProps) {
  return (
    <Select
      value={value}
      onChange={onChange}
      items={[
        { value: "Other", label: "Other" },
        ...allEmotionsData.map(({ emotion, promptingEvents }) => ({
          label: emotion,
          items: promptingEvents.events.map((event) => ({
            value: `${emotion}:${event}`,
            label: event,
          })),
        })),
      ]}
      label="Select a situation"
      id="situation"
    />
  );
}
