<template>
  <div id="payAway">
    <x-header style="background: #5a5ee4;" :left-options="{backText: ''}">支付订单</x-header>
    <group class="option" gutter="0">
      <radio :options="radio003" value="radio001" @on-change="change"></radio>
    </group>
    <div class="tm" style="padding-top: 100px">
      <button class="payBtn">确认支付</button>
    </div>

  </div>
</template>

<script>
  import {XHeader, Radio, Group} from 'vux'

  export default {
    name: "payAway",
    data() {
      return {
        radio003: [{
          icon: '/static/images/order/wechat.png',
          key: '1',
          value: '支付宝支付'
        }, {
          icon: '/static/images/order/alipay.png',
          key: '2',
          value: '微信支付'
        }]
      }
    },
    components: {
      XHeader, Radio, Group
    },
    motheds: {

    }
  }
</script>

<style scoped>
  #payAway{
    background: #f3f3f3;
    height: 100%;
  }
  .option>>>.weui-cell{
    padding: 30px;/*px*/
  }
  .option >>> .vux-radio-icon {
    width: 70px; /*px*/
    height: 70px; /*px*/
  }

  .option >>> .weui-cells_radio .weui-check:checked + .weui-icon-checked:before {
    color: #fff;
    font-size: 16PX;/*px*/
    border-radius: 50%;
    padding: 3px;/*no*/
    background: #5a5ee4;
    border: 1px solid #8b8b8b;/*no*/
  }
  .payBtn{
    outline: none;
    border: none;
    width: 70%;
    height: 110px;/*px*/
    border-radius: 8px;/*px*/
    color: #ffffff;
    /*font-weight: bold;*/
    font-size: 36px;/*px*/
    background: #5a5ee4;
  }
  .payBtn:active{
    background: #4b4fc1;
  }

</style>
