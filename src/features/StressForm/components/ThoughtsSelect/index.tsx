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

type ThoughtsSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ThoughtsSelect({ value, onChange }: ThoughtsSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        id="thoughts"
        className="w-full overflow-hidden [&>[data-slot=select-value]]:truncate [&>[data-slot=select-value]]:block"
      >
        <span className="truncate block text-left flex-1 min-w-0">
          <SelectValue placeholder="What are your thoughts?" />
        </span>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Other">Other</SelectItem>
        {allEmotionsData.map(({ emotion, interpretations }) => (
          <SelectGroup key={emotion}>
            <SelectLabel className="capitalize">{emotion}</SelectLabel>
            {interpretations.interpretations.map((interpretation) => (
              <SelectItem key={interpretation} value={interpretation}>
                {interpretation}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
