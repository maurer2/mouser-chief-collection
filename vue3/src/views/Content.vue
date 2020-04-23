<template>
  <div class="wrapper">
    <Pager
      :is-prev-button="true"
      :is-disabled="buttonPrevIsDisabled"
      @pager-clicked="handlePrevClick"
    />
    <div class="content">
      <Entry :active-entry="data.activeEntry" />
    </div>
    <Pager
      :is-prev-button="false"
      :is-disabled="buttonNextIsDisabled"
      @pager-clicked="handleNextClick"
    />
  </div>
</template>

<script lang="ts">
import { reactive, computed, watchEffect } from 'vue';
import Entry from '../components/entry/entry.vue';

import entries from '../../../data/data_flattened.json';

import Pager from '../components/pager/pager.vue';

const entriesTransformedNested = Object.entries(entries).map((entry) => {
  const [key, value] = entry;

  return {
    [key.toLowerCase()]: value,
  };
});

const entriesTransformed = Object.assign({}, ...entriesTransformedNested);
const entryNames = Object.keys(entries);

export default {
  name: 'Content',
  components: {
    Entry,
    Pager,
  },
  props: {
    entryName: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const data = reactive({
      activeKey: '',
      activeEntry: computed(() => entriesTransformed[props.entryName] || ''),
      positionInList: computed(() => entryNames.indexOf(data.activeKey)),
    });

    console.log(props);

    const buttonPrevIsDisabled = computed(() => data.positionInList === 0);
    const buttonNextIsDisabled = computed(() => data.positionInList === entryNames.length - 1);

    function handlePrevClick() {
      if (buttonPrevIsDisabled.value) {
        return;
      }

      const currentIndex = entryNames.indexOf(data.activeKey);
      const prevIndex = currentIndex - 1;
      const newValue = entryNames[prevIndex];

      data.activeKey = newValue;
    }

    function handleNextClick() {
      if (buttonNextIsDisabled.value) {
        return;
      }

      const currentIndex = entryNames.indexOf(data.activeKey);
      const nextIndex = currentIndex + 1;
      const newValue = entryNames[nextIndex];

      data.activeKey = newValue;
    }

    watchEffect(() => {
      emit('entryChange', data.activeKey);
    });

    return {
      data,
      handlePrevClick,
      handleNextClick,
      buttonPrevIsDisabled,
      buttonNextIsDisabled,
    };
  },
};

</script>

<style scoped lang="postcss">
  .wrapper {
    display: contents;
  }

  .content {
    grid-area: content;
  }

</style>
