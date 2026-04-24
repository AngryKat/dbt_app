import { type MouseEvent, useRef } from "react";

import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export function GoBackCardLink() {
  const mainLinkRef = useRef<HTMLAnchorElement>(null);

  const handleCardClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target.closest("a, button, input, textarea, select, summary")) {
      return;
    }

    const selectedText = window.getSelection()?.toString();
    if (selectedText) {
      return;
    }

    mainLinkRef.current?.click();
  };

  return (
    <Card
      className="cursor-pointer border border-border/60 transition-colors hover:bg-muted/40"
      onClick={handleCardClick}
    >
      <CardHeader>
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground transition-transform group-hover/card:-translate-x-1">
            <ArrowLeftIcon className="size-5" aria-hidden="true" />
          </span>
          <CardTitle>
            <Link
              ref={mainLinkRef}
              to="/distress-entry"
              className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Distress entry form
            </Link>
          </CardTitle>
        </div>
      </CardHeader>
    </Card>
  );
}
