<template>
  <div class="useless-wrapper-class-for-eslint-that-is-not-needed-anymore">
    <header class="header">
      <div class="wrapper">
        <select-box
          :entries="entries"
          :active-entry="activeEntry"
          @entry-selected="handleEntrySelected"
        />
      </div>
    </header>
    <main class="main relative">
      <div class="wrapper" v-if="activeEntry">
        <button
          class="button absolute left-0 top-0"
          :class="{ 'button--is-disabled': buttonPrevIsDisabled }"
          type="button"
          @click="handlePrevClick"
          :disabled="buttonPrevIsDisabled"
        >
          Previous
        </button>
        <entry :entry="activeEntry" />
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
    });

    const entryNames = Object.keys(entries);
    const activeEntry = computed(() => entries[state.activeKey] || null);
    const buttonPrevIsDisabled = computed(() => entryNames.indexOf(state.activeKey) === 0);
    const buttonNextDisabled = computed(() => entryNames.indexOf(state.activeKey) === entryNames.length - 1);

    function handleEntrySelected(value) {
      state.activeKey = value;
    }

    function handlePrevClick() {
      const currentIndex = entryNames.indexOf(state.activeKey) || 0;

      if (currentIndex === 0) {
        return;
      }

      const prevIndex = currentIndex - 1;
      const newValue = entryNames[prevIndex];

      state.activeKey = newValue;
    }

    function handleNextClick() {
      const lastEntryInArray = entryNames.length - 1;
      const currentIndex = entryNames.indexOf(state.activeKey);

      if (currentIndex === lastEntryInArray) {
        return;
      }

      const nextIndex = currentIndex + 1;
      const newValue = entryNames[nextIndex];

      state.activeKey = newValue;
    }

    watch(() => {
      console.log('activeEntry ', activeEntry.value);
    });

    return {
      entries,
      state,
      handleEntrySelected,
      activeEntry,
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
