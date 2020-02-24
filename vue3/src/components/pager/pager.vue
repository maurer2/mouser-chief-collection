<template>
  <button
    type="button"
    class="button absolute top-0"
    :class="{
      'button--is-disabled': props.isDisabled,
      'left-0': props.isPrevButton,
      'right-0': !props.isPrevButton,
    }"
    :disabled="props.isDisabled"
    @click="handleClick"
  >
    {{ props.isPrevButton ? 'Previous' : 'Next' }}
  </button>
</template>

<script>
export default {
  name: 'Pager',
  props: {
    isPrevButton: Boolean,
    isDisabled: Boolean,
  },
  setup(props, context) {
    function handleClick() {
      context.emit('pager-clicked', props.isPrevButton);
    }

    return {
      handleClick,
      props,
    };
  },
};
</script>

<style scoped lang="postcss">
  .button {
    @apply
      m-4
      p-2
      bg-pink-2
      text-white
      rounded
  }

  .button--is-disabled {
    @apply
      opacity-50
      cursor-not-allowed
  }

</style>
