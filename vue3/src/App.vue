<template>
  <div class="wrapper">
    <header class="header">
      <select-box
        :entryNames="entryNames"
        :active-entry="data.activeEntry"
        @entry-selected="handleEntrySelected"
      />
    </header>
    <main class="main">
      <template v-if="data.activeEntry">
        <pager
          class="pager pagger--left"
          :isPrevButton="true"
          :isDisabled="buttonPrevIsDisabled"
          @pager-clicked="handlePrevClick"
        />
        <entry :active-entry="entries[data.activeEntry]" />
        <pager
          class="pager pagger--right"
          :isPrevButton="false"
          :isDisabled="buttonNextIsDisabled"
          @pager-clicked="handleNextClick"
        />
      </template>
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
  .wrapper {
    display: contents;
  }

  .header {
    grid-area: header;

    @apply
      p-4
      bg-gray;

    &.button {
      @apply
        m-4;
    }
  }

  .main {
    grid-area: main;

    display: grid;
    grid-template-rows:
      50px
      1fr;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
        "sidebar-left sidebar-right"
        "main main"
      ;

    @screen md {
      grid-template-rows:
        1fr;
      grid-template-columns: 100px 1fr 100px;
      grid-template-areas:
        "sidebar-left main sidebar-right"
      ;
      min-height: 100%;
      align-items: top;
    }

    @apply
      p-4
      bg-gray-light;

    .button {
      @apply
        p-2
        bg-pink-2
        text-white
        rounded;

      @screen md {
        height: min-content;
      }

      &--is-disabled {
        @apply
          opacity-50
          cursor-not-allowed;
      }
    }

    .pagger--left {
      grid-area: sidebar-left;
    }

    .pagger--right {
      grid-area: sidebar-right;
    }
  }

  .entry {
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
    grid-area: footer;

    @apply
      p-2
      text-center
      bg-gray;
  }

</style>
