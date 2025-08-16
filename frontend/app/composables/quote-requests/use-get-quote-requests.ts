import { useQuery } from "@tanstack/vue-query";
import { quoteRequestsControllerListRequestedQuotes } from "~/client/sdk.gen";
import { useApiClient } from "~/composables/api/use-api-client";

export const useGetQuoteRequests = async () => {
  const query = useQuery({
    queryKey: ["getQuoteRequests"],
    queryFn: async () => {
      const response = await quoteRequestsControllerListRequestedQuotes({
        composable: "$fetch",
        client: useApiClient(),
      });
      return response.data;
    },
  });
  return query;
};
