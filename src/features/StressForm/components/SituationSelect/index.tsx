"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { emotions as emotionsData } from "@/data";

const allEmotionsData = Object.values(emotionsData);

type SituationSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SituationSelect({ value, onChange }: SituationSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        id="situation"
        className="w-full overflow-hidden [&>[data-slot=select-value]]:truncate [&>[data-slot=select-value]]:block"
      >
        <SelectValue placeholder="Select a situation" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Other">Other</SelectItem>
        {allEmotionsData.map(({ emotion, promptingEvents }) => (
          <SelectGroup key={emotion}>
            <SelectLabel className="capitalize">{emotion}</SelectLabel>
            {promptingEvents.events.map((event) => (
              <SelectItem key={event} value={event}>
                {event}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
