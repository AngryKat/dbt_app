import {
  Select as SelectPrimitive,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";

type SelectItemType = {
  value: string;
  label: string;
};

type SelectGroupType = {
  label: string;
  items: SelectItemType[];
};

export function Select({
  value,
  onChange,
  items,
  label,
  id,
}: {
  value: string;
  onChange: (value: string) => void;
  items: (SelectItemType | SelectGroupType)[];
  label: string;
  clearable?: boolean;
  onClear?: () => void;
  id?: string;
}) {
  return (
    <SelectPrimitive value={value} onValueChange={onChange}>
      <SelectTrigger
        id={id}
        className="w-full overflow-hidden [&>[data-slot=select-value]]:truncate [&>[data-slot=select-value]]:block"
      >
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => {
          if (!("items" in item)) {
            return (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            );
          } else {
            return (
              <SelectGroup key={item.label}>
                <SelectLabel className="capitalize">{item.label}</SelectLabel>
                {item.items.map((subItem) => (
                  <SelectItem key={subItem.value} value={subItem.value}>
                    {subItem.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            );
          }
        })}
      </SelectContent>
    </SelectPrimitive>
  );
}
