<template>
  <div class="wrapper">
    Cat-View {{ props }}
  </div>
</template>

<script lang="ts">
import { reactive, watchEffect } from 'vue';

export default {
  name: 'Cat',
  props: {
    position: {
      type: Number,
      default: -1,
      required: true,
    },
  },
  setup(props) {
    const data = reactive({
      position: props.position,
    });

    watchEffect(() => {
      console.log('props.position ', props.position, data.position);
    });

    return {
      data,
      props,
    };
  },
};

</script>
