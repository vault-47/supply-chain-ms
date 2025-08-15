import { useMutation } from "@tanstack/vue-query";
import { authControllerLogin } from "~/client/sdk.gen";
import type { LoginRequestDto } from "~/client/types.gen";
import { useApiClient } from "~/composables/api/use-api-client";

export const useLogin = () => {
  const mutation = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: async (payload: LoginRequestDto) =>
      await authControllerLogin({
        composable: "$fetch",
        client: useApiClient(),
        body: payload,
      }),
    onSuccess: (response) => {
      return response;
    },
    onError: (error) => {
      throw error;
    },
  });
  return mutation;
};
