<template>
  <h1>Root</h1>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Root',
    setup() {
      console.log('root');
    },
  });
</script>
