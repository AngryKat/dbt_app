import React from "react";
import { SearchInput } from "@/components/ui/SearchInput";

type SearchEmotionInputProps = {
  onSearch: (searchTerm: string) => void;
  timeout?: number;
};

export function SearchEmotionInput({
  onSearch,
  timeout = 500,
}: SearchEmotionInputProps) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setTimeout(() => {
      const term = value.toLowerCase();
      onSearch(term);
    }, timeout);
  };

  return (
    <div className="flex items-center gap-2">
      <SearchInput
        classNames={{
          inputGroup:
            "overflow-hidden @min-md/header:w-[200px] w-0 focus-within:w-[200px]  transition-width duration-400 ease-out",
        }}
        id="search-emotions-input"
        placeholder="Search emotion"
        value={searchTerm ?? ""}
        onChange={handleSearchChange}
      />
    </div>
  );
}
