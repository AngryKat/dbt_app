"use client";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { DateTimePick } from "./components/DateTimePick";
import { QuickStressLevelSelectButtons } from "./components/QuickStressLevelSelectButtons";

type StressFormData = {
  date: Date;
  place: string;
  situation: string;
  stressLevel: number;
  thoughts: string;
  behaviour: string;
  bodilyFeelings: string;
};

export function StressForm() {
  const { control, handleSubmit, reset } = useForm<StressFormData>({
    defaultValues: {
      date: new Date(),
      place: "",
      situation: "",
      stressLevel: 0,
      thoughts: "",
      behaviour: "",
      bodilyFeelings: "",
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
      {/* Date & Time */}
      <div className="grid w-full gap-2">
        <Label className="text-base">Date & Time</Label>
        <Controller
          name="date"
          control={control}
          render={({ field }) => <DateTimePick {...field} />}
        />
      </div>

      {/* Place */}
      <div className="grid w-full gap-2">
        <Label htmlFor="place" className="text-base">
          Where are you?
        </Label>
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
        <Label htmlFor="situation" className="text-base">
          What's going on?
        </Label>
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
      <div className="grid w-full gap-2">
        <Controller
          name="stressLevel"
          control={control}
          render={({ field: { value, onChange, ...field } }) => (
            <>
              <div className="flex justify-between text-sm">
                <Label htmlFor={field.name} className="text-base">
                  Stress level
                </Label>
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
      {/* Thoughts */}
      <div className="grid w-full gap-2">
        <Label htmlFor="thoughts" className="text-base">
          Thoughts
        </Label>
        <Controller
          name="thoughts"
          control={control}
          render={({ field }) => (
            <Textarea
              id="thoughts"
              placeholder="What thoughts are going through your head?"
              {...field}
            />
          )}
        />
      </div>

      {/* Bodily Feelings */}
      <div className="grid w-full gap-2">
        <Label htmlFor="bodilyFeelings" className="text-base">
          Bodily Feelings
        </Label>
        <Controller
          name="bodilyFeelings"
          control={control}
          render={({ field }) => (
            <Textarea
              id="bodilyFeelings"
              placeholder="What do you feel in your body?"
              {...field}
            />
          )}
        />
      </div>

      {/* Behaviour */}
      <div className="grid w-full gap-2">
        <Label htmlFor="behaviour" className="text-base">
          Behaviour
        </Label>
        <Controller
          name="behaviour"
          control={control}
          render={({ field }) => (
            <Textarea
              id="behaviour"
              placeholder="How are you acting or what are you doing?"
              {...field}
            />
          )}
        />
      </div>
      <div className="w-full grid gap-1 pt-4">
        <Button type="submit">Save</Button>
        <Button type="reset" variant="outline">
          Clear
        </Button>
      </div>
    </form>
  );
}
