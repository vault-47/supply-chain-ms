<template>
  <div
    class="bg-slate-50 flex flex-col gap-10 items-center justify-center min-h-screen overflow-auto py-5"
  >
    <div class="flex justify-center"><Logo /></div>
    <UCard class="container max-w-sm" :class="layoutClass">
      <h1 class="font-semibold">
        <slot name="header">Default header content</slot>
      </h1>
      <USeparator class="my-3" />
      <slot />
    </UCard>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  layoutClass: {
    type: String,
    default: "",
  },
});
</script>
