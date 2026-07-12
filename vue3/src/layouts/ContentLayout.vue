<template>
  <section :aria-labelledby="headingId">
    <h2 :id="headingId" class="title">{{ title }}</h2>
    <slot />
  </section>
</template>

<script setup lang="ts">
  import { useId } from 'vue';

  type ContentLayoutProps = {
    title: string;
  };

  defineOptions({ name: 'ContentLayout' });
  defineProps<ContentLayoutProps>();

  const headingId = useId();
</script>

<style scoped>
  @reference "../global.css";

  .title {
    @apply mt-2
      mb-4
      text-xl;
  }
</style>
