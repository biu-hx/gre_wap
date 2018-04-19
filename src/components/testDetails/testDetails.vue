<template>
  <div class="testDetails" style="height: 100%">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="51px">
      <x-header slot="header" class="header bg_f">
        <span class="headerTit"><strong class="curNum">2</strong>/20</span>
        <div slot="overwrite-left"><img class="exitIcon" src="/static/images/testDetails/exit.png" alt=""></div>
        <div slot="right"><img class="scIcon" src="/static/images/testDetails/sc_icon.png" alt=""></div>
      </x-header>
      <!--结果模板不显示-->
      <scroller class="topicWrap" lock-y>
        <ul class="testDe">
          <li v-for="i in 20">
            <router-link class="linkBtn" :class="i>7 ? 'right' : 'error'" to="/testDetails">
              {{i}}
            </router-link>
          </li>
        </ul>
      </scroller>
      <!--题干-->
      <div class="topicData">
        The Chinese, who began systematic
        astronomical and weather observations
        shortly after the ancient Egyptians, were
        assiduous record-keepers, and because of
        this, can claim humanity’s longest
        continuous _____ of natural events.
      </div>
      <!--选项-->
      <div>
        <checklist class="checkWrap" :max="1" label-position="right" required :options="commonList" v-model="checklist001" @on-change="change"></checklist>
      </div>
      <!--底部-->
      <tabbar slot="bottom" class="vux-1px-t footer">
        <tabbar-item class="vux-1px-r"  @on-item-click="toggle(show)">
          <span class="userExit" slot="label">查看解析</span>
        </tabbar-item>
        <tabbar-item>
          <span class="userExit" slot="label">下一题</span>
        </tabbar-item>
      </tabbar>
    </view-box>
    <div v-transfer-dom>
      <popup class="window" v-model="show" max-height="60%">
        <div class="answerJs">
          <h1 class="answer">正确答案：C</h1>
          <div class="answerInfo">
            考点：主谓一致 平行 代词
            分析：that从句是修饰communities的定语从句
            ，谓语动词用复数；use their waterfronts中
            their指代communities；improve和attract平行
            A.主谓不一致；its无法指代指代communitie；
            as a way for it表达wordy；
            B.主谓不一致；look at表示看，在此用动词
            不定式表示目的；
            C.正确；
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {XHeader, Tabbar, TabbarItem, ViewBox, Scroller,Group,Checklist,Popup,TransferDom} from 'vux'

  export default {
    directives: {
      TransferDom
    },
    name: "testDetails",
    data(){
      return{
        show: false,
        checklist001: [],
        commonList: ['defiance', 'documentation', 'maintenance','theory','domination' ],
      }
    },
    components: {
      XHeader, Tabbar, TabbarItem, ViewBox, Scroller,Group,Checklist,Popup,TransferDom
    },
    mounted(){

      console.log('test')
    },
    methods:{
      change (val, label) {
        console.log('change', val, label)
      },
      toggle(show){
        if(show){
          this.show=false;
        }else {
          this.show=true;
        }
      }
    }
  }
</script>

<style scoped>
  .header {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    border-bottom: 1px solid #a0a0a0; /*px*/
    background: #fff;
  }

  .footer .userExit {
    color: #333333;
    font-size: 32px; /*px*/
  }

  .footer {
    bottom: 1px; /*no*/
    background: #f3f3f3;
    border-top: 1px solid #a0a0a0; /*px*/
  }

  .exitIcon {
    height: 40px; /*px*/
  }

  .scIcon {
    width: 40px; /*px*/
  }

  .headerTit {
    font-size: 34px; /*px*/
    color: #888888;
  }

  .curNum {
    color: #5a5ee4;
  }

  .topicWrap {
    background: #f3f3f3;
  }

  .testDe {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    padding: 25px 0;
    text-align: center;
    -webkit-overflow-scrolling: touch;
  }

  .testDe li .linkBtn {
    width: 60px;/*px*/
    height: 60px;/*px*/
    font-size: 34px;/*px*/
    color: #f42e2e;
    margin: 0 35px;/*px*/
    line-height: 62px;/*px*/
    border-radius: 6px; /*no*/
    display: block;
  }

  .testDe li .linkBtn.onRight {
    color: #ffffff;
    background: #1a8109;
  }

  .testDe li .linkBtn.onError {
    color: #ffffff;
    background: #f42e2e;
  }

  .testDe li .linkBtn.error {
    color: #f42e2e;
    border: 1px solid #f42e2e; /*no*/
  }

  .testDe li .linkBtn.right {
    color: #1a8109;
    border: 1px solid #1a8109; /*no*/

  }
  .topicData{
    color: #333333;
    font-size: 34px;/*px*/
    line-height: 60px;/*px*/
    padding: 26px 20px 30px;
  }
  .checkWrap {
   padding-top: 10px;/*px*/
  }
  .answerJs{
    padding: 0 20px;
    background: #ffffff;
  }
  .window{
    bottom: 50px;/*no*/
    border-top-left-radius: 14px;/*px*/
    border-top-right-radius: 14px;/*px*/
  }
  .answer{
    padding-top: 34px;
    color: #333333;
    font-size: 36px;/*px*/
  }
  .answerInfo{
    padding: 30px 0;
    color: #333333;
    font-size: 30px;/*px*/
    word-break: break-word;
  }





</style>
