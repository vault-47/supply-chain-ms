export const useAPIFetch: typeof useFetch = (request, opts) => {
  const config = useRuntimeConfig();
  return useFetch(request, {
    baseURL: config.public.baseURL,
    onRequest({ request, options }) {
      // Set the request headers
    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
    },
    onResponse({ request, response, options }) {
      // Process the response data
      return response._data;
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
    },
    ...opts,
  });
};
