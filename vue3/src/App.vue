<template>
  <div class="useless-wrapper-class-for-eslint-that-is-not-needed-anymore">
    <header class="header">
      <div class="wrapper">
        <select-box
          :entries="state.entries"
          @entry-selected="handleEntrySelected"
        />
      </div>
    </header>

    <main class="main">
      <div class="wrapper"
        v-if="state.activeEntry !== ''"
      >
        <entry :entry="state.activeEntry" />
      </div>
    </main>
  </div>

</template>

<script>
import { reactive, computed, ref } from 'vue'
import entriesList from '../../data/data_flattened.json';

import selectBox from './components/select-box/select-box.vue';
import entry from './components/entry/entry.vue';

export default {
  name: 'App',
  components: {
    'select-box': selectBox,
    'entry': entry,
  },
  setup(props, context) {
    const activeKey = ref('');

    const state = reactive({
      activeEntry: computed(() => entriesList[activeKey.value] || '' ),
      entries: entriesList,
    });

    function handleEntrySelected(value) {
      activeKey.value = value;
    }

    return {
      state,
      handleEntrySelected,
    }
  }
}
</script>

<style lang="postcss"></style>

<style scoped lang="postcss">
  .useless-wrapper-class-for-eslint-that-is-not-needed-anymore {
    display: contents;
  }

  .header {
    @apply
      p-4
      flex-initial
      bg-gray;
  }

  .wrapper {
    @apply
      w-8/12
      m-auto
      min-w-full;
  }

  @screen md {
    .wrapper {
      @apply min-w-0;
    }
  }

  .main {
    @apply
      p-4
      flex-1
      bg-gray-light
  }

</style>
