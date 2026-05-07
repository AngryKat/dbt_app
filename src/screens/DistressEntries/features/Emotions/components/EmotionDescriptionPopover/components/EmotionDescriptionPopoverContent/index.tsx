type EmotionDescriptionPopoverContentProps = {
  feelsLike: string;
  thinking: string;
  check: string;
};

export function EmotionDescriptionPopoverContent({
  feelsLike,
  thinking,
  check,
}: EmotionDescriptionPopoverContentProps) {
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
