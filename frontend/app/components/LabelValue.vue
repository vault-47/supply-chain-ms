<template>
  <div>
    <b class="font-semibold">{{ label }}</b>
    <p>
      <slot name="value">Value here</slot>
    </p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(["label"]);
</script>
