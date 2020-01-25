<template>
  <section class="entry">
    <h2>
      {{ entry['Name'] }}
    </h2>
    <template v-for="(key) in fields">
      <dl class="list" :key="key">
        <dt>{{ key }}: </dt>
        <dd>{{ entry[key] }}</dd>
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

<style scoped>

</style>
