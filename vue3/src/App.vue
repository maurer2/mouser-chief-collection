<template>
  <div class="useless-wrapper-class-for-eslint-that-is-not-needed-anymore">
    <header class="header">
      <div class="wrapper">
        <select-box
          :entries="entries"
          :active-entry="activeEntry"
          @entry-selected="handleEntrySelected"
        />
      </div>
    </header>
    <main class="main">
      <div class="wrapper" v-if="activeEntry">
        <entry :entry="activeEntry" />
      </div>
    </main>
  </div>

</template>

<script>
import { reactive, computed, watch } from 'vue';
import entries from '../../data/data_flattened.json';

import selectBox from './components/select-box/select-box.vue';
import entry from './components/entry/entry.vue';

export default {
  name: 'App',
  components: {
    'select-box': selectBox,
    entry,
  },
  setup() {
    const state = reactive({
      activeKey: '',
    });

    const activeEntry = computed(() => entries[state.activeKey] || null);

    function handleEntrySelected(value) {
      state.activeKey = value;
    }

    watch(() => {
      console.log('ActiveEntry ', activeEntry.value);
    });

    return {
      // ...toRefs(state),
      entries,
      state,
      handleEntrySelected,
      activeEntry,
    };
  },
};
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

    @screen md {
      @apply
        min-w-0;
    }
  }

  .main {
    @apply
      p-4
      flex-1
      bg-gray-light
  }

</style>
