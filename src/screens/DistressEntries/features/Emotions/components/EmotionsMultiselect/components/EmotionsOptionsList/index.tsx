import * as React from 'react';
import { OptionItem } from './components/OptionItem';
import type { EmotionsOptions } from '../../types';
import { Label } from '@/components/shadcn/label';
import { cn } from '@/lib/utils';

export function EmotionsOptionsList({
  options,
  activeTab,
  commandEmpty = 'No emotion found.',
  openDetailForId,
  onDetailOpenChange,
  className
}: {
  options: EmotionsOptions | undefined;
  activeTab: string;
  commandEmpty?: React.ReactNode;
  openDetailForId?: string;
  className?: string;
  onDetailOpenChange?: (id: string | undefined) => void;
}) {
  const hasOptions = options && Object.keys(options).length > 0;

  return (
    <div className={cn(className)}>
      {!hasOptions && <p>{commandEmpty}</p>}
      {hasOptions && (
        <ul className="flex flex-col gap-4">
          {options && Object.entries(options).map(([baseEmotion, { baseEmotionLabel, options: emotions }]) => (
            <React.Fragment key={baseEmotion}>
              {activeTab === 'all' && (
                <li key={`${baseEmotion}-label`}>

                  <Label className="uppercase text-sm font-medium pt-2">{baseEmotionLabel}</Label>
                </li >
              )
              }
              {
                emotions.map((emotion) => (
                  <OptionItem
                    key={emotion.id}
                    id={emotion.id}
                    label={emotion.label || ''}
                    description={emotion.description || ''}
                    isDetailOpen={openDetailForId === emotion.id}
                    onDetailOpenChange={(open) =>
                      onDetailOpenChange?.(open ? emotion.id : undefined)
                    }
                  />
                ))
              }
            </React.Fragment >
          ))}
        </ul >
      )}
    </div>
  );
}
