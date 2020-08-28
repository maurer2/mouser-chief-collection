<template>
  <div class="wrapper">
    <Entry :active-entry="data.activeEntry" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
// eslint-disable-next-line
import entries from '/@data/data_flattened.json';
import Entry from '../components/entry/entry.vue';

export default defineComponent({
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
});

</script>
