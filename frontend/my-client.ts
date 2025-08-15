import { createClient } from "./client/client";

const myClient = createClient({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: "Bearer <token_from_service_client>",
  },
});

export default myClient;
