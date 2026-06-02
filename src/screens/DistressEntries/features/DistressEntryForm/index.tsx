"use client";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";

import { Button } from "@/components/shadcn/button";
import { Textarea } from "@/components/shadcn/textarea";
import { Label } from "@/components/shadcn/label";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/shadcn/accordion";
import {
  DateTimePick,
  StressLevelSelect,
} from "./components";
import { BiologicalChangesMultiselect } from "../BiologicalChanges/components/BiologicalChangesMultiselect";
import { EmotionsMultiselect } from "../Emotions/components/EmotionsMultiselect";
import { PromptingEventsMultiselect } from "../PromptingEvents/components/PromptingEventsMultiselect";
import { InterpretationsMultiselect } from "../Interpretations/components/InterpretationsMultiselect";
import { ReactionsMultiselect } from "../Reactions/components/ReactionsMultiselect";
import { Card } from "@/components/shadcn/card";

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
      className="grid grid-cols-8 w-full gap-6"
    >
      <Card className="col-span-8 grid w-full gap-2 p-5">

        <div >
          <Controller
            name="stressLevel"
            control={control}
            render={({ field: { value, onChange, name } }) => (
              <StressLevelSelect name={name} value={value} onChange={onChange} />
            )}
          />
        </div>
      </Card>

      {/* First Column - Date & Time */}
      <div className="grid w-full gap-2 col-span-2">
        <Controller
          name="date"
          control={control}
          render={({ field }) => <DateTimePick {...field} />}
        />
      </div>

      {/* Second Column - Rest of fields */}
      <div className="grid w-full gap-6 col-span-6">
        {/* Accordion for all inputs */}
        <Accordion type="multiple" className="grid gap-3">
          {/* Emotions */}
          <AccordionItem value="emotions" className="border border-border rounded-lg overflow-hidden bg-card">
            <AccordionTrigger className="px-5">
              <Label htmlFor="emotions" className="text-base">
                Emotions
              </Label>
            </AccordionTrigger>
            <AccordionContent className="h-[25rem] overflow-auto">
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
            </AccordionContent>
          </AccordionItem>

          {/* Prompting Events */}
          <AccordionItem value="promptingEvents" className="border border-border rounded-lg overflow-hidden bg-card">
            <AccordionTrigger className="px-5">
              <Label htmlFor="promptingEvents" className="text-base">
                Promtping events
              </Label>
            </AccordionTrigger>
            <AccordionContent>
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
            </AccordionContent>
          </AccordionItem>

          {/* Interpretations */}
          <AccordionItem value="interpretations" className="border border-border rounded-lg overflow-hidden bg-card">
            <AccordionTrigger className="px-5">
              <Label htmlFor="interpretations" className="text-base">
                Interpretations
              </Label>
            </AccordionTrigger>
            <AccordionContent>
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
            </AccordionContent>
          </AccordionItem>

          {/* Biological Changes */}
          <AccordionItem value="biologicalChanges" className="border border-border rounded-lg overflow-hidden bg-card">
            <AccordionTrigger className="px-5">
              <Label htmlFor="biologicalChanges" className="text-base">
                Biological changes
              </Label>
            </AccordionTrigger>
            <AccordionContent>
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
            </AccordionContent>
          </AccordionItem>

          {/* Reactions */}
          <AccordionItem value="reactions" className="border border-border rounded-lg overflow-hidden bg-card">
            <AccordionTrigger className="px-5">
              <Label htmlFor="reactions" className="text-base">
                Reactions
              </Label>
            </AccordionTrigger>
            <AccordionContent>
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
            </AccordionContent>
          </AccordionItem>

          {/* Notes */}
          <AccordionItem value="notes" className="border border-border rounded-lg overflow-hidden bg-card">
            <AccordionTrigger className="px-5">
              <Label htmlFor="notes" className="text-base">
                Notes
              </Label>
            </AccordionTrigger>
            <AccordionContent>
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="w-full flex gap-4">
          <Button type="submit" className="grow">Save</Button>
          <Button type="reset" className="grow bg-card" variant="outline">
            Clear
          </Button>
        </div>
      </div>

      {/* Buttons */}
    </form>
  );
}
