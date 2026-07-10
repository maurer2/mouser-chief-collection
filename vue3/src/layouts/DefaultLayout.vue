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
        :active-entry-name="activeKey"
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
        <Pager
          :is-prev-button="false"
          :is-disabled="isLastEntry"
          @pager-clicked="handleNextClick"
        />
      </template>
      <div class="content">
        <RouterView />
      </div>
    </main>
    <div class="footer">
      <Footer :num-entries="numberOfEntries" :position-in-list="positionInList" />
    </div>
  </article>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  import { useMouserChiefs } from '../loaders/mouser-chiefs';

  import SelectBox from '../components/select-box/select-box.vue';
  import Pager from '../components/pager/pager.vue';
  import Footer from '../components/footer/footer.vue';

  defineOptions({ name: 'DefaultLayout' });

  const route = useRoute();
  const router = useRouter();
  const { data: entries } = useMouserChiefs();

  const entryNames = computed<string[]>(() => Object.keys(entries.value ?? {}));
  const activeKey = computed<string>(() =>
    typeof route.params.entry === 'string' ? route.params.entry : '',
  );
  const activeEntry = computed(() => entries.value?.[activeKey.value] ?? null);
  const positionInList = computed<number>(() => entryNames.value.indexOf(activeKey.value));
  const numberOfEntries = computed<number>(() => entryNames.value.length);
  const isFirstEntry = computed<boolean>(() => positionInList.value === 0);
  const isLastEntry = computed<boolean>(() => positionInList.value === entryNames.value.length - 1);

  function handleEntrySelected(value: string): void {
    if (value === '') {
      router.push('/');

      return;
    }

    router.push(`/cat/${value}`);
  }

  function handlePrevClick(): void {
    if (isFirstEntry.value) {
      return;
    }

    const prevKey = entryNames.value[positionInList.value - 1];

    router.push(`/cat/${prevKey}`);
  }

  function handleNextClick(): void {
    if (isLastEntry.value) {
      return;
    }

    const nextKey = entryNames.value[positionInList.value + 1];

    router.push(`/cat/${nextKey}`);
  }
</script>

<style scoped>
  @reference "../global.css";

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

    @variant md {
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
