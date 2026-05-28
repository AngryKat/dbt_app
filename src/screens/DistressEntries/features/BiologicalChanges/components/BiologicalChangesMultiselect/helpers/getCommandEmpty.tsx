import { Loader } from "@/components/ui/Loader";

export function getCommandEmpty({
  isError = false,
  isLoading = false,
  isSearchWithNoData = false,
}) {
  if (isError) {
    return "Error while getting options";
  }

  if (isLoading) {
    return <Loader label="Loading biological changes" />;
  }

  if (isSearchWithNoData) {
    return "No biological changes match your search.";
  }

  return "No biological change found.";
}
