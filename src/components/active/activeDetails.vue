<template>
  <div id="activeDetails">
    <view-box ref="viewBox" body-padding-bottom="62px">
      <div class="content">
        <div class="head"><img :src="$store.state.http_open+resData.data.data.image" alt=""></div>
        <div class="dataWrap bg_f">
          <div class="content_1">
            <h1 class="courseName">{{resData.parent.title}}</h1>
            <div class="courseDe">{{resData.parent.name}}</div>
            <div class="dataBg">
              <div style="flex: 1;"><i class="iconBg icon_1"></i><span>报名人数：{{resData.parent.numbering}}</span></div>
              <div class="ellipsis"><i class="iconBg icon_2"></i><span>距离报名结束：{{countText}}</span></div>
            </div>
            <div class="startTime">
              <div><span class="blue">{{resData.parent.problemComplement}}</span><span> （课程时长）</span></div>
              <div class="price_1">￥{{resData.data.data.price}}</div>
            </div>
          </div>
        </div>
        <tab :line-width="2" active-color="#5a5ee4" :scroll-threshold="6" default-color="#444444">
          <tab-item :selected="0==i" :key="i" v-for="(item,i) in tabItem" @on-item-click="handler('item_'+(i+1))">{{item}}</tab-item>
        </tab>

        <div class="tab_content_wrap">
          <item_1 :is="currentTab" v-bind:itemData="resData.parent" keep-alive></item_1>
        </div>
      </div>

      <div class="bottom bg_f">
        <div class="bottomLeft bottomItem">
          <div class="priceWrap_2">
            <p class="priceName">促销价</p>
            <p class="price_2">￥{{resData.data.data.price}}</p>
          </div>
        </div>
        <button class="bottomRight bottomItem">
          <a href="mqqwpa://im/chat?chat_type=wpa&uin=1746295647&version=1&src_type=web&web_src=http://m.haishiit.com/">立即咨询</a>
        </button>
      </div>
    </view-box>
    <loading :show="show" text=""></loading>
  </div>
</template>
<script>
  import item_1 from './child/item_1'
  import item_2 from './child/item_2'
  import {Tab, TabItem, ViewBox, Loading} from 'vux'

  export default {
    name: "activeDetails",
    data() {
      return {
        show: false,
        tabItem: ['课程介绍', '授课名师'],
        currentTab: 'item_1',
        id: '',
        resData: {
          parent: {title: ''},
          data: {
            data: {}
          }
        },
        countVal: '',
        countText: '',
      }
    },
    components: {
      Tab, TabItem, ViewBox, item_1, item_2, Loading
    },
    activated() {
      this.id = this.$route.query.id;
      this.getData(this.$route.query.id);
    },
    methods: {
      getData(id) {
        const _this = this;
        _this.show = true;
        this.axios.get("/cn/wap-api/activity-detail?contentid=" + id)
          .then(function (res) {
            _this.resData = res.data;
            _this.countVal = res.data.parent.commencement;
            if (isNaN(parseInt(_this.countVal))) {
              _this.countText = _this.countVal;
            } else {
              let time = setInterval(() => {
                _this.countTime(_this.countVal--);
              }, 1000);

            }
            _this.$nextTick(function () {
              _this.show = false;
            })
          })
      },
      handler(index) {
        this.currentTab = index;
      },
      countTime(time) {
        let mouth = parseInt(time / 60 / 60 / 24 / 30);
        let day = parseInt(time / 60 / 60 / 24 % 30);
        let hour = parseInt(time / 60 / 60 % 24);
        let minute = parseInt(time / 60 % 60);
        let seconds = parseInt(time % 60);
        if (mouth > 0) {
          return this.countText = mouth + "月" + day + "天" + hour + "小时" + minute + "分钟" + seconds + "秒";
        }
        if (day > 0) {
          return this.countText = day + "天" + hour + "小时" + minute + "分钟" + seconds + "秒";
        } else {
          return this.countText = hour + "小时" + minute + "分钟" + seconds + "秒";
        }
      }
    }

  }
</script>

<style scoped>
  #activeDetails {
    height: 100%;
    background: #eeeeee;
  }

  #activeDetails >>> .vux-loading-no-text .weui-toast {
    top: 50%;
    margin-top: -49px; /*no*/
  }

  .dataWrap {
    padding: 0 24px 24px;
    margin-bottom: 20px;
  }

  .courseName {
    font-size: 40px; /*px*/
    color: #333333;
    padding: 24px 0;
  }

  .courseDe {
    font-size: 28px; /*px*/
    color: #888888;
    padding-bottom: 18px;
  }

  .dataBg {
    color: #fff;
    font-size: 26px; /*px*/
    padding: 20px;
    background: url("/static/images/course/dataBg.png") no-repeat 0 0;
    background-size: cover;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 18px;
  }

  .dataBg span {
    vertical-align: middle;
  }

  .iconBg {
    display: inline-block;
    vertical-align: middle;
    width: 30px; /*px*/
    height: 30px; /*px*/
    margin-right: 10px;
  }

  .icon_1 {
    background: url("/static/images/course/icon_1.png") no-repeat 0 0;
    background-size: contain;
  }

  .icon_2 {
    background: url("/static/images/course/icon_2.png") no-repeat 0 0;
    background-size: contain;
  }

  .timeWrap {
    padding: 18px 0 10px;
  }

  .startTime {
    color: #888888;
    padding: 20px 10px;
    font-size: 28px; /*px*/
    background: #f2f2f2;
    border: 1px dashed #949494; /*no*/
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

  }

  .price_1 {
    font-size: 40px; /*px*/
    font-weight: bold;
    color: #ff0036;
  }

  .blue {
    color: #5a5ee4;
  }

  .infoRow {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding: 12px 0;
  }

  .rowName {
    width: 140px;
    color: #888888;
    font-size: 28px; /*px*/
  }

  .rowName strong {
    font-weight: normal;
  }

  .default_de {
    color: #444444;
    font-size: 28px; /*px*/
  }

  .infoTag {
    flex: 1;
  }

  .infoTag span {
    width: 155px;
    height: 40px;
    line-height: 40px;
    color: #ffffff;
    text-align: center;
    display: inline-block;
    font-size: 26px; /*px*/
    border-radius: 4px; /*no*/
    margin-right: 30px;
    margin-bottom: 16px;
    background: black;
  }

  .infoTag span:nth-child(1) {
    background: #e34d4d;
  }

  .infoTag span:nth-child(2) {
    background: #3eb3d5;
  }

  .vux-tab .vux-tab-item {
    font-size: 30px; /*px*/
  }

  .tab_content_wrap {
    background: #ffffff;
    padding: 0 24px;
  }

  /**************************************/
  .userHead {
    width: 70px; /*px*/
    height: 70px; /*px*/
    overflow: hidden;
    border-radius: 50%;
  }

  .userHead img {
    width: 100%;
    border-radius: 50%;
  }

  .tabContent_4 .replyItem:last-child {
    border-bottom: none;
  }

  .replyItem {
    display: flex;
    padding: 25px 0;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid #cfcfcf; /*no*/
  }

  .replyRight {
    flex: 1;
    box-sizing: border-box;
    padding-left: 15px; /*px*/
  }

  .replyTime {
    font-size: 28px; /*px*/
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    color: #888888;
    margin-bottom: 10px; /*px*/
  }

  .nickName {
    font-size: 28px; /*px*/
    color: #0b0b0b;
    padding-right: 30px; /*px*/
  }

  .replyText {
    color: #333333;
    font-size: 30px; /*px*/
    line-height: 50px; /*px*/
  }

  /*******************************/
  .bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100px; /*px*/
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
  }

  .bottomItem {
    height: 100%;
  }

  .bottomLeft {
    width: 60%;
    padding: 0 20px 0 40px;
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
  }

  .bottomRight {
    width: 40%;
    text-align: center;
    background: #5a5ee4;
    color: #ffffff;
    font-size: 32px; /*px*/
    border: none;
    outline: none;
  }

  .bottomRight:active {
    background: #4144a2;
  }

  .bottomRight a {
    display: block;
    color: #ffffff;
  }

  .priceName {
    padding-left: 10px;
    color: #888888;
    font-size: 22px; /*px*/
    padding-top: 14px;
  }

  .price_2 {
    color: #f01f4b;
    font-weight: bold;
    font-size: 36px; /*px*/
  }

  .consultBtn span {
    font-size: 28px; /*px*/
    vertical-align: middle;
    color: #888888;
  }

  .icon_3 {
    display: inline-block;
    vertical-align: middle;
    width: 43px; /*px*/
    height: 46px; /*px*/
    margin-right: 4px;
    background: url("/static/images/course/consult.png") no-repeat 0 0;
    background-size: contain;
  }
</style>
