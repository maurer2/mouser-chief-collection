<template>
  <div class="wrapper">
    <Entry :active-entry="data.activeEntry" />
  </div>
</template>

<script lang="ts">
import { reactive, computed } from 'vue';
import Entry from '../components/entry/entry.vue';

import entries from '../../../data/data_flattened.json';

const entriesTransformedNested = Object.entries(entries).map((entry) => {
  const [key, value] = entry;

  return {
    [key.toLowerCase()]: value,
  };
});

const entriesTransformed = Object.assign({}, ...entriesTransformedNested);

export default {
  name: 'Cat',
  components: {
    Entry,
  },
  props: {
    entryName: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const data = reactive({
      activeEntry: computed(() => entriesTransformed[props.entryName] || ''),
    });

    return {
      data,
    };
  },
};

</script>
