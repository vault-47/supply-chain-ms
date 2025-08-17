import { useQuery } from "@tanstack/vue-query";
import { profileControllerProfile } from "~/client/sdk.gen";
import { useApiClient } from "~/composables/api/use-api-client";

export const useGetProfile = async () => {
  const query = useQuery({
    queryKey: ["getProfile"],
    queryFn: async () => {
      const response = await profileControllerProfile({
        composable: "$fetch",
        client: useApiClient(),
      });
      return response.data;
    },
  });
  return query;
};
