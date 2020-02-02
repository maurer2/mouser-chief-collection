<template>
  <form @submit.prevent="handleUpdate">
    <h2 class="text-xl">
      Navigation
    </h2>

    <p>
      Active entry: {{ state.activeEntry }}
    </p>

    <div class="row flex items-stretch mt-4">
      <select
        class="flex-1 min-w-0"
        v-model="state.activeEntry"
        @change.prevent="handleUpdate"
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
import { reactive, watch } from 'vue'

export default {
  name: 'Selectbox',
  props: {
    entries: JSON,
    activeEntry: Object,
  },
  setup(props, { emit }) {
    const { entries, activeEntry } = props 
    const state = reactive({
      entries,
      activeEntry,
    });

    function handleUpdate(event){
      const newValue = event.target.value;

      emit('entry-selected', newValue);
    }

    return {
      state,
      handleUpdate,
    }
  }
}
</script>

<style scoped>

</style>
