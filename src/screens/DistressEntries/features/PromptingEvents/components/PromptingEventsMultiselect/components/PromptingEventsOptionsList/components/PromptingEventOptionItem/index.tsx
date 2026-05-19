import { ComboboxItem } from "@/components/shadcn/combobox";

type PromptingEventOptionItemProps = {
  id: string;
  description: string;
};

export function PromptingEventOptionItem({
  id,
  description,
}: PromptingEventOptionItemProps) {
  return (
    <ComboboxItem value={id} indicatorPlacement="start">
      {description}
    </ComboboxItem>
  );
}
