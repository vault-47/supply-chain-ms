import { createClient } from "../../client/client";

export const useApiClient = () => {
  const config = useRuntimeConfig();

  return createClient({
    baseURL: config.public.apiBaseUrl,
    headers: {
      Authorization: "Bearer <token_from_service_client>",
    },
  });
};
