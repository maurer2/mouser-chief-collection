<template>
  <section class="entry">
    <h2 class="title">{{ title }}</h2>
    <template v-for="(fieldValue, fieldKey) in activeEntry" :key="fieldKey">
      <dl class="list">
        <dt class="list-key">{{ fieldKey }}:</dt>
        <dd class="list-value">
          <Subentry :field-value="fieldValue" />
        </dd>
      </dl>
    </template>
  </section>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue';
  import Subentry from '../subentry/subentry.vue';
  import type { MouserChiefDetails } from '../../types/index'

  export default defineComponent({
    name: 'Entry',
    components: {
      Subentry,
    },
    props: {
      activeEntry: {
        type: Object as PropType<MouserChiefDetails>,
        required: true,
        default: () => {
          /**/
        },
      },
    },
    setup(props) {
      const title = computed(() => (props?.activeEntry?.Name ?? ''));

      return {
        title,
      };
    },
  });
</script>

<style scoped lang="postcss">
  .entry {
    @apply grid
      grid-cols-1
      auto-rows-[min-content_max-content]
      gap-x-4
      gap-y-2;

    @screen sm {
      @apply grid-cols-[max-content_1fr]
        auto-rows-[minmax(50px,max-content)];
    }

    @apply p-4
      min-h-full
      bg-gray-light;
  }

  .title {
    @apply mb-4
      col-span-full
      text-xl;
  }

  .list {
    @apply contents;
  }

  .list-key {
    @apply col-start-1
      col-span-1
      font-bold;

    @screen sm {
      @apply col-start-1
        col-span-1;
    }
  }

  .list-value {
    @apply col-start-1
      col-span-1;

    @screen sm {
      @apply col-start-2
        col-span-1;
    }
  }
</style>
