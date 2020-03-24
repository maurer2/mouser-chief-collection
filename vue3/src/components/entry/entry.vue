<template>
  <section class="entry">
    <h2 class="title">
      {{ title }}
    </h2>
    <template v-for="(fieldValue, fieldKey) in activeEntry">
      <dl
        :key="fieldKey"
        class="list"
      >
        <dt class="list-key">
          {{ fieldKey }}:
        </dt>
        <dd class="list-value">
          <Subentry :field-value="fieldValue" />
        </dd>
      </dl>
    </template>
  </section>
</template>

<script>
import { computed } from 'vue';
import Subentry from '../subentry/subentry.vue';

export default {
  name: 'Entry',
  components: {
    Subentry,
  },
  props: {
    activeEntry: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  setup(props) {
    const title = computed(() => ((props.activeEntry !== null) ? props.activeEntry.Name : ''));

    return {
      title,
    };
  },
};
</script>

<style scoped lang="postcss">
  .entry {
    min-height: 100%;

    @apply
      p-4
      bg-gray-light;
  }

  .title {
    @apply
      mb-4
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
