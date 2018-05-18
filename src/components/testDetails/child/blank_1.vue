<template>
  <div id="blank_1">
    <!--选项-->
      <checklist class="checkWrap" :max="testData.maxVal" label-position="right" required :options="testData.question.optionsA" @on-change="change"></checklist>
  </div>
</template>

<script>
  import {Checklist} from 'vux'

  export default {
    name: "blank_1",
    components: {Checklist},
    props: ["testData","typeId"],
    data(){
      return {
        answerArry: [''],
      }
    },
    methods:{
      //选中事件
      change(val,label) {
        if(val.length>0){
          let test=resetArry(val);
          this.$emit('getChildAnswer', test);
          console.log(test)
        }else {
          this.$emit('getChildAnswer', ['']);
        }


      },
    },
  }
  //    下标转换为字母
  function getChar(i) {
    return (i + 10).toString(36).toUpperCase();
  }
  function resetArry(val) {
    let rs = [];
    for (let i = 0; i < val.length; i++) {
      rs.push(getChar(parseInt(val[i])))
    }
    return rs
  }

</script>

<style scoped>
.checkWrap{
  padding-top: 20px;
}
</style>
