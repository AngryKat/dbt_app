import {
  format,
  getHours,
  getMinutes,
  setHours,
  setMinutes,
  getYear,
} from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DateTimePickProps = {
  value: Date;
  onChange: (date: Date) => void;
};

export function DateTimePick({ value, onChange }: DateTimePickProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(value);
  console.log({ value });
  const hours = getHours(date);
  const minutes = getMinutes(date);
  const formattedDate = value ? (
    format(
      value,
      getYear(value) === getYear(new Date())
        ? "MMMM d, HH:mm"
        : "MMMM d, yyyy HH:mm",
    )
  ) : (
    <span>Pick a date</span>
  );

  console.log("DateTimePick rendered with value:", value);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    const dateWithPreservedTime = setMinutes(
      setHours(selectedDate, hours),
      minutes,
    );
    setDate(dateWithPreservedTime);
  };

  const handleTimeChange = (newHours: number, newMinutes: number) => {
    const newDate = setMinutes(setHours(date, newHours), newMinutes);
    setDate(newDate);
  };

  const handleSelectTime = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onChange(date);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" data-empty={!value}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formattedDate}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto mx-2">
        <form onSubmit={handleSelectTime} className="space-y-4">
          <Calendar mode="single" selected={date} onSelect={handleDateSelect} />

          <div className="flex items-center gap-2 pt-2 border-t">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-1">
              <Label className="sr-only" htmlFor="hours">
                Hours
              </Label>
              <Input
                id="hours"
                type="number"
                min="0"
                max="23"
                value={String(hours).padStart(2, "0")}
                onChange={(e) => {
                  handleTimeChange(parseInt(e.target.value), minutes);
                }}
              />
              <span className="text-sm font-medium">:</span>
              <Label className="sr-only" htmlFor="minutes">
                Minutes
              </Label>
              <Input
                type="number"
                id="minutes"
                min="0"
                max="59"
                value={String(minutes).padStart(2, "0")}
                onChange={(e) => {
                  handleTimeChange(hours, parseInt(e.target.value));
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Button size="sm" type="submit">
              Select time
            </Button>
            <Button size="sm" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
