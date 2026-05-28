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
    return <Loader label="Loading prompting events" />;
  }

  if (isSearchWithNoData) {
    return "No prompting events match your search.";
  }

  return "No prompting event found.";
}