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
      const title = computed(() => (props.activeEntry !== null ? props.activeEntry.Name : ''));

      return {
        title,
      };
    },
  });
</script>

<style scoped lang="postcss">
  .entry {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: min-content repeat(8, max-content);

    @screen sm {
      grid-template-columns: max-content 1fr;
      grid-template-rows: min-content repeat(4, minmax(50px, max-content));
    }

    @apply p-4
      min-h-full
      bg-gray-light;
  }

  .title {
    grid-column: span 2;

    @apply mb-4
      text-xl;
  }

  .list {
    display: contents;
  }

  .list-key {
    @apply mr-5
      font-bold;

    grid-column: span 2;

    @screen sm {
      grid-column: auto;
    }
  }

  .list-value {
  }
</style>
