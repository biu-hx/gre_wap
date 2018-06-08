<template>
  <div id="recordMarking" style="height: 100%;">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="60px">
      <x-header slot="header" class="header" :left-options="{backText: ''}">收藏题目</x-header>
      <div>
        <sticky scroll-box="vux_view_box_body" ref="sticky" :offset="46" :check-sticky-support="false" :disabled="false">
          <tab :line-width="2" active-color="#5a5ee4" :scroll-threshold="4" default-color="#444444" custom-bar-width="70px">
            <tab-item selected @on-item-click="handle(1)">全部题型</tab-item>
            <tab-item @on-item-click="handle(2)">题目来源</tab-item>
            <tab-item @on-item-click="handle(3)">题目难度</tab-item>
            <tab-item v-if="time" @on-item-click="handle(4)">收藏时间</tab-item>
          </tab>
        </sticky>
      </div>
      <!--题目列表-->
      <div>
        <router-link tag="div" :to="{name:'questionDetails',query:{type:2,qid:item.id}}" class="topicWrap" :key="index"
                     v-for="(item,index) in dataItem">
          <div class="flex nameWrap">
            <h1 class="name ellipsis">{{item.section}}{{item.source.name}}-{{item.id}}</h1>
            <!--<span class="useTime">用时50s</span>-->
          </div>
          <div class="topicDe ellipsis-2">{{item.stem}}</div>
          <div class="answer flex">
            <div v-if="item.user_answer" class="answerItem">
              <span style="padding-right: 4px">我的答案:</span><strong :class="item.user_answer!=item.answer?'red':'green'">{{item.user_answer}}</strong>
            </div>
            <div v-else class="answerItem">
              <span style="padding-right: 4px">我的答案:</span><strong>——</strong>
            </div>
            <div class="answerItem"><span style="padding-right: 4px">正确答案:</span><strong class="green">{{item.answer}}</strong></div>
          </div>
        </router-link>
      </div>
      <!--题目列表 End-->
      <div v-transfer-dom>
        <popup class="bg_f" v-model="show" max-height="50%">
          <group gutter="0">
            <radio v-show="tabIndex===1" :selected-label-style="{color:'#5a5ee4'}" v-model="option1" :options="options1" @on-change="change"></radio>
            <radio v-show="tabIndex===2" :selected-label-style="{color:'#5a5ee4'}" v-model="option2" :options="options2" @on-change="change"></radio>
            <radio v-show="tabIndex===3" :selected-label-style="{color:'#5a5ee4'}" v-model="option3" :options="options3" @on-change="change"></radio>
            <radio v-show="tabIndex===4" :selected-label-style="{color:'#5a5ee4'}" v-model="option4" :options="options4" @on-change="change"></radio>
          </group>
        </popup>
      </div>
      <loading :show="show2" text=""></loading>
      <toast v-model="toastStatu" :text="toastText" width="4rem" type="text" :time="1500" position="bottom"></toast>
    </view-box>
  </div>
</template>

<script type="text/ecmascript-6">
  import {XHeader, ViewBox, Radio, Tab, TabItem, Group, PopupRadio, TransferDom, Popup, Cell, Toast, Loading,Sticky} from 'vux'

  export default {
    directives: {
      TransferDom
    },
    name: "recordMarking",
    data() {
      return {
        tabItem: ['全部题型', '题目来源', '题目难度'],
        show: false,//弹窗状态
        show2: false,//loading状态
        options: '全部题型',//对应选中值
        tabIndex: 1,
        category: '',
        source: '',
        level: '',
        time: '',
        options1: [],//radio数据
        options2: [],
        options3: [],
        options4: [],
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        dataItem: '',
        toastStatu: false,
        toastText: '',
      }
    },
    components: {
      TransferDom,
      PopupRadio,
      XHeader,
      TabItem,
      ViewBox,
      Sticky,
      Radio,
      Group,
      Popup,
      Loading,
      Toast,
      Cell,
      Tab
    },
    activated() {
      this.getData();
    },
    methods: {
      getData() {
        const _this = this;
        _this.show2 = true;
        let data = {
          uid: _this.$store.state.userInfo.uid,
          category: _this.category,
          source: _this.source,
          level: _this.level,
          time: _this.time,
        };
        _this.axios.get('/cn/wap-api/collecte-record', {params: data}).then(function (res) {
          // 因VUX radio组件限制,需重构json对象为key=>value；
          let test = res.data.categorys;
          let test2 = res.data.sources;
          let test3 = res.data.levels;
          let test4 = res.data.time;
          let init, init2, init3, init4;
          let initData = [];
          let initData2 = [];
          let initData3 = [];
          let initData4 = [];
          for (const k in test) {
            init = {key: test[k].id, value: test[k].name};
            initData.push(init)
          }
          for (const k in test2) {
            init2 = {key: test2[k].id, value: test2[k].name};
            initData2.push(init2)
          }
          for (const k in test3) {
            init3 = {key: test3[k].id, value: test3[k].name};
            initData3.push(init3)
          }
          for (const k in test4) {
            init4 = {key: test4[k].id, value: test4[k].name};
            initData4.push(init4)
          }
          _this.options1 = initData;
          _this.options2 = initData2;
          _this.options3 = initData3;
          _this.options4 = initData4;
          if (res.data.data.length > 0) {
            _this.dataItem = res.data.data;
          } else {
            _this.toastText = '暂无当前数据';
            _this.toastStatu = true;
          }
          _this.$nextTick(function () {
            _this.show2 = false;
          });
          // 取json name属性返回数组；
          // _this.options1= res.data.categorys.map(v => {
          //   return v.name;
          // });
          // _this.options2 = res.data.sources.map(v => {
          //   return v.name
          // });
          // _this.options3 = res.data.levels.map(v => {
          //   return v.name
          // });
          // if (res.data.time) {
          //   // _this.tabItem = ['全部题型', '题目来源', '题目难度', '收藏时间'];
          //   _this.options4 = res.data.time.map(v => {
          //     return v.name
          //   });
          // }

        })
      },
      handle(index) {
        this.show = true;
        this.tabIndex = index;
      },
      change(value, label) {
        const _this = this;
        _this.show2 = true;
        if (_this.tabIndex === 1) {
          _this.category = value || '';
        }
        if (_this.tabIndex === 2) {
          _this.source = value || '';
        }
        if (_this.tabIndex === 3) {
          _this.level = value || '';
        }
        if (_this.tabIndex === 4) {
          _this.time = value || '';
        }
        _this.show = false;
        let data = {
          uid: _this.$store.state.userInfo.uid,
          category: _this.category,
          source: _this.source,
          level: _this.level,
          time: _this.time,
        };
        _this.axios.get('/cn/wap-api/collecte-record', {params: data}).then(function (res) {
          if (res.data.data.length > 0) {
            _this.dataItem = res.data.data;
          } else {
            _this.toastText = '暂无当前数据';
            _this.toastStatu = true;
          }
          _this.$nextTick(function () {
            _this.show2 = false;
          })

        })
      },


    }

  }
</script>

<style scoped>
  #recordMarking >>> .weui-toast.vux-toast-bottom {
    bottom: 120px; /*px*/
  }

  #recordMarking >>> .weui-toast_text .weui-toast__content {
    font-size: 14px; /*no*/
    padding: 12px 6px; /*px*/
  }

  #recordMarking >>> .vux-loading-no-text .weui-toast {
    top: 50%;
    margin-top: -49px; /*no*/
  }

  .vux-tab .vux-tab-item {
    font-size: 30px; /*px*/
  }

  .header {
    background: #5a5ee4;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }

  .flex {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
  }

  .topicWrap {
    padding: 20px;
    border-bottom: 1px solid #d2d2d2; /*no*/
  }

  .nameWrap {
    padding-bottom: 15px; /*px*/
  }

  .name {
    font-weight: normal;
    font-size: 30px; /*px*/
    color: #888888;
    max-width: 80%;
  }

  .topicDe {
    color: #444444;
    line-height: 45px;
    font-size: 30px; /*px*/
    max-height: 90px;
    /*word-break: break-word;*/
    padding-bottom: 15px; /*px*/
  }

  .useTime {
    color: #777777;
    font-size: 28px; /*px*/
  }

  .answer {
    color: #777777;
    justify-content: flex-start !important;
    font-size: 28px; /*px*/
  }

  .answer .answerItem:first-child {
    padding-right: 20px; /*px*/
  }

  .answerItem {
    min-width: 40%;
    box-sizing: border-box;
    word-break: break-all;
    padding: 5px 0; /*px*/
  }

  .green {
    font-style: normal;
    color: #2a9f1b;
    padding-right: 10px;
  }

  .red {
    font-style: normal;
    color: #f83d3d;
  }
</style>
