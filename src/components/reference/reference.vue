<template>
  <div id="reference">
    <div class="iconWap">
      <ul class="pageTo bg_f">
        <router-link tag="li" v-for="(item,index) in navs" :key="index" :to="{path:'/articleDetails',query: {id: item.id}}">
          <img :src="item.navimg" alt="">
          <p class="barName">{{item.navtext}}</p>
        </router-link>
      </ul>
    </div>
    <tab :line-width="2" active-color="#5a5ee4" :scroll-threshold="6" default-color="#333333" custom-bar-width="40px">
      <tab-item :selected="0==i" :key="i" v-for="(item,i) in tabItem" @on-item-click="handler(i)">{{item}}</tab-item>
    </tab>
    <div class="wrapper">
      <div class="suggest" ref="wrapper">
        <ul class="articleList bg_f">
          <li v-for="(item,index) in resBkdata" :key="index">
            <router-link :to="{path:'/articleDetails',query: {id: item.id}}">
              <div class="artContiner">
                <div class="artLeft">
                  <p class="ellipsis-2 artTit">{{item.title}}</p>
                  <p class="artTime">{{item.createTime}}</p>
                </div>
                <div class="artRight">
                  <img :src="$store.state.http_gre+item.image" alt="">
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <loading :show="show" text=""></loading>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import {Tab, TabItem, ViewBox, Loading} from 'vux'

  export default {
    name: "reference",
    data() {
      return {
        show: true,
        navs: [
          {navimg: '/static/images/reference/bk_1.png', navtext: 'GREvsGMAT', id: 4249},
          {navimg: '/static/images/reference/bk_2.png', navtext: '考试地点', id: 4246},
          {navimg: '/static/images/reference/bk_3.png', navtext: '分数说明', id: 4243},
          {navimg: '/static/images/reference/bk_4.png', navtext: '常见问题', id: 4241},
          {navimg: '/static/images/reference/bk_5.png', navtext: '报名流程', id: 4237},
          {navimg: '/static/images/reference/bk_6.png', navtext: '考试费用', id: 4236},
          {navimg: '/static/images/reference/bk_7.png', navtext: '考试流程', id: 4235},
          {navimg: '/static/images/reference/bk_8.png', navtext: 'GRE入门', id: 4234},
          {navimg: '/static/images/reference/bk_9.png', navtext: '考试介绍', id: 4233},
        ],
        resData: '',
        resBkdata: '',
        tabItem: ['热门', '词汇', '阅读', '填空', '数学', '写作'],
        foodsScroll: '',
        options: {
          pullUpLoad: {
            threshold: -20 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
          },
          pullDownRefresh: false, //关闭下拉/
          click: true,
          probeType: 3,
          startY: 0,
          scrollbar: false
        }
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
      this.axios.get('/cn/wap-api/beikao')
        .then(function (response) {
          _this.resData = response.data;
          _this.bannerItem = response.data.carousel;
          _this.resBkdata = response.data.oneweek;
          _this.$nextTick(function () {
            _this.show = false;
            _this._initScroll();
          })
        })
    },
    methods: {
      _initScroll() {
        this.foodsScroll = new BScroll(this.$refs.wrapper, this.options);
      },
      pullingDownUp() {
        this.foodsScroll.finishPullDown()
        this.foodsScroll.finishPullUp()
        this.foodsScroll.refresh() //重新计算元素高度
      },
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
        this.$nextTick(() => {
          this.pullingDownUp();
        })
      }
    }
  }
</script>

<style scoped>
  #reference >>> .vux-loading-no-text .weui-toast {
    top: 50%;
    margin-top: -49px; /*no*/
  }

  .iconWap {
    box-sizing: border-box;
    padding: 28px 20px; /*px*/
    background: url("/static/images/reference/bkBg.png") no-repeat 0 0;
    background-size: cover;
  }

  .pageTo {
    display: flex;
    flex-flow: wrap row;
    padding: 24px 10px 0; /*px*/
    text-align: center;
    align-items: flex-start;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px; /*no*/
  }

  .pageTo:after {
    content: "";
    flex: auto;
  }

  .pageTo li {
    width: 20%;
    margin-bottom: 24px; /*px*/
  }

  .pageTo li img {
    width: 90px; /*px*/
    height: 90px; /*px*/
  }

  .barName {
    padding-top: 8px;
    font-size: 24px; /*px*/
    color: #ffffff;
  }

  .vux-tab .vux-tab-item {
    font-size: 28px; /*px*/
  }

  .articleList {
    padding: 0 20px; /*px*/
  }

  .articleList li {
    padding: 20px 0; /*px*/
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
    max-height: 140px; /*px*/
    width: 30%;
  }

  .artTit {
    color: #333333;
    line-height: 40px; /*px*/
    font-size: 30px; /*px*/
    max-height: 80px; /*px*/
    margin-bottom: 20px; /*px*/
  }

  .artTime {
    font-size: 26px; /*px*/
    color: #888888;
  }

  .wrapper {
    position: fixed;
    width: 100%;
    top: 480px; /*px*/
    bottom: 0;
    overflow: hidden;

  }

  .suggest {
    height: 100%;
    overflow: hidden;
  }
</style>
