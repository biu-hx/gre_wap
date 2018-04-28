<template>
  <div id="confirmOrder">
    <view-box ref="viewBox" body-padding-top="60px" body-padding-bottom="62px">
      <x-header solt="header" class="header" :left-options="{backText: ''}">确认订单</x-header>
      <div class="wrap">
        <div class="container bg_f">
          <div class="shipWrap vux-1px-b">
            <div class="shippingTit">
              <span class="titText">收货人信息</span>
              <button class="edBtn">编辑</button>
            </div>
            <div class="infoDe">(请填写真实姓名+联系方式，方便助教老师联系您正常上 课及后期服务)</div>
            <div class="userInfo">
              <div class="infoRow">
                <span class="row_left">收<strong>货</strong>人：</span>
                <span class="row_right">请填写收货人</span>
              </div>
              <div class="infoRow">
                <span class="row_left">联系电话：</span>
                <span class="row_right">请填写联系电话</span>
              </div>
              <div class="infoRow">
                <span class="row_left">收货地址：</span>
                <span class="row_right">请填写收货地址</span>
              </div>
            </div>
          </div>
          <div class="courseInfo">
            <div class="courseWrap flex">
              <div class="courseImg"><img src="/static/images/index/artImg.png" alt=""></div>
              <div class="courseData">
                <h1 class="courseName ellipsis-2">雷哥GRE全程经典强化班</h1>
                <div class="courseNum flex">
                  <span class="price">￥600元</span>
                  <span class="num">x 1</span>
                </div>
              </div>
            </div>
            <div class="buyNum flex">
              <span class="buyNum_tit">购买数量</span>
              <inline-x-number style="display:block;" :min="1" width="60px"></inline-x-number>
            </div>
            <div class="leidWrap vux-1px-t vux-1px-b">
              <checklist class="leidRow" label-position="left" :options="leid" @on-change="change"></checklist>
              <div class="flex leidRow">
                <span>雷豆总数</span>
                <span>9555枚</span>
              </div>
              <div class="leidRow leid_dq tr">
                <span>可抵扣0元</span>
                <input type="text" disabled placeholder="最多9555" value="">
              </div>
            </div>

          </div>
          <div class="billWrap">
            <h1 class="billTit">结算</h1>
            <div class="billRow">
              <span class="billLeft">订单价格</span>
              <span class="billRight">￥8000</span>
            </div>
            <div class="billRow">
              <span class="billLeft">已抵扣</span>
              <span class="billRight">￥0</span>
            </div>
            <div class="billRow">
              <span class="billLeft">需支付</span>
              <span class="billRight">￥8000</span>
            </div>

          </div>

        </div>
      </div>
      <div class="bottom flex vux-1px-t">
        <div class="bottomItem payPrice">
          <span>应付</span>
          <span>￥8000</span>
        </div>
        <div class="bottomItem" style="height: 100%">
          <button class="payBtn">
            <router-link to="/payAway">立即支付</router-link>
          </button>

        </div>

      </div>
    </view-box>
  </div>
</template>

<script>
  import {XHeader, ViewBox, Radio, Group, Cell, InlineXNumber, Checklist} from 'vux'

  export default {
    name: "confirmOrder",
    data() {
      return {
        leid: ['是否使用雷豆抵扣']
      }
    },
    components: {
      XHeader, Radio, Group, ViewBox, InlineXNumber, Cell, Checklist
    },

  }
</script>

<style scoped>
  #confirmOrder {
    height: 100%;
    background: #f3f3f3;
  }

  .header {
    background: #5a5ee4;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
  }

  .wrap {
    padding: 0 20px;
  }

  .container {
    padding: 20px;
  }

  .shipWrap {
    padding-bottom: 20px;
  }

  .shippingTit {
    padding: 10px 0 26px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
  }

  .titText {
    font-weight: bold;
    color: #333333;
    font-size: 36px; /*px*/
  }

  .edBtn {
    font-size: 28px; /*px*/
    color: #888888;
    width: 140px; /*px*/
    height: 44px; /*px*/
    background: #ffffff;
    border-radius: 3px; /*no*/
    border: 1px solid #bfbfbf; /*no*/
  }

  .edBtn:active {
    background: #5a5ee4;
    color: #ffffff;
    border-color: #5a5ee4;
  }

  .infoDe {
    color: #888888;
    font-size: 28px; /*px*/
    line-height: 40px; /*px*/
    margin-bottom: 15px;
  }

  .infoRow {
    font-size: 28px; /*px*/
    color: #888888;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-flow: row nowrap;
    padding: 10px 0;
  }

  .row_left {
    width: 150px;
  }

  .row_left strong {
    padding: 0 14px; /*px*/
  }

  .row_right {
    flex: 1;
    /*color: #888888;*/
  }

  .flex {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
  }

  .courseWrap {
    padding: 25px 0;
    justify-content: flex-start;
  }

  .courseImg {
    width: 36%;
    overflow: hidden;
  }

  .courseData {
    text-align: justify;
    padding-left: 20px;
    width: 60%;
  }

  .courseName {
    font-size: 32px; /*px*/
    color: #333333;
    line-height: 40px; /*px*/
    height: 80px; /*px*/
    font-weight: normal;
    margin-bottom: 10px;
  }

  .price {
    color: #df0000;
    font-size: 32px;
  }

  .num {
    color: #323232;
    padding-left: 20px;
    font-size: 32px; /*px*/
  }

  .buyNum {
    align-items: center;
    margin-bottom: 30px;
  }

  .buyNum_tit {
    font-size: 32px; /*px*/
    color: #353535;
  }

  .buyNum >>> .vux-number-input {
    font-size: 40px; /*px*/
    color: #353535;
    border: none;
  }

  .buyNum >>> .vux-number-selector {
    background: #d9d9d9;
    border: none;
    color: #353535;
    border-radius: 4px; /*no*/
    padding: 6px 12px; /*px*/
  }

  .buyNum >>> .vux-number-selector-sub svg {
    fill: #353535;
    width: 14px; /*no*/
  }

  .buyNum >>> .vux-number-selector-plus svg {
    fill: #353535;
    width: 14px; /*no*/
  }

  .leidWrap {
    padding: 25px 0;
    font-size: 32px; /*px*/
    color: #353535;
  }

  .leidRow {
    padding: 10px 0;
  }

  .leidRow >>> .weui-cells_checkbox .weui-icon-checked:before {
    font-size: 26px; /*no*/
  }

  .leidRow >>> .weui-cell {
    padding: 0;
  }

  .leidRow >>> .weui-cells {
    font-size: 32px; /*px*/
  }

  .leidRow >>> .weui-cells:before, .leidRow >>> .weui-cells:after {
    border: none;
  }

  .leidRow >>> .weui-cells_checkbox .weui-cell__hd {
    padding-right: 0;
  }

  .leid_dq {
    font-size: 26px; /*px*/
    color: #888888;
  }

  .leid_dq input {
    padding: 0 10px; /*px*/
    width: 160px; /*px*/
    height: 46px; /*px*/
    text-align: right;
    border: 1px solid #a0a0a0; /*no*/
    outline: none;
    background: none;
    vertical-align: bottom;
    margin-left: 10px;
  }

  .billTit {
    padding: 20px 0;
    color: #333333;
    font-size: 36px; /*px*/
  }

  .billRow {
    font-size: 32px; /*px*/
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 8px 0; /*px*/
  }

  .billLeft {
    width: 40%;
    text-align: left;
    color: #333333;
  }

  .billRight {
    width: 60%;
    font-weight: bold;
    text-align: right;
    color: #333333;
  }

  .bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 94px; /*px*/
    width: 100%;
    background: #ffffff;
    text-align: center;
    align-items: center;
  }

  .bottomItem {
    width: 50%;
  }

  .payPrice {
    color: #5a5ee4;
  }

  .payPrice span:nth-child(1) {
    font-size: 28px; /*px*/
  }

  .payPrice span:nth-child(2) {
    font-weight: bold;
    font-size: 40px; /*px*/
  }

  .payBtn {
    display: block;
    color: #ffffff;
    background: #5a5ee4;
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    font-size: 32px; /*px*/
  }

  .payBtn:active {
    background: #4e51c5;
  }

  .payBtn a {
    display: block;
    color: #ffffff;
  }


</style>
