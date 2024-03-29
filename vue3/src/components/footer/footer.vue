<template>
  <section class="pagination">
    <p class="text">{{ positionInListFormatted }} / {{ numEntries }}</p>
  </section>
</template>

<script lang="ts">
  import { defineComponent, computed, toRefs, PropType } from 'vue';

  export default defineComponent({
    name: 'Footer',
    components: {},
    props: {
      numEntries: {
        type: Number as PropType<number>,
        required: true,
        default: 0,
      },
      positionInList: {
        type: Number as PropType<number>,
        required: true,
        default: 0,
      },
    },
    setup(props) {
      const { positionInList, numEntries } = toRefs(props);

      const positionInListOneBased = computed<number>(() => positionInList.value + 1);
      const progressInPercent = computed<number>(() => {
        if (numEntries.value === 0) {
          return 0;
        }

        const percentsExact = (100 * positionInListOneBased.value) / numEntries.value;

        return Math.floor(percentsExact);
      });

      const positionInListFormatted = computed<string>(() => {
        const positionInListAsString = String(positionInListOneBased.value);
        const numEntriesAsString = String(numEntries.value);

        if (!String.prototype.padStart) {
          return positionInListAsString;
        }

        return positionInListAsString === '0'
          ? positionInListAsString
          : positionInListAsString.padStart(numEntriesAsString.length, '0');
      });

      return {
        positionInListFormatted,
        progressInPercent,
      };
    },
  });
</script>

<style scoped lang="postcss">
  .pagination {
    @apply p-4
      leading-none
      text-center
      text-white
      bg-gray
      bg-no-repeat
      bg-gradient-to-tr
      from-pink-2 to-pink-2;

    background-size: 0;
    /* stylelint-disable-next-line */
    background-size: calc(v-bind(progressInPercent) * 1%) 100%;
  }
</style>
