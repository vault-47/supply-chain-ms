<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent, RadioGroupItem } from "@nuxt/ui";
import { useHead } from "#imports";

useHead({
  title: "Supply chain MS | Create account",
});

const accountTypes = ref<RadioGroupItem[]>([
  {
    label: "Shipper",
    value: "SHIPPER",
    description: "You need to move goods from one place to another",
  },
  {
    label: "Vendor",
    value: "VENDOR",
    description: "You help customers move goods from place to place",
  },
]);

const register = await useRegister();
const toast = useToast();
const router = useRouter();

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Must be at least 8 characters"),
  repeat_password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Must be at least 8 characters"),
  role: z.string().min(1, "Account type is required"),
  business_name: z.string().min(1, "Business name is required"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Schema>({
  email: "",
  password: "",
  repeat_password: "",
  first_name: "",
  last_name: "",
  business_name: "",
  role: "",
});

async function onSubmit({ data }: FormSubmitEvent<Schema>) {
  try {
    const res = await register.mutateAsync(data);
    toast.add({
      title: res.message,
      icon: "i-lucide-circle-check",
    });
    router.push("/auth/login");
  } catch (error) {
    toast.add({
      title: error.data.message,
      description: "Try again",
      icon: "i-lucide-info",
      color: "error",
    });
  }
}
</script>

<template>
  <NuxtLayout name="auth-layout" layoutClass="max-w-xl">
    <template #header> Create account </template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <div class="grid grid-cols-2 gap-4">
        <UFormField label="Email address" name="email">
          <UInput
            icon="i-lucide-at-sign"
            name="email"
            autofocus
            size="lg"
            v-model="state.email"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Business name" name="business_name">
          <UInput
            name="business_name"
            autofocus
            size="lg"
            v-model="state.business_name"
            class="w-full"
          />
        </UFormField>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <UFormField label="First name" name="first_name">
          <UInput
            name="first_name"
            autofocus
            size="lg"
            v-model="state.first_name"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Last name" name="last_name">
          <UInput
            name="last_name"
            autofocus
            size="lg"
            v-model="state.last_name"
            class="w-full"
          />
        </UFormField>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <UFormField label="Password" name="password">
          <UInput
            size="lg"
            v-model="state.password"
            type="password"
            class="w-full"
            name="password"
          />
        </UFormField>

        <UFormField label="Repeat password" name="repeat_password">
          <UInput
            size="lg"
            v-model="state.repeat_password"
            type="password"
            class="w-full"
            name="repeat_password"
          />
        </UFormField>
      </div>
      <USeparator />
      <UFormField label="Account type" name="role">
        <URadioGroup
          name="role"
          v-model="state.role"
          color="primary"
          variant="table"
          default-value="SHIPPER"
          :items="accountTypes"
        />
      </UFormField>

      <UButton loading-auto class="mt-2" size="lg" type="submit" block>
        Create account
      </UButton>
    </UForm>
  </NuxtLayout>
</template>
