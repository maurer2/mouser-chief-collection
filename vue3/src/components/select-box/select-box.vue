<template>
  <form @submit.prevent="handleSubmit">
    <h2 class="text-xl">
      Navigation
    </h2>

    <p>
      Active entry: {{ state.activeKey }}
    </p>

    <select v-model="state.activeKey" @change.prevent="handleChange">
      <option
        v-for="(entryKey, index) in state.entryKeys"
        :key="entryKey"
        :value="index">
          {{ entryKey }}
      </option>
    </select>

    <button
      class="bg-pink-2 hover:bg-pink-1 text-white mt-4 ml-4 p-2 rounded"
      type="submit"
    >
      Select
    </button>
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
