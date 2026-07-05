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

<script setup lang="ts">
  defineOptions({ name: 'Pager' });

  type PagerProps = {
    isPrevButton?: boolean;
    isDisabled?: boolean;
  };

  const { isPrevButton = false, isDisabled = false } = defineProps<PagerProps>();

  const emit = defineEmits<{
    'pager-clicked': [];
  }>();

  function handleClick(): void {
    emit('pager-clicked');
  }
</script>

<style scoped lang="postcss">
  .button {
    @apply m-4
      p-2
      bg-pink-2
      text-white
      rounded
      select-none
      self-start;

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
