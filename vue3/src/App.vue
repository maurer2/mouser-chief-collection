<template>
  <header class="p-4 bg-gray flex-initial">
    <div>
      <pre>
        {{ JSON.stringify(activeKey) }}
      </pre>
    </div>
    <div class="wrapper w-6/12 m-auto min-w-full md:min-w-0">
      <select-box
        :entries="state.entries"
        :active-entry="state.activeEntry"
        @entry-selected="handleEntrySelected"
      />
    </div>
  </header>

  <main class="p-4 bg-gray-light flex-1">
    <div
      class="wrapper w-6/12 m-auto min-w-full md:min-w-0"
      v-if="activeKey !== ''"
    >
      <entry :entry="state.activeEntry" />
    </div>
  </main>

</template>

<script>
import { reactive, computed , onMounted, ref } from 'vue'
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
    const activeKey = ref('')

    const state = reactive({
      activeEntry: computed(() => entriesList[activeKey.value] || '' ),
      entries: entriesList,
    });


    function handleEntrySelected(value) {
      console.log('handleEntrySelected', value)
      activeKey.value = value;
    }

    onMounted(() => {
      // activeKey.value = 'Larry';
    })

    return {
      state,
      activeKey,
      handleEntrySelected,
    }
  }
}
</script>

<style lang="postcss">
</style>

<style scoped lang="postcss">
</style>
