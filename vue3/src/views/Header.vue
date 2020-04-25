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
        :entry-names="data.entryNames"
        :active-key="data.activeKey"
        @entry-selected="handleEntrySelected"
      />
    </nav>
  </div>
</template>

<script lang="ts">
import { reactive, computed, watchEffect } from 'vue';
import { Link } from 'vue-router';
import SelectBox from '../components/select-box/select-box.vue';
import { router } from '../router';


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
  setup(props) {
    const data = reactive({
      activeKey: props.entryName,
      entryNames,
    });

    watchEffect(() => {
      // emit('entryChange', data.activeKey);
    });

    function handleEntrySelected(newValue) {
      // emit('entryChange', newValue);

      router.push({ path: '/cat/', params: { entryName: newValue.toLowerCase() } });
    }

    return {
      data,
      handleEntrySelected,
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
