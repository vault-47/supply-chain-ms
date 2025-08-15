import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "http://localhost:8080/api-json",
  output: {
    format: "biome",
    lint: "biome",
    path: "client",
  },
  plugins: [
    "@hey-api/schemas",
    {
      dates: true,
      name: "@hey-api/transformers",
    },
    {
      enums: "javascript",
      name: "@hey-api/typescript",
    },
    {
      name: "@hey-api/sdk",
      transformer: true,
    },
    {
      name: "@hey-api/client-nuxt",
      runtimeConfigPath: "./hey-api.ts",
    },
  ],
});
