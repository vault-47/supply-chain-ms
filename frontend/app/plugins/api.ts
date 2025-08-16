// import useSession from "~/composables/session/use-session";
//
// export default defineNuxtPlugin((nuxtApp) => {
//   const { getSessionStorage } = useSession();
//   const session = getSessionStorage("tkn");
//   const config = useRuntimeConfig();
//
//   const api = $fetch.create({
//     baseURL: config.public.apiBaseUrl,
//     onRequest({ request, options, error }) {
//       if (session) {
//         options.headers.set("Authorization", `Bearer ${session}`);
//       }
//     },
//     async onResponseError({ response }) {
//       if (response.status === 401) {
//         await nuxtApp.runWithContext(() => navigateTo("/login"));
//       }
//     },
//   });
//
//   // Expose to useNuxtApp().$api
//   return {
//     provide: {
//       api,
//     },
//   };
// });
