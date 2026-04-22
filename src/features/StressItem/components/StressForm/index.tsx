import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
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

type StressFormData = {
  date: Date;
  place: string;
  situation: string;
  stressLevel: number;
};

export function StressForm() {
  const { control, handleSubmit } = useForm<StressFormData>({
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Date */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Date</label>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!field.value}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => field.onChange(date ?? new Date())}
                />
              </PopoverContent>
            </Popover>
          )}
        />
      </div>

      {/* Place */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="place" className="text-sm font-medium">
          Where are you?
        </label>
        <Controller
          name="place"
          control={control}
          render={({ field }) => (
            <Input id="place" placeholder="Enter your location" {...field} />
          )}
        />
      </div>

      {/* Situation */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="situation" className="text-sm font-medium">
          What's going on?
        </label>
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
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium">Stress level</label>
        <Controller
          name="stressLevel"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-1.5">
              <Slider
                min={0}
                max={10}
                step={1}
                value={[field.value]}
                onValueChange={([val]) => field.onChange(val)}
              />
              <span className="text-sm text-muted-foreground text-right">
                {field.value} / 10
              </span>
            </div>
          )}
        />
      </div>

      <Button type="submit" className="mt-2">
        Submit
      </Button>
    </form>
  );
}
