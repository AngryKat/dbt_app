import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

type SelectedEmotionsProps = {
  value: string[];
  allEmotionOptions?: Record<string, { options: Array<{ id: string; label: string | null }> }>;
  onRemove: (emotionId: string) => void;
};

export function SelectedEmotions({ value, allEmotionOptions, onRemove }: SelectedEmotionsProps) {
  const emotionLabels = React.useMemo(() => {
    const labels: Record<string, string> = {};
    if (!allEmotionOptions) return labels;

    Object.values(allEmotionOptions).forEach(({ options: nuancedEmotions }) => {
      nuancedEmotions.forEach((emotion) => {
        if (emotion.id && emotion.label) {
          labels[emotion.id] = emotion.label;
        }
      });
    });

    return labels;
  }, [allEmotionOptions]);

  return (
    <div className={cn('flex items-center gap-2 flex-wrap px-3 bg-secondary rounded-lg border border-secondary-foreground border-opacity-20', value.length === 0 ? 'py-4' : 'py-3')}>
      <span className="text-xs text-secondary-foreground font-medium mr-1">Selected:</span>
      {value.map((emotionId) => (
        <span
          key={emotionId}
          className="flex items-center gap-1 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full"
        >
          <span>{emotionLabels[emotionId] || emotionId}</span>
          <button
            onClick={() => onRemove(emotionId)}
            className="ml-1 opacity-75 hover:opacity-100 transition-opacity"
            aria-label={`Remove ${emotionLabels[emotionId] || emotionId}`}
            type="button"
          >
            <X size={11} strokeWidth={3} />
          </button>
        </span>
      ))}
    </div>
  );
}
