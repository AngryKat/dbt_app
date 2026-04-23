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

type BehaviourSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export function BehaviourSelect({ value, onChange }: BehaviourSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        id="behaviour"
        className="w-full overflow-hidden [&>[data-slot=select-value]]:truncate [&>[data-slot=select-value]]:block"
      >
        <span className="truncate block text-left flex-1 min-w-0">
          <SelectValue placeholder="What are you doing or how are you acting?" />
        </span>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Other">Other</SelectItem>
        {allEmotionsData.map(({ emotion, expressionsAndActions }, index) => {
          const key = `${emotion}-${index}`;
          return (
            <SelectGroup key={key}>
              <SelectLabel className="capitalize">{emotion}</SelectLabel>
              {expressionsAndActions.behaviors.map((behavior, index) => {
                const itemKey = `${emotion}-${behavior}-${index}`;
                return (
                  <SelectItem key={itemKey} value={`${emotion}:${behavior}`}>
                    {behavior}
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
