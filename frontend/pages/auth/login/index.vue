<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const login = await useLogin();
const toast = useToast();

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Schema>({
  email: "",
  password: "",
});

async function onSubmit({ data }: FormSubmitEvent<Schema>) {
  try {
    await login.mutateAsync(data);
  } catch (error) {
    toast.add({
      title: error.response.data.message,
      description: "Try again",
      icon: "i-lucide-info",
      color: "error",
    });
    console.log(error);
  }
}
</script>

<template>
  <NuxtLayout name="auth-layout">
    <template #header> Login </template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Email address" name="email">
        <UInput
          name="email"
          autocomplete="email"
          autofocus
          size="lg"
          v-model="state.email"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput
          size="lg"
          v-model="state.password"
          type="password"
          class="w-full"
          name="password"
          autocomplete="current-password"
        />
      </UFormField>
      <UButton
        :loading="login.isLoading"
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
