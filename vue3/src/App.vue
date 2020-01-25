<template>
  <select-box
    :entries="state.entries"
    :active-key="state.activeKey"
    :key="state.activeKey"
  />
  <button type="button" @click="selectNewEntry">
    Select Freya
  </button>

  <hr />

  <entry :entry="state.activeEntry" v-if="state.activeKey !== ''" />

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

<style scoped>

</style>
