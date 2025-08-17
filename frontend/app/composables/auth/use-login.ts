import { useMutation } from "@tanstack/vue-query";
import { authControllerLogin } from "~/client/sdk.gen";
import type { LoginRequestDto } from "~/client/types.gen";
import { useApiClient } from "~/composables/api/use-api-client";
import useSession from "~/composables/session/use-session";

export const useLogin = () => {
  const { setSessionStorage } = useSession();

  const mutation = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: async (payload: LoginRequestDto) =>
      await authControllerLogin({
        composable: "$fetch",
        client: useApiClient(),
        body: payload,
      }),
    onSuccess: (response) => {
      setSessionStorage("tkn", response.data?.access_token as string);
      return response;
    },
    onError: (error) => {
      throw error;
    },
  });
  return mutation;
};
