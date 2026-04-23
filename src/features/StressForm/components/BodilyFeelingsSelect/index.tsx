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

type BodilyFeelingsSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export function BodilyFeelingsSelect({
  value,
  onChange,
}: BodilyFeelingsSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        id="bodilyFeelings"
        className="w-full overflow-hidden [&>[data-slot=select-value]]:truncate [&>[data-slot=select-value]]:block"
      >
        <span className="truncate block text-left flex-1 min-w-0">
          <SelectValue placeholder="What do you feel in your body?" />
        </span>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Other">Other</SelectItem>
        {allEmotionsData.map(({ emotion, biologicalChanges }, index) => {
          const key = `${emotion}-${index}`;
          return (
            <SelectGroup key={key}>
              <SelectLabel className="capitalize">{emotion}</SelectLabel>
              {biologicalChanges.changes.map((change, index) => {
                const itemKey = `${emotion}-${change}-${index}`;
                return (
                  <SelectItem key={itemKey} value={`${emotion}:${change}`}>
                    {change}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          );
        })}
      </SelectContent>
    </Select>
  );
}
