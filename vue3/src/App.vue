<template>
  <article class="wrapper">
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
      <router-link to="/cat/peter">Peter</router-link>
      <router-link to="/cat/nelson">Nelson</router-link>
    </nav>
    <main class="main">
      <View @entryChange="handleEntryChange" />
    </main>
    <footer class="footer">
      {{ entryNames.length }} entries loaded
    </footer>
  </article>
</template>

<script>
import {
  reactive, computed, watchEffect,
} from 'vue';
import { Link, View } from 'vue-router';
import { router } from './router';

import entries from '../../data/data_flattened.json';

import SelectBox from './components/select-box/select-box.vue';
import Pager from './components/pager/pager.vue';

const entryNames = Object.keys(entries);

export default {
  name: 'App',
  components: {
    SelectBox,
    Link,
    View,
  },
  setup() {
    const data = reactive({
      activeKey: '',
      activeEntry: computed(() => data.activeKey || ''),
      positionInList: computed(() => entryNames.indexOf(data.activeKey)),
    });

    function handleEntrySelected(value) {
      data.activeKey = value;
    }

    function handleEntryChange(newEntry) {
      console.log('newEntry', newEntry);
    }

    return {
      entries,
      data,
      entryNames,
      handleEntrySelected,
      handleEntryChange,
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
