<template>
  <img src="./logo.png">

  <!-- eslint-disable -->
  <select-box :entries="entries" :active-key="activeKey" />
  <entry :entry="activeMouserChief" />
  <!-- eslint-enable -->
</template>

<script>
import selectBox from './components/select-box/select-box.vue';
import entry from './components/entry/entry.vue';

import entries from '../../data/data_flattened.json';

export default {
  components: {
    'select-box': selectBox,
    'entry': entry,
  },
  setup() {
    const activeKey = 'Larry';

    return {
      entries,
      activeKey,
    }
  }
}
</script>

<style scoped>

</style>
