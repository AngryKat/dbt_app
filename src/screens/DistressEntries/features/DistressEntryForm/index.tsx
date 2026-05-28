"use client";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";

import { Button } from "@/components/shadcn/button";
import { Textarea } from "@/components/shadcn/textarea";
import { Label } from "@/components/shadcn/label";
import {
  DateTimePick,
  StressLevelSelect,
} from "./components";
import { BiologicalChangesMultiselect } from "../BiologicalChanges/components/BiologicalChangesMultiselect";
import { EmotionsMultiselect } from "../Emotions/components/EmotionsMultiselect";
import { PromptingEventsMultiselect } from "../PromptingEvents/components/PromptingEventsMultiselect";
import { InterpretationsMultiselect } from "../Interpretations/components/InterpretationsMultiselect";
import { ReactionsMultiselect } from "../Reactions/components/ReactionsMultiselect";

type DistressEntryFormData = {
  date: Date;
  promptingEvents: string[];
  interpretations: string[];
  stressLevel: number;
  emotions: string[];
  behavior: string;
  biologicalChanges: string[];
  reactions: string[];
  notes: string;
};

export function DistressEntryForm() {
  const { control, handleSubmit, reset } =
    useForm<DistressEntryFormData>({
      defaultValues: {
        date: new Date(),
        promptingEvents: [],
        interpretations: [],
        stressLevel: 0,
        emotions: [],
        behavior: "",
        biologicalChanges: [],
        reactions: [],
        notes: "",
      } as DistressEntryFormData,
    });

  const onSubmit: SubmitHandler<DistressEntryFormData> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
      className="grid w-full max-w-[45ch] gap-6 mx-auto"
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
          Emotions
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
        <Label htmlFor="promptingEvents" className="text-base">
          Promtping events
        </Label>
        <Controller
          name="promptingEvents"
          control={control}
          render={({ field: { value, onChange } }) => (
            <PromptingEventsMultiselect
              value={value}
              onChange={onChange}
              id="promptingEvents"
            />
          )}
        />
      </div>
      {/* Thoughts */}
      <div className="grid w-full gap-2">
        <Label htmlFor="interpretations" className="text-base">
          Interpretations
        </Label>
        <Controller
          name="interpretations"
          control={control}
          render={({ field: { value, onChange } }) => (
            <InterpretationsMultiselect
              value={value}
              onChange={onChange}
              id="interpretations"
            />
          )}
        />
      </div>
      {/* Bodily Feelings */}
      <div className="grid w-full gap-2">
        <Label htmlFor="biologicalChanges" className="text-base">Biological changes</Label>
        <Controller
          name="biologicalChanges"
          control={control}
          render={({ field: { value, onChange } }) => (
            <BiologicalChangesMultiselect
              value={value}
              onChange={onChange}
              id="biologicalChanges"
            />
          )}
        />
      </div>
      {/* Reactions */}
      <div className="grid w-full gap-2">
        <Label htmlFor="reactions" className="text-base">Reactions</Label>
        <Controller
          name="reactions"
          control={control}
          render={({ field: { value, onChange } }) => (
            <ReactionsMultiselect
              value={value}
              onChange={onChange}
              id="reactions"
            />
          )}
        />
      </div>
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
