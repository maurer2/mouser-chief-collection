<template>
  <div class="subentry">
    <template v-if="isPrimitive">
      <span class="text" v-if="fieldValue">
        {{ fieldValue }}
      </span>
      <span class="text" v-else>
        -
      </span>
    </template>
    <template v-else>
      <ol class="list">
        <li
          class="list-entry"
          v-for="(value, index) in fieldValue"
          :key="index"
        >
          {{ value }}
        </li>
      </ol>
    </template>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'Subentry',
  props: {
    fieldValue: [
      String,
      Array,
    ],
  },
  setup(props) {
    const isPrimitive = computed(() => !Array.isArray(props.fieldValue));

    return {
      isPrimitive,
    };
  },
};
</script>

<style scoped lang="postcss">
  .list {
    @apply
      pl-5
      list-disc
      list-inside;
  }

</style>
