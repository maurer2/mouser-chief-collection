<template>
  <img src="./logo.png">

  <select-box :mouser-chiefs="mouserChiefs" />
</template>

<script>

import selectBox from './components/select-box/select-box.vue';
// import details from './components/details/details';

export default {
  components: {
    'select-box': selectBox,
  },
  setup() {
    const mouserChiefs = {
      "Larry": {
        "Name": "Larry",
        "Began tenure": "2011",
        "Ended tenure": "current",
        "Prime Minister(s)": [
          "David Cameron",
          "Theresa May",
          "Boris Johnson"
        ]
      }
    };

    return {
      mouserChiefs,
    }
  }
}
</script>

<style scoped>

</style>
