<template>
  <div class="wrapper">
    <Entry :active-entry="data.activeEntry" />
  </div>
</template>

<script lang="ts">
import { reactive, computed } from 'vue';
import { router } from '../router';
import Entry from '../components/entry/entry.vue';

import entries from '../../../data/data_flattened.json';

export default {
  name: 'Cat',
  components: {
    Entry,
  },
  setup() {
    console.log('cat');

    const data = reactive({
      currentRoute: router.currentRoute,
      entry: computed(() => data.currentRoute.params.entry || ''),
      activeEntry: computed(() => entries[data.entry] || ''),
    });

    return {
      data,
    };
  },
};

</script>
