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
    entry: {
      type: String,
      default: '',
      required: true,
    },
  },
  setup(props) {
    const data = reactive({
      entry: props.entry,
    });

    watchEffect(() => {
      console.log('props.position ', props.entry, data.entry);
    });

    return {
      data,
      props,
    };
  },
};

</script>
