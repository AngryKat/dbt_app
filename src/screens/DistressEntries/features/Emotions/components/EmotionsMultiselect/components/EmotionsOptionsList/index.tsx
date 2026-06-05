import * as React from 'react';
import { OptionItem } from './components/OptionItem';
import type { EmotionsOptions } from '../../types';
import { Label } from '@/components/shadcn/label';
import { cn } from '@/lib/utils';

export function EmotionsOptionsList({
  options,
  commandEmpty = 'No emotion found.',
  onChange,
  selectedIds = [],
  className
}: {
  options: EmotionsOptions | undefined;
  activeTab: string;
  commandEmpty?: React.ReactNode;
  className?: string;
  onChange: (ids: string[]) => void;
  selectedIds?: string[];
}) {
  const [openDetailForId, setOpenDetailForId] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    const handleScroll = () => {
      console.log("scrolling")
      setOpenDetailForId(undefined);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const hasOptions = options && Object.keys(options).length > 0;

  const handleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div className={cn(className)}>
      {!hasOptions && commandEmpty}
      {hasOptions && (
        <ul className="flex flex-col" role="listbox">
          {options && Object.entries(options).map(([baseEmotion, { baseEmotionLabel, options: emotions }]) => (
            <React.Fragment key={baseEmotion}>
              <li key={`${baseEmotion}-label`}>
                <Label className="uppercase text-sm font-medium pt-2 pl-2.5">{baseEmotionLabel}</Label>
              </li >
              {
                emotions.map((emotion) => (
                  <OptionItem
                    key={emotion.id}
                    id={emotion.id}
                    label={emotion.label || ''}
                    description={emotion.description || ''}
                    isDetailOpen={openDetailForId === emotion.id}
                    isSelected={selectedIds.includes(emotion.id)}
                    onSelect={handleSelect}
                    onDetailOpenChange={(open) =>
                      setOpenDetailForId(open ? emotion.id : undefined)
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
