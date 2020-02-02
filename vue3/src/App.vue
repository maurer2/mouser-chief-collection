<template>
  <div class="useless-wrapper-class-for-eslint-that-is-not-needed-anymore">
    <header class="p-4 bg-gray flex-initial">
      <div class="wrapper w-6/12 m-auto min-w-full md:min-w-0">
        <select-box
          :entries="state.entries"
          @entry-selected="handleEntrySelected"
        />
      </div>
    </header>

    <main class="p-4 bg-gray-light flex-1">
      <div
        class="wrapper w-6/12 m-auto min-w-full md:min-w-0"
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
</style>
