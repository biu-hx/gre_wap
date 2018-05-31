<template>
  <div id="blank_int">
    <input class="intAnswer" @change="change" v-model="value" type="text">
    <!--<div class="trueAnswer">dddddddddddddd</div>-->
  </div>
</template>

<script>
  export default {
    name: "blank_int",
    data() {
      return {
        value: '',
      }
    },
    methods: {
      //选中事件
      change() {
        if (this.value) {
          this.$emit('getChildAnswer', [this.value]);
        } else {
          this.$emit('getChildAnswer', ['']);
        }

      }
    },
  }
</script>

<style scoped>
  #blank_int {
    font-size: 32px; /*px*/
    padding: 0 20px;
  }

  .intAnswer {
    margin: 30px 0;
    box-sizing: border-box;
    width: 100%;
    height: 75px;
    font-size: 32px; /*px*/
    padding: 0 12px; /*px*/
    border: 1px solid #898989; /*no*/
  }

  .trueAnswer {
    color: #1a8109;
  }
</style>
