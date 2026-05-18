import { Alert } from "@/components/ui/Alert";
import { Skeleton } from "@/components/shadcn/skeleton";
import { useNuancedEmotionDetails } from "../../../../hooks/useNuancedEmotionDetails";

type EmotionDescriptionPopoverContentProps = {
  id: string;
};

export function EmotionDescriptionPopoverContent({
  id,
}: EmotionDescriptionPopoverContentProps) {
  const { data, isError, isLoading } = useNuancedEmotionDetails(id);
  const { feelsLike = "", thinking = "", check = "" } = data || {};
  if (isError) {
    return <Alert title="Error occurred" variant="destructive" />;
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Feels Like Section */}
      <section className="bg-destructive/10 text-destructive border border-destructive rounded-lg p-2 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-rose-700">
          <span className="text-xs font-bold uppercase tracking-wider">
            Feels Like
          </span>
        </div>
        {isLoading ? (
          <Skeleton className="h-4 w-[250px]" />
        ) : (
          <span className="text-sm font-medium text-rose-700">{feelsLike}</span>
        )}
      </section>

      {/* Thinking Section */}
      <section className="bg-sky-600/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400 border border-sky-600 rounded-lg p-2 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-sky-700">
          <span className="text-xs font-bold uppercase tracking-wider">
            Thinking
          </span>
        </div>
        {isLoading ? (
          <Skeleton className="h-4 w-[250px]" />
        ) : (
          <span className="text-sm italic text-sky-700">"{thinking}"</span>
        )}
      </section>

      {/* Self-Check Section */}
      <section className="bg-teal-600/10 text-teal-600 dark:bg-teal-400/10 dark:text-teal-400 border border-teal-600 rounded-lg p-2 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-teal-700">
          <span className="text-xs font-bold uppercase tracking-wider">
            Self-Check
          </span>
        </div>
        {isLoading ? (
          <Skeleton className="h-4 w-[250px]" />
        ) : (
          <span className="text-sm font-medium text-teal-700">{check}</span>
        )}
      </section>
    </div>
  );
}
