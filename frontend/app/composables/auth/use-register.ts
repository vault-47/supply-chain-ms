import { useMutation } from "@tanstack/vue-query";
import { authControllerRegister } from "~/client/sdk.gen";
import type { RegistrationRequestDto } from "~/client/types.gen";
import { useApiClient } from "~/composables/api/use-api-client";

export const useRegister = () => {
  const mutation = useMutation({
    mutationKey: ["registerUser"],
    mutationFn: async (payload: RegistrationRequestDto) =>
      await authControllerRegister({
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
