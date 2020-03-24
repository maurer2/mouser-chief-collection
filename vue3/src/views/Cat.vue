<template>
  <div class="wrapper">
    Cat-View {{ data.currentRoute.params }}
  </div>
</template>

<script lang="ts">
import { reactive, watchEffect, getCurrentInstance } from 'vue';

export default {
  name: 'Cat',
  setup(props) {
    const { router } = getCurrentInstance().appContext.provides;
    const data = reactive({
      entry: props.entry,
      currentRoute: router.currentRoute,
    });

    watchEffect(() => {
      console.log('data.currentRoute ', data.currentRoute);
    });

    return {
      data,
      props,
    };
  },
};

</script>
