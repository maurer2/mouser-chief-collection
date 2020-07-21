<template>
  <section class="pagination">
    <p class="text">
      {{ positionInListFormatted }} / {{ numEntries }}
    </p>
  </section>
</template>

<script>
import { computed, toRefs } from 'vue';

export default {
  name: 'Footer',
  components: {},
  props: {
    numEntries: {
      type: Number,
      required: true,
      default: 0,
    },
    positionInList: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  setup(props) {
    const { positionInList, numEntries } = toRefs(props);

    const positionInListOneBased = computed(() => positionInList.value + 1);

    const progressInPercent = computed(() => {
      const percentsExact = (100 * positionInListOneBased.value) / numEntries.value;

      return Math.floor(percentsExact);
    });

    const positionInListFormatted = computed(() => {
      const positionInListAsString = positionInListOneBased.value.toString();
      const numEntriesAsString = numEntries.value.toString();

      if (!String.prototype.padStart) {
        return positionInListAsString;
      }

      return (positionInListAsString === '0')
        ? positionInListAsString
        : positionInListAsString.padStart(numEntriesAsString.length, '0');
    });

    return {
      positionInListFormatted,
      numEntries,
      progressInPercent,
    };
  },
};
</script>

<style scoped lang="postcss" vars={ progressInPercent }>
  .pagination {
    @apply
      p-4
      leading-none
      text-white
      text-center
      bg-gray;

    background-image: linear-gradient(to right, #ff299c 0%, #ff299c 100%);
    background-repeat: no-repeat;
    background-size: calc(var(--progressInPercent) * 1%) 100%;
  }

</style>
