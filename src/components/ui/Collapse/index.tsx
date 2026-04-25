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
          <Button variant="ghost" size="icon" className="size-8">
            <ChevronsUpDown />
            <span className="sr-only">{ariaLabel}</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        {children}
        {/* <div className="rounded-md border px-4 py-2 text-sm">
          <p className="font-medium">Shipping address</p>
          <p className="text-muted-foreground">100 Market St, San Francisco</p>
        </div>
        <div className="rounded-md border px-4 py-2 text-sm">
          <p className="font-medium">Items</p>
          <p className="text-muted-foreground">2x Studio Headphones</p>
        </div> */}
      </CollapsibleContent>
    </Collapsible>
  );
}
