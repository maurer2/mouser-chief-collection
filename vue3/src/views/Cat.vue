<template>
  <div class="wrapper">
    <Entry :active-entry="data.activeEntry" />
  </div>
</template>

<script lang="ts">
import { reactive, computed } from 'vue';
import { useRoute } from 'vue-router';

import Entry from '../components/entry/entry.vue';

import entries from '../../../data/data_flattened.json';

export default {
  name: 'Cat',
  components: {
    Entry,
  },
  setup() {
    const route = useRoute();

    const data = reactive({
      currentRoute: route,
      entry: computed(() => route.params.entry || ''),
      activeEntry: computed(() => entries[data.entry] || ''),
    });

    return {
      data,
    };
  },
};

</script>
