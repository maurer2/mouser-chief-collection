<template>
  <div class="subentry">
    <template v-if="isPrimitive">
      <span v-if="fieldValue" class="text">
        {{ fieldValue }}
      </span>
      <span v-else class="text"> - </span>
    </template>
    <template v-else>
      <ol class="list">
        <li v-for="(value, index) in fieldValue" :key="index" class="list-entry">
          {{ value }}
        </li>
      </ol>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue';

  export default defineComponent({
    name: 'Subentry',
    props: {
      fieldValue: {
        type: [String, Array] as PropType<string | any[]>,
        required: true,
        default: '',
      },
    },
    setup(props) {
      const isPrimitive = computed<boolean>(() => !Array.isArray(props.fieldValue));

      return {
        isPrimitive,
      };
    },
  });
</script>

<style scoped lang="postcss">
  .list {
    @apply pl-0
      list-none;

    @supports selector(li::marker) {
      @apply list-disc
        list-inside;
    }
  }

  .list-entry {
    @apply flex
      items-baseline;

    &::before {
      @apply block
        relative
        text-pink-1;

      content: '\2022';
      top: 0.125rem;
      left: -0.125rem;
      width: 0.875rem;
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 1.7rem;
    }

    @supports selector(li::marker) {
      @apply list-item;

      &::before {
        @apply content-none;
      }

      &::marker {
        @apply text-pink-1;
      }
    }
  }
</style>
