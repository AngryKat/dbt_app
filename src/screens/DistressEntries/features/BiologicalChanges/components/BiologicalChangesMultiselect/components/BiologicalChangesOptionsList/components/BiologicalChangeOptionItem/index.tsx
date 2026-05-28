import { ComboboxItem } from "@/components/shadcn/combobox";

type BiologicalChangeOptionItemProps = {
  id: string;
  description: string;
};

export function BiologicalChangeOptionItem({
  id,
  description,
}: BiologicalChangeOptionItemProps) {
  return (
    <ComboboxItem value={id} indicatorPlacement="start">
      {description}
    </ComboboxItem>
  );
}
