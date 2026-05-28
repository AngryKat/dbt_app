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
    return <Loader label="Loading interpretations" />;
  }

  if (isSearchWithNoData) {
    return "No interpretations match your search.";
  }

  return "No interpretation found.";
}
