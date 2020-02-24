<template>
  <form @submit.prevent="handleSubmit">
    <h2 class="title">
      Navigation
    </h2>
    <p v-if="!data.isDefaultSelection">
      <span>Selected entry: </span>
      <output
        for="select"
        class="font-bold"
      >
          {{ data.selectedEntry }}
      </output>
    </p>
    <div class="row">
      <select
        class="select"
        id="select"
        v-model="data.selectedEntry"
        @change="handleChange"
      >
        <option value="" disabled>Entries</option>
        <option
          v-for="value in data.list"
          :key="value"
          :value="value">
            {{ value }}
        </option>
      </select>
      <button
        type="submit"
        class="button"
        :class="{'button--is-disabled': data.isDefaultSelection}"
        :disabled="data.isDefaultSelection"
      >
        Select entry
      </button>
    </div>
  </form>

</template>

<script>
import { reactive, watchEffect, computed } from 'vue';

export default {
  name: 'Selectbox',
  props: {
    entryNames: Array,
    activeEntry: String,
  },
  setup(props, context) {
    const data = reactive({
      list: props.entryNames,
      selectedEntry: '',
      isDefaultSelection: computed(() => data.selectedEntry === ''),
    });

    watchEffect(() => {
      data.selectedEntry = props.activeEntry;
    });

    function handleChange(event) {
      data.selectedEntry = event.target.value;
      context.emit('entry-selected', event.target.value);
    }

    function handleSubmit() {
      context.emit('entry-selected', data.selectedEntry);
    }

    return {
      data,
      handleSubmit,
      handleChange,
    };
  },
};
</script>

<style scoped lang="postcss">
  .title {
    @apply
      mb-4
      text-xl;
  }

  .row {
    @apply
      mt-4
      flex
      items-stretch;
  }

  .select {
    @apply
      flex-1
      min-w-0;
  }

  .button {
    @apply
      p-2
      flex-initial
      bg-pink-2
      text-white
      rounded
  }

  .button--is-disabled {
    @apply
      opacity-50
      cursor-not-allowed
  }

  .button:hover {
    @apply
      bg-pink-1;
  }

</style>
