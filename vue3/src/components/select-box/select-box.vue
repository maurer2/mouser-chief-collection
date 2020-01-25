<template>
  <p>
    Entries: {{ numberOfEntries }} 
  </p>
  <p>
    Active entry: {{ activeKey }}
  </p>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Selectbox',
  props: {
    entries: Object,
    activeKey: String,
  },
  setup(props) {
    const { entries, activeKey } = props;
    const names = Object.keys(entries);

    console.log(activeKey)

    return {
      numberOfEntries: names.length,
      activeKey,
    }
  }
}
</script>

<style scoped>

</style>
