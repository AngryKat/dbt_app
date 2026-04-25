import { useState } from "react";
import { Field } from "@/components/shadcn/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/shadcn/input-group";
import { SearchIcon } from "lucide-react";

export function SearchInput({
  id = "search-input",
  placeholder,
  value,
  onChange,
}: {
  id?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <Field orientation="horizontal">
      <InputGroup className="flex items-center gap-0">
        <div
          className="overflow-hidden"
          style={{
            width: focused ? "200px" : "0px",
            transition: "width 400ms ease-out",
          }}
        >
          <InputGroupInput
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            id={id}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full"
          />
        </div>
        <InputGroupAddon
          align="inline-end"
          className="flex-shrink-0 cursor-pointer pl-2"
          onClick={() => {
            setFocused(true);
            setTimeout(() => document.getElementById(id)?.focus(), 10);
          }}
        >
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
