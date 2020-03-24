<template>
  <div class="wrapper">
    <Entry
      class="entry"
      :active-entry="data.activeEntry"
    />
  </div>
</template>

<script lang="ts">
import { reactive, watchEffect, getCurrentInstance, computed } from 'vue';
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

    watchEffect(() => {
      console.log('data.currentRoute ', data.currentRoute);
      console.log(data.activeEntry);
    });

    return {
      data,
    };
  },
};

</script>
