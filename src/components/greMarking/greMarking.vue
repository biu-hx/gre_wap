<template>
  <div id="greMarking" style="height: 100%;">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="20px">
      <x-header class="header" @on-click-back="reBack" :left-options="{backText: '',preventGoBack:true}">GRE做题</x-header>
      <div>
        <sticky scroll-box="vux_view_box_body" ref="sticky" :offset="46" :check-sticky-support="false" :disabled="false">
          <tab :line-width="2" active-color="#5a5ee4" :scroll-threshold="4" default-color="#444444" custom-bar-width="70px">
            <tab-item :selected="0==i" :key="i" v-for="(item,i) in tabItem" @on-item-click="handler">{{item}}</tab-item>
          </tab>
        </sticky>
      </div>
      <!--单项显示-->
      <div style="padding: 20px 40px 0">
        <!--仅单项显示-->
        <button-tab v-if="tabType<1" :height="35" style="margin-bottom: 20px">
          <button-tab-item :selected="0==index" @on-item-click="handleBtn(item.id)" v-for="(item,index) in sectionA" :key="index">{{item.name}}
          </button-tab-item>
        </button-tab>
      </div>
      <div class="testListWrap">
        <group class="testList" gutter="0">
          <!--link="/markingIndex"-->
          <cell :border-intent="false"
                :link="{path:'/markingIndex',query: {sourceId:tabType<1?item.id:'',sectionId:sectionId,knowId:tabType>0?item.id:''}}"
                v-for="(item,index) in resDataItem" :key="index">
            <span slot="title" class="testName">{{item.name}}</span>
            <span class="testNum">{{item.totalDoNum}}/{{item.totalNum}}</span>
          </cell>
        </group>
      </div>
      <loading :show="show2" text=""></loading>
      <!--考点显示-->
    </view-box>
  </div>
</template>

<script type="text/ecmascript-6">
  import {XHeader, Tab, TabItem, Group, Cell, Loading, ViewBox, Sticky, ButtonTab, ButtonTabItem} from 'vux'

  export default {
    name: "greMarking",
    data() {
      return {
        show2: true,
        tabItem: ['题目单项', '填空考点', '阅读考点', '数学考点'],
        show: false,
        tabIndex: 1,//tab选中的项
        sectionA: '',
        tabType: 0,//0单项还是1考点
        sectionId: 1,//链接需要的sectionId
        resDataItem: '',
      }
    },
    components: {
      XHeader,
      Tab,
      Cell,
      Loading,
      Group,
      ViewBox,
      Sticky,
      TabItem,
      ButtonTab,
      ButtonTabItem

    },
    activated() {
      this.getData();
    },
    methods: {
      reBack() {
        this.$router.push({name: 'index'})
      },
      getData() {
        this.$nextTick(function () {
          // uid sectionId（单项id 默认为1-填空） type（0-题目单项 1-填空、填空、数学考点 默认为0）
          const _this = this;
          let data = {
            uid: _this.$store.state.userInfo.uid,
            sectionId: _this.sectionId,//二级导航 ID(后台返回的导航);
            type: _this.tabType,//1是考点，0是单项；默认是0；
          };
          _this.axios.get('/cn/wap-api/make', {params: data}).then(function (res) {
            _this.sectionA = res.data.sections;
            _this.resDataItem = res.data.comes;
            _this.show2 = false;
          })
        })
      },
      handler(index) {
        this.show2 = true;
        this.tabType = index > 0 ? 1 : 0;
        this.tabIndex = index + 1;
        if (this.tabType > 0) {
          // 参数为考点的id（依次为1,2,3）
          this.sectionId = index;
          this.upData(index);
        } else {
          // 参数为btnTab的id
          this.upData(this.sectionId);
        }

      },
      handleBtn(id) {
        this.show2 = true;
        this.sectionId = id;
        this.upData(id);
      },
      upData(sectionId) {
        this.$nextTick(function () {
          const _this = this;
          let data = {
            uid: _this.$store.state.userInfo.uid,
            sectionId: sectionId,//二级导航 ID(后台返回的导航);
            type: _this.tabType,//1是考点，0是单项；默认是0；
          };
          _this.axios.get('/cn/wap-api/make', {params: data}).then(function (res) {
            _this.sectionA = res.data.sections;
            _this.resDataItem = res.data.comes;
            _this.show2 = false;
          })
        })
      },
    }
  }
</script>

<style scoped>
  #greMarking {
    background: #f3f3f3;
  }

  #greMarking >>> .vux-loading-no-text .weui-toast {
    top: 50%;
    margin-top: -49px; /*no*/
  }

  .header {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;

    background: #5a5ee4;
  }

  .vux-tab .vux-tab-item {
    font-size: 30px; /*px*/
  }

  .vux-button-group > a {
    color: #5a5ee4;
    font-size: 30px; /*px*/
  }

  .vux-button-group > a.vux-button-group-current {
    background: #5a5ee4;
  }

  .vux-button-tab-item:after {
    border-color: #5a5ee4 !important;
    border-width: 2px !important; /*no*/
  }

  .vux-button-group > a.vux-button-tab-item-first:after {
    border-top-left-radius: 16PX;
    border-bottom-left-radius: 16PX;
  }

  .vux-button-group > a.vux-button-tab-item-last:after {
    border-top-right-radius: 16PX;
    border-bottom-right-radius: 16PX;
  }

  .vux-button-group > a.vux-button-tab-item-first {
    border-top-left-radius: 10PX;
    border-bottom-left-radius: 10PX;
  }

  .vux-button-group > a.vux-button-tab-item-last {
    border-top-right-radius: 10PX;
    border-bottom-right-radius: 10PX;
    left: -1px;
  }

  .testListWrap {
    padding: 0 20px;
  }

  .testList {
    border-radius: 12px; /*px*/
    border: 1px solid #d9d9d9; /*no*/
  }

  .testName {
    font-size: 32px; /*px*/
    color: #333333;
  }

  .testNum {
    font-size: 30px; /*px*/
    color: #777777;
  }

  .weui-cell {
    padding: 30px;
  }

  .weui-cell:before {
    border-color: #d9d9d9;
    border-top-width: 2px; /*no*/
  }
</style>
