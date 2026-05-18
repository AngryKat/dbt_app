"use client";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";

import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import { Label } from "@/components/shadcn/label";
import {
  DateTimePick,
  StressLevelSelect,
  SituationSelect,
  ThoughtsSelect,
  BodilyFeelingsSelect,
  BehaviorSelect,
} from "./components";
import { EmotionsMultiselect } from "../Emotions/components/EmotionsMultiselect";

type DistressEntryFormData = {
  date: Date;
  place: string;
  situation: string;
  otherSituation?: string;
  stressLevel: number;
  emotions: string[];
  thoughts: string;
  otherThoughts?: string;
  behavior: string;
  otherBehavior?: string;
  bodilyFeelings: string;
  otherBodilyFeelings?: string;
  notes: string;
};

export function DistressEntryForm() {
  const { control, handleSubmit, reset, watch } =
    useForm<DistressEntryFormData>({
      defaultValues: {
        date: new Date(),
        place: "",
        situation: "",
        stressLevel: 0,
        emotions: [] as string[],
        thoughts: "",
        behavior: "",
        bodilyFeelings: "",
        otherBodilyFeelings: "",
        notes: "",
      },
    });

  const situation = watch("situation");
  const thoughts = watch("thoughts");
  const behavior = watch("behavior");
  const bodilyFeelings = watch("bodilyFeelings");

  const onSubmit: SubmitHandler<DistressEntryFormData> = (data) => {
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
      {/* Stress Level */}
      <div className="grid w-full gap-2">
        <Controller
          name="stressLevel"
          control={control}
          render={({ field: { value, onChange, name } }) => (
            <StressLevelSelect name={name} value={value} onChange={onChange} />
          )}
        />
      </div>
      {/* Emotions */}
      <div className="grid w-full gap-2">
        <Label htmlFor="emotions" className="text-base">
          What are your emotions?
        </Label>
        <Controller
          name="emotions"
          control={control}
          render={({ field: { value, onChange } }) => (
            <EmotionsMultiselect
              value={value}
              onChange={onChange}
              id="emotions"
            />
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
          render={({ field }) => <ThoughtsSelect {...field} />}
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

      {/* Bodily Feelings */}
      <div className="grid w-full gap-2">
        <Label className="text-base">Bodily Feelings</Label>
        <Controller
          name="bodilyFeelings"
          control={control}
          render={({ field }) => <BodilyFeelingsSelect {...field} />}
        />
      </div>

      {/* Other Bodily Feelings */}
      {bodilyFeelings === "Other" && (
        <div className="grid w-full gap-2">
          <Label htmlFor="otherBodilyFeelings" className="text-base">
            Please describe what you feel in your body
          </Label>
          <Controller
            name="otherBodilyFeelings"
            control={control}
            render={({ field }) => (
              <Textarea
                id="otherBodilyFeelings"
                placeholder="What do you feel in your body?"
                {...field}
              />
            )}
          />
        </div>
      )}

      {/* Behavior */}
      <div className="grid w-full gap-2">
        <Label className="text-base">Behavior</Label>
        <Controller
          name="behavior"
          control={control}
          render={({ field }) => <BehaviorSelect {...field} />}
        />
      </div>

      {/* Other Behavior */}
      {behavior === "Other" && (
        <div className="grid w-full gap-2">
          <Label htmlFor="otherBehavior" className="text-base">
            Please describe your behavior
          </Label>
          <Controller
            name="behavior"
            control={control}
            render={({ field }) => (
              <Textarea
                id="otherBehavior"
                placeholder="How are you acting or what are you doing?"
                {...field}
              />
            )}
          />
        </div>
      )}

      {/* Notes */}
      <div className="grid w-full gap-2">
        <Label htmlFor="notes" className="text-base">
          Notes
        </Label>
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <Textarea
              id="notes"
              placeholder="Add any additional notes..."
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
