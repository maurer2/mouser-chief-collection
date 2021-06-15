<template>
  <button
    type="button"
    class="button"
    :class="{
      'button--is-disabled': isDisabled,
      'button-prev': isPrevButton,
      'button-next': !isPrevButton,
    }"
    :disabled="isDisabled"
    @click="handleClick"
  >
    {{ isPrevButton ? 'Previous' : 'Next' }}
  </button>
</template>

<script lang="ts">
  import { defineComponent, PropType, toRefs } from 'vue';

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
      const {isPrevButton, isDisabled} = toRefs(props)

      function handleClick(): void {
        context.emit(EmitValues.PagerClicked, isPrevButton);
      }

      return {
        handleClick,
        // eslint-disable-next-line vue/no-dupe-keys
        isPrevButton,
        // eslint-disable-next-line vue/no-dupe-keys
        isDisabled,
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
      rounded
      select-none;

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
