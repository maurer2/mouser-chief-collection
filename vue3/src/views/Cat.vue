<template>
  <Entry :name="name" :tenures="tenures" />
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  import entriesJSON from '@data/data_normalized.json';
  import type { MouserChiefDetails, MouserChiefMap } from '../types/index';
  import Entry from '../components/entry/entry.vue';

  defineOptions({ name: 'Cat' });

  const entries: MouserChiefMap = entriesJSON;

  const route = useRoute();

  const name = computed<string>(() =>
    typeof route.params.entry === 'string' ? route.params.entry : '',
  );
  const tenures = computed<MouserChiefDetails[]>(() => entries[name.value] ?? []);
</script>
