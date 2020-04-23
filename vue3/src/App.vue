<template>
  <article class="wrapper">
    <header class="header">
      <View
        name="header"
        @entryChange="handleEntryChange"
      />
    </header>
    <main class="main">
      <View
        name="content"
        @entryChange="handleEntryChange"
      />
    </main>
    <footer class="footer">
      {{ entryNames.length }} entries loaded
    </footer>
  </article>
</template>

<script>
import { reactive, computed } from 'vue';
import { View } from 'vue-router';
import { router } from './router';

import entries from '../../data/data_flattened.json';

const entryNames = Object.keys(entries);

export default {
  name: 'App',
  components: {
    View,
  },
  setup() {
    const data = reactive({
      activeKey: '',
      activeEntry: computed(() => data.activeKey || ''),
      positionInList: computed(() => entryNames.indexOf(data.activeKey)),
    });

    function handleEntryChange(newEntry) {
      data.activeKey = newEntry;

      if (data.activeKey === '') {
        return;
      }

      router.push({ path: `/cat/${newEntry.toLowerCase()}` });
    }

    return {
      entries,
      data,
      entryNames,
      handleEntryChange,
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
