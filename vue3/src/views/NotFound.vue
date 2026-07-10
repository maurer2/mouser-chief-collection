<template>
  <div class="entry">
    <h1>404</h1>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'NotFound' });
</script>

<style scoped>
  @reference "../global.css";

  .entry {
    @apply p-4
      min-h-full
      bg-gray-light;
  }
</style>
