<template>
  <NuxtLayout name="auth-layout">
    <template #header> Login </template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Email address" name="email">
        <UInput size="lg" v-model="state.email" class="w-full" />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput
          size="lg"
          v-model="state.password"
          type="password"
          class="w-full"
        />
      </UFormField>
      <UButton
        :loading="login.isLoading"
        loading-icon="i-lucide-loader"
        class="mt-2"
        size="lg"
        type="submit"
        block
      >
        Log in
      </UButton>
    </UForm>
  </NuxtLayout>
</template>

<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const login = useLogin();

const schema = z.object({
  email: z.string("Email is required").email("Invalid email"),
  password: z
    .string("Password is required")
    .min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await login.mutate({
    email: event.data.email,
    password: event.data.password,
  });
}
</script>
