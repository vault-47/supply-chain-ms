<script setup lang="ts">
import type { NavigationMenuItem, DropdownMenuItem } from "@nuxt/ui";
import { useProfileStore } from "~/stores/profile";

const { data: profile, isFetching } = await useGetProfile();

const navItems = ref<NavigationMenuItem[]>([
  [
    {
      label: "Overview",
      icon: "i-lucide-chart-pie",
      to: "/overview",
    },
    {
      label: "Requests",
      icon: "i-lucide-file-text",
      to: "/requests",
    },
    {
      label: "Quotes",
      icon: "i-lucide-banknote",
      to: "/quotes",
    },
    {
      label: "Shipments",
      icon: "i-lucide-package",
      to: "/shipments",
    },
    {
      label: "Bookings",
      icon: "i-lucide-calendar",
      to: "/bookings",
    },
    {
      label: "Settings",
      icon: "i-lucide-settings",
      to: "/settings",
    },
  ],
]);
</script>

<template>
  <div>
    <div class="bg-white border-b border-gray-200">
      <div
        class="container max-w-7xl px-3 mx-auto w-full justify-between flex items-center"
      >
        <b
          class="text-primary font-semibold text-md min-w-1/5 flex items-center gap-1"
        >
          <UIcon name="i-lucide-ship" class="size-5" />SCMS</b
        >
        <div class="flex items-center gap-5 min-w-3/5">
          <UNavigationMenu
            color="primary"
            :items="navItems"
            class="justify-center"
            :ui="{
              list: 'space-x-2',
              link: 'before:bg-transparent',
            }"
          />
        </div>
        <div class="flex items-center justify-end gap-4 min-w-1/5">
          <UButton v-if="profile?.role === 'SHIPPER'" icon="i-lucide-send"
            >Request a quote</UButton
          >
          <UAvatar
            v-if="profile"
            class="text-xs"
            :alt="`${profile?.first_name} ${profile?.last_name}`"
            size="md"
          />
          <UIcon v-else name="i-lucide-loader" class="animate-spin size-5" />
        </div>
      </div>
    </div>
    <div class="container max-w-7xl px-3 mx-auto mt-4">
      <h1 class="font-semibold text-xl">
        <slot name="page-title">Page title</slot>
      </h1>
      <slot />
    </div>
  </div>
</template>
