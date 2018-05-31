<template>
  <div class="tabContent_2">
    <div class="contentList" v-if="itemData.parent.trainer!=''" v-html="itemData.parent.trainer"></div>
    <div class="hintBox" v-else>
      <div class="tm">信息添加中...</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "item_2",
    data() {
      return {}
    },
    props:["itemData"]
  }
</script>

<style scoped>
  .tabContent_2 {
    color: #383838;
    font-size: 30px; /*px*/
    line-height: 48px; /*px*/
  }

  .contentList {
    padding: 25px 0;
    border-bottom: 1px solid #b5b5b5; /*no*/
  }
  .hintBox{
    padding: 100px 0;
  }

  .tabContent_2 .contentList:last-child {
    border-bottom: none;
  }
</style>
