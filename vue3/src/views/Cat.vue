<template>
  <Entry :name="name" :tenures="tenures" />
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  import { useMouserChiefs } from '../loaders/mouser-chiefs';
  import Entry from '../components/entry/entry.vue';

  defineOptions({ name: 'Cat' });

  const route = useRoute();
  const { data: entries } = useMouserChiefs();

  const name = computed<string>(() =>
    typeof route.params.entry === 'string' ? route.params.entry : '',
  );
  const tenures = computed(() => entries.value?.[name.value] ?? []);
</script>
