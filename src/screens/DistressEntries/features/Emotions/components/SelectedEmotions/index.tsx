import nuancedEmotions from "@/data/nuancedEmotions";
import { emotionColors } from "../../constants/emotion-color-map";

interface SelectedEmotionsProps {
  selectedEmotions: string[];
  onRemoveEmotion: (emotionId: string) => void;
  onClearAll: () => void;
}

function findEmotionById(emotionId: string): {
  label: string;
  baseEmotion: keyof typeof emotionColors;
} | null {
  for (const [baseEmotion, emotions] of Object.entries(nuancedEmotions)) {
    const found = emotions.find((e: { id: string }) => e.id === emotionId);
    if (found) {
      return {
        label: (found as { label: string }).label,
        baseEmotion: baseEmotion as keyof typeof emotionColors,
      };
    }
  }
  return null;
}

function getEmotionColorClasses(baseEmotion: keyof typeof emotionColors) {
  const colorMap: Record<keyof typeof emotionColors, string> = {
    anger: "bg-emotion-anger-light text-emotion-anger",
    disgust: "bg-emotion-disgust-light text-emotion-disgust",
    fear: "bg-emotion-fear-light text-emotion-fear",
    happiness: "bg-emotion-happiness-light text-emotion-happiness",
    sadness: "bg-emotion-sadness-light text-emotion-sadness",
    shame: "bg-emotion-shame-light text-emotion-shame",
  };
  return colorMap[baseEmotion];
}

export function SelectedEmotions({
  selectedEmotions,
  onRemoveEmotion,
  onClearAll,
}: SelectedEmotionsProps) {
  return (
    <div className="border-b border-border flex flex-col gap-3 sticky -top-[14px] left-0 right-0 z-10 bg-background px-2 py-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground font-body">
          Selected ({selectedEmotions.length}):
        </span>
        <button
          onClick={onClearAll}
          className="text-sm text-muted-foreground hover:text-foreground font-body underline transition-colors"
        >
          Clear all
        </button>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 hide-scrollbar">
        {selectedEmotions.map((emotionId) => {
          const emotionData = findEmotionById(emotionId);
          if (!emotionData) return null;

          const { label, baseEmotion } = emotionData;
          const colorClasses = getEmotionColorClasses(baseEmotion);

          const handleScrollToEmotion = () => {
            const element = document.querySelector(
              `[data-emotion-label="${label}"]`,
            );
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          };

          return (
            <div
              key={emotionId}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-border flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity ${colorClasses}`}
              onClick={handleScrollToEmotion}
            >
              <span className="text-sm font-medium font-body">{label}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveEmotion(emotionId);
                }}
                className="flex items-center justify-center w-4 h-4 rounded-full bg-black/5 border border-transparent hover:bg-black/10 transition-colors"
                aria-label={`Remove ${label}`}
              >
                <span className="text-[12px]">✕</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
