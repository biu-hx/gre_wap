<template>
  <div class="tabContent_3" v-if="itemData.parent.listeningFile!=''" v-html="itemData.parent.listeningFile"></div>
  <div class="hintBox" v-else>
    <div class="tm">信息添加中...</div>
  </div>
</template>

<script>
  export default {
    name: "item_3",
    data() {
      return {}
    },
    props:["itemData"]
  }
</script>

<style scoped>
  .tabContent_3 {
    padding: 30px 0;
    font-size: 28px; /*px*/
    /*color: #444444;*/
  }
  .hintBox{
    padding: 100px 0;
  }

</style>
