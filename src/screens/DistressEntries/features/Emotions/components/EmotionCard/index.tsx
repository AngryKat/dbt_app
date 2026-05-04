import type { ReactNode } from "react";
import { useRef } from "react";
import { CheckIcon } from "lucide-react";
import { useClickDelegation } from "@/hooks/useClickDelegation";
import type { NuancedEmotion } from "../../types";

type OptionalProps = Partial<{
  icon: string;
  children: ReactNode;
  selected: boolean;
  onSelect: (id: NuancedEmotion) => void;
}>;

type EmotionCardProps = {
  id: NuancedEmotion;
  label: string;
  description: string;
  feelsLike: string;
  thinking: string;
  check: string;
} & OptionalProps;

function CardBody({ feelsLike, thinking, check, description }) {
  return (
    <>
      <p className="text-base text-foreground leading-relaxed">{description}</p>
      {/* Feels Like Section */}
      <section className="bg-rose-50 border border-rose-400 rounded-xl p-4 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-rose-700">
          <span className="text-xs font-bold uppercase tracking-wider">
            Feels Like
          </span>
        </div>
        <span className="text-sm font-medium text-rose-700">{feelsLike}</span>
      </section>

      {/* Thinking Section */}
      <section className="bg-sky-50 border border-sky-400 rounded-xl p-4 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-sky-700">
          <span className="text-xs font-bold uppercase tracking-wider">
            Thinking
          </span>
        </div>
        <span className="text-sm italic text-sky-700">"{thinking}"</span>
      </section>

      {/* Self-Check Section */}
      <section className="bg-teal-50 border border-teal-400 rounded-xl p-4 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-teal-700">
          <span className="text-xs font-bold uppercase tracking-wider">
            Self-Check
          </span>
        </div>
        <span className="text-sm font-medium text-teal-700">{check}</span>
      </section>
    </>
  );
}

function CardHeader({ label, selected, onSelect, id, selectButtonRef }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-2xl font-sans font-medium text-foreground tracking-tight">
        {label}
      </h3>
      <button
        ref={selectButtonRef}
        onClick={() => onSelect?.(id)}
        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all focus-visible:ring-3 focus-visible:ring-black/40 ${
          selected
            ? "border border-primary bg-primary text-primary-foreground shadow-sm"
            : "border-[1.5px] border-dashed border-muted-foreground/50"
        }`}
      >
        {selected && <CheckIcon size={16} />}
      </button>
    </div>
  );
}

export function EmotionCard({
  id,
  label,
  description,
  feelsLike,
  thinking,
  check,
  selected = false,
  onSelect,
}: EmotionCardProps) {
  const selectButtonRef = useRef<HTMLButtonElement>(null);
  const handleCardClick = useClickDelegation(() => {
    selectButtonRef.current?.click();
  });
  return (
    <article
      data-emotion-label={id}
      className="border-[2px] border-border rounded-[20px] p-6 grid gap-5 shadow-sm cursor-pointer"
      style={{
        display: "grid",
        gridTemplateRows: "subgrid",
        gridRow: "span 5",
      }}
      onClick={handleCardClick}
    >
      <CardHeader
        id={id}
        label={label}
        selected={selected}
        onSelect={onSelect}
        selectButtonRef={selectButtonRef}
      />
      <CardBody
        description={description}
        feelsLike={feelsLike}
        thinking={thinking}
        check={check}
      />
    </article>
  );
}
