<template>
  <section class="pagination">
    <p class="text">{{ positionInListFormatted }} / {{ numEntries }}</p>
  </section>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  defineOptions({ name: 'Footer' });

  type FooterProps = {
    numEntries: number;
    positionInList: number;
  };

  const { positionInList, numEntries } = defineProps<FooterProps>();

  const positionInListOneBased = computed<number>(() => positionInList + 1);

  const progressInPercent = computed<number>(() => {
    if (numEntries === 0) {
      return 0;
    }

    const percentsExact = (100 * positionInListOneBased.value) / numEntries;

    return Math.floor(percentsExact);
  });

  const positionInListFormatted = computed<string>(() => {
    const positionInListAsString = String(positionInListOneBased.value);
    const numEntriesAsString = String(numEntries);

    return positionInListAsString === '0'
      ? positionInListAsString
      : positionInListAsString.padStart(numEntriesAsString.length, '0');
  });
</script>

<style scoped>
  @reference "../../global.css";

  .pagination {
    @apply p-4
      leading-none
      text-center
      text-white
      bg-gray
      bg-no-repeat
      bg-linear-to-tr
      from-pink-2 to-pink-2;

    background-size: 0;
    /* stylelint-disable-next-line */
    background-size: calc(v-bind(progressInPercent) * 1%) 100%;
  }
</style>
