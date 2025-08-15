import { AuthApi, Configuration, type LoginRequestDto } from "~/client/index";
import { useMutation } from "@tanstack/vue-query";

export const useLogin = () => {
  const api = new AuthApi(
    new Configuration({ basePath: "http://localhost:8080" }),
  );

  const mutation = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: async (payload: LoginRequestDto) =>
      await api.authControllerLogin(payload),
  });
  return mutation;
};
