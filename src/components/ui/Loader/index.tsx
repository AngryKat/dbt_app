import { Spinner } from "@/components/shadcn/spinner";

export function Loader({ label = "" }) {
  return (
    <div
      className="grid place-items-center h-full"
      aria-busy="true"
      aria-label={label}
    >
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <Spinner /> {label}
      </p>
    </div>
  );
}
