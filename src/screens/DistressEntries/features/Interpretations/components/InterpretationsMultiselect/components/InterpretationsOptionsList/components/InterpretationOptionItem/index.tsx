import { ComboboxItem } from "@/components/shadcn/combobox";

type InterpretationOptionItemProps = {
  id: string;
  description: string;
};

export function InterpretationOptionItem({
  id,
  description,
}: InterpretationOptionItemProps) {
  return (
    <ComboboxItem value={id} indicatorPlacement="start">
      {description}
    </ComboboxItem>
  );
}
