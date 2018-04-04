<template>
    <div id="active">
      <div class="adImg" v-on:click="test"><img src="../../assets/images/index/banner.png" alt=""></div>
      <tab :line-width="2" active-color="#5a5ee4"  default-color="#333333" :custom-bar-width="getBarWidth" v-model="index">
        <tab-item :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
      <!--<tab-item selected>全部活动</tab-item>-->
      <!--<tab-item>公开课</tab-item>-->
      <!--<tab-item>刷题团</tab-item>-->
      <!--<tab-item>单词团</tab-item>-->
    </tab>
      <swiper v-model="index" height="auto" :show-dots="false">
        <swiper-item v-for="(item, index) in list2" :key="index">
          <ul class="courseLIst" ref="test">
            <li v-for="i in 10">
              <div class="container">
                <div class="courseImg tm relative">
                  <div class="tagWap ani">
                    <p class="tag_p1">公开课</p>
                    <p class="tag_p2">进行中</p>
                  </div>
                  <img src="../../assets/images/active/coures_1.png" alt="">
                  <p class="ani starTime">开始时间:2018.3.23</p>
                </div>
                <div class="courseInfo">
                  <h1 class="acTit ellipsis-2">{{item}} GRE 21天脱白计划+超全资料赠送月</h1>
                  <div style="margin-bottom: 4px;">
                    <img src="../../assets/images/active/pnum.png" class="acIcon" alt="">
                    <span class="icon_data">报名人数：336</span>
                  </div>
                  <div>
                    <img src="../../assets/images/active/time.png" class="acIcon" alt="">
                    <span class="icon_data">剩余天数：12</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </swiper-item>
      </swiper>
    </div>
</template>

<script type="text/ecmascript-6">
  import { Tab,TabItem,ViewBox,Swiper, SwiperItem} from 'vux'
  const list = () => ['全部活动', '公开课', '刷题团', '单词团'];
    export default {
        name: "active",
     data(){
       return{
         demo2: '全部活动',
         index:0,
         // height:this.$refs.courseLIst.offsetHeight,
         list2: list(),
         getBarWidth: function (index) {
           return (index + 1) * 22 + 'px';
         }
       }
     },
      components:{
        Tab,
        TabItem,
        ViewBox,
        Swiper,
        SwiperItem
      },
      methods:{
        test:function () {
          console.log(this.$refs.test[0].offsetHeight)
        }
      }
    }
</script>

<style lang="less">
  .courseLIst{
    padding: 0 20px;
  }
  .courseLIst li{
    padding: 32px 0;
    border-bottom: 1px solid #dcdcdc;/*no*/
  }
  .courseLIst li:last-child{
    border-bottom: none;
  }
  .container{
    display: flex;
    flex-flow: wrap row;
    justify-content: space-between;
    align-items: flex-start;
    box-sizing: border-box;
  }
  .courseInfo{
    width: 52%;
  }
  .courseImg{
    position: relative;
    width: 312px;
    height: 175px;
    overflow: hidden;
  }
  .courseImg img{
    width: 100%;
    height: 100%;
  }
  .vux-tab .vux-tab-item{
    font-size: 28px;/*px*/
  }
  .acTit{
    font-weight: normal;
    font-size: 30px;/*px*/
    color: #242424;
    line-height: 42px;
    max-height: 84px;
    margin-bottom: 10px;
  }
  .acIcon{
    vertical-align: middle;
    width: 30px;/*px*/
  }
  .icon_data{
    vertical-align: middle;
    padding-left: 10px;
    font-size: 28px;/*px*/
    color: #888888;
  }
  .starTime{
    left: 0;
    bottom: 0;
    width: 100%;
    color: #ffffff;
    font-size: 22px;/*px*/
    padding: 7px;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.5);
  }
  .tagWap{
    width: 94px;
    height: 75px;
    color: #ffffff;
    background: url("../../assets/images/active/tagBg.png")no-repeat 0 0;
    background-size: cover;
  }
  .tagWap .tag_p1{
    padding: 5px 0;
    font-size: 22px;/*px*/
  }
  .tagWap .tag_p2{
    font-size: 20px;/*px*/
  }
</style>
