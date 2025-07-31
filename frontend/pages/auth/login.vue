<template>
  <div>
    <NuxtLayout name="auth-layout">
      <template #header> Login </template>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
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
        <UButton class="mt-2" size="lg" type="submit" block> Log in </UButton>
      </UForm>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import { AuthApi, Configuration } from "~/client/index";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
});

const toast = useToast();
const config = useRuntimeConfig();
const api = new AuthApi(new Configuration());

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await api.authControllerLogin({
    email: event.data.email,
    password: event.data.password,
  });
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
  console.log(event.data);
}
</script>
