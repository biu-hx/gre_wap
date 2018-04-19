<template>
  <div id="search">
    <!--xx-->
    <!--<search-->
      <!--@result-click="resultClick"-->
      <!--@on-change="getResult"-->
      <!--:results="results"-->
      <!--v-model="value"-->
      <!--position="absolute"-->
      <!--auto-scroll-to-top-->
      <!--top="46px"-->
      <!--@on-focus="onFocus"-->
      <!--@on-cancel="onCancel"-->
      <!--@on-submit="onSubmit"-->
      <!--ref="search"></search>-->
    <search></search>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Search} from 'vux'

  export default {
    name: "search",
    components: {
      Search
    }

  }
</script>

<style scoped>

</style>
