<template>
  <div id="index">
    <div class="indexHeader">
      <div class="cell_empty tl"></div>
      <div><img class="logo" src="/static/images/index/logo.png" height="35" alt=""></div>
      <div class="cell_empty tr">
        <router-link to="/userCenter">
          <img class="user" src="/static/images/index/user.png" alt="">
        </router-link>
      </div>
    </div>
    <tab :line-width="2" active-color="#5a5ee4" :scroll-threshold="6" default-color="#444444" custom-bar-width="40px">
      <tab-item :selected="0==i" :key="i" v-for="(item,i) in header">{{item}}</tab-item>
    </tab>
    <swiper class="bg_f" :options="swiperOption" ref="mySwiper">
      <swiper-slide :key="index"  v-for="(item,index) in bannerItem">
        <img :src="$store.state.httpUrl+item.image" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <ul class="pageTo bg_f">
      <li>
        <router-link to="/searchTopic">
          <img src="/static/images/index/pageIcon.png" alt="">
          <p class="barName">搜题</p>
        </router-link>
      </li>
      <li>
        <router-link to="/greMarking">
          <img src="/static/images/index/pageIcon_2.png" alt="">
          <p class="barName">做题</p>
        </router-link>
      </li>
      <li>
        <router-link to="/courseDetails">
          <img src="/static/images/index/pageIcon_3.png" alt="">
          <p class="barName">GRE课程</p>
        </router-link>
      </li>
      <li>
        <router-link to="/active">
          <img src="/static/images/index/pageIcon_4.png" alt="">
          <p class="barName">GRE活动</p>
        </router-link>
      </li>
      <li>
        <router-link to="/bkIndex">
          <img src="/static/images/index/pageIcon_5.png" alt="">
          <p class="barName">GRE机精真题</p>
        </router-link>
      </li>
      <li>
        <router-link to="/reference">
          <img src="/static/images/index/pageIcon_6.png" alt="">
          <p class="barName">GRE备考</p>
        </router-link>
      </li>
      <li>
        <router-link to="/information">
          <img src="/static/images/index/pageIcon_7.png" alt="">
          <p class="barName">GRE资讯</p>
        </router-link>
      </li>
      <li class="listEmpty"></li>
    </ul>
    <!--标题栏-->
    <div class="cellWrap bg_f">
      <div class="mask">
        <div class="maskTit">
          <img class="icon" src="/static/images/index/tv.png" width="18" alt="">
          <span>雷哥GRE精品课程</span>
        </div>
      </div>
      <a class="link" href="#">MORE</a>
    </div>
    <ul class="courseList bg_f">
      <li v-for="item in resData.activity">
        <div class="courseImg">
          <!--<img src="url+/static/images/index/coure_img.png" alt="">-->
          <img :src="$store.state.httpUrl+item.image" alt="">
          <p class="courseTime">{{item.commencement}}</p>
        </div>
        <p class="courseName">{{item.name}}</p>
        <div class="punmInfo">
          <div class="pnum">
            <img src="/static/images/index/pnum.png" width="15" alt="">
            <span>报名人数：{{item.viewCount}}</span>
          </div>
          <span class="bmBtn">报名</span>
        </div>
      </li>
    </ul>
    <!--标题栏-->
    <div class="cellWrap bg_f">
      <div class="mask">
        <div class="maskTit">
          <img class="icon" src="/static/images/index/bk.png" width="20" alt="">
          <span>GRE备考</span>
        </div>
      </div>
      <router-link class="link" to="/reference">MORE</router-link>
    </div>
    <tab :line-width="2" active-color="#5a5ee4" :scroll-threshold="6" default-color="#333333" custom-bar-width="40px">
      <tab-item :selected="0==i" :key="i" v-for="(item,i) in tabItem" @on-item-click="handler(i)">{{item}}</tab-item>
    </tab>
    <ul class="articleList bg_f">
      <li v-for="(item,index) in resBkdata">
        <router-link :to="{path:'/articleDetails',query: {id: item.id}}">
        <div class="artContiner">
          <div class="artLeft">
            <p class="ellipsis-2 artTit">{{item.title}}</p>
            <p class="artTime">{{item.createTime}}</p>
          </div>
          <div class="artRight">
            <img :src="$store.state.httpUrl+item.image" alt="">
          </div>
        </div>
        </router-link>
      </li>
    </ul>
    <div class="bg_f addImg_1"><img src="/static/images/index/deImg.png" alt=""></div>
    <div class="bg_f addImg"><img src="/static/images/index/addImg.png" alt=""></div>
    <div class="bg_f copyRight">
      2018 greonline.cn All Rights Reserved 京ICP备16000003号-3<br>京公网安备11010802017681 免责声明
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {Tab, TabItem, ViewBox} from 'vux'

  export default {
    name: "index",
    data() {
      return {
        resData: '',
        resBkdata: '',
        bannerItem:'',
        currentTab: '0',
        header: ['GMAT', 'GRE', 'TOELF', 'IELTS', 'SAT', '留学'],
        tabItem: ['热门', '词汇', '阅读', '填空', '数学', '写作'],
        swiperOption: {
          notNextTick: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          loop: true,
          observer: true,
          observeParents: true,
          setWrappermtze: true,
          autoHeight: true,
          // height: 300,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        }
      }
    },
    components: {
      Tab,
      TabItem,
      ViewBox
    },
    mounted() {
      const _this = this;
      this.axios.get('/cn/wap-api/index')
        .then(function (response) {
          _this.resData = response.data;
          _this.bannerItem = response.data.carousel;
          _this.resBkdata = response.data.oneweek;
        })
    }
    ,
    methods: {
      handler(index) {
        if (index + 1 == 1) {
          this.resBkdata = this.resData.oneweek
        }
        if (index + 1 == 2) {
          this.resBkdata = this.resData.words
        }
        if (index + 1 == 3) {
          this.resBkdata = this.resData.read
        }
        if (index + 1 == 4) {
          this.resBkdata = this.resData.blank
        }
        if (index + 1 == 5) {
          this.resBkdata = this.resData.math
        }
        if (index + 1 == 6) {
          this.resBkdata = this.resData.write
        }
      }
    }

  }
</script>

<style scoped>
  #index {
    background: #eeeeee;
  }

  .bg_f {
    background: #ffffff;
  }
  #index>>>.swiper-pagination .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    background: none;
    opacity: 1;
    outline: none;
    border: 1px solid #ffffff; /*no*/
  }

  #index>>>.swiper-pagination .swiper-pagination-bullet-active {
    background: #ffffff;
  }

  .vux-tab .vux-tab-item {
    font-size: 30px; /*px*/
  }

  .indexHeader {
    display: flex;
    padding: 15px 20px;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    flex-flow: row wrap;
    background: #444444;
  }

  .indexHeader .cell_empty {
    flex-basis: 80px;
  }

  .indexHeader .logo {
    width: 170px;
  }

  .indexHeader .user {
    width: 42px;
  }

  .pageTo {
    display: flex;
    flex-flow: wrap row;
    padding: 20px;
    text-align: center;
    padding-bottom: 8px;
    margin-bottom: 20px;
    align-items: flex-start;
    justify-content: space-between;
  }

  .pageTo:after {
    content: "";
    flex: auto;
  }

  .pageTo li {
    width: 25%;
    margin-bottom: 20px;
  }

  .pageTo li img {
    width: 90px;
    height: 90px;
  }

  .barName {
    padding-top: 8px;
    font-size: 28px; /*px*/
    color: #333333;
  }

  .cellWrap {
    display: flex;
    flex-flow: wrap row;
    align-items: center;
    padding-right: 20px;
    justify-content: space-between;
    border-bottom: 1px solid #5a5ee4; /*no*/
  }

  .mask {
    display: inline-block;
    padding-right: 20px;
    height: 0;
    padding-left: 32px;
    border-bottom: 60px solid #5a5ee4;
    border-right: 28px solid transparent;
  }

  .maskTit {
    font-size: 30px; /*px*/
    color: #ffffff;
    display: flex;
    height: 60px;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-start;
  }

  .maskTit .icon {
    margin-right: 14px;
  }

  .cellWrap .link {
    color: #5a5ee4;
    font-size: 28px; /*px*/
  }

  .courseList {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
    padding: 30px 20px 0;
    margin-bottom: 20px;
  }

  .courseList li {
    width: 48%;
    position: relative;
  }

  .courseImg {
    position: relative;
    margin-bottom: 16px;
  }

  .courseImg img {
    width: 100%;
  }

  .courseTime {
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    text-align: center;
    position: absolute;
    font-size: 26px; /*px*/
    color: #ffffff;
    width: 100%;
    padding: 8px 10px;
    background: rgba(0, 0, 0, 0.6);
  }

  .courseName {
    font-size: 28px; /*px*/
  }

  .punmInfo {
    display: flex;
    padding: 12px 0 20px;
    flex-flow: wrap row;
    align-items: center;
    justify-content: space-between;
  }

  .pnum {
    color: #777777;
    font-size: 24px; /*px*/
  }

  .pnum span {
    padding-left: 4px;
  }

  .bmBtn {
    padding: 2px 20px;
    text-align: center;
    border-radius: 6px;
    border: 1px solid #5a5ee4; /*no*/
    color: #5a5ee4;
    font-size: 24px; /*px*/
  }

  .articleList {
    padding: 20px;
  }

  .articleList li {
    padding: 20px 0;
    border-bottom: 1px solid #cccccc; /*no*/
  }

  .articleList li:last-child {
    border-bottom: none;
  }

  .artContiner {
    display: flex;
    flex-flow: row wrap;
    align-items: start;
    justify-content: space-between;
  }

  .artLeft {
    width: 69%;
  }

  .artRight {
    overflow: hidden;
    max-height: 140px;
    width: 30%;
  }

  .artTit {
    color: #333333;
    line-height: 40px;
    font-size: 32px; /*px*/
    max-height: 80px;
    margin-bottom: 20px;
  }

  .artTime {
    font-size: 26px; /*px*/
    color: #888888;
  }

  .addImg {
    padding: 30px 36px;
  }

  .addImg img {
    width: 100%;
  }

  .addImg_1 {
    padding-top: 8px;
  }

  .addImg_1 img {
    width: 100%;
  }

  .copyRight {
    padding: 20px;
    font-size: 24px; /*px*/
    line-height: 1.4;
    text-align: center;
    color: #3c3c3c;
  }
</style>
