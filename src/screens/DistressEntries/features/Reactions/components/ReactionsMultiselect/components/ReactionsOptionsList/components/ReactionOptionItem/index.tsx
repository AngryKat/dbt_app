import { ComboboxItem } from "@/components/shadcn/combobox";

type ReactionOptionItemProps = {
  id: string;
  description: string;
};

export function ReactionOptionItem({
  id,
  description,
}: ReactionOptionItemProps) {
  return (
    <ComboboxItem value={id} indicatorPlacement="start">
      {description}
    </ComboboxItem>
  );
}
