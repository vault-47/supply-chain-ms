import { useQuery } from "@tanstack/vue-query";
import { quoteRequestsControllerListRequestedQuotes } from "~/client/index";
import { useApiClient } from "~/composables/api/use-api-client";

export const useGetQuoteRequests = async () => {
  const { setMeta } = usePageMetaStore();

  const query = useQuery({
    queryKey: ["getQuoteRequests"],
    queryFn: async () => {
      const response = await quoteRequestsControllerListRequestedQuotes({
        composable: "$fetch",
        client: useApiClient(),
      });
      setMeta(response.meta);
      return response.data;
    },
  });
  return query;
};
