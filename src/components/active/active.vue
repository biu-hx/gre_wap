<template>
  <div id="active">
    <div class="adImg"><img :src="$store.state.http_gre+adImg" alt=""></div>
    <tab :line-width="2" active-color="#5a5ee4" default-color="#333333" custom-bar-width="70px">
      <tab-item :selected="0==i" :key="i" v-for="(item,i) in list" @on-item-click="handler(i)">{{item}}</tab-item>
    </tab>
    <ul class="courseLIst">
      <li v-for="(item,index) in curData.data">
        <router-link :to="{path:'/activeDetails',query: {id: item.id}}" tag="div">
          <div class="container">
            <div class="courseImg tm relative">
              <div class="tagWap ani">
                <p class="tag_p1">{{item.catName}}</p>
                <p class="tag_p2">{{item.status}}</p>
              </div>
              <img :src="$store.state.http_open+item.image" alt="">
              <p class="ani starTime">开始时间:{{item.cnName}}</p>
            </div>
            <div class="courseInfo">
              <h1 class="acTit ellipsis-2">{{item.name}}</h1>
              <div style="margin-bottom: 4px;">
                <img src="/static/images/active/pnum.png" class="acIcon" alt="">
                <span class="icon_data">报名人数：{{item.numbering}}</span>
              </div>
              <div>
                <img src="/static/images/active/time.png" class="acIcon" alt="">
                <span class="icon_data">剩余天数：{{item.days}}</span>
              </div>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <loading :show="show" text=""></loading>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Tab, TabItem, ViewBox, Loading} from 'vux'

  export default {
    name: "active",
    data() {
      return {
        show: false,
        adImg: '',
        resData: '',
        curData: '',
        list: ['全部活动', '公开课', '刷题团', '单词团'],

      }
    },
    components: {
      Tab,
      Loading,
      TabItem,
      ViewBox
    },
    mounted() {
      const _this = this;
      _this.show = true;
      this.axios.get('/cn/wap-api/activity').then(function (response) {
        _this.adImg = response.data.carousel[0].image;
        _this.resData = response.data.data;
        _this.curData = response.data.data.all;
        _this.$nextTick(function () {
          _this.show = false;
        })
      })
    },
    methods: {
      handler(index) {
        if (index + 1 == 1) {
          this.curData = this.resData.all
        }
        if (index + 1 == 2) {
          this.curData = this.resData.openClass
        }
        if (index + 1 == 3) {
          this.curData = this.resData.brushing
        }
        if (index + 1 == 4) {
          this.curData = this.resData.wordGroup
        }
      }
    }
  }
</script>

<style scoped>
  #active >>> .vux-loading-no-text .weui-toast {
    top: 50%;
    margin-top: -49px; /*no*/
  }

  .courseLIst {
    padding: 0 20px;
  }

  .courseLIst li {
    padding: 32px 0;
    border-bottom: 1px solid #dcdcdc; /*no*/
  }

  .courseLIst li:last-child {
    border-bottom: none;
  }

  .container {
    display: flex;
    flex-flow: wrap row;
    justify-content: space-between;
    align-items: flex-start;
    box-sizing: border-box;
  }

  .courseInfo {
    width: 52%;
  }

  .courseImg {
    position: relative;
    width: 312px;
    height: 175px;
    overflow: hidden;
  }

  .courseImg img {
    width: 100%;
    height: 100%;
  }

  .vux-tab .vux-tab-item {
    font-size: 28px; /*px*/
  }

  .acTit {
    font-weight: normal;
    font-size: 30px; /*px*/
    color: #242424;
    line-height: 42px;
    max-height: 84px;
    margin-bottom: 10px;
  }

  .acIcon {
    vertical-align: middle;
    width: 30px; /*px*/
  }

  .icon_data {
    vertical-align: middle;
    padding-left: 10px;
    font-size: 28px; /*px*/
    color: #888888;
  }

  .starTime {
    left: 0;
    bottom: 0;
    width: 100%;
    color: #ffffff;
    font-size: 22px; /*px*/
    padding: 7px;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.5);
  }

  .tagWap {
    width: 94px;
    height: 75px;
    color: #ffffff;
    background: url("/static/images/active/tagBg.png") no-repeat 0 0;
    background-size: cover;
  }

  .tagWap .tag_p1 {
    padding: 5px 0;
    font-size: 22px; /*px*/
  }

  .tagWap .tag_p2 {
    font-size: 20px; /*px*/
  }
</style>
