<template>
  <Entry :active-entry="activeEntry" />
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useRoute } from 'vue-router';
    // eslint-disable-next-line
  import entries from '@data/data_flattened.json';
  import Entry from '../components/entry/entry.vue';

  export default defineComponent({
    name: 'Cat',
    components: {
      Entry,
    },
    setup(props, context) {
      const route = useRoute();
      const entry = computed(() => route.params.entry || '');
      const activeEntry = computed(() => entries[entry.value] || '');

      return {
        activeEntry,
      };
    },
  });
</script>
