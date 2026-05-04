import { SelectedEmotion } from "./components";
import type { BaseEmotion, NuancedEmotion } from "../../types";
import { emotionColors } from "../../constants/emotion-color-map";

interface SelectedEmotionsProps {
  selectedEmotions: Array<{
    emotion: NuancedEmotion | BaseEmotion;
    baseEmotion: BaseEmotion;
  }>;
  onRemoveEmotion: (emotionId: NuancedEmotion | BaseEmotion) => void;
  onClearAll: () => void;
}

export function SelectedEmotions({
  selectedEmotions,
  onRemoveEmotion,
  onClearAll,
}: SelectedEmotionsProps) {
  const handleScrollToEmotion = (label: string) => {
    const element = document.querySelector(`[data-emotion-label="${label}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  return (
    <div className="border-b border-border flex flex-col gap-3 sticky top-0 left-0 right-0 z-10 bg-background px-4 pt-4 -mx-[14px]">
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
      <div className="flex items-center gap-2 overflow-x-auto -mx-4 px-4 hide-scrollbar pb-3">
        {selectedEmotions.length ? (
          selectedEmotions.map((selectedEmotion) => {
            const { emotion, baseEmotion } = selectedEmotion;
            const colorScheme = emotionColors[baseEmotion];
            return (
              <SelectedEmotion
                key={emotion}
                onRemoveEmotion={onRemoveEmotion}
                onClick={() => handleScrollToEmotion(emotion)}
                baseEmotion={baseEmotion}
                emotion={emotion}
                colorScheme={colorScheme}
              />
            );
          })
        ) : (
          <p className="text-sm text-muted-foreground italic">
            No emotions selected
          </p>
        )}
      </div>
    </div>
  );
}
