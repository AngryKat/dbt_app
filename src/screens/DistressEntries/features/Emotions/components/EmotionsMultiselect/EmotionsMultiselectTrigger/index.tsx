import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/shadcn/button";

export function EmotionsMultiselectTrigger({
  open,
  value,
  clearButton,
  ...props
}) {
  return (
    <Button
      {...props}
      variant="outline"
      className="h-auto min-h-9 w-full justify-between pl-3 pr-2 py-1.5"
    >
      <span className="flex flex-wrap gap-1">
        {value.length === 0 ? (
          <span className="text-muted-foreground font-normal">
            Select emotions...
          </span>
        ) : (
          value.map((v) => (
            <span
              key={v}
              className="inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium"
            >
              {v}
              {clearButton(v)}
              {/* <span
                    role="button"
                    aria-label={`Remove ${v}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setValue((prev) => prev.filter((item) => item !== v));
                    }}
                    className="cursor-pointer opacity-60 hover:opacity-100"
                  >
                    <X className="size-3" />
                  </span> */}
            </span>
          ))
        )}
      </span>
      <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
    </Button>
  );
}
