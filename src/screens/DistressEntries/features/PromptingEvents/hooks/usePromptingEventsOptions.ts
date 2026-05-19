import { useQuery } from "@tanstack/react-query";
import { getPromptingEvents } from "../api/getPromptingEvents";

export const usePromptingEventsOptions = () => {
  return useQuery({
    queryKey: ["prompting-events"],
    queryFn: getPromptingEvents,
  });
};
