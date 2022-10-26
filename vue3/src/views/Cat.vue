<template>
  <Entry :active-entry="activeEntry" />
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useRoute } from 'vue-router';

  import entries from '@data/data_flattened.json';
  import Entry from '../components/entry/entry.vue';

  export default defineComponent({
    name: 'Cat',
    components: {
      Entry,
    },
    setup() {
      const route = useRoute();
      const entry = computed(() => route.params.entry || '');
      const activeEntry = computed(() => entries[entry.value] || '');

      return {
        activeEntry,
      };
    },
  });
</script>
