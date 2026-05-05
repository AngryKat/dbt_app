import * as React from "react";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
  ComboboxClear,
  ComboboxTrigger,
} from "@/components/shadcn/combobox";
import { Checkbox } from "@/components/shadcn/checkbox";

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const;

type EmotionsMultiselectProps = {
  onChange: (values: string[]) => void;
  value: string[];
};

export function EmotionsMultiselect({
  onChange,
  value,
}: EmotionsMultiselectProps) {
  const anchor = useComboboxAnchor();

  return (
    <Combobox
      multiple
      value={value}
      onValueChange={onChange}
      autoHighlight
      items={frameworks}
      onOpenChange={(open) => {
        if (!open) {
          (document.activeElement as HTMLElement)?.blur();
        }
      }}
    >
      <ComboboxChips ref={anchor} className="w-full max-w-xs">
        <ComboboxValue>
          {(values) => (
            <React.Fragment>
              {values.map((value: string) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput
                placeholder={!values.length ? "Search emotions..." : ""}
              />
            </React.Fragment>
          )}
        </ComboboxValue>
        <ComboboxClear />
        <ComboboxTrigger className="ml-auto shrink-0" />
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item} hideIndicator>
              <Checkbox
                className="pointer-events-none"
                checked={value.includes(item)}
                aria-hidden="true"
              />
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
