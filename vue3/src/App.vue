<template>
  <div class="container">
    <header class="header">
      <div class="wrapper">
        <select-box
          :entryNames="entryNames"
          :active-entry="state.activeEntry"
          @entry-selected="handleEntrySelected"
        />
      </div>
    </header>
    <main class="main relative">
      <div class="wrapper" v-if="state.activeEntry">
        <pager
          :isPrevButton="true"
          :isDisabled="buttonPrevIsDisabled"
          @pager-clicked="handlePrevClick"
        />
        <entry :active-entry="entries[state.activeEntry]" />
        <pager
          :isPrevButton="false"
          :isDisabled="buttonNextIsDisabled"
          @pager-clicked="handleNextClick"
        />
      </div>
    </main>
  </div>

</template>

<script>
import { reactive, computed, watchEffect } from 'vue';
import entries from '../../data/data_flattened.json';

import selectBox from './components/select-box/select-box.vue';
import pager from './components/pager/pager.vue';
import entry from './components/entry/entry.vue';

export default {
  name: 'App',
  components: {
    'select-box': selectBox,
    entry,
    pager,
  },
  setup() {
    const state = reactive({
      activeKey: '',
      activeEntry: computed(() => state.activeKey || ''),
    });

    const entryNames = Object.keys(entries);
    const buttonPrevIsDisabled = computed(() => entryNames.indexOf(state.activeKey) === 0);
    const buttonNextIsDisabled = computed(() => entryNames.indexOf(state.activeKey) === entryNames.length - 1);

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
      if (buttonNextIsDisabled.value) {
        return;
      }

      const currentIndex = entryNames.indexOf(state.activeKey);
      const nextIndex = currentIndex + 1;
      const newValue = entryNames[nextIndex];

      state.activeKey = newValue;
    }

    watchEffect(() => {
      console.log('activeEntry ', state.activeEntry);
    });

    return {
      entries,
      state,
      entryNames,
      handleEntrySelected,
      buttonPrevIsDisabled,
      buttonNextIsDisabled,
      handlePrevClick,
      handleNextClick,
    };
  },
};
</script>

<style lang="postcss"></style>

<style scoped lang="postcss">
  .container {
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
