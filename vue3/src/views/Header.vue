<template>
  <div class="wrapper">
    <h1 class="title">
      <Link
        to="/"
        text="Mouser-Chief-Collection"
        class="title-link"
      />
    </h1>
    <nav class="nav">
      <SelectBox
        :entry-names="entryNames"
        :active-entry="data.activeEntry"
        @entry-selected="handleEntrySelected"
      />
    </nav>

    <router-link to="/cat/peter">Peter</router-link>
    <router-link to="/cat/nelson">Nelson</router-link>

  </div>
</template>

<script lang="ts">
import { reactive, computed, watchEffect } from 'vue';
import { Link } from 'vue-router';
import SelectBox from '../components/select-box/select-box.vue';

import entries from '../../../data/data_flattened.json';

let entriesTransformed = Object.entries(entries).map((entry) => {
  const [key, value] = entry;

  return {
    [key.toLowerCase()]: value,
  };
});
entriesTransformed = Object.assign({}, ...entriesTransformed);
const entryNames = Object.keys(entries);

export default {
  name: 'Content',
  components: {
    Link,
    SelectBox,
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

    watchEffect(() => {
      emit('entryChange', data.activeKey);
    });

    return {
      data,
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
      text-center
      bg-pink-2;
  }

  .title-link {
    @apply
      m-0
      p-4
      leading-normal
      text-xl
      text-white
      no-underline;
  }

  .nav {
    @apply
      p-4
      bg-gray;
  }

</style>
