<template>
  <h1>/Cat</h1>
</template>

<script lang="ts">
export default {
  setup(_, context) {
    setTimeout(() => {
      // console.log('setup', context.attrs);
    }, 2500);
  },
};

</script>
