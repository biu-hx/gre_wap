<template>
  <div id="order" style="height: 100%;background: #f3f3f3;">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="0">
      <x-header slot="header" class="header" :left-options="{backText: ''}">我的订单</x-header>
      <div>
        <sticky
          scroll-box="vux_view_box_body"
          ref="sticky"
          :offset="46"
          :check-sticky-support="false"
          :disabled="false">
          <tab :line-width="2" active-color="#5a5ee4" :scroll-threshold="6" default-color="#444444" custom-bar-width="50px">
            <tab-item :selected="0==i" :key="i" v-for="(item,i) in tabItem" @on-item-click="handle">{{item}}</tab-item>
          </tab>
        </sticky>
      </div>

      <ul class="orderList">
        <li v-for="(item,index) in resData" class="orderItem">
          <div class="flex orderInfo">
            <div>订单号：{{item.orderNumber}}</div>
            <div>{{parseInt(item.createTime) | moment("YYYY-MM-DD HH:mm:ss")}}</div>
          </div>
          <div class="courseWrap flex">
            <!--<router-link class="flex" to="/confirmOrder">-->
            <div class="courseImg"><img :src="$store.state.http_gre+item.detail.image" alt=""></div>
            <div class="courseData">
              <h1 class="courseName ellipsis-2">{{item.detail.title}}</h1>
              <div class="courseNum">
                <span class="price">￥{{item.totalMoney}}元</span>
                <span class="num">x {{item.num}}</span>
              </div>
            </div>
            <!--</router-link>-->
          </div>
          <div v-if="item.status!=3" class="handle flex">
            <router-link :to="{name:'orderDetails',query:{id:item.id}}" class="linkBtn">立即付款</router-link>
            <span class="cancelBtn">取消订单</span>
          </div>
          <div v-else class="handle flex">
            <router-link :to="{name:'orderDetails',query:{id:item.id}}" class="linkBtn">查看详情</router-link>
          </div>
        </li>
      </ul>
    </view-box>
    <loading :show="show" text=""></loading>
  </div>
</template>

<script type="text/ecmascript-6">
  import {XHeader, ViewBox,Sticky, Tab, TabItem, Group, Loading} from 'vux'

  export default {
    name: "order",
    data() {
      return {
        show: false,
        tabItem: ['全部订单', '已付款', '待付款'],
        tabIndex: 1,
        dataWrap: '',
        resData: '',
      }
    },
    components: {
      XHeader,
      ViewBox,
      Sticky,
      TabItem,
      Loading,
      Group,
      Tab,
    },
    activated() {
      this.getData();
    },
    methods: {
      getData() {
        const _this = this;
        _this.show = true;
        let data = {uid: _this.$store.state.userInfo.uid};
        _this.axios.get('/cn/wap-api/my-order', {params: data}).then(function (res) {
          _this.dataWrap = res.data;
          _this.resData = res.data.data;
          _this.$nextTick(function () {
            _this.show = false
          })
        })

      },
      handle(index) {
        this.tabIndex = index + 1;
        if (index + 1 === 1) {
          this.resData = this.dataWrap.data;
        }
        if (index + 1 === 2) {
          this.resData = this.dataWrap.isPay;
        }
        if (index + 1 === 3) {
          this.resData = this.dataWrap.notPay;
        }
      }
    }
  }
</script>

<style scoped>
  #order >>> .vux-loading-no-text .weui-toast {
    top: 50%;
    margin-top: -49px; /*no*/
  }

  .header {
    background: #5a5ee4;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }

  .orderList {
    padding-top: 16px;
    background: #f3f3f3;
  }

  .orderItem {
    background: #ffffff;
    padding: 25px 20px;
    margin-bottom: 16px;
  }

  .flex {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
  }

  .orderInfo {
    color: #777777;
    font-size: 24px; /*px*/
  }

  .courseName {
    font-size: 30px; /*px*/
    color: #333333;
    line-height: 40px;
    height: 80px;
    font-weight: normal;
  }

  .courseWrap {
    padding: 25px 0;
    justify-content: flex-start;
  }

  .courseImg {
    width: 28%;
    overflow: hidden;
  }

  .courseData {
    text-align: justify;
    padding-left: 20px;
    width: 69%;
  }

  .price {
    color: #df0000;
    font-size: 30px;
  }

  .num {
    color: #777777;
    padding-left: 20px;
    font-size: 30px; /*px*/
  }

  .handle {
    justify-content: flex-end;
  }

  .linkBtn {
    border-radius: 6px; /*px*/
    padding: 0 15px; /*px*/
    font-size: 24px; /*px*/
    color: #ffffff;
    height: 42px;
    line-height: 42px;
    background: #5a5ee4;
  }

  .cancelBtn {
    margin-left: 15px;
    color: #4a4a4a;
    font-size: 24px; /*px*/
    border-radius: 6px; /*px*/
    padding: 0 15px; /*px*/
    height: 42px;
    line-height: 42px;
  }

</style>
