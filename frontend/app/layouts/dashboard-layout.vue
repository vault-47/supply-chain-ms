<script setup lang="ts">
import type { NavigationMenuItem, DropdownMenuItem } from "@nuxt/ui";

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
    // {
    //   label: "Quotes",
    //   icon: "i-lucide-banknote",
    //   to: "/composables",
    // },
    // {
    //   label: "Shipments",
    //   icon: "i-lucide-package",
    //   to: "/components",
    // },
    // {
    //   label: "Bookings",
    //   icon: "i-lucide-calendar",
    //   to: "/components",
    // },
    // {
    //   label: "Settings",
    //   icon: "i-lucide-settings",
    //   to: "/components",
    // },
  ],
]);
</script>

<template>
  <div class="">
    <div class="bg-white border-b border-gray-200">
      <div
        class="container max-w-7xl px-3 mx-auto w-full justify-between flex items-center"
      >
        <div class="flex items-center gap-5 max-w-3/4">
          <b class="text-primary font-semibold text-md flex items-center gap-1">
            <UIcon name="i-lucide-ship" class="size-5" />SCMS</b
          >
          <USeparator orientation="vertical" class="h-10" />
          <UNavigationMenu
            color="primary"
            :items="navItems"
            class="justify-center"
          />
        </div>
        <div class="flex items-center gap-4">
          <UButton icon="i-lucide-send">Request a quote</UButton>
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
    <div class="mt-4 container max-w-7xl px-3 mx-auto">
      <slot />
    </div>
  </div>
</template>
