import { useMutation } from "@tanstack/vue-query";
import myClient from "~/my-client";
import { authControllerLogin } from "~/client/sdk.gen";
import type { LoginRequestDto } from "~/client/types.gen";

export const useLogin = () => {
  const mutation = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: async (payload: LoginRequestDto) =>
      await authControllerLogin({
        composable: "$fetch",
        client: myClient,
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
