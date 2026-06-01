import { format, getHours, getMinutes, setHours, setMinutes } from 'date-fns';
import { Clock } from 'lucide-react';
import { useState } from 'react';

import { Calendar } from '@/components/shadcn/calendar';
import { Field, FieldGroup, FieldLabel } from '@/components/shadcn/field';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/popover';

type DateTimePickProps = {
  value: Date;
  onChange: (date: Date) => void;
};

export function DateTimePick({ value, onChange }: DateTimePickProps) {
  const [open, setOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [date, setDate] = useState(value);
  const hours = getHours(date);
  const minutes = getMinutes(date);
  const dateDay = format(date, 'd');
  const dateMonth = format(date, 'MMMM');
  const dayName = format(date, 'EEEE');
  const timeFormatted = format(date, 'HH:mm');

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    const dateWithPreservedTime = setMinutes(setHours(selectedDate, hours), minutes);
    setDate(dateWithPreservedTime);
    onChange(dateWithPreservedTime);
  };

  const handleTimeChange = (newHours: number, newMinutes: number) => {
    const newDate = setMinutes(setHours(date, newHours), newMinutes);
    setDate(newDate);
    onChange(newDate);
  };

  return (
    <FieldGroup>
      <Field>
        <FieldLabel className="sr-only">Date & Time</FieldLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <div className="bg-primary rounded-xl p-8 flex flex-col items-center justify-center gap-2 text-primary-foreground">
            <div className="text-xl font-medium opacity-80">{dayName}</div>
            <PopoverTrigger asChild>
              <button className="text-4xl font-bold leading-none cursor-pointer hover:opacity-80 hover:underline underline-offset-2 transition-opacity">
                {dateMonth} {dateDay}
              </button>
            </PopoverTrigger>
            <Popover open={timePickerOpen} onOpenChange={setTimePickerOpen}>
              <PopoverTrigger asChild>
                <button className="mt-3 text-2xl font-bold tracking-tight cursor-pointer hover:opacity-80 hover:underline underline-offset-2 transition-opacity">
                  {timeFormatted}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div className="flex items-center gap-1">
                    <Label className="sr-only" htmlFor="hours-picker">
                      Hours
                    </Label>
                    <Input
                      id="hours-picker"
                      type="number"
                      min="0"
                      max="23"
                      value={String(hours).padStart(2, "0")}
                      onChange={(e) => {
                        handleTimeChange(parseInt(e.target.value) || 0, minutes);
                      }}
                    />
                    <span className="text-sm font-medium">:</span>
                    <Label className="sr-only" htmlFor="minutes-picker">
                      Minutes
                    </Label>
                    <Input
                      type="number"
                      id="minutes-picker"
                      min="0"
                      max="59"
                      value={String(minutes).padStart(2, "0")}
                      onChange={(e) => {
                        handleTimeChange(hours, parseInt(e.target.value) || 0);
                      }}
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <PopoverContent className="w-auto mx-2">
            <Calendar mode="single" selected={date} onSelect={handleDateSelect} />
          </PopoverContent>
        </Popover>
      </Field>
    </FieldGroup>
  );
}
