<template>
  <div class="wrapper">
    Cat
    <template v-if="props">
      {{ props }}
    </template>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Cat-View',
  props: {
    activeKey: {
      type: String,
      default: '',
      required: true,
    },
  },
  setup(props) {
    console.log('setup', props);

    return props;
  },
};

</script>
