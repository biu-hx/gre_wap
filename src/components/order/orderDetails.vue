<template>
  <div id="orderDetails" style="height: 100%;background: #f3f3f3;">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="10px">
      <x-header slot="header" class="header" :left-options="{backText: ''}">订单查看</x-header>
      <div class="orderItem">
        <div class="flex courseWrap">
          <div class="courseImg"><img :src="$store.state.http_gre+resData.detail.image" alt=""></div>
          <div class="courseData">
            <h1 class="courseName ellipsis-2">{{resData.detail.title}}</h1>
            <div class="courseNum">
              <span class="price">￥{{resData.totalMoney}}元</span>
              <span class="num">x {{resData.num}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bg_f">
        <div class="orderInfo">
          <div class="flex infoText"><label>运费</label><span>￥0.00</span></div>
          <div class="flex infoText"><label>商品总价</label><span>￥{{resData.totalMoney}}</span></div>
          <div class="flex infoText"><label>使用雷豆抵扣</label><span>￥{{resData.integral*0.01}}</span></div>
          <div class="flex infoText"><label style="color: #292929;">订单总价</label><span style="color: #df0000;">￥{{resData.payable}}</span></div>
        </div>
        <!--未付款 显示-->
        <div v-if="parseInt(resData.status)===1" class="handle flex">
          <div class="delet" @click="deletOrder(resData.orderId)">删除订单</div>
          <div class="buy" @click="pay(resData.orderId)">付款</div>
        </div>
        <!--已付款 显示-->
        <div v-else class="orderTime bg_f">
          <p>订单编号：{{resData.orderNumber}}</p>
          <p>创建时间：{{parseInt(resData.createTime) | moment('YYYY-MM-DD hh:mm:ss')}}</p>
          <p>成交时间：{{parseInt(resData.payTime) | moment('YYYY-MM-DD hh:mm:ss')}} </p>
        </div>
      </div>
    </view-box>
    <loading :show="show" text=""></loading>
    <confirm theme="ios" v-model="show2" :title="title" @on-confirm="onConfirm"></confirm>
  </div>
</template>

<script type="text/ecmascript-6">
  import {ViewBox, XHeader, Loading,Confirm} from 'vux'

  export default {
    name: "orderDetails",
    data() {
      return {
        title: '请确认是否要删除该订单?',
        show: false,
        show2:false,
        orderId:'',
        resData: {
          detail:{
            image:'',
          }
        },
      }
    },
    components: {
      ViewBox, XHeader, Loading,Confirm
    },
    activated() {
      this.getData();
    },
    methods: {
      getData() {
        const _this = this;
        _this.show = true;
        let data = {
          uid: _this.$store.state.userInfo.uid,
          id: _this.$route.query.id,
        };
        _this.axios.get('/cn/wap-api/order-detail', {params: data}).then(function (res) {
          _this.resData = res.data;
          _this.$nextTick(function () {
            _this.show = false;
          })
        })

      },
      pay(id){
        let uid=this.$store.state.userInfo.uid;
        let userName=this.$store.state.userInfo.username;
        let payUrl = "http://order.gmatonline.cn/pay/order/pay?orderId=" + id + "&server=wap"
          + "&uid=" + uid + "&username=" + userName + "";
        window.open(payUrl);
      },
      deletOrder(id){
        this.orderId=id;
        this.show2=true;
      },
      onConfirm(){
        const _this = this;
        _this.show=true;
        let data = {
          id: this.orderId,
        };
        _this.axios.get('http://order.gmatonline.cn/pay/wap-api/cancel', {params: data}).then(function (res) {
          if(res.data.code===1){
            _this.$router.go(-1);
          }
          _this.$nextTick(function () {
            _this.show = false;
          })
        })
      }
    },
  }
</script>

<style scoped>
  #orderDetails >>> .vux-loading-no-text .weui-toast {
    top: 50%;
    margin-top: -49px; /*no*/
  }
  #orderDetails >>> .weui-dialog__bd {
    display: none;
  }
  #orderDetails>>>.weui-dialog__title{
    font-size: 30px;/*px*/
  }
  #orderDetails >>> .weui-dialog__btn_primary {
    color: #5a5ee4;

  }
  #orderDetails>>>.weui-dialog__ft{
    font-size: 28px;/*px*/
  }

  .header {
    background: #5a5ee4;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }

  .orderItem {
    background: #ffffff;
    padding: 15px 20px 25px;
    margin-bottom: 16px;
  }

  .flex {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
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

  .infoText {
    color: #676767;
    font-size: 30px; /*px*/
    line-height: 1.8;
  }

  .mgb_16 {
    margin-bottom: 16px;
  }

  .orderInfo, .orderTime {
    padding: 20px;
  }

  .orderTime {
    color: #777777;
    font-size: 30px; /*px*/
    margin-bottom: 16px;
    border-top: 16px solid #f3f3f3; /*px*/
  }

  .orderTime p {
    line-height: 1.8;
  }

  .handle {
    font-size: 32px; /*px*/
    text-align: center;
    border: 1px solid #d5d2d2; /*no*/
    border-left: none;
    border-right: none;
  }

  .handle .delet {
    color: #1f1f1f;
    background: #ffffff;
    width: 50%;
    padding: 30px 0;
  }

  .handle .buy {
    width: 50%;
    color: #ffffff;
    background: #5a5ee4;
    padding: 30px 0;
  }

  .buy a {
    display: block;
    color: #ffffff;
  }
</style>
