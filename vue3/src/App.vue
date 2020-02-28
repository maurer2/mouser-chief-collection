<template>
  <div class="container">
    <header class="header">
      <div class="wrapper">
        <select-box
          :entryNames="entryNames"
          :active-entry="data.activeEntry"
          @entry-selected="handleEntrySelected"
        />
      </div>
    </header>
    <main class="main">
      <div class="wrapper wrapper--grid" v-if="data.activeEntry">
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
      Footer
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

<style lang="postcss"></style>

<style scoped lang="postcss">
  .container {
    display: contents;
  }

  .header {
    @apply
      p-4
      bg-gray;

      .button {
        @apply
          m-4
      }
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
      bg-gray-light
  }

  .wrapper--grid {
    display: grid;
    grid-template-rows:
      min-content
      1fr
      min-content
    ;
    grid-template-columns:
      1fr
      1fr
    ;

    @screen md {
      grid-template-rows:
        1fr
      ;

      grid-template-columns:
        100px
        1fr
        100px
      ;
    }
  }

  .button {
    grid-row: 1 / 2;

    @screen md {
      grid-row: 1;
      height: min-content;
    }

    @apply
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

  .entry {
    grid-row: 2 / 2;
    grid-column: span 2;

    @screen md {
      grid-row: 1;
      grid-column: 2 / 3;

      @apply
        mt-0
    }

    @apply
      mt-4
  }

</style>
