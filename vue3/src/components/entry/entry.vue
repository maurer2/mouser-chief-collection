<template>
  <section class="entry">
    <h2 class="title">
      {{ title }}
    </h2>
    <template
      v-for="(fieldValue, fieldKey) in activeEntry"
      :key="fieldKey"
    >
      <dl
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

<script lang="ts">
import { defineComponent, computed } from 'vue';
import type { MouserChiefDetails } from '../../types';
import Subentry from '../subentry/subentry.vue';

type EntryProps = {
  activeEntry: MouserChiefDetails;
}

export default defineComponent({
  name: 'Entry',
  components: {
    Subentry,
  },
  props: {
    activeEntry: {
      type: Object,
      required: true,
      default: () => { /**/ },
    },
  },
  setup(props: EntryProps) {
    const title = computed(() => ((props.activeEntry !== null) ? props.activeEntry.Name : ''));

    return {
      title,
    };
  },
});

</script>

<style scoped lang="postcss">
  .entry {
    @apply
      p-4
      min-h-full
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
