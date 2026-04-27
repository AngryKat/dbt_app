import { Badge } from "@/components/shadcn/badge";
import type {
  BaseEmotion,
  ColorScheme,
  NuancedEmotion,
} from "../../../../types";

interface SelectedEmotionProps {
  baseEmotion: BaseEmotion;
  emotion: NuancedEmotion | BaseEmotion;
  onRemoveEmotion: (emotionId: NuancedEmotion | BaseEmotion) => void;
  onClick: () => void;
  colorScheme: ColorScheme;
}

export function SelectedEmotion({
  colorScheme,
  onRemoveEmotion,
  emotion,
  onClick,
}: SelectedEmotionProps) {
  return (
    <Badge
      style={{
        backgroundColor: colorScheme[100],
        color: colorScheme[500],
      }}
      className={`capitalize flex items-center gap-2 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity`}
      onClick={onClick}
    >
      <span className="font-medium">{emotion}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemoveEmotion(emotion);
        }}
        className="flex items-center justify-center w-4 h-4 rounded-full bg-black/5 border border-transparent hover:bg-black/10 transition-colors"
        aria-label={`Remove ${emotion}`}
        data-icon="inline-end"
      >
        <span className="text-[12px]">✕</span>
      </button>
    </Badge>
  );
}
