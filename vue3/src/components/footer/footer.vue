<template>
  <section class="pagination">
    <p>Showing entry {{ positionInList + 1 }} / {{ numEntries }}</p>
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

    const progressInPercent = computed(() => (100 * (positionInList.value + 1)) / numEntries.value);

    return {
      props,
      positionInList,
      numEntries,
      progressInPercent,
    };
  },
};
</script>

<style scoped lang="postcss" vars="{ progressInPercent }">
  .pagination {
    @apply
      p-4
      leading-none
      text-center
      bg-gray;

    background-image: linear-gradient(to right, #ff299c 0%, #ff299c 100%);
    background-repeat: no-repeat;
    background-size: calc(var(--progressInPercent) * 1%) 100%;
  }

</style>
