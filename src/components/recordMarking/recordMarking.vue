<template>
    <div id="recordMarking" style="height: 100%;">
      <x-header style="background: #5a5ee4;" :left-options="{backText: ''}">做题记录</x-header>
      <tab :line-width="2" active-color="#5a5ee4" :scroll-threshold="4" default-color="#444444" custom-bar-width="70px" >
        <tab-item @on-item-click="show = true" :selected="0==i" :key="i" v-for="(item,i) in tabItem">{{item}}</tab-item>
      </tab>
      <!--题目列表-->
      <div>
        <div class="topicWrap" v-for="i in 9">
           <div class="flex nameWrap">
             <h1 class="name ellipsis">陈琦36套-阅读  RC-e2hqsj aaaaaaaaaaaaaaaaaaaaaa</h1>
             <span class="useTime">用时50s</span>
           </div>
          <div class="topicDe ellipsis-2">
            The difficulty for nineteenth-century advocates of the claim that forests helped regulate clim...
          </div>
          <div class="answer flex">
            <div class="answerItem"><span style="padding-right: 4px">我的答案:</span><strong class="red">C</strong></div>
            <div class="answerItem"><span style="padding-right: 4px">正确答案:</span><strong class="green">C</strong></div>
          </div>
        </div>
      </div>
      <!--题目列表 End-->
      <!--<popup-radio title="options" :options="options1" v-model="option1"></popup-radio>-->
      <!--<popup-radio title="options" :options="options1" v-model="option1"></popup-radio>-->
      <div v-transfer-dom>
        <popup class="bg_f" v-model="show">
          <group gutter="0">
          <radio :selected-label-style="{color:'#5a5ee4'}" v-model="option1" :options="options1"></radio>
            <!--<cell v-for="i in 20" :key="i" :title="i"></cell>-->
          </group>
        </popup>
      </div>

    </div>
</template>

<script type="text/ecmascript-6">
  import { XHeader,Radio,Tab,TabItem,Group,PopupRadio ,TransferDom,Popup ,Cell} from 'vux'
    export default {
      directives: {
        TransferDom
      },
        name: "recordMarking",
      data(){
        return{
          tabItem:['全部题型','题目来源','题目难度','收藏时间'],
          show:false,
          option1: '全部题型',
          options1: ['全部题型', 'OG', 'Xdf红/绿皮','Magoosh','陈琦36套','陈虎平36套',' 猴哥难题','Princeton','Kaplan'],
        }
      },
        components:{
          TransferDom,
          PopupRadio,
          XHeader,
          TabItem,
          Radio,
          Group,
          Popup,
          Cell,
          Tab
        }
    }
</script>

<style scoped>
  .vux-tab .vux-tab-item {
    font-size: 30px;/*px*/
  }
  .vux-popup-mask{
    top: 90px;/*px*/
  }
  .flex{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
  }
  .topicWrap{
    padding: 20px;
    border-bottom: 1px solid #d2d2d2;/*no*/
  }
  .nameWrap{
    padding-bottom: 15px;/*px*/
  }
  .name{
    font-weight: normal;
    font-size: 30px;/*px*/
    color: #888888;
    max-width: 80%;
  }
  .topicDe{
    color: #444444;
    line-height: 45px;
    font-size: 30px;/*px*/
    max-height: 90px;
    /*word-break: break-word;*/
    padding-bottom: 15px;/*px*/
  }
  .useTime{
    color: #777777;
    font-size: 28px;/*px*/
  }
  .answer{
    color: #777777;
    justify-content: flex-start!important;
    font-size: 28px;/*px*/
  }
  .answer .answerItem:first-child{
    padding-right: 20px;/*px*/
  }
  .answerItem{
    min-width: 40%;
    box-sizing: border-box;
    word-break: break-all;
    padding: 5px 0;/*px*/
  }
  .green{
    font-style: normal;
    color: #2a9f1b;
    padding-right: 10px;
  }
  .red{
    font-style: normal;
    color: #f83d3d;
  }
</style>
