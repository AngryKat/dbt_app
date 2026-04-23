"use client";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateTimePick } from "./components/DateTimePick";
import { EmotionsPick } from "./components/EmotionsPick";
import { SituationSelect } from "./components/SituationSelect";
import { QuickStressLevelSelectButtons } from "./components/QuickStressLevelSelectButtons";
import { emotions as emotionsData } from "@/data";

const allEmotionsData = Object.values(emotionsData);

type StressFormData = {
  date: Date;
  place: string;
  situation: string;
  otherSituation?: string;
  stressLevel: number;
  emotions: string[];
  thoughts: string;
  otherThoughts?: string;
  behaviour: string;
  bodilyFeelings: string;
};

export function StressForm() {
  const { control, handleSubmit, reset, watch } = useForm<StressFormData>({
    defaultValues: {
      date: new Date(),
      place: "",
      situation: "",
      otherSituation: "",
      stressLevel: 0,
      emotions: [],
      thoughts: "",
      otherThoughts: "",
      behaviour: "",
      bodilyFeelings: "",
    },
  });

  const situation = watch("situation");
  const thoughts = watch("thoughts");

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
          render={({ field }) => <SituationSelect {...field} />}
        />
      </div>

      {/* Other Situation */}
      {situation === "Other" && (
        <div className="grid w-full gap-2">
          <Label htmlFor="otherSituation" className="text-base">
            Please describe the situation
          </Label>
          <Controller
            name="otherSituation"
            control={control}
            render={({ field }) => (
              <Textarea
                id="otherSituation"
                placeholder="Describe what's happening..."
                {...field}
              />
            )}
          />
        </div>
      )}
      {/* Thoughts */}
      <div className="grid w-full gap-2">
        <Label htmlFor="thoughts" className="text-base">
          Thoughts
        </Label>
        <Controller
          name="thoughts"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
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
                {allEmotionsData
                  .flatMap(
                    ({ interpretations }) => interpretations.interpretations,
                  )
                  .map((interpretation) => (
                    <SelectItem key={interpretation} value={interpretation}>
                      {interpretation}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Other Thoughts */}
      {thoughts === "Other" && (
        <div className="grid w-full gap-2">
          <Label htmlFor="otherThoughts" className="text-base">
            Please describe your thoughts
          </Label>
          <Controller
            name="otherThoughts"
            control={control}
            render={({ field }) => (
              <Textarea
                id="otherThoughts"
                placeholder="What thoughts are going through your head?"
                {...field}
              />
            )}
          />
        </div>
      )}

      {/* Emotions */}
      <div className="grid w-full gap-2">
        <Label className="text-base">Emotions</Label>
        <Controller
          name="emotions"
          control={control}
          render={({ field }) => <EmotionsPick {...field} />}
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
      <div className="w-full grid gap-1">
        <Button type="submit">Save</Button>
        <Button type="reset" variant="outline">
          Clear
        </Button>
      </div>
    </form>
  );
}
