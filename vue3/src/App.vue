<template>
  <div class="useless-wrapper-class-for-eslint-that-is-not-needed-anymore">
    <header class="header">
      <div class="wrapper">
        <select-box
          :entries="entries"
          :active-entry="state.activeEntry"
          @entry-selected="handleEntrySelected"
        />
      </div>
    </header>
    <main class="main relative">
      <div class="wrapper" v-if="state.activeEntry || true">
        <button
          class="button absolute left-0 top-0"
          :class="{ 'button--is-disabled': buttonPrevIsDisabled }"
          type="button"
          @click="handlePrevClick"
          :disabled="buttonPrevIsDisabled"
        >
          Previous
        </button>
        <entry :active-entry="entries[state.activeEntry]" />
        <button
          class="button absolute right-0 top-0"
          :class="{ 'button--is-disabled': buttonNextDisabled }"
          type="button"
          @click="handleNextClick"
          :disabled="buttonNextDisabled"
        >
          Next
        </button>
      </div>
    </main>
  </div>

</template>

<script>
import { reactive, computed, watch } from 'vue';
import entries from '../../data/data_flattened.json';

import selectBox from './components/select-box/select-box.vue';
import entry from './components/entry/entry.vue';

export default {
  name: 'App',
  components: {
    'select-box': selectBox,
    entry,
  },
  setup() {
    const state = reactive({
      activeKey: '',
      activeEntry: computed(() => state.activeKey || ''),
    });

    const entryNames = Object.keys(entries);
    const buttonPrevIsDisabled = computed(() => entryNames.indexOf(state.activeKey) === 0);
    const buttonNextDisabled = computed(() => entryNames.indexOf(state.activeKey) === entryNames.length - 1);

    function handleEntrySelected(value) {
      console.log('received nav entry:', value);
      state.activeKey = value;
    }

    function handlePrevClick() {
      if (buttonPrevIsDisabled.value) {
        return;
      }

      const currentIndex = entryNames.indexOf(state.activeKey);
      const prevIndex = currentIndex - 1;
      const newValue = entryNames[prevIndex];

      state.activeKey = newValue;
    }

    function handleNextClick() {
      if (buttonNextDisabled.value) {
        return;
      }

      const currentIndex = entryNames.indexOf(state.activeKey);
      const nextIndex = currentIndex + 1;
      const newValue = entryNames[nextIndex];

      state.activeKey = newValue;
    }

    watch(() => {
      console.log('activeEntry ', state.activeEntry);
    });

    return {
      entries,
      state,
      handleEntrySelected,
      buttonPrevIsDisabled,
      buttonNextDisabled,
      handlePrevClick,
      handleNextClick,
    };
  },
};
</script>

<style lang="postcss"></style>

<style scoped lang="postcss">
  .useless-wrapper-class-for-eslint-that-is-not-needed-anymore {
    display: contents;
  }

  .header {
    @apply
      p-4
      flex-initial
      bg-gray;
  }

  .wrapper {
    @apply
      w-8/12
      m-auto
      min-w-full;

    @screen md {
      @apply
        min-w-0;
    }
  }

  .main {
    @apply
      p-4
      flex-1
      bg-gray-light
  }

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
