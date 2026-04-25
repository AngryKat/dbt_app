import { Field } from "@/components/shadcn/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/shadcn/input-group";
import { SearchIcon } from "lucide-react";

export function SearchInput({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Field orientation="horizontal">
      <InputGroup>
        <InputGroupInput
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <InputGroupAddon align="inline-end">
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
