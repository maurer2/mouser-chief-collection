<template>
  <section class="entry">
    <h2 class="title">{{ name }}</h2>
    <template v-for="(tenure, tenureIndex) in tenures" :key="tenureIndex">
      <h3 v-if="hasMultipleTenures" class="subtitle">Term {{ tenureIndex + 1 }}</h3>
      <template v-for="(fieldValue, fieldKey) in tenure" :key="`${tenureIndex}-${fieldKey}`">
        <dl class="list">
          <dt class="list-key">{{ titleKeyMap[fieldKey] }}:</dt>
          <dd class="list-value">
            <Subentry :field-value="fieldValue" />
          </dd>
        </dl>
      </template>
    </template>
  </section>
</template>

<script lang="ts">
  import { defineComponent, computed, type PropType } from 'vue';
  import Subentry from '../subentry/subentry.vue';
  import type { MouserChiefDetails, MouserChiefDetailsMap } from '../../types/index';

  export default defineComponent({
    name: 'Entry',
    components: {
      Subentry,
    },
    props: {
      name: {
        type: String as PropType<string>,
        required: true,
        default: '',
      },
      tenures: {
        type: Array as PropType<MouserChiefDetails[]>,
        required: true,
        default: () => [],
      },
    },
    setup(props) {
      const hasMultipleTenures = computed<boolean>(() => props.tenures.length > 1);

      const titleKeyMap: MouserChiefDetailsMap = {
        beganTenure: 'Start of tenure',
        endedTenure: 'End of tenure',
        timeInOffice: 'Time in office',
        primeMinisters: 'Prime ministers',
      };

      return {
        hasMultipleTenures,
        titleKeyMap,
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

  .subtitle {
    @apply mt-2
      col-span-full
      font-bold;
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
