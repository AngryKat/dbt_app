import type { ReactNode } from "react";
import { useRef } from "react";
import { CheckIcon } from "lucide-react";
import { useClickDelegation } from "@/hooks/useClickDelegation";

type EmotionCardProps = {
  id: string;
  label: string;
  description: string;
  feelsLike: string;
  thinking: string;
  check: string;
  icon?: string;
  children?: ReactNode;
  selected?: boolean;
  onSelect?: (id: string) => void;
};

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
      className={`border border-border rounded-[20px] p-6 flex flex-col gap-5 shadow-sm cursor-pointer transition-all focus-within:ring-3 focus-within:ring-black/40 ${
        selected ? "ring-2 ring-primary" : ""
      }`}
      onClick={handleCardClick}
    >
      <div className="flex flex-col gap-3 border-b border-border pb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-sans font-bold text-foreground tracking-tight">
            {label}
          </h3>
          <button
            ref={selectButtonRef}
            onClick={() => onSelect?.(id)}
            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
              selected
                ? "border border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-[1.5px] border-dashed border-muted-foreground/50"
            }`}
          >
            {selected && <CheckIcon size={16} />}
          </button>
        </div>
        <p className="text-base text-foreground leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {/* Feels Like Section */}
        <div className="bg-rose-50 border border-rose-400 rounded-xl p-4 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-rose-700">
            <span className="text-xs font-bold uppercase tracking-wider">
              Feels Like
            </span>
          </div>
          <span className="text-sm font-medium text-rose-700">{feelsLike}</span>
        </div>

        {/* Thinking Section */}
        <div className="bg-sky-50 border border-sky-400 rounded-xl p-4 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-sky-700">
            <span className="text-xs font-bold uppercase tracking-wider">
              Thinking
            </span>
          </div>
          <span className="text-sm italic text-sky-700">"{thinking}"</span>
        </div>

        {/* Self-Check Section */}
        <div className="bg-teal-50 border border-teal-400 rounded-xl p-4 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-teal-700">
            <span className="text-xs font-bold uppercase tracking-wider">
              Self-Check
            </span>
          </div>
          <span className="text-sm font-medium text-teal-700">{check}</span>
        </div>
      </div>
    </article>
  );
}
