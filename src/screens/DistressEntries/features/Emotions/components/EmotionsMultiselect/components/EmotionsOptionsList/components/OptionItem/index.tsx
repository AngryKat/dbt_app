import * as React from 'react';
import { ExternalLink, Check } from 'lucide-react';

import { Button } from '@/components/shadcn/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn/tooltip';
import { cn } from '@/lib/utils';
import { EmotionDescriptionPopover } from '../../../EmotionDescriptionPopover';

type OptionItemProps = {
  id: string;
  label: string;
  description: string;
  isDetailOpen?: boolean;
  onDetailOpenChange?: (open: boolean) => void;
  onSelect: (id: string) => void;
  isSelected?: boolean;
};

export function OptionItem({
  id,
  label,
  description,
  isDetailOpen,
  onDetailOpenChange,
  onSelect,
  isSelected,
}: OptionItemProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    onSelect(id);
  };

  return (
    <li>
      <Button
        onClick={handleClick}
        type="button"
        variant="ghost"
        className="max-w-full h-auto w-full grid gap-2 items-start p-2 hover:opacity-100"
        style={{ gridTemplateColumns: 'auto 1fr auto' }}
        aria-selected={isSelected}
      >
        <Check className={cn('size-5 text-green-600', isSelected ? 'opacity-100' : 'opacity-0')} />
        <div className="flex flex-col gap-1 text-left">
          <span className="whitespace-normal font-semibold text-sm text-foreground">{label}</span>
          <span className="whitespace-normal text-xs text-muted-foreground leading-relaxed">{description}</span>
        </div>
        <Tooltip>
          <EmotionDescriptionPopover
            id={id}
            label={label || ''}
            open={isDetailOpen}
            onOpenChange={onDetailOpenChange}
            trigger={
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  ref={buttonRef}
                  className="size-6 shrink-0"
                  size="icon"
                  variant="ghost"
                  aria-label={`Open details for ${label}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="size-4" />
                </Button>
              </TooltipTrigger>
            }
          />
          <TooltipContent side="top">
            Open details (<kbd data-slot="kbd">⌘ Enter</kbd>)
          </TooltipContent>
        </Tooltip>
      </Button>
    </li>
  );
}
