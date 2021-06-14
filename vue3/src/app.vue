<template>
  <article class="wrapper">
    <header class="header">
      <h1 class="title">
        <RouterLink to="/" class="title-link"> Mouser-Chief-Collection </RouterLink>
        <small>{{ isLoading ? '[Loading]' : '' }}</small>
      </h1>
    </header>
    <nav class="nav">
      <SelectBox
        :entry-names="entryNames"
        :active-entry="activeEntry"
        @entry-selected="handleEntrySelected"
      />
    </nav>
    <main class="main">
      <template v-if="activeEntry">
        <Pager
          :is-prev-button="true"
          :is-disabled="isFirstEntry"
          @pager-clicked="handlePrevClick"
        />
        <div class="content">
          <RouterView />
        </div>
        <Pager
          :is-prev-button="false"
          :is-disabled="isLastEntry"
          @pager-clicked="handleNextClick"
        />
      </template>
    </main>
    <div class="footer">
      <Footer :num-entries="numberOfEntries" :position-in-list="positionInList" />
    </div>
  </article>
</template>

<script lang="ts">
  import { defineComponent, computed, watchEffect, PropType, toRefs, ref } from 'vue';
  import { RouterView, RouterLink } from 'vue-router';
  import type { MouserChiefDetails, MouserChiefList , LoadingType } from './types/index'

  // eslint-disable-next-line
  import entriesJSON from '@data/data_flattened.json';
  import { router } from './router';

  import SelectBox from './components/select-box/select-box.vue';
  import Pager from './components/pager/pager.vue';
  import Footer from './components/footer/footer.vue';

  const entries: MouserChiefList = entriesJSON
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
    props: {
      loading: {
        type: Object as PropType<LoadingType>,
        default: () => { /* */},
        required: true,
      }
    },
    setup(props) {
      const {isLoading} = toRefs(props.loading)

      const activeKey = ref<string>('')
      const activeEntry = computed<MouserChiefDetails | null>(() => {
          if (!!entries && activeKey.value in entries) {
            return entries[activeKey.value];
          }

          return null;
      })
      const positionInList = computed<number>(() => entryNames.indexOf(activeKey.value))
      const numberOfEntries = computed<number>(() => entryNames.length)
      const isFirstEntry = computed<boolean>(() => positionInList.value === 0)
      const isLastEntry = computed<boolean>(() => positionInList.value === entryNames.length - 1)

      function handleEntrySelected(value: MouserChiefDetails['Name']): void {
        activeKey.value = value;
      }

      function handlePrevClick(): void {
        if (isFirstEntry.value) {
          return;
        }

        const prevIndex = positionInList.value - 1;
        const newKey = entryNames[prevIndex];

        activeKey.value = newKey;
      }

      function handleNextClick(): void {
        if (isLastEntry.value) {
          return;
        }

        const nextIndex = positionInList.value + 1;
        const newKey = entryNames[nextIndex];

        activeKey.value = newKey;
      }

      watchEffect(() => {
        if (activeKey.value === '' || activeEntry.value === null) {
          router.push({ path: '/' });

          return;
        }

        router.push({ path: `/cat/${activeKey.value}` });
      });

      return {
        entries,
        entryNames,
        numberOfEntries,
        activeEntry,
        isFirstEntry,
        isLastEntry,
        positionInList,
        handleEntrySelected,
        handlePrevClick,
        handleNextClick,
        isLoading: (isLoading !== null) ? isLoading: true,
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
