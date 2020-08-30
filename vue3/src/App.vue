<template>
  <article class="wrapper">
    <header class="header">
      <h1 class="title">
        <RouterLink
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
          <RouterView />
        </div>
        <Pager
          :is-prev-button="false"
          :is-disabled="buttonNextIsDisabled"
          @pager-clicked="handleNextClick"
        />
      </template>
    </main>
    <div class="footer">
      <Footer
        :num-entries="entryNames.length"
        :position-in-list="positionInList2"
      />
    </div>
  </article>
</template>

<script lang="ts">
import {
  defineComponent, reactive, computed, watchEffect, ComputedRef,
} from 'vue';
import { RouterView, RouterLink } from 'vue-router';
import { MouserChiefDetails, MouserChiefList } from './types';
// eslint-disable-next-line
import entries from '/@data/data_flattened.json';
import { router } from './router';

import SelectBox from './components/select-box/select-box.vue';
import Pager from './components/pager/pager.vue';
import Footer from './components/footer/footer.vue';

const entryNames = Object.keys(entries);

export default defineComponent({
  name: 'App',
  components: {
    SelectBox,
    Pager,
    Footer,
    RouterView,
    RouterLink,
  },
  setup() {
    const data = reactive<{
      activeKey: string;
      activeEntry: ComputedRef<MouserChiefDetails>;
      positionInList: ComputedRef<number>;
    }>({
      activeKey: '',
      activeEntry: computed(() => data.activeKey || ''),
      positionInList: computed(() => entryNames.indexOf(data.activeKey)),
    });

    const positionInList2 = computed(() => entryNames.indexOf(data.activeKey));
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

    /*
    watchEffect(() => {
      console.log(data.positionInList, positionInList2.value);
    });
    */

    return {
      entries,
      data,
      entryNames,
      buttonPrevIsDisabled,
      buttonNextIsDisabled,
      handleEntrySelected,
      handlePrevClick,
      handleNextClick,
      positionInList2,
    };
  },
});

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
  }

</style>
