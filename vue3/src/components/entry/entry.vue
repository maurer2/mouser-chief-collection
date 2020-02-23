<template>
  <section class="entry">
    <h2 class="title">
      {{ title }}
    </h2>
    <template v-for="(fieldValue, fieldKey) in activeEntry">
      <dl class="list" :key="fieldKey">
        <dt class="list-key">
          {{ fieldKey }}:
        </dt>
        <dd class="list-value">
          <Subentry :fieldValue="fieldValue" />
        </dd>
      </dl>
    </template>
  </section>
</template>

<script>
import { computed, watch } from 'vue';
import Subentry from '../subentry/subentry.vue';

export default {
  name: 'Entry',
  props: {
    activeEntry: Object,
  },
  components: {
    Subentry,
  },
  setup(props) {
    const title = computed(() => ((props.activeEntry !== null) ? props.activeEntry['Name'] : ''));

    watch(() => {
      // console.log('activeEntry2', props.activeEntry);
    });

    return {
      title,
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
