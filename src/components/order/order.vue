<template>
<div id="order" style="height: 100%;background: #f3f3f3;">
  <x-header style="background: #5a5ee4;" :left-options="{backText: ''}">我的订单</x-header>
  <tab :line-width="2" active-color="#5a5ee4" :scroll-threshold="6" default-color="#444444" custom-bar-width="50px" >
    <tab-item :selected="0==i" :key="i" v-for="(item,i) in tabItem">{{item}}</tab-item>
  </tab>
  <ul class="orderList">
      <li v-for="i in 2" class="orderItem">
        <div class="flex orderInfo">
          <div>订单号：lgw14992402770</div>
          <div>2017-07-05 15:37:57 </div>
        </div>
        <div class="courseWrap">
          <router-link class="flex" to="/confirmOrder">
            <div class="courseImg"><img src="/static/images/index/artImg.png" alt=""></div>
            <div class="courseData">
              <h1 class="courseName ellipsis-2">雷哥GRE全程经典强化班</h1>
              <div class="courseNum">
                <span class="price">￥600元</span>
                <span class="num">x 1</span>
              </div>
            </div>
          </router-link>

        </div>
        <div class="handle flex">
          <router-link to="/orderDetails" class="linkBtn">立即付款</router-link>
          <span class="cancelBtn">取消订单</span>
        </div>
      </li>
    </ul>
</div>
</template>

<script type="text/ecmascript-6">
  import { XHeader,Tab,TabItem,Group} from 'vux'
    export default {
        name: "order",
      data(){
          return{
            tabItem:['全部订单','已付款','待付款']
          }
      },
      components:{
        XHeader,
        TabItem,
        Group,
        Tab,
      },
      activated(){
        this.getData();
      },
      methods:{
          getData(){
            this.$nextTick(function () {
              const _this=this;
              let data={uid:_this.$store.state.userInfo.uid};
              _this.axios.get('/cn/wap-api/my-order',{params:data}).then(function (res) {

              })
            })
          }
      }
    }
</script>

<style scoped>
  .orderList{
    padding-top: 16px;
    background: #f3f3f3;
  }
.orderItem{
  background: #ffffff;
  padding: 25px 20px;
  margin-bottom: 16px;
}
  .flex{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
  }
  .orderInfo{
    color: #777777;
    font-size: 24px;/*px*/
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
  .handle{
    justify-content: flex-end;
  }
  .linkBtn{
    border-radius: 6px;/*px*/
    padding: 0 15px;/*px*/
    font-size: 24px;/*px*/
    color: #ffffff;
    height: 42px;
    line-height: 42px;
    background: #5a5ee4;
  }
  .cancelBtn{
    margin-left: 15px;
    color: #4a4a4a;
    font-size: 24px;/*px*/
    border-radius: 6px;/*px*/
    padding: 0 15px;/*px*/
    height: 42px;
    line-height: 42px;
  }

</style>
