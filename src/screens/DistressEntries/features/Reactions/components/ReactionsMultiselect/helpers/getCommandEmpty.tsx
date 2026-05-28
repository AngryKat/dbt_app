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
    return <Loader label="Loading reactions" />;
  }

  if (isSearchWithNoData) {
    return "No reactions match your search.";
  }

  return "No reaction found.";
}
