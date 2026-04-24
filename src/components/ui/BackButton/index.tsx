import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router";

interface BackButtonProps {
  backUrl: string;
}

export function BackButton({ backUrl }: BackButtonProps) {
  return (
    <Link
      to={backUrl}
      className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-muted hover:opacity-70"
    >
      <ArrowLeftIcon className="size-5" aria-hidden="true" />
    </Link>
  );
}
