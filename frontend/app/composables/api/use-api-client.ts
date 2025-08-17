import { createClient } from "../../client/client";
import useSession from "~/composables/session/use-session";

export const useApiClient = () => {
  const config = useRuntimeConfig();
  const { getSessionStorage } = useSession();
  const session = getSessionStorage("tkn");
  const toast = useToast();

  return createClient({
    auth: () => {
      if (session) {
        return session;
      } else return "";
    },
    baseURL: config.public.apiBaseUrl,
    onResponse: (context) => {
      if ([403, 500].includes(context.response?.status)) {
        toast.add({
          title: context.response?._data?.message,
          color: "error",
          icon: "i-lucide-info",
        });
      }
    },
  });
};
