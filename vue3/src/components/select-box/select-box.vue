<template>
  <form @submit.prevent="handleSubmit">
    <h2 class="text-xl">
      Navigation
    </h2>
    <p>
      Active entry: {{ activeEntry }}
    </p>
    <div class="row flex items-stretch mt-4">
      <select
        class="flex-1 min-w-0"
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
        class="bg-pink-2 hover:bg-pink-1 text-white p-2 rounded flex-initial"
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

<style scoped>

</style>
