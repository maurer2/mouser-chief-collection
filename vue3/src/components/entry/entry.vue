<template>
  <section class="entry">
    <h2 class="title">
      {{ title }}
    </h2>
    <template v-for="(fieldValue, fieldKey) in entry">
      <dl class="list" :key="fieldKey">
        <dt class="list-key">
          {{ fieldKey }}:
        </dt>
        <dd class="list-value">
          {{ fieldValue }}
        </dd>
      </dl>
    </template>
  </section>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'Entry',
  props: {
    entry: Object,
  },
  setup(props) {
    const title = computed(() => props.entry['Name']);

    return {
      title,
    };
  },
};
</script>

<style scoped lang="postcss">
  .title {
    @apply
      text-xl;
  }

  .list {
    @apply
      flex;
  }

  .list-key {
    @apply
      pr-1
      flex-none
      font-bold;
  }

  .list-value {
    @apply
      flex-1;
  }
</style>
