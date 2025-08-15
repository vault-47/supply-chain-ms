<template>
  <div
    class="bg-slate-50 flex flex-col gap-10 items-center justify-center h-screen"
  >
    <UCard class="container max-w-sm">
      <h1 class="font-semibold">
        <slot name="header">Default header content</slot>
      </h1>
      <USeparator class="my-3" />
      <slot />
    </UCard>
  </div>
</template>
