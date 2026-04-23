"use client";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { QuickStressLevelSelectButtons } from "./components/QuickStressLevelSelectButtons";

type StressFormData = {
  date: Date;
  place: string;
  situation: string;
  stressLevel: number;
};

export function StressForm() {
  const { control, handleSubmit, reset } = useForm<StressFormData>({
    defaultValues: {
      date: new Date(),
      place: "",
      situation: "",
      stressLevel: 5,
    },
  });

  const onSubmit: SubmitHandler<StressFormData> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
      className="grid w-full max-w-md gap-6 mx-auto"
    >
      {/* Date */}
      <div className="grid w-full gap-2">
        <Label>Date</Label>
        <div>
          <Controller
            name="date"
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" data-empty={!value}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? format(value, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto mx-2">
                  <Calendar
                    mode="single"
                    selected={value}
                    onSelect={(date) => onChange(date ?? new Date())}
                    {...field}
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </div>
      </div>

      {/* Place */}
      <div className="grid w-full gap-2">
        <Label htmlFor="place">Where are you?</Label>
        <Controller
          name="place"
          control={control}
          render={({ field }) => (
            <Input id="place" placeholder="Enter your location" {...field} />
          )}
        />
      </div>

      {/* Situation */}
      <div className="grid w-full gap-2">
        <Label htmlFor="situation">What's going on?</Label>
        <Controller
          name="situation"
          control={control}
          render={({ field }) => (
            <Textarea
              id="situation"
              placeholder="Describe the situation..."
              {...field}
            />
          )}
        />
      </div>

      {/* Stress Level */}
      <div className="grid w-full gap-4">
        <Controller
          name="stressLevel"
          control={control}
          render={({ field: { value, onChange, ...field } }) => (
            <>
              <div className="flex justify-between text-sm">
                <Label htmlFor={field.name}>Stress level</Label>
                <span className="text-muted-foreground">{value}%</span>
              </div>
              <Slider
                id={field.name}
                min={0}
                max={100}
                step={1}
                value={[value]}
                onValueChange={([val]) => onChange(val)}
                {...field}
              />

              {/* Quick select buttons */}
              <QuickStressLevelSelectButtons
                value={value}
                onChange={onChange}
              />
            </>
          )}
        />
      </div>
      <div className="w-full grid gap-1 pt-4">
        <Button type="submit">Submit</Button>
        <Button type="reset" variant="outline">
          Clear
        </Button>
      </div>
    </form>
  );
}
