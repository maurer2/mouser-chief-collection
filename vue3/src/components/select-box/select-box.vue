<template>
  <div>
    Selectbox {{ numberOfCats }}
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  props: {
    mouserChiefs: Object,
  },
  setup(props) {
    const { mouserChiefs } = props;

    const names = Object.keys(mouserChiefs);

    const state = reactive({
      numberOfCats: names.length
    });

    return {
      numberOfCats,
    }
  }
}
</script>

<style scoped>

</style>
