<script setup lang="ts">
const toaster = { position: "bottom-right" };
</script>

<template>
  <div>
    <NuxtLayout>
      <UApp :toaster="toaster">
        <NuxtPage />
      </UApp>
    </NuxtLayout>
  </div>
</template>
