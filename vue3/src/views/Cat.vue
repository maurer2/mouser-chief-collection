<template>
  <Entry :name="name" :tenures="tenures" />
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useRoute } from 'vue-router';

  import entriesJSON from '@data/data_normalized.json';
  import type { MouserChiefMap } from '../types/index';
  import Entry from '../components/entry/entry.vue';

  const entries: MouserChiefMap = entriesJSON;

  export default defineComponent({
    name: 'Cat',
    components: {
      Entry,
    },
    setup() {
      const route = useRoute();
      const name = computed<string>(() => (route.params.entry as string) || '');
      const tenures = computed(() => entries[name.value] ?? []);

      return {
        name,
        tenures,
      };
    },
  });
</script>
