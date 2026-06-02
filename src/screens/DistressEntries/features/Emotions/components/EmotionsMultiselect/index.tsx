import * as React from 'react';
import { EmotionsOptionsList } from './components/EmotionsOptionsList';
import { useEmotionsOptions } from './components/EmotionDescriptionPopover/components/EmotionDescriptionPopoverContent/hooks/useEmotionsOptions';
import { Loader } from '@/components/ui/Loader';
import type { BaseEmotionEnum } from '@/types/base-emotions';
import { Input } from '@/components/shadcn/input';
import { BaseEmotionsTabs } from '@/components/ui/BaseEmotionsTabs';
import { Label } from '@/components/shadcn/label';

type EmotionsMultiselectProps = {
  value: string[];
  onChange: (value: string[]) => void;
  id?: string;
};

export function EmotionsMultiselect({ value, onChange, id }: EmotionsMultiselectProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const { data, isLoading, isError } = useEmotionsOptions();
  const [openDetailForId, setOpenDetailForId] = React.useState<string | undefined>(undefined);
  const [activeTab, setActiveTab] = React.useState<string>('all');

  const filteredEmotions = React.useMemo(() => {
    if (!searchQuery.trim()) return data;

    const query = searchQuery.toLowerCase();
    const filtered = {} as NonNullable<typeof data>;

    Object.entries(data || {}).forEach(([key, group]) => {
      const matchedEmotions = group.options.filter((emotion) =>
        emotion.label?.toLowerCase().includes(query)
      );

      if (matchedEmotions.length > 0) {
        filtered[key as BaseEmotionEnum] = {
          ...group,
          options: matchedEmotions,
        };
      }
    });

    return Object.keys(filtered).length > 0 ? filtered : undefined;
  }, [data, searchQuery]);

  const filteredByTabOptions = React.useMemo(() => {
    if (!filteredEmotions || activeTab === 'all') return filteredEmotions;
    const entry = filteredEmotions[activeTab as BaseEmotionEnum];
    if (!entry) return undefined;
    return { [activeTab]: entry } as NonNullable<typeof filteredEmotions>;
  }, [filteredEmotions, activeTab]);

  return (
    <div className="flex flex-col h-full px-4 gap-4">
      <Label htmlFor="emotions-search" className="sr-only">Search emotions</Label>
      <Input
        id="emotions-search"
        placeholder="Search emotions"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mt-2"
      />

      <BaseEmotionsTabs
        options={filteredEmotions ?? {}}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showAllTab
      />

      <div className="overflow-y-auto flex-1 max-h-[300px] px-2">
        <EmotionsOptionsList
          options={filteredByTabOptions}
          activeTab={activeTab}
          openDetailForId={openDetailForId}
          onDetailOpenChange={setOpenDetailForId}
          commandEmpty={
            isError ? (
              'Error while getting options'
            ) : isLoading ? (
              <Loader label="Loading emotions list" />
            ) : searchQuery.trim() && !filteredEmotions ? (
              'No emotions match your search.'
            ) : (
              'No emotion found.'
            )
          }
        />
      </div>
    </div>
  );
}
