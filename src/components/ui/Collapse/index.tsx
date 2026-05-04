import React from "react";
import { ChevronsUpDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/shadcn/collapsible";
import { Button } from "@/components/shadcn/button";

export function Collapse({
  triggerLabel,
  ariaLabel,
  children,
}: {
  triggerLabel: React.ReactNode;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-full flex-col gap-2"
    >
      <div className="flex items-center justify-between gap-4">
        {triggerLabel}
        <CollapsibleTrigger asChild>
          <Button type="button" variant="ghost" size="icon" className="size-8">
            <ChevronsUpDown />
            <span className="sr-only">{ariaLabel}</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
}
