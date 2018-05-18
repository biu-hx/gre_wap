<template>
  <div id="blank_2">
    <!--单双空选项-->
    <ul class="blankWrap">
      <li :class="curTab===1?'actived':''" @click="tab(1)">Blank(i)</li>
      <li :class="curTab===2?'actived':''" @click="tab(2)">Blank(ii)</li>
    </ul>
    <!--选项-->
    <checklist v-show="curTab===1" class="checkWrap" :max="testData.maxVal" label-position="right" required :options="testData.question.optionsA"
               @on-change="change"></checklist>
    <checklist v-show="curTab===2" class="checkWrap" :max="testData.maxVal" label-position="right" required :options="testData.question.optionsB"
               @on-change="change"></checklist>
  </div>
</template>

<script>
  import {Checklist} from 'vux'

  export default {
    name: "blank_2",
    components: {Checklist},
    data() {
      return {
        answerArry: ['', ''],
        curTab: 1,
      }
    },
    methods: {
      //选中事件
      change(val, label) {
        let checkText = label.join("");
          if (this.curTab === 1) {
            this.answerArry[0] = checkText;
          }
          if (this.curTab === 2) {
            this.answerArry[1] = checkText;
          }
          this.$emit('getChildAnswer', this.answerArry);
      },
      tab(index) {
        this.curTab = index;
      }
    },
    props: ["testData"]
  }

</script>

<style scoped>
  .blankWrap {
    padding: 0 20px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: flex-start;
    padding-bottom: 30px;
  }

  .blankWrap li {
    color: #777777;
    font-size: 32px; /*px*/
    border: 1px solid #777777;
    height: 70px;
    width: 200px;
    line-height: 70px;
    text-align: center;
  }

  .blankWrap li.actived {
    background: #5a5ee4;
    color: #ffffff;
  }
</style>
