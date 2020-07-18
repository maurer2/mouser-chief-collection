<template>
  <section
    class="pagination"
    :style="cssVars"
  >
    <p class="text">
      {{ positionInList + 1 }} / {{ numEntries }}
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

    const progressInPercent = computed(() => (100 * (positionInList.value + 1)) / numEntries.value);
    const cssVars = {
      '--progressInPercent': progressInPercent,
    };

    return {
      positionInList,
      numEntries,
      progressInPercent,
      cssVars,
    };
  },
};
</script>

<style scoped lang="postcss">
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
