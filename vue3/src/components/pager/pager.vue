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

<style scoped>
  @reference "../../global.css";

  .button {
    @apply m-4
      p-2
      bg-pink-2
      text-white
      rounded-sm
      select-none
      self-start;

    &:hover {
      @apply bg-pink-1;
    }
  }

  .button--is-disabled {
    @apply opacity-50
      cursor-not-allowed;

    &:hover {
      @apply bg-pink-2;
    }
  }

  .button-prev {
    @apply mr-2;

    @variant md {
      @apply mr-4
        mb-auto;
    }
  }

  .button-next {
    @apply ml-2;

    @variant md {
      @apply mb-auto
        ml-4;
    }
  }
</style>
