<template>
  <form
    @submit.prevent="handleSubmit"
    @reset.prevent="handleReset"
  >
    <h2 class="title">
      Navigation
    </h2>
    <template v-if="!data.isDefaultSelection">
      <p class="output">
        <span>Selected entry: </span>
        <output
          for="select"
          class="font-bold"
        >
          {{ data.selectedEntry }}
        </output>
      </p>
    </template>
    <div class="row">
      <select
        id="select"
        v-model="data.selectedEntry"
        class="select"
        @change="handleChange"
      >
        <option
          value=""
          disabled
        >
          Entries
        </option>
        <option
          v-for="value in data.list"
          :key="value"
          :value="value"
        >
          {{ value }}
        </option>
      </select>
      <button
        type="reset"
        class="button button--reset"
        :class="{'button--is-disabled': data.isDefaultSelection}"
        :disabled="data.isDefaultSelection"
      >
        X
      </button>
      <button
        type="submit"
        class="button button--submit"
        :class="{'button--is-disabled': data.isDefaultSelection}"
        :disabled="data.isDefaultSelection"
      >
        Select entry
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { reactive, watchEffect, computed } from 'vue';

export default {
  name: 'Selectbox',
  props: {
    entryNames: {
      type: Array,
      required: true,
      default: () => [],
    },
    activeEntry: {
      type: String,
      required: true,
      default: '',
    },
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

    function handleReset() {
      context.emit('entry-selected', '');
    }

    return {
      data,
      handleSubmit,
      handleReset,
      handleChange,
    };
  },
};
</script>

<style scoped lang="postcss">
  .title {
    @apply
      sr-only;
  }

  .row {
    @apply
      flex
      items-stretch;
  }

  .output {
    @apply
      mb-4;
  }

  .select {
    @apply
      flex-1
      min-w-0
      w-full;
  }

  .button {
    @apply
      ml-4
      p-2
      pl-4
      pr-4
      flex-initial
      bg-pink-2
      text-white
      rounded;

    &--is-disabled {
      @apply
        opacity-50
        cursor-not-allowed;
    }

    &:hover {
      @apply
        bg-pink-1;
    }
  }

  .button--reset {
    display: none;

    @screen sm {
      display: unset;
    }
  }

</style>
