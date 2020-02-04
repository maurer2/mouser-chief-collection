<template>
  <form @submit.prevent="handleSubmit">
    <h2 class="title">
      Navigation
    </h2>
    <p v-if="selectedEntry">
      Active entry: {{ selectedEntry }}
    </p>
    <div class="row">
      <select
        class="select"
        v-model="selectedEntry"
        @change.prevent="handleChange"
      >
        <option :value="null" disabled>Entries</option>
        <option
          v-for="(entryKey, index) in props.entries"
          :key="entryKey"
          :value="index">
            {{ entryKey.Name }}
        </option>
      </select>
      <button
        class="button"
        type="submit"
      >
        Select an entry
      </button>
    </div>
  </form>

</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Selectbox',
  props: {
    entries: Object,
    activeEntry: Object,
  },
  setup(props, context) {
    const selectedEntry = ref(props.activeEntry);

    function handleChange(event) {
      const newValue = event.target.value;

      selectedEntry.value = newValue;

      context.emit('entry-selected', newValue);
    }

    function handleSubmit() {
      const newValue = selectedEntry.value;

      context.emit('entry-selected', newValue);
    }

    return {
      props,
      selectedEntry,
      handleChange,
      handleSubmit,
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
