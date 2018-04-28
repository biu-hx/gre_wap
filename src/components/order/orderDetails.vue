<template>
    <div id="orderDetails" style="height: 100%;background: #f3f3f3;">
      <x-header style="background: #5a5ee4;" :left-options="{backText: ''}">订单查看</x-header>
      <div class="orderItem">
        <div class="flex courseWrap">
          <div class="courseImg"><img src="/static/images/index/artImg.png" alt=""></div>
          <div class="courseData">
            <h1 class="courseName ellipsis-2">雷哥GRE全程经典强化班</h1>
            <div class="courseNum">
              <span class="price">￥600元</span>
              <span class="num">x 1</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mgb_16 bg_f">
        <div class="orderInfo">
          <div class="flex infoText"><label>运费</label><span>￥0.00</span></div>
          <div class="flex infoText"><label>商品总价</label><span>￥600.00</span></div>
          <div class="flex infoText"><label>使用雷豆抵扣</label><span>￥0.00</span></div>
          <div class="flex infoText"><label style="color: #292929;">订单总价</label><span style="color: #df0000;">￥600.00</span></div>
        </div>
        <!--未付款 显示-->
        <div class="handle flex">
            <div class="delet">删除订单</div>
            <div class="buy"><router-link to="/payAway">付款</router-link></div>
        </div>
      </div>
      <!--已付款 显示-->
      <div class="orderTime bg_f">
        <p>订单编号：1111111111116</p>
        <p>创建时间：2017-07-05 15:37:57 </p>
        <p>成交时间：2017-07-06 15:37:57 </p>
      </div>

    </div>
</template>

<script type="text/ecmascript-6">
  import { XHeader} from 'vux'
    export default {
        name: "orderDetails",
      components:{
        XHeader
      }
    }
</script>

<style scoped>
  .orderItem{
    background: #ffffff;
    padding: 15px 20px 25px;
    margin-bottom: 16px;
  }
  .flex{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
  }
  .courseName{
    font-size: 30px;/*px*/
    color: #333333;
    line-height: 40px;
    height: 80px;
    font-weight: normal;
  }
  .courseWrap{
    padding: 25px 0;
    justify-content: flex-start;
  }
  .courseImg{
    width: 28%;
    overflow: hidden;
  }
  .courseData{
    text-align: justify;
    padding-left: 20px;
    width: 69%;
  }
  .price{
    color: #df0000;
    font-size: 30px;
  }
  .num{
    color: #777777;
    padding-left: 20px;
    font-size: 30px;/*px*/
  }
  .infoText{
    color: #676767;
    font-size: 30px;/*px*/
    line-height: 1.8;
  }
  .mgb_16{
    margin-bottom: 16px;
  }
  .orderInfo,.orderTime{
    padding: 20px;
  }
  .orderTime{
    color: #777777;
    font-size: 30px;/*px*/
    margin-bottom: 16px;
  }
  .orderTime p{
    line-height: 1.8;
  }
  .handle{
    font-size: 32px;/*px*/
    text-align: center;
    border: 1px solid #d5d2d2;/*no*/
    border-left: none;
    border-right: none;
  }
  .handle .delet{
    color: #1f1f1f;
    background: #ffffff;
    width: 50%;
    padding: 30px 0;
  }
  .handle .buy{
    width: 50%;
    color: #ffffff;
    background: #5a5ee4;
    padding: 30px 0;
  }
  .buy a{
    display: block;
    color: #ffffff;
  }
</style>
