<template>
  <header class="p-4 bg-gray">
    <select-box
      :entries="state.entries"
      :active-key="state.activeKey"
      :key="state.activeKey"
    />
    <button
      class="bg-pink-2 hover:bg-pink-1 text-white mt-4 p-2 rounded"
      type="button"
      @click="selectNewEntry"
    >
      Select Freya
    </button>
  </header>

  <main class="p-4 bg-gray-light">
    <entry :entry="state.activeEntry" v-if="state.activeKey !== ''" />
  </main>

</template>

<script>
import { reactive, computed , onMounted } from 'vue'
import entriesList from '../../data/data_flattened.json';

import selectBox from './components/select-box/select-box.vue';
import entry from './components/entry/entry.vue';

export default {
  name: 'App',
  components: {
    'select-box': selectBox,
    'entry': entry,
  },
  setup() {
    const state = reactive({
      activeKey: '',
      activeEntry: computed(() => state.entries[state.activeKey]),
      entries: entriesList,
    });

    function selectNewEntry() {
      state.activeKey = 'Freya';
    }

    onMounted(() => {
      state.activeKey = 'Larry';
    })

    return {
      state,
      selectNewEntry,
    }
  }
}
</script>

<style lang="postcss">
  body {
    background: #ffffff;
  }
</style>

<style scoped lang="postcss">
  .test {

  }
</style>
