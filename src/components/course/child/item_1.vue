<template>
  <div class="tabContent_1" v-html="itemData.parent.description"></div>
</template>

<script>
    export default {
        name: "item_1",
      data() {
        return {}
      },
      props:["itemData"]
    }
</script>

<style scoped>
  .tabContent_1 {
    padding: 30px 0;
    font-size: 28px; /*px*/
    overflow-x: auto;
    /*color: #444444;*/
  }
</style>
