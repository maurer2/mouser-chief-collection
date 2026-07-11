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
      <Pager
        class="pager-prev"
        :is-prev-button="true"
        :is-disabled="isFirstEntry || !activeEntry"
        @pager-clicked="handlePrevClick"
      />
      <div class="content">
        <RouterView />
      </div>
      <Pager
        class="pager-next"
        :is-prev-button="false"
        :is-disabled="isLastEntry || !activeEntry"
        @pager-clicked="handleNextClick"
      />
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
    @apply no-underline
      text-inherit;

    &:is(:hover, :focus-visible) {
      @apply text-black
        underline;
    }
  }

  .header {
    @apply col-[left-column/right-column]
      p-4
      text-center
      bg-pink-2;
  }

  .nav {
    @apply col-[left-column/right-column]
      p-4
      bg-gray;
  }

  .main {
    @apply grid
      grid-cols-subgrid
      grid-rows-subgrid
      col-[left-column/right-column]
      row-[content/pager]
      bg-gray-dark;
  }

  .content {
    @apply col-[left-column/right-column]
      row-[content];

    @variant md {
      @apply col-[content];
    }
  }

  .pager-prev {
    /* grid-column: left-column-start / left-column-end; -> can be written as grid-column: left-column but only for -start/-end */
    @apply col-[left-column]
      row-[pager];

    @variant md {
      @apply row-[content];
    }
  }

  .pager-next {
    /* grid-column: right-column-start / right-column-end; -> can be written as grid-column: right-column but only for -start/-end */
    @apply col-[right-column]
      row-[pager];

    @variant md {
      @apply row-[content];
    }
  }

  .footer {
    @apply col-[left-column/right-column];
  }
</style>
