<template>
  <section class="entry">
    <h2 class="title">
      {{ entry['Name'] }}
    </h2>
    <template v-for="(key) in fields">
      <dl class="list" :key="key">
        <dt class="list-key">{{ key }}: </dt>
        <dd class="list-value">{{ entry[key] }}</dd>
      </dl>
    </template>
  </section>
</template>

<script>
export default {
  name: 'Entry',
  props: {
    entry: Object,
  },
  setup() {
    const fields = ['Name', 'Began tenure', 'Ended tenure', 'Prime Minister(s)'];

    return {
      fields,
    };
  },
};
</script>

<style scoped lang="postcss">
  .title {
    @apply
      text-xl;
  }

  .list {
    @apply
      flex;
  }

  .list-key {
    @apply
      pr-1
      flex-none
      font-bold;
  }

  .list-value {
    @apply
      flex-1;
  }
</style>
