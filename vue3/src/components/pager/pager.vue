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

<script lang="ts">
  import { defineComponent, PropType } from 'vue';


  enum EmitValues {
    PagerClicked = 'pager-clicked',
  }

  export default defineComponent({
    name: 'Pager',
    props: {
      isPrevButton: Boolean as PropType<boolean>,
      isDisabled: Boolean as PropType<boolean>,
    },
    emits: [EmitValues.PagerClicked],
    setup(props, context) {
      function handleClick(): void {
        context.emit(EmitValues.PagerClicked, props.isPrevButton);
      }

      return {
        handleClick,
        props,
      };
    },
  });
</script>

<style scoped lang="postcss">
  .button {
    @apply m-4
      p-2
      bg-pink-2
      text-white
      rounded;

    &:hover {
      @apply bg-pink-1;
    }

    &--is-disabled {
      &:hover {
        @apply bg-pink-2;
      }

      @apply opacity-50
        cursor-not-allowed;
    }
  }

  .button-prev {
    grid-area: sidebar-left;

    @apply mr-2;

    @screen md {
      @apply mr-4
        mb-auto;
    }
  }

  .button-next {
    grid-area: sidebar-right;

    @apply ml-2;

    @screen md {
      @apply mb-auto
        ml-4;
    }
  }
</style>
