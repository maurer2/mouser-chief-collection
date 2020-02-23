<template>
  <form @submit.prevent="handleSubmit">
    <h2 class="title">
      Navigation
    </h2>
    <p v-if="newEntry !== null">
      Active entry: {{ newEntry }}
    </p>
    <div class="row" :key="newEntry">
      <select
        class="select"
        v-model="newEntry"
        @change.prevent="handleChange"
      >
        <option :value="null" disabled>Entries</option>
        <option
          v-for="value in props.entries"
          :key="value.Name"
          :value="value.Name">
            {{ value.Name }}
        </option>
      </select>
      <button
        class="button"
        type="submit"
      >
        Select an entry
      </button>
    </div>
  </form>

</template>

<script>
import { watch, computed, ref } from 'vue';

export default {
  name: 'Selectbox',
  props: {
    entries: Object,
    activeEntry: Object,
  },
  setup(props, context) {
    const selectedEntry = computed(() => ((props.activeEntry !== null) ? props.activeEntry : null));
    const newEntry = ref(() => ((props.activeEntry !== null) ? props.activeEntry : null));

    watch(() => {
      newEntry.value = ((selectedEntry !== null) ? selectedEntry.value : null);
      console.log('selectedEntry', newEntry.value);
    });

    function handleChange(event) {
      const newValue = event.target.value;

      context.emit('entry-selected', newValue);
    }

    function handleSubmit() {
      /*
      const newValue = selectedEntry.value;

      context.emit('entry-selected', newValue);
      */
    }

    return {
      props,
      selectedEntry,
      handleChange,
      handleSubmit,
      newEntry,
    };
  },
};
</script>

<style scoped lang="postcss">
  .title {
    @apply
      text-xl;
  }

  .row {
    @apply
      mt-4
      flex
      items-stretch;
  }

  .select {
    @apply
      flex-1
      min-w-0;
  }

  .button {
    @apply
      p-2
      flex-initial
      bg-pink-2
      text-white
      rounded
  }

  .button:hover {
    @apply
      bg-pink-1;
  }

</style>
