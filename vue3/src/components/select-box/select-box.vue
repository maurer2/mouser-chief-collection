<template>
  <form @submit.prevent="handleSubmit">
    <h2 class="title">
      Navigation
    </h2>
    <p v-if="data.newEntry">
      Active entry: {{ data.newEntry }}
    </p>
    <div class="row">
      <select
        class="select"
        v-model="data.newEntry"
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
        class="button"
        type="submit"
      >
        Select entry
      </button>
    </div>
  </form>

</template>

<script>
import { watch, reactive } from 'vue';

export default {
  name: 'Selectbox',
  props: {
    entries: Object,
    activeEntry: String,
  },
  setup(props, context) {
    const data = reactive({
      list: Object.keys(props.entries),
      newEntry: props.activeEntry,
    });

    watch(() => {
      data.newEntry = props.activeEntry;
      console.log('props.activeEntry', props.activeEntry);
    });

    function handleChange(event) {
      data.newEntry = event.target.value;
      context.emit('entry-selected', event.target.value);
    }

    function handleSubmit() {}

    return {
      props,
      handleSubmit,
      handleChange,
      data,
    };
  },
};
</script>

<style scoped lang="postcss">
  .title {
    @apply
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

  .button:hover {
    @apply
      bg-pink-1;
  }

</style>
