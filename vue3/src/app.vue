<template>
  <article class="wrapper">
    <header class="header">
      <h1 class="title">
        <RouterLink to="/" class="title-link"> Mouser-Chief-Collection </RouterLink>
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
          :is-disabled="data.isFirstEntry"
          @pager-clicked="handlePrevClick"
        />
        <div class="content">
          <RouterView />
        </div>
        <Pager
          :is-prev-button="false"
          :is-disabled="data.isLastEntry"
          @pager-clicked="handleNextClick"
        />
      </template>
    </main>
    <div class="footer">
      <Footer :num-entries="data.numberOfEntries" :position-in-list="data.positionInList" />
    </div>
  </article>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, watchEffect, ComputedRef, UnwrapRef } from 'vue';
  import { RouterView, RouterLink } from 'vue-router';
  import type { MouserChiefDetails, MouserChiefList } from './types'
  // eslint-disable-next-line
  import entries from '@data/data_flattened.json';
  import { router } from './router';

  import SelectBox from './components/select-box/select-box.vue';
  import Pager from './components/pager/pager.vue';
  import Footer from './components/footer/footer.vue';

  type DataRevs = {
    activeKey: string;
    activeEntry: ComputedRef<MouserChiefDetails | null>;
    positionInList: ComputedRef<number>;
    numberOfEntries: ComputedRef<number>;
    isFirstEntry: ComputedRef<boolean>;
    isLastEntry: ComputedRef<boolean>;
    [x: string]: any; // allow new values
  };

  const entryNames = Object.keys(entries as MouserChiefList);

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
      const data: UnwrapRef<DataRevs> = reactive<DataRevs>({
        activeKey: '',
        activeEntry: computed(() => {
          if (!!entries && data.activeKey in entries) {
            return entries[data.activeKey];
          }

          return null;
        }),
        positionInList: computed(() => entryNames.indexOf(data.activeKey)),
        numberOfEntries: computed(() => entryNames.length),
        isFirstEntry: computed(() => data.positionInList === 0),
        isLastEntry: computed(() => data.positionInList === entryNames.length - 1),
      });

      function handleEntrySelected(value: MouserChiefDetails['Name']): void {
        data.activeKey = value;
      }

      function handlePrevClick(): void {
        if (data.isFirstEntry) {
          return;
        }

        const prevIndex = data.positionInList - 1;
        const newKey = entryNames[prevIndex];

        data.activeKey = newKey;
      }

      function handleNextClick() {
        if (data.isLastEntry) {
          return;
        }

        const nextIndex = data.positionInList + 1;
        const newKey = entryNames[nextIndex];

        data.activeKey = newKey;
      }

      watchEffect(() => {
        if (data.activeKey === '' || data.activeEntry === null) {
          router.push({ path: '/' });

          return;
        }

        router.push({ path: `/cat/${data.activeKey}` });
      });

      return {
        entries,
        data,
        entryNames,
        handleEntrySelected,
        handlePrevClick,
        handleNextClick,
      };
    },
  });
</script>

<style scoped lang="postcss">
  .wrapper {
    @apply contents;
  }

  .title {
    @apply m-0
      leading-normal
      text-xl
      text-white;
  }

  .title-link {
    color: inherit;

    @apply no-underline;
  }

  .header {
    grid-area: header;

    @apply p-4
      text-center
      bg-pink-2;
  }

  .nav {
    grid-area: nav;

    @apply p-4
      bg-gray;
  }

  .view {
    @apply p-4
      text-center;

    background: lightgreen;
  }

  .main {
    display: grid;
    grid-area: main;
    grid-template-areas:
      'content content'
      'sidebar-left sidebar-right';
    grid-template-rows:
      1fr
      minmax(50px, auto);
    grid-template-columns: 1fr 1fr;

    @screen md {
      grid-template-areas: 'sidebar-left content sidebar-right';
      grid-template-rows: 1fr;
      grid-template-columns: minmax(150px, auto) 1fr minmax(150px, auto);
    }

    @apply bg-gray-dark;
  }

  .content {
    grid-area: content;
  }

  .footer {
    grid-area: footer;
  }
</style>
