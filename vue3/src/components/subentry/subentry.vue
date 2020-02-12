<template>
  <div class="subentry">
    <template v-if="isPrimitive">
      <span class="text">
        {{ fieldValue }}
      </span>
    </template>
    <template v-else>
      <ol class="list list-disc list-inside pl-5">
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

</style>
