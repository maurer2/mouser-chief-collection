<template>
  <div class="wrapper">
    <Entry :active-entry="data.activeEntry" />
  </div>
</template>

<script lang="ts">
import { reactive, getCurrentInstance, computed } from 'vue';
import Entry from '../components/entry/entry.vue';

import entries from '../../../data/data_flattened.json';

export default {
  name: 'Cat',
  components: {
    Entry,
  },
  setup() {
    const { router } = getCurrentInstance().appContext.provides;
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
