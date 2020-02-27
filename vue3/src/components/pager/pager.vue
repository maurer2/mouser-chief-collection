<template>
  <button
    type="button"
    class="button"
    :class="{
      'button--is-disabled': props.isDisabled,
      'button-prev': props.isPrevButton,
      'button-next': !props.isPrevButton,
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
      m-0
      p-2
      bg-pink-2
      text-white
      rounded
  }

  .button-prev {
    @apply
      mr-4
  }

  .button-next {
    @apply
      ml-4
  }

  .button--is-disabled {
    @apply
      opacity-50
      cursor-not-allowed
  }

</style>
