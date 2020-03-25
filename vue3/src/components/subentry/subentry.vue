<template>
  <div class="subentry">
    <template v-if="isPrimitive">
      <span
        v-if="fieldValue"
        class="text"
      >
        {{ fieldValue }}
      </span>
      <span
        v-else
        class="text"
      >
        -
      </span>
    </template>
    <template v-else>
      <ol class="list">
        <li
          v-for="(value, index) in fieldValue"
          :key="index"
          class="list-entry"
        >
          {{ value }}
        </li>
      </ol>
    </template>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';

export default {
  name: 'Subentry',
  props: {
    fieldValue: {
      type: [String, Array],
      required: true,
      default: '',
    },
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
