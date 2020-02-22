<template>
  <form @submit.prevent="handleSubmit">
    <h2 class="title">
      Navigation
    </h2>
    <template v-if="selectedEntry">
      <p>
        Active entry: {{ selectedEntry }}
      </p>
      <div class="row">
        <select
          class="select"
          v-model="newEntry"
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
    </template>
  </form>

</template>

<script>
import { watch, computed, ref } from 'vue';

export default {
  name: 'Selectbox',
  props: {
    entries: Object,
    activeEntry: Object,
  },
  setup(props, context) {
    const selectedEntry = computed(() => props.activeEntry['Name']);
    const newEntry = ref(props.activeEntry);

    watch(() => {
      console.log('activeEntry1', props.activeEntry);
      console.log('activeEntry11', selectedEntry);
    });

    function handleChange(event) {
      console.log(event.target.value);
      const newValue = event.target.value;

      newEntry.value = newValue;

      context.emit('entry-selected', newValue);
    }

    function handleSubmit() {
      /*
      const newValue = selectedEntry.value;

      context.emit('entry-selected', newValue);
      */
    }

    return {
      props,
      selectedEntry,
      handleChange,
      handleSubmit,
      newEntry,
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
