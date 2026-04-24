import { type MouseEvent, useRef } from "react";

import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router";

import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

export function EmotionsRedirectCardLink() {
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
        <CardTitle>
          <Link
            ref={mainLinkRef}
            to="emotions"
            className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            What are your emotions now?
          </Link>
        </CardTitle>
        <CardAction className="text-muted-foreground transition-transform group-hover/card:translate-x-1">
          <ArrowRightIcon className="size-5" aria-hidden="true" />
        </CardAction>
      </CardHeader>
    </Card>
  );
}
