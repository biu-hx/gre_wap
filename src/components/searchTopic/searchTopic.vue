<template>
  <div id="searchTopic">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="60px">
      <x-header class="header" slot="header" :left-options.backText="{backText: '',preventGoBack:true}" @on-click-back="reback">
        <span>GRE搜题</span>
        <div slot="right">
          <router-link to="/search"><img class="scIcon" src="/static/images/search/search.png" alt=""></router-link>
        </div>
      </x-header>
      <tab :line-width="2" active-color="#5a5ee4" :scroll-threshold="5" default-color="#444444" custom-bar-width="40px">
        <tab-item :selected="0==index" :key="index" v-for="(item,index) in categorys" @on-item-click="handler(item.id)">{{item.name}}</tab-item>
      </tab>
      <div class="tagWrap">
        <div class="tagItem">
          <h1 class="checkName">题目来源</h1>
          <ul class="tm tagList">
            <li class="on" v-for="(item,index) in sources" @click="activeA(index,item.id)" :class="{'active':index ==selectedA }">
              {{item.name}}
            </li>
          </ul>
        </div>
        <div class="tagItem">
          <h1 class="checkName">题目难度</h1>
          <ul class="tm tagList">
            <li v-for="(item,index) in levels" @click="activeB(index,item.id)" :class="{'active':index ==selectedB }">
              {{item.name}}
            </li>
          </ul>
        </div>
        <div class="tagItem">
          <h1 class="checkName">做题情况</h1>
          <ul class="tm tagList">
            <li v-for="(item,index) in status" @click="activeC(index,index+1)" :class="{'active':index ==selectedC }">{{item}}
            </li>
          </ul>
        </div>
      </div>
      <ul class="topicList">
        <!--testDetails?libraryId=797&questionId=57&curIndex=0-->
        <router-link tag="li" :to="{name:'questionDetails',query:{type:1,qid:item.id}}" v-for="(item,index) in resData" :key="index">
          <h1 class="topicName ellipsis">{{item.section}} {{item.source.name}}-{{item.id}}</h1>
          <div class="topicText ellipsis-2">{{item.stem}}</div>
        </router-link>
        <!--<li v-for="(item,index) in resData">-->
        <!--<h1 class="topicName ellipsis">{{item.section}} {{item.source.name}}-{{item.id}}</h1>-->
        <!--<div class="topicText ellipsis-2">{{item.stem}}</div>-->
        <!--</li>-->
      </ul>
    </view-box>
    <toast v-model="toastStatu" :text="toastText" width="4rem" type="text" :time="1200" position="bottom"></toast>
    <confirm theme="ios" v-model="show" :title="title" @on-confirm="onConfirm"></confirm>
    <loading :show="show2" text=""></loading>
  </div>
</template>
<script type="text/ecmascript-6">
  import {XHeader, ViewBox, Tab, TabItem, Toast, Confirm, Loading} from 'vux'

  export default {
    name: "searchTopic",
    data() {
      return {
        title: '当前未登录，是否前往登录？',
        show: false,
        show2: false,
        selectedA: 0,
        selectedB: 0,
        selectedC: 0,
        categorys: [],//tab 分类
        sources: [],//来源
        levels: [],//难易度
        status: ['全部', '做过', '正确', '错误'],
        requestId: {
          catId: 0,
          souceId: 0,
          levelId: 0,
          typeId: 1,//做题情况
        },
        resData: '',
        toastStatu: false,
        toastText: '',
      }
    },
    components: {
      XHeader, ViewBox, Tab, TabItem, Toast, Confirm, Loading
    },
    activated() {
      this.getData();
    },
    methods: {
      getData(cateId, sourceId, levelId, doType) {
        const _this = this;
        _this.show2 = true;
        let data = {
          uid: _this.$store.state.userInfo.uid,
          category: cateId,
          source: sourceId,
          level: levelId,
          dotype: doType,
        };
        _this.axios.get('/cn/wap-api/search-type', {params: data}).then(function (res) {
          _this.categorys = res.data.categorys;
          _this.categorys.unshift({id: 0, name: "全部"});
          _this.levels = res.data.levels;
          _this.levels.unshift({id: 0, name: "全部"});
          _this.sources = res.data.sources;
          _this.sources.unshift({id: 0, name: "全部"});
          if (res.data.data.length > 0) {
            _this.resData = res.data.data;
          } else {
            _this.toastText = '暂无当前数据';
            _this.toastStatu = true;
          }
          _this.$nextTick(function () {
            _this.show2 = false;
          })
        })


      },
      //分类
      handler(catId) {
        this.requestId.catId = catId;
        this.selected();
      },
      //来源
      activeA(index, souceId) {
        this.selectedA = index;
        this.requestId.souceId = souceId;
        this.selected();
      },
      //难易度
      activeB(index, levelId) {
        this.selectedB = index;
        this.requestId.levelId = levelId;
        this.selected();
      },
      //做题情况
      activeC(index, typeId) {
        let isLogin = this.$store.state.isLogin;
        if (index > 0 && isLogin) {
          this.selectedC = index;
          this.requestId.typeId = typeId;
          this.selected();
        } else {
          this.show = true;
        }


      },
      reback() {
        this.$router.push({name: 'index'})
      },

      selected() {
        const _this = this;
        let data = {
          uid: _this.$store.state.userInfo.uid,
          category: _this.requestId.catId,
          source: _this.requestId.souceId,
          level: _this.requestId.levelId,
          dotype: _this.requestId.typeId,
        };
        _this.axios.get('/cn/wap-api/search-type', {params: data}).then(function (res) {
          if (res.data.data.length > 0) {
            _this.resData = res.data.data;
          } else {
            _this.toastText = '暂无当前数据';
            _this.toastStatu = true;
          }

        })
      },
      onConfirm() {
        this.$router.push({name: 'login'})
      },
    }
  }
</script>

<style scoped>
  #searchTopic {
    height: 100%;
  }

  #searchTopic >>> .weui-toast.vux-toast-bottom {
    bottom: 120px; /*px*/
  }

  #searchTopic >>> .weui-toast_text .weui-toast__content {
    font-size: 14px; /*no*/
    padding: 12px 6px; /*px*/
  }

  #searchTopic >>> .vux-loading-no-text .weui-toast {
    top: 50%;
    margin-top: -49px; /*no*/
  }

  #searchTopic >>> .weui-dialog__bd {
    display: none;
  }

  #searchTopic >>> .weui-dialog__btn_primary {
    color: #5a5ee4;
  }

  #searchTopic >>> .weui-dialog__btn {
    font-size: 28px; /*px*/
  }

  #searchTopic >>> .weui-dialog__title {
    font-size: 32px; /*px*/
  }

  .header {
    background: #5a5ee4;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }

  .scIcon {
    height: 40px; /*px*/
  }

  .vux-tab .vux-tab-item {
    font-size: 32px; /*px*/
  }

  .tagWrap {
    padding: 20px;
    border-bottom: 1px solid #d2d2d2; /*no*/
  }

  .checkName {
    color: #333333;
    padding: 20px 0;
    font-size: 32px; /*px*/
  }

  .tagList li {
    color: #888888;
    /*width: 200px;!*px*!*/
    width: 30%;
    margin: 14px 0; /*px*/
    height: 50px; /*px*/
    line-height: 50px; /*px*/
    font-size: 28px; /*px*/
    border-radius: 6px; /*no*/
    border: 1px solid #aaaaaa; /*no*/
  }

  .tagList li.active {
    background: #5a5ee4;
    color: #ffffff;
    border-color: #5a5ee4;
  }

  .tagList {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
  }

  .tagList:after {
    content: '';
    width: 30%;
  }

  .topicList {
    /*padding: 20px;*/
  }

  .topicList li {
    padding: 30px 20px;
    border-bottom: 1px solid #d2d2d2; /*no*/
  }

  .topicName {
    font-weight: normal;
    color: #888888;
    margin-bottom: 14px;
    font-size: 34px; /*px*/
  }

  .topicText {
    color: #333333;
    line-height: 50px; /*px*/
    font-size: 32px; /*px*/
  }

</style>
