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

<script>
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
      pl-4
      min-w-0
      w-full
      appearance-none;

    // https://github.com/filamentgroup/select-css/blob/master/src/select-css.css
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'), linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 1rem top 50%, 0 0;
    background-size: .65em auto, 100%;
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
