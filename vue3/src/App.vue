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
      <View
        name="header"
        @entryChange="handleEntryChange"
      />
    </header>
    <nav class="nav">
      <SelectBox
        :entry-names="entryNames"
        :active-entry="activeEntry"
        @entry-selected="handleEntrySelected"
      />
    </nav>
    <main class="main">
      <RouterView
        name="content"
        @entryChange="handleEntryChange"
      />
    </main>
    <footer class="footer">
      <Footer
        :num-entries="12"
        :position-in-list="positionInList2"
      />
    </footer>
  </article>
</template>

<script>
import { reactive, computed, watchEffect } from 'vue';
import { RouterView, RouterLink, useRoute } from 'vue-router';
import { router } from './router';

// import entries from '../../data/data_flattened.json';
import entries from '../../data/data_flattened.json';

import SelectBox from './components/select-box/select-box.vue';
// import Pager from './components/pager/pager.vue';
import Footer from './components/footer/footer.vue';


const entryNames = Object.keys(entries);

export default {
  name: 'App',
  components: {
    SelectBox,
    // Pager,
    Footer,
    RouterView,
    RouterLink,
  },
  setup() {
    const route = useRoute();

    const data = reactive({
      currentRoute: route,
      routeParams: computed(() => route.params),
      activeKey: computed(() => (('entryName' in route.routeParams) ? route.routeParams.entryName : '')),
      activeEntry: computed(() => data.activeKey || ''),
    });

    function handleEntryChange(newEntry) {
      console.log('handleEntryChange', newEntry);

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

      // router.push({ path: '/cat/', params: { entryName: newEntry.toLowerCase() } });
      // router.push({ path: `/cat/${newEntry.toLowerCase()}` });
      }

      watchEffect(() => {
        if (data.activeEntry === '') {
          router.push({ path: '/' });

          return;
        }

        router.push({ path: `/cat/${data.activeEntry}` });
      });

      watchEffect(() => {
        console.log(data.positionInList, positionInList2.value);
      });

      console.log(entryNames.length);

      return {
        entries,
        data,
        entryNames,
        handleEntryChange,
        buttonPrevIsDisabled,
        buttonNextIsDisabled,
        handleEntrySelected,
        handlePrevClick,
        handleNextClick,
        positionInList2,
        activeEntry: data.activeEntry,
      };
    }
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
  }

</style>
