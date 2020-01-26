<template>
  <section class="entry">
    <h2 class="text-xl">
      {{ entry['Name'] }}
    </h2>
    <template v-for="(key) in fields">
      <dl class="list flex" :key="key">
        <dt class="flex-none pr-1 font-bold">{{ key }}: </dt>
        <dd class="flex-1">{{ entry[key] }}</dd>
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
    const fields = ['Name', 'Began tenure', 'Ended tenure'];

    return {
      fields,
    }
  }
}
</script>

<style scoped lang="postcss">

</style>
