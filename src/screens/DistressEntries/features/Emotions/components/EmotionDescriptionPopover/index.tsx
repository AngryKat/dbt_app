import type { ReactNode } from "react";
import type { NuancedEmotion } from "../../types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";

type OptionalProps = Partial<{
  icon: string;
  children: ReactNode;
  selected: boolean;
  onSelect: (id: NuancedEmotion) => void;
}>;

type EmotionDescriptionPopoverProps = {
  id: NuancedEmotion;
  trigger: ReactNode;
} & OptionalProps;

function Content({ feelsLike, thinking, check }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Feels Like Section */}
      <section className="bg-rose-50 border border-rose-400 rounded-xl p-2 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-rose-700">
          <span className="text-xs font-bold uppercase tracking-wider">
            Feels Like
          </span>
        </div>
        <span className="text-sm font-medium text-rose-700">{feelsLike}</span>
      </section>

      {/* Thinking Section */}
      <section className="bg-sky-50 border border-sky-400 rounded-xl p-2 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-sky-700">
          <span className="text-xs font-bold uppercase tracking-wider">
            Thinking
          </span>
        </div>
        <span className="text-sm italic text-sky-700">"{thinking}"</span>
      </section>

      {/* Self-Check Section */}
      <section className="bg-teal-50 border border-teal-400 rounded-xl p-2 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-teal-700">
          <span className="text-xs font-bold uppercase tracking-wider">
            Self-Check
          </span>
        </div>
        <span className="text-sm font-medium text-teal-700">{check}</span>
      </section>
    </div>
  );
}

export function EmotionDescriptionPopover({
  id,
  trigger,
}: EmotionDescriptionPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent>
        <>Hello</>
        {/* <article>
          <h3 className="text-lg font-semibold mb-2">{label}</h3>
          <Content feelsLike={feelsLike} thinking={thinking} check={check} />
        </article> */}
      </PopoverContent>
    </Popover>
  );
}
