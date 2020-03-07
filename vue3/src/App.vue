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
          class="pager pagger--prev"
          :isPrevButton="true"
          :isDisabled="buttonPrevIsDisabled"
          @pager-clicked="handlePrevClick"
        />
        <entry
          class="entry"
          :active-entry="entries[data.activeEntry]"
        />
        <pager
          class="pager pagger--next"
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
      "content content";

    @screen md {
      grid-template-rows: 1fr;
      grid-template-columns: 100px 1fr 100px;
      grid-template-areas: "sidebar-left content sidebar-right";
    }

    @apply
      p-4
      bg-gray-light;

    & .pagger--prev {
      grid-area: sidebar-left;
    }

    & .entry {
      grid-area: content;
    }

    & .pagger--next {
      grid-area: sidebar-right;
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
