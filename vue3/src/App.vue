<template>
  <div class="wrapper">
    <header class="header">
      <h1 class="title">
        <Link
          to="/"
          text="Mouser-Chief-Collection"
          class="title-link"
        />
      </h1>
    </header>
    <nav class="nav">
      <SelectBox
        :entry-names="entryNames"
        :active-entry="data.activeEntry"
        @entry-selected="handleEntrySelected"
      />
    </nav>
    <main class="main">
      <template v-if="data.activeEntry">
        <Pager
          :is-prev-button="true"
          :is-disabled="buttonPrevIsDisabled"
          @pager-clicked="handlePrevClick"
        />
        <div class="content">
          <View />
        </div>
        <Pager
          :is-prev-button="false"
          :is-disabled="buttonNextIsDisabled"
          @pager-clicked="handleNextClick"
        />
      </template>
    </main>
    <footer class="footer">
      <div>
        {{ entryNames.length }} entries loaded
      </div>
    </footer>
  </div>
</template>

<script>
import {
  reactive, computed, watchEffect, getCurrentInstance,
} from 'vue';
import { Link, View } from 'vue-router';

import entries from '../../data/data_flattened.json';

import SelectBox from './components/select-box/select-box.vue';
import Pager from './components/pager/pager.vue';

const entryNames = Object.keys(entries);

export default {
  name: 'App',
  components: {
    SelectBox,
    Pager,
    Link,
    View,
  },
  setup() {
    const data = reactive({
      activeKey: '',
      activeEntry: computed(() => data.activeKey || ''),
      positionInList: computed(() => entryNames.indexOf(data.activeKey)),
    });

    const { router } = getCurrentInstance().appContext.provides;

    const buttonPrevIsDisabled = computed(() => data.positionInList === 0);
    const buttonNextIsDisabled = computed(() => data.positionInList === entryNames.length - 1);

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
      if (data.activeEntry === '') {
        router.push({ path: '/' });
        return;
      }

      router.push({ path: `/cat/${data.activeEntry}` });
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

  .title {
    @apply
      m-0
      leading-normal
      text-xl
      text-white;
  }

  .title-link {
    color: inherit;

    @apply
      no-underline;
  }

  .header {
    grid-area: header;

    @apply
      p-4
      text-center
      bg-pink-2;
  }

  .nav {
    grid-area: nav;

    @apply
      p-4
      bg-gray;
  }

  .view {
    padding: 1rem;
    text-align: center;
    background: lightgreen;
  }

  .main {
    display: grid;
    grid-area: main;
    grid-template-areas:
      "content content"
      "sidebar-left sidebar-right";
    grid-template-rows:
      1fr
      minmax(50px, auto);
    grid-template-columns: 1fr 1fr;

    @screen md {
      grid-template-areas: "sidebar-left content sidebar-right";
      grid-template-rows: 1fr;
      grid-template-columns: minmax(150px, auto) 1fr minmax(150px, auto);
    }

    @apply
      bg-gray-dark;
  }

  .content {
    grid-area: content;
  }

  .footer {
    grid-area: footer;

    @apply
      p-4
      leading-none
      text-center
      bg-gray;
  }

</style>
