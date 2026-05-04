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
  classNames,
}: {
  id?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  classNames?: {
    inputGroup?: string;
  };
}) {
  return (
    <Field orientation="horizontal">
      <InputGroup className="flex items-center gap-0">
        <div className={classNames?.inputGroup ?? ""}>
          <InputGroupInput
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            id={id}
            className="w-full"
          />
        </div>
        <InputGroupAddon
          align="inline-end"
          className="flex-shrink-0 cursor-pointer pl-2"
        >
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
