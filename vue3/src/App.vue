<template>
  <header class="p-4 bg-gray flex-initial">
    <div class="wrapper w-6/12 m-auto min-w-full md:min-w-0">
      <select-box
        :entries="state.entries"
        :active-key="state.activeKey"
        :key="state.activeKey"
        :entry-keys="state.entryKeys"
        @entry-selected="handleEntrySelected"
      />
    </div>
  </header>

  <main class="p-4 bg-gray-light flex-1">
    <div class="wrapper w-6/12 m-auto min-w-full md:min-w-0">
      <entry :entry="state.activeEntry" v-if="state.activeKey !== ''" />
    </div>
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
    const entryKeys = Object.keys(entriesList)

    const state = reactive({
      activeKey: '',
      activeEntry: computed(() => entriesList[state.activeKey]),
      entries: entriesList,
      entryKeys,
    });

    function selectNewEntry() {
      state.activeKey = 'Freya';
    }

    function handleEntrySelected(value) {
      console.log(value)
    }

    onMounted(() => {
      state.activeKey = 'Larry';
    })

    return {
      state,
      selectNewEntry,
      handleEntrySelected,
    }
  }
}
</script>

<style lang="postcss">
</style>

<style scoped lang="postcss">
</style>
