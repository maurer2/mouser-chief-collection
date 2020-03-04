<template>
  <div class="container">
    <header class="header">
      <div class="header-inner">
        <select-box
          :entryNames="entryNames"
          :active-entry="data.activeEntry"
          @entry-selected="handleEntrySelected"
        />
      </div>
    </header>
    <main class="main">
      <div class="main-inner" v-if="data.activeEntry">
        <pager
          :isPrevButton="true"
          :isDisabled="buttonPrevIsDisabled"
          @pager-clicked="handlePrevClick"
        />
        <entry :active-entry="entries[data.activeEntry]" />
        <pager
          :isPrevButton="false"
          :isDisabled="buttonNextIsDisabled"
          @pager-clicked="handleNextClick"
        />
      </div>
    </main>
    <footer class="footer">
      {{ entryNames.length }} entries loaded
    </footer>
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
    const data = reactive({
      activeKey: '',
      activeEntry: computed(() => data.activeKey || ''),
    });

    const entryNames = Object.keys(entries);
    const buttonPrevIsDisabled = computed(() => entryNames.indexOf(data.activeKey) === 0);
    const buttonNextIsDisabled = computed(() => entryNames.indexOf(data.activeKey) === entryNames.length - 1);

    function handleEntrySelected(value) {
      data.activeKey = value;
    }

    function handlePrevClick() {
      if (buttonPrevIsDisabled.value) {
        return;
      }

      const currentIndex = entryNames.indexOf(data.activeKey);
      const prevIndex = currentIndex - 1;
      const newValue = entryNames[prevIndex];

      data.activeKey = newValue;
    }

    function handleNextClick() {
      if (buttonNextIsDisabled.value) {
        return;
      }

      const currentIndex = entryNames.indexOf(data.activeKey);
      const nextIndex = currentIndex + 1;
      const newValue = entryNames[nextIndex];

      data.activeKey = newValue;
    }

    watchEffect(() => {
      console.log('activeEntry ', data.activeEntry);
    });

    return {
      entries,
      data,
      entryNames,
      buttonPrevIsDisabled,
      buttonNextIsDisabled,
      handleEntrySelected,
      handlePrevClick,
      handleNextClick,
    };
  },
};
</script>

<style scoped lang="postcss">
  .container {
    display: contents;
  }

  .header {
    @apply
      p-4
      bg-gray;

    &.button {
      @apply
        m-4;
    }
  }

  .header-inner {
    @screen md {
      margin: auto;
      width: calc(75% - 200px + 3rem);
    }
  }

  .main {
    @apply
      p-4
      bg-gray-light;
  }

  .main-inner {
    display: grid;
    grid-template-rows:
      min-content
      1fr
      min-content;
    grid-template-columns:
      1fr
      1fr;

    @screen md {
      grid-template-rows: 1fr;
      grid-template-columns:
        100px
        1fr
        100px;
      min-height: 100%;
      align-items: top;
    }
  }

  .button {
    grid-row: 1 / 2;

    @apply
      p-2
      bg-pink-2
      text-white
      rounded;

    @screen md {
      grid-row: 1;
      height: min-content;
    }

    &--is-disabled {
      @apply
        opacity-50
        cursor-not-allowed;
    }
  }

  .entry {
    grid-row: 2 / 2;
    grid-column: span 2;

    @apply
      mt-4;

    @screen md {
      grid-row: 1;
      grid-column: 2 / 3;
      margin: 0 auto;
      width: 75%;
    }
  }

  .footer {
    @apply
      p-2
      text-center
      bg-gray;
  }

</style>
