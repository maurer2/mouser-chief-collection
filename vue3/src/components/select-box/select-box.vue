<template>
  <form ref="formElement" @submit.prevent="handleSubmit" @reset.prevent="handleReset">
    <div class="row">
      <select id="select" :value="activeEntryName" class="select" required @change="handleChange">
        <option value="" disabled>Names</option>
        <option v-for="value in entryNames" :key="value" :value="value">
          {{ value }}
        </option>
      </select>
      <button type="reset" class="button button--reset" @click="handleReset()">X</button>
      <button type="submit" class="button button--submit" @click.prevent="handleClick()">
        Select entry
      </button>
    </div>
    <template v-if="!isDefaultSelection">
      <p class="output">
        <span>Selected entry: </span>
        <output for="select" class="font-bold">
          {{ activeEntryName }}
        </output>
      </p>
    </template>
  </form>
</template>

<script setup lang="ts">
  import { computed, useTemplateRef } from 'vue';

  defineOptions({ name: 'Selectbox' });

  type SelectBoxProps = {
    entryNames: string[];
    activeEntryName?: string;
  };

  const { activeEntryName = '' } = defineProps<SelectBoxProps>();

  const emit = defineEmits<{
    'entry-selected': [value: string];
  }>();

  const isDefaultSelection = computed<boolean>(() => activeEntryName === '');
  const formElement = useTemplateRef('formElement');

  function handleSubmit(): void {
    emit('entry-selected', activeEntryName);
  }

  function handleReset(): void {
    emit('entry-selected', '');
  }

  function handleClick(): void {
    formElement.value?.requestSubmit();
  }

  function handleChange($event: Event): void {
    const target = $event.target as HTMLInputElement | null;

    if (!target) {
      return;
    }

    emit('entry-selected', target.value);
  }
</script>

<style scoped>
  @reference "../../global.css";

  .title {
    @apply sr-only;
  }

  .row {
    @apply flex
      items-stretch;
  }

  .output {
    @apply mt-4;
  }

  .select {
    @apply flex-1
      pl-4
      min-w-0
      w-full
      appearance-none;

    /* https://github.com/filamentgroup/select-css/blob/master/src/select-css.css */
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FF299C%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
      linear-gradient(to bottom, #fff 0%, #fff 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 1rem top 50%, 0 0;
    background-size: 0.65rem auto, 100%;
  }

  .button {
    @apply ml-4
      p-2
      pl-4
      pr-4
      flex-initial
      rounded-sm
      bg-pink-2
      text-white;

    &:hover {
      @apply bg-pink-1;
    }
  }

  .button--is-disabled {
    @apply opacity-50
      cursor-not-allowed;
  }

  .button--reset {
    @apply hidden;

    @variant sm {
      display: unset;
    }
  }
</style>
