<template>
  <form @submit.prevent="handleSubmit">
    <h2 class="text-xl">
      Navigation
    </h2>

    <p>
      Active entry: {{ state.activeKey }}
    </p>

    <div class="row flex items-stretch mt-4">
      <select
        class="flex-1"
        v-model="state.activeKey"
        @change.prevent="handleChange"
      >
        <option
          v-for="(entryKey, index) in state.entryKeys"
          :key="entryKey"
          :value="index">
            {{ entryKey }}
        </option>
      </select>
      <button
        class="bg-pink-2 hover:bg-pink-1 text-white p-2 rounded flex-initial"
        type="submit"
      >
        Select
      </button>
    </div>
  </form>

</template>

<script>
import { reactive, watch } from 'vue'

export default {
  name: 'Selectbox',
  props: {
    entries: Object,
    activeKey: String,
    entryKeys: Array,
  },
  setup(props, { emit }) {
    const state = reactive({
      entries: props.entries,
      activeKey: props.activeKey,
      entryKeys: props.entryKeys,
    });

    function handleSubmit(){
      console.log('handleSubmit', state.activeKey);
    }

    function handleChange(){
      console.log('handleChange', state.activeKey);
    }

    watch(() => {
      console.log('change');
      emit('entrySelected', state);
    })

    return {
      state,
      handleSubmit,
      handleChange,
    }
  }
}
</script>

<style scoped>

</style>
