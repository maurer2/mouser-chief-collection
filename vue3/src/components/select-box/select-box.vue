<template>
  <form @submit.prevent="handleSubmit">
    <h2 class="title">
      Navigation
    </h2>
    <p>
      Active entry: {{ activeEntry }}
    </p>
    <div class="row">
      <select
        class="select"
        v-model="activeEntry"
        @change.prevent="handleChange"
      >
        <option value="" disabled>Entries</option>
        <option
          v-for="(entryKey, index) in state.entries"
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
import { reactive, watch, ref } from 'vue';

export default {
  name: 'Selectbox',
  props: {
    entries: JSON,
  },
  setup(props, context) {
    const { entries } = props
    const activeEntry = ref('');

    const state = reactive({
      entries,
    });

    function handleChange(event){
      const newValue = event.target.value;
      // activeEntry.value contains stale value

      context.emit('entry-selected', newValue);
    }

    function handleSubmit(){
      const newValue = activeEntry.value;

      context.emit('entry-selected', newValue);
    }

    return {
      state,
      handleChange,
      handleSubmit,
      activeEntry,
    }
  }
}
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
